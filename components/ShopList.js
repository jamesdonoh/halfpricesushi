import React from 'react';

import Shop from './Shop';

export default class ShopList extends React.Component {
    render() {
        const shops = this.props.shops.map((shop) =>
            <Shop key={shop.url} name={shop.name} closes={shop.closes[this.props.day]} />)

        return (
            <div>
                {shops}
            </div>
        );
    }
}
