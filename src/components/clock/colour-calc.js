import defaultConfig from '../../config/color-calc-defaults.json';

const MINUTE_HOUR_UNIT_LENGTH = 60;
const MAX_RGB_VAL = 256;
const YEAR_LONG_COUNT_MULTIPLIER = 0.532;

class ColorCalculator {
    constructor() {
        this.defaultConfig = defaultConfig;
    }

    now(opts = this.defaultConfig) {
        return this.at(new Date(), opts);
    }

    at(date = new Date(), opts = this.defaultConfig) {
        var color;
        if (opts.unique.enabled) {
            color = this._genUniqueColorYear(date, opts.unique);
        }
        else {
            color = this._genSimpleColor(date, opts.simple);
        }
        return {
            date,
            color
        }
    }
    
    _genSimpleColor(date, config = this.defaultConfig.simple) {
        let hour = date.getHours();
        let minute = date.getMinutes();
        let seconds = date.getSeconds();
        let mode = config.mode === "dark";

        return {
            red: mode ? hour : Math.floor(hour / 24 * MAX_RGB_VAL),
            green: mode ? minute : Math.floor(minute / MINUTE_HOUR_UNIT_LENGTH * MAX_RGB_VAL),
            blue: mode ? seconds : Math.floor(seconds / MINUTE_HOUR_UNIT_LENGTH * MAX_RGB_VAL)
        };
    }

    _genUniqueColorYear(date) {
        //Create a date for midnight at the start of the year passed in to the function.
        var startOfYearDateObj = new Date(date.getFullYear(), 0, 1, 0, 0, 0);
        //Calc num seconds elapsed since the start of the current year to the current datetime
        var seconds = (date.getTime() - startOfYearDateObj.getTime()) / 1000;

        let red;
        let green;
        let blue;
        seconds = seconds * YEAR_LONG_COUNT_MULTIPLIER;
        seconds = seconds / MAX_RGB_VAL;
        blue = Math.floor(MAX_RGB_VAL * (seconds - Math.floor(seconds)));
        seconds = seconds / MAX_RGB_VAL;
        green = Math.floor(MAX_RGB_VAL * (seconds - Math.floor(seconds)));
        red = Math.floor(seconds);

        return {
            red,
            green,
            blue
        }
    }
}

export default new ColorCalculator();