/*
 * To do:
 * - support when user's local timezone offset != timezone offset in UK
 * - rewrite using Date.prototype.toLocaleTimeString?
 */

const DAYS_OF_WEEK = 'sun_mon_tue_wed_thu_fri_sat'.split('_');

const zeroPad = (num) => num < 10 ? '0' + num : num.toString();

const formatDay = (date) => DAYS_OF_WEEK[date.getDay()];

const formatTime = (date) => zeroPad(date.getHours()) + ':' + zeroPad(date.getMinutes());

const timeDifferent = (a, b) =>
    !(a.getHours() === b.getHours() && a.getMinutes() === b.getMinutes());

const getDate = () => new Date();

export { formatDay, formatTime, timeDifferent, getDate };
