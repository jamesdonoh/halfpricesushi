import React from 'react';

import '../styles/shops.css';

const timeToMins = (time) => parseInt(time.substr(0, 2)) * 60 + parseInt(time.substr(3, 2));
const minsUntil = (now, to) => timeToMins(to) - timeToMins(now);
const closesSoon = (currentTime, closes) => minsUntil(currentTime, closes) <= 30;

const locationUrl = (loc) => `https://maps.google.com/?q=${loc.lat},${loc.long}`;

const ShopIcon = ({currentTime, closes}) => {
    const icon = closesSoon(currentTime, closes) ? '\u{1F363}\u{1F363}' : '\u{1F363}';
    return <td className="shop__icon">{icon}</td>
};

const ShopName = ({name, location, distance}) =>
    <td className="shop__name">
        <a href={locationUrl(location)}>
            {name}
            <ShopDistance distance={distance}/>
        </a>
    </td>

const ShopDistance = ({distance}) => {
    const dist = distance ? (distance / 1000).toFixed(1) + 'km' : null;
    return <em>{dist}</em>
}

const ShopCloses = ({currentTime, closes}) => {
    let formattedClosing = closes;
    if (closesSoon(currentTime, closes)) {
        formattedClosing = `${minsUntil(currentTime, closes)} min`;
    }

    return <td className="shop__closes">{formattedClosing}</td>
}

const shopClass = (currentTime, closes) =>
    closesSoon(currentTime, closes) ? 'shop shop--halfprice' : 'shop';

const Shop = ({name, currentTime, closes, distance, location}) =>
    <tr className={shopClass(currentTime, closes)}>
        <ShopIcon currentTime={currentTime} closes={closes}/>
        <ShopName name={name} location={location} distance={distance}/>
        <ShopCloses currentTime={currentTime} closes={closes}/>
    </tr>

Shop.propTypes = {
    name: React.PropTypes.string.isRequired,
    closes: React.PropTypes.string.isRequired,
    currentTime: React.PropTypes.string.isRequired
};

export default Shop;
