import * as timeUtils from './timeUtils';

const UPDATE_MS = 100;

export default class Timer {
    constructor(onTimeChanged) {
        this.onTimeChanged = onTimeChanged;

        this.date = timeUtils.getDate();
    }

    get time() {
        return timeUtils.formatTime(this.date);
    }

    get day() {
        return timeUtils.formatDay(this.date);
    }

    start() {
        this.timer = setInterval(this.tick.bind(this), UPDATE_MS);
    }

    stop() {
        clearInterval(this.timer);
    }

    tick() {
        const newDate = timeUtils.getDate();

        if (timeUtils.timeDifferent(this.date, newDate)) {
            this.date = newDate;

            if (this.onTimeChanged) {
                this.onTimeChanged();
            }
        }
    }
}
