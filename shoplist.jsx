import React from 'react';
import ReactDOM from 'react-dom';

import SHOPS from './shops';

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const today = DAYS[new Date().getDay()];

class Shop extends React.Component {
    render() {
        return (
            <li>{this.props.data.name}</li>
        );
    }
}

class ShopList extends React.Component {
    render() {
        return (
            <div>
                <h1>Sushi on {this.props.day}</h1>
                <ul>
                    {this.props.shops.map((shop) => <Shop key={shop.name} data={shop}/>)}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(
    <ShopList shops={SHOPS} day={today} />,
    document.getElementById('container')
);
