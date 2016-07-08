import React from 'react';

import ShopList from './ShopList';
import Clock from './Clock';
import '../styles/global.css';

const DAYS_OF_WEEK = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];

const dayOfWeek = (date) => DAYS_OF_WEEK[date.getDay()];

const zeroPad = (num) => num >= 10 ? num : '0' + num;

const formatTime = (date) =>
    zeroPad(date.getHours()) + ':' + zeroPad(date.getMinutes());

export default class App extends React.Component {
    constructor(props) {
        super(props);

        const date = new Date();

        this.state = {
            day: dayOfWeek(date),
            time: formatTime(date)
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
        const newDate = new Date();
        const newTime = formatTime(newDate);
        
        if (newTime !== this.state.time) {
            const newDay = dayOfWeek(newDate);

            this.setState({
                day: newDay,
                time: newTime
            });
        }
    }

    render() {
        return (
            <div>
                <Clock time={this.state.time} />
                <ShopList shops={this.props.shops} day={this.state.day} time={this.state.time} />
            </div>
        );
    }
}
