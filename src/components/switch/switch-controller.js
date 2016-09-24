import './switch.scss';

const switchContainerClass = 'switch-container';
const switchClassShow = 'switch-show';

class SwitchController {

    constructor(switchContainer, onSwitchCallback, switchOn, switchDisplayed) {
        this.switchContainer = switchContainer;
        this.switchInput = switchContainer.querySelector('.slider-checkbox');
        this.switchDisplayed = !!switchDisplayed;
        this.switchInput.checked = !!switchOn;
        
        this.switchDisplayed ? this.showSwitch() : this.hideSwitch();
        this._attachToggle(onSwitchCallback);
    }

    _attachToggle(callback) {

        if(typeof callback === "function") {
            this.switchInput.onchange = () => {
                callback(this.getSwitchState());
            };
        }
        else if(Array.isArray(callback)) {
            callback.forEach((call) => {
                this.switchInput.onchange = () => {
                    call(this.getSwitchState());
                }
            });
        }
    }

    toggleSwitchDisplay() {
        this.switchDisplayed = !this.switchDisplayed;
        this.switchDisplayed ? this.showSwitch() : this.hideSwitch();
        console.log('test');
    }

    showSwitch() {
        this.switchContainer.className = switchContainerClass + ' ' + switchClassShow;
    }

    hideSwitch() {
        this.switchContainer.className = switchContainerClass;
    }

    getSwitchState() {
        return this.switchInput.checked;
    }
    
}

export default SwitchController;