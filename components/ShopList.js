import React from 'react';

import Shop from './Shop';

export default class ShopList extends React.Component {
    render() {
        const time = this.props.time;
        const day = this.props.day;

        const isOpen = (shop) => shop.times[day] && shop.times[day].closes > time;

        const compareClosingTime = (a, b) =>
            a.times[day].closes < b.times[day].closes ? -1 :
            a.times[day].closes > b.times[day].closes ? 1 : 0;

        const createShop = (shop) => (
            <Shop key={shop.url} name={shop.name} closes={shop.times[day].closes} time={time} />
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
