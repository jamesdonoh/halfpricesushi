import React from 'react';

export default class Clock extends React.Component {
    render() {
        return (
            <div className="clock">
                {this.props.time}
            </div>
        );
    }
}
