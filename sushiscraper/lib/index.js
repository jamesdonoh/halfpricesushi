const requestUrl = require('./request'),
    itsuShopList = require('./itsu/list');
    itsuShop = require('./itsu/shop');

function getShopUrls() {
    return requestUrl(itsuShopList.url)
        .then(itsuShopList.parse);
}

function getShops() {
    return getShopUrls()
        .map(requestUrl)
        .map(itsuShop.parse);
}

function legalCleanUp(shops) {
    return shops.map((shop, index) => ({
        id: index + 1,
        name: shop.name,
        location: shop.location,
        times: shop.times
    }));
}

getShops()
    .then(shops => legalCleanUp(shops))
    .then(shops => console.log(JSON.stringify(shops, null, 4)));
