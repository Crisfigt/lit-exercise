import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './home-page'
import './character-card'



export class MyApp extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                width:90%;
                margin:0px auto;
            }
        `
    ];

    firstUpdated() {
        const router = new Router(this.shadowRoot.querySelector('#router'));
        router.setRoutes([
            { path: '/', component: 'home-page' },
            { path: '/CharacterCard/:id', component: 'character-card' },
        ]);
    }

    render() {
        return html`
        <div id="router"></div>
        `;
    }
}
customElements.define('my-app', MyApp);
