import React from 'react';

import Timer from './Timer';
import Header from './Header';
import ShopList from './ShopList';
import Clock from './Clock';
import Geolocator from './Geolocator';

import '../styles/global.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.timer = new Timer(this.timeChanged.bind(this));
        this.geolocator = new Geolocator(this.locationChanged.bind(this));

        this.state = {
            day: this.timer.day,
            time: this.timer.time
        };
    }

    componentDidMount() {
        this.timer.start();
    }

    componentWillUnmount() {
        this.timer.stop();
    }

    timeChanged() {
        this.setState({
            day: this.timer.day,
            time: this.timer.time
        });
    }

    locationChanged() {
        this.setState({
            location: this.geolocator.location
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <ShopList shops={this.props.shops} day={this.state.day} time={this.state.time} location={this.state.location} />
            </div>
        );
    }
}
