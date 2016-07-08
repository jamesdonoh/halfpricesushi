import React from 'react';

import ShopList from './ShopList';
import Clock from './Clock';
import '../styles/global.css';

const zeroPad = (num) => num >= 10 ? num : '0' + num;

const formatTime = (date) =>
    [ date.getHours(), date.getMinutes() ]
    .map(zeroPad)
    .join(':');

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: formatTime(new Date())
        };

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 100);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        const newTime = formatTime(new Date());
        
        if (newTime !== this.state.time) {
            this.setState({ time: newTime });
        }
    }

    render() {
        return (
            <div>
                <Clock time={this.state.time} />
                <ShopList shops={this.props.shops} day="Monday" time={this.state.time} />
            </div>
        );
    }
}
