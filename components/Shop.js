import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/shops.css';

export default class Shop extends React.Component {
    render() {
        const closes = this.props.closes;

        return (
            <li>closes at {closes}</li>
        );
    }
}
