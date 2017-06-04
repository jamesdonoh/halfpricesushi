const url = require('url'),
    Promise = require('bluebird'),
    cheerio = require('cheerio'),
    _ = require('lodash');

const shopListUrl = 'http://www.itsu.com/locations/shops/';

function makeAbsolute(someUrl) {
    return url.parse(someUrl).hostname ? someUrl : url.resolve(shopListUrl, someUrl);
}

function getLinks(html) {
    let $ = cheerio.load(html);

    return $('a')
        .map((i, el) => $(el).attr('href'))
        .get();
}

function filterLinks(links) {
    return _(links)
        .uniq()
        .filter(url => url.match(/\/locations\/shops\/.*\.html$/))
        .map(makeAbsolute)
        .value();
}

function parse(response) {
    return filterLinks(getLinks(response.body));
}

module.exports = {
    url: shopListUrl,
    parse: parse
};
