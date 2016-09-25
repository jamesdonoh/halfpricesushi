import React from 'react';
import Shop from './Shop';
import haversine from './haversine';

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

        const compareClosingTimeAndDistance = (a, b) =>
            compareClosingTime(a, b) || compareDistance(a, b);

        const addDistance = (shop) => {
            if (location) {
                shop.distance = haversine(location, shop.location);
            }

            return shop;
        };

        const createShop = (shop) => (
            <Shop key={shop.id} name={shop.name} closes={shop.times[day].closes} currentTime="16:35" distance={shop.distance} location={shop.location} />
        );

        const shops = this.props.shops
            .map(addDistance)
            .filter(isOpen)
            .sort(compareClosingTimeAndDistance)
            .map(createShop);

        return (
            <table className="shoplist">
                <tbody>
                    {shops}
                </tbody>
            </table>
        );
    }
}
