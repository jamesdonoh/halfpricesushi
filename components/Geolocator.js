export default class Geolocator {
    constructor(locationChanged) {
        this.locationChanged = locationChanged;

        if ('geolocation' in navigator) {
            
        } else {
            // TODO handle geo not available
        }

        navigator.geolocation.getCurrentPosition(
            this.gotPosition.bind(this),
            this.positionError.bind(this)
        );
    }

    get location() {
        return {
            lat: this.position.coords.latitude,
            long: this.position.coords.longitude
        };
    }

    gotPosition(position) {
        this.position = position;

        if (this.locationChanged) {
            this.locationChanged();
        }
    }

    positionError(err) {
        // TODO handle geo permission refused
        console.error(err);
    }
}
