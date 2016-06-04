import React from 'react';

import '../styles/shops.css';

export default class Shop extends React.Component {
    render() {
        return (
            <div className="shop">
                <span className="shop__name">{this.props.name}</span>
                <span className="shop__closes">{this.props.closes}</span>
            </div>
        );
    }
}

Shop.propTypes = {
    name: React.PropTypes.string.isRequired,
    closes: React.PropTypes.string.isRequired
};
