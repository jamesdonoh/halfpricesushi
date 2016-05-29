import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import SHOPS from './shops';

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const TIME_FORMAT = 'HH:mm';

const now = new Date();
const today = DAYS[now.getDay()];

const closingHour = (shop, day) => moment(shop.closes[day], TIME_FORMAT).hours();
const shopsByClosingTime = (shop1, shop2) => closingHour(shop1, today) - closingHour(shop2, today);

class Shop extends React.Component {
    render() {
        const closes = this.props.data.closes[today];

        return (
            <li>
                {this.props.data.name}
                <span> (closes at {closes})</span>
            </li>
        );
    }
}

class ShopList extends React.Component {
    render() {
        const filteredShops = this.props.shops
            .filter((shop) => shop.closes.hasOwnProperty(today))
            .sort(shopsByClosingTime);

        return (
            <div>
                <h1>Sushi on {this.props.day}</h1>
                <ul>
                    {filteredShops.map((shop) => <Shop key={shop.name} data={shop}/>)}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(
    <ShopList shops={SHOPS} day={today} time={now}/>,
    document.getElementById('container')
);
