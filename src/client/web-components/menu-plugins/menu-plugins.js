// Import the LitElement base class and html helper function
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import { MenuPluginsTCComponent } from './menu-plugins-tc-component';
import bulmaStyle from '@granite-elements/granite-lit-bulma/granite-lit-bulma';
import { LitElement, html, css } from 'lit-element';
import Fontawesome from 'lit-fontawesome';

// Extend the LitElement base class
class MenuPlugins extends LitElement {
    static get properties() {
        return {};
    }

    static get styles() {
        return [
            Fontawesome,
            bulmaStyle,
            css`
                #closeButton {
                    display: none
                }
            `
        ];
    }

    constructor() {
        super();
        this.menuPluginsTcComponent;
        this.itemTitle;
    }

    firstUpdated() {
        super.firstUpdated();
        this.shadowRoot.getElementById('menuButton').addEventListener('click', () => {
            this.shadowRoot.getElementById('menuDropdown').classList.toggle('is-active');
        });
        this.menuPluginsTcComponent = new MenuPluginsTCComponent();
        this.menuPluginsTcComponent.init(
            pluginName => this._addItemToMenu('pluginsList', pluginName),
            () => this._showMenu()
        );
        this.shadowRoot.getElementById('closeButton').addEventListener('click', () => this.closeButtonClick());
    }

    _addItemToMenu(menuTagName, itemTitle) {
        const element = document.createElement('a');

        element.className = 'dropdown-item';
        element.innerHTML = itemTitle;
        element.addEventListener('click', () => this.menuItemClick(itemTitle));

        this.shadowRoot.getElementById(menuTagName).appendChild(element);
    }

    menuItemClick(itemTitle) {
        this.itemTitle = itemTitle;
        this._showCloseButton();
        this.menuPluginsTcComponent.startPlugin(this.itemTitle);
    }

    closeButtonClick() {
        this.menuPluginsTcComponent.endPlugin(this.itemTitle);
        this._showMenu();
    }

    _showMenu() {
        this.shadowRoot.getElementById('closeButton').style.display = 'none';
        this.shadowRoot.getElementById('menuDropdown').style.display = 'inline-flex';
    }

    _showCloseButton() {
        this.shadowRoot.getElementById('menuDropdown').classList.toggle('is-active');
        this.shadowRoot.getElementById('menuDropdown').style.display = 'none';
        this.shadowRoot.getElementById('closeButton').style.display = 'inline-flex';
    }

    render() {
        return html`
            <button id="closeButton" class="button is-right">Fermer</button>
            <div id="menuDropdown" class="dropdown is-right">
                <div class="dropdown-trigger">
                    <button id="menuButton" class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span class="is-hidden-tablet"><i class="fas fa-cube" aria-hidden="true"></i></span>
                        <span class="is-hidden-mobile">Plugins <i class="fas fa-cube" aria-hidden="true"></i></span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content" id="pluginsList"></div>
                </div>
            </div>
        `;
    }
}
// Register the new element with the browser.
customElements.define('tc-menu-plugins', MenuPlugins);
