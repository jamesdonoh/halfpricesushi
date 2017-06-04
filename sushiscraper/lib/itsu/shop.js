const url = require('url'),
    querystring = require('querystring'),
    cheerio = require('cheerio'),
    _ = require('lodash');

const DAY_CODES = {
    'Sunday': 'sun',
    'Monday': 'mon',
    'Tuesday': 'tue',
    'Wednesday': 'wed',
    'Thursday': 'thu',
    'Friday': 'fri',
    'Saturday': 'sat'
};
const TIME_FORMAT = /^\d\d:\d\d$/;
const idsSeen = [];

function extractIdFromUrl(url) {
    const matches = url.match(/(UK\d+)\.html/);
    if (matches) {
        const id = matches[1];
        if (idsSeen.indexOf(id) !== -1) {
            throw new Error('Duplicate ID: ' + id);
        }

        idsSeen.push(id);
        return id;
    } else {
        throw new Error('Unable to extract ID: ' + url);
    }
}

function sanitiseName(text) {
    return text.replace(/\[2\]/, '2')
        .replace(/\s*\[.*\]/, '')
        .replace(/ Deli/, '')
        .replace(/Itsu Academy/, 'High Holborn 2')
        .replace(/\s*itsu\s*/, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function sanitiseAddress(text) {
    return text.replace(/\s+/g, ' ').trim();
}

function coordsFromGmapsUrl(gmapsUrl) {
    const coords = querystring.parse(url.parse(gmapsUrl || '').query).center;
    const parts = coords.split(',');
    if (parts.length !== 2) {
        throw new Error('Unable to location from URL: ' + gmapsUrl);
    }

    return {
        lat: parts[0],
        long: parts[1]
    }
}

/* Convert opening times HTML table into a simple two-dimensional array */
function openingTimesTableToArray(table) {
    return table.find('tr').toArray()
        .map(row => cheerio(row).find('td').map((i, cell) => 
            cheerio(cell).text()).get());
}

/* Convert a single row from the opening times table into a triple for a day */
function openingTimesTableRowToTriple(row) {
    if (row.length === 2) {
        const day = DAY_CODES[row[0]];
        if (!day) {
            throw new Error('Invalid day: ' + row);
        }

        const hours = row[1].split(/\s+-\s+/);
        if (hours.length !== 2) {
            console.error('Rejecting unparseable row: %s', row);
            return null;
        }

        const opens = hours[0];
        const closes = hours[1];

        if (!opens.match(TIME_FORMAT) || !closes.match(TIME_FORMAT)) {
            throw new Error('Invalid time format: ' + row);
        }

        if (opens > closes) {
            throw new Error('Opening must be before closes: ' + row);
        }

        return [day, opens, closes];
    }
}

function reduceTriplesToHoursHash(resultHash, triple) {
    const day = triple[0];
    const opens = triple[1];
    const closes = triple[2];

    resultHash[day] = {
        opens: opens,
        closes: closes
    };

    return resultHash;
}

function parseOpeningTimesTable(table) {
    return _(openingTimesTableToArray(table))
        .map(openingTimesTableRowToTriple)
        .filter() // Remove unparseable rows
        .reduce(reduceTriplesToHoursHash, {});
}

function parse(response) {
    const $ = cheerio.load(response.body);
    const url = response.request.uri.href;

    console.error('Parsing HTML: %d characters', response.body.length);

    return {
        id: extractIdFromUrl(url),
        url: url,
        name: sanitiseName($('#pagetitle img').attr('alt')),
        address: sanitiseAddress($('#shop-address').text()),
        location: coordsFromGmapsUrl($('#map_container img').attr('src')),
        times: parseOpeningTimesTable($('table.opening_times'))
    }
}

exports.parse = parse;
