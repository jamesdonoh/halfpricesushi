import React from 'react';

import '../styles/shops.css';

const timeToMins = (time) => parseInt(time.substr(0, 2)) * 60 + parseInt(time.substr(3, 2));
const minsUntil = (now, to) => timeToMins(to) - timeToMins(now);
const closesSoon = (currentTime, closes) => minsUntil(currentTime, closes) <= 30;

const locationUrl = (loc) => `https://maps.google.com/?q=${loc.lat},${loc.long}`;

const ShopDistance = ({distance}) => {
    const dist = distance ? (distance / 1000).toFixed(1) + 'km' : null;
    return <em>{dist}</em>
}

const ShopIcon = ({currentTime, closes}) => {
    const icon = closesSoon(currentTime, closes) ? '\u{1F363}\u{1F363}' : '\u{1F363}';
    return <strong>{icon}</strong>
};

const ShopCloses = ({currentTime, closes}) => {
    let classes = 'shop__closes';
    let formattedClosing = closes;

    if (closesSoon(currentTime, closes)) {
        classes += ' shop__closes--soon';
        formattedClosing = `${minsUntil(currentTime, closes)} min`;
    }

    return <span className={classes}>{formattedClosing}</span>
}

const Shop = ({name, currentTime, closes, distance, location}) =>
    <div className="shop">
        <span className="shop__name">
            <a href={locationUrl(location)}>
                <ShopIcon currentTime={currentTime} closes={closes}/>
                {name}
                <ShopDistance distance={distance}/>
            </a>
        </span>
        <ShopCloses currentTime={currentTime} closes={closes}/>
    </div>

Shop.propTypes = {
    name: React.PropTypes.string.isRequired,
    closes: React.PropTypes.string.isRequired,
    currentTime: React.PropTypes.string.isRequired
};

export default Shop;
