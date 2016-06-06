import React from 'react';

import Shop from './Shop';

export default class ShopList extends React.Component {
    render() {
        const time = this.props.time;
        const day = this.props.day;

        const isOpen = (shop) => shop.closes[day] > time;

        const compareClosingTime = (a, b) =>
            a.closes[day] < b.closes[day] ? -1 : a.closes[day] > b.closes[day] ? 1 : 0;

        const createShop = (shop) => (
            <Shop key={shop.url} name={shop.name} closes={shop.closes[day]} time={time} />
        );

        const shops = this.props.shops
            .filter(isOpen)
            .sort(compareClosingTime)
            .map(createShop);

        return (
            <div>
                {shops}
            </div>
        );
    }
}
