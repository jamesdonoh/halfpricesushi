import React from 'react';

export default class Clock extends React.Component {
    render() {
        return (
            <div className="clock">
                Current time: {this.props.time}
            </div>
        );
    }
}
