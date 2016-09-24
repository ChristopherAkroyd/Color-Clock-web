import ColorCalc  from './colour-calc.js'
import sampleConfig from '../../config/color-calc-defaults.json';
import './colour-clock.scss';


const refreshRate = 1000;

class ColorClock {

    constructor(clockElement, backgroundElement, clockConfig = sampleConfig) {
        this.backgroundElement = backgroundElement;
        this.clockElement = clockElement;
        this.config = clockConfig;
        this.interval = setInterval(this.clockCycle.bind(this), refreshRate);
    }

    clockCycle() {
        var clockData = ColorCalc.now(this.config);
        this._updateTime(clockData.date);
        this._updateBackgroundColor(clockData.color);
        this._updateColorSubtitle(clockData.color, true);
    }

    resetClockCycle() {
        clearInterval(this.interval);
        //Run a clock cycle to display any changes to config without having to wait for interval to expire.
        this.clockCycle();
        this.interval = setInterval(this.clockCycle.bind(this), refreshRate);
    }

    setConfig(newConfig) {
        this.config = Object.assign(this.config, newConfig);
        this.resetClockCycle();
    }

    _updateTime(date) {
        var timeElement = this.clockElement.querySelector('#time');
        timeElement.innerHTML = date.toLocaleTimeString();
    }

    _updateBackgroundColor(colorData) {
        this.backgroundElement.style.backgroundColor = `rgb(${colorData.red}, ${colorData.green}, ${colorData. blue})`;
    }

    _updateColorSubtitle(colorData, hex) {
        var colorSubtitle = this.clockElement.querySelector('#colour-subtitle');
        var colorString;
        if(hex) {
            colorString = `#${colorData.red.toString(16)}${colorData.green.toString(16)}${colorData.blue.toString(16)}`;
            colorString = colorString.toUpperCase();
        }
        else {
            colorString = `rgb(${colorData.red}, ${colorData.green}, ${colorData.blue})`
        }
        colorSubtitle.innerHTML = colorString;
    }

}

export default ColorClock;