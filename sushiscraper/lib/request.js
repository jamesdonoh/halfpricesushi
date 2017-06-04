const url = require('url'),
    path = require('path'),
    Promise = require('bluebird'),
    stat = Promise.promisify(require('fs').stat),
    readFile = Promise.promisify(require('fs').readFile),
    requestPromise = require('request-promise');

const FIXTURE_DIR = path.join(__dirname, '..', 'fixtures');

const fixtureRequest = (url, fixturePath) => readFile(fixturePath, 'utf-8')
    .then((data) => ({ body: data, request: { uri: { href: url } } }));

function getFixturePath(targetUrl) {
    let parsedUrl = url.parse(targetUrl),
        urlPath = parsedUrl.pathname;

    let pathParts = [FIXTURE_DIR, urlPath];
    if (targetUrl.substr(-1) === '/') {
        pathParts.push('index.html');
    }
    
    return path.join(...pathParts);
}

function requestUrl(targetUrl) {
    console.error('Request URL %s', targetUrl);

    let fixturePath = getFixturePath(targetUrl);
    
    console.error('Checking for local fixture %s', fixturePath);

    return stat(fixturePath)
        .then(stat => {
            console.error('Found local fixture (%d bytes)', stat.size);
            return fixtureRequest(targetUrl, fixturePath);
        })
        .catch(() => {
            console.error('Fixture %s missing, making HTTP request instead', fixturePath);
            return requestPromise({
                uri: targetUrl,
                resolveWithFullResponse: true
            });
        });
}

module.exports = requestUrl;
