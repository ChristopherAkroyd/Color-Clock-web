import sampleConfig from './config/color-calc-defaults.json';
import ClockController from './components/clock/clock-controller.js';
import SidebarController from './components/sidebar/sidebar-controller.js';
import SwitchController from './components/switch/switch-controller.js';

function clockInit() {
    var background  = document.querySelector('.color-background');
    var clock = document.querySelector('.time-color-display');
    return new ClockController(clock, background, sampleConfig);
}

function sidebarInit() {
    var opener = document.querySelector('.settings-toggle');
    var sidebarNode = document.querySelector('.sidebar');
    var sidebarController = new SidebarController(sidebarNode);
    opener.addEventListener('click', sidebarController.toggle.bind(sidebarController));
    return sidebarController;
}

function initSwitches(clockController) {
    var clockModeSwitch = document.querySelector('.clock-mode');
    var simpleTypeSwitch = document.querySelector('.clock-type');

    var simpleSwitch = new SwitchController(simpleTypeSwitch, (event) => {
        sampleConfig.simple.mode = event ? 'dark' : 'light';
        clockController.setConfig(sampleConfig);
    }, true, sampleConfig.simple.enabled);

    var clockSwitch = new SwitchController(clockModeSwitch, [(event) => {
        sampleConfig.simple.enabled = !!event;
        sampleConfig.unique.enabled = event;

        simpleSwitch.toggleSwitchDisplay();

        clockController.setConfig(sampleConfig);
    }], true, true);
}



document.addEventListener("DOMContentLoaded", () => {
    var clockController = clockInit();
    sidebarInit();
    initSwitches(clockController);
});
