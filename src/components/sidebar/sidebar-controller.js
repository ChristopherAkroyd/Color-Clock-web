import './sidebar.scss';

const sidebarClass = 'sidebar';
const openClass = ' side-open';

class SidebarController {

    constructor(sidebarDOMNode) {
        this.sidebar = sidebarDOMNode;
        this.sideOpen = false;
    }

    toggle() {
        this.sideOpen = !this.sideOpen;
        this.sideOpen ? this._open() : this._close();
    }

    _open() {
        this.sidebar.className = sidebarClass + openClass;
    }

    _close() {
        this.sidebar.className = sidebarClass;
    }
    
}

export default SidebarController;