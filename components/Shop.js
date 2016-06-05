import React from 'react';

import '../styles/shops.css';

// NB 'stateless function' approach, see
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions

const Shop = (props) =>
    <div className="shop">
        <span className="shop__name">{props.name}</span>
        <span className="shop__closes">{props.closes}</span>
    </div>

Shop.propTypes = {
    name: React.PropTypes.string.isRequired,
    closes: React.PropTypes.string.isRequired
};

export default Shop;
