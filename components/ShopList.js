import React from 'react';

import Shop from './Shop';

const parseLocation = ({lat, long}) => ({lat: parseFloat(lat), long: parseFloat(long)});

const haversineDistance = (point1, point2) => {
    if (!(point1 && point2)) {
        return null;
    }

    // Adapted from http://www.movable-type.co.uk/scripts/latlong.html
    const radians = (degrees) => degrees * Math.PI / 180;

    var R = 6371e3; // metres
    var φ1 = radians(point1.lat);
    var φ2 = radians(point2.lat);
    var Δφ = radians(point2.lat - point1.lat);
    var Δλ = radians(point2.long - point1.long);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return Math.round(R * c);
};

export default class ShopList extends React.Component {
    render() {
        const time = this.props.time;
        const day = this.props.day;
        const location = this.props.location;

        const isOpen = (shop) => shop.times[day] && shop.times[day].closes > time;

        const compareClosingTime = (a, b) =>
            a.times[day].closes < b.times[day].closes ? -1 :
            a.times[day].closes > b.times[day].closes ? 1 : 0;

        const compareDistance = (a, b) =>
            a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;

        const addDistance = (shop) => {
            if (location) {
                shop.distance = haversineDistance(location, shop.location);
            }

            return shop;
        };

        const createShop = (shop) => (
            <Shop key={shop.id} name={shop.name} closes={shop.times[day].closes} currentTime={time} distance={shop.distance} />
        );

        const shops = this.props.shops
            .map(addDistance)
            .filter(isOpen)
//            .sort(compareClosingTime)
            .sort(compareDistance)
            .map(createShop);

        return (
            <div>
                {shops}
            </div>
        );
    }
}
