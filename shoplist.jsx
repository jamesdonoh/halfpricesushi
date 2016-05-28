import React from 'react';
import ReactDOM from 'react-dom';

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
                {this.props.shops.map((shop) => <Shop data={shop}/>)}
            </ul>
        );
    }
}

const SHOPS = [
    { name: 'Stockwell' },
    { name: 'Tufnell Park' }
];

ReactDOM.render(
    <ShopList shops={SHOPS} />,
    document.getElementById('container')
);
