import React from 'react';

import '../styles/shops.css';

const timeToMins = (time) => parseInt(time.substr(0, 2)) * 60 + parseInt(time.substr(3, 2));

const minsUntil = (now, to) => timeToMins(to) - timeToMins(now);

const formatClosing = (currentTime, closes) => {
    const mins = minsUntil(currentTime, closes);
    return mins < 30 ? mins + ' min' : closes;
};

const Shop = ({name, currentTime, closes}) =>
    <div className="shop">
        <span className="shop__name">{name}</span>
        <span className="shop__closes">{formatClosing(currentTime, closes)}</span>
    </div>

Shop.propTypes = {
    name: React.PropTypes.string.isRequired,
    closes: React.PropTypes.string.isRequired,
    currentTime: React.PropTypes.string.isRequired
};

export default Shop;
