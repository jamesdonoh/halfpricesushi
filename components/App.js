import React from 'react';

import Timer from './Timer';
import ShopList from './ShopList';
import Clock from './Clock';

import '../styles/global.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.timer = new Timer(this.timeChanged.bind(this));

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

    render() {
        return (
            <div>
                <Clock time={this.state.time} day={this.state.day} />
                <ShopList shops={this.props.shops} day={this.state.day} time={this.state.time} />
            </div>
        );
    }
}
