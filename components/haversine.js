export default (point1, point2) => {
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

