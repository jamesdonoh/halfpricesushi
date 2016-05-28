import React from 'react';
import ReactDOM from 'react-dom';

import SHOPS from './shops';

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
            <ul>
                {this.props.shops.map((shop) => <Shop key={shop.name} data={shop}/>)}
            </ul>
        );
    }
}

ReactDOM.render(
    <ShopList shops={SHOPS} />,
    document.getElementById('container')
);
