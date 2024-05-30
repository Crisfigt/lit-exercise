import { LitElement, html, css } from 'lit';

export class CharacterCard extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                width : 80% ;
                margin:20px auto;
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                font-family: Arial, Helvetica, sans-serif ;
                color:rgb(1,183,203);
            }
            h1{
                
                font-size:20px;
                
            }
            img{
                border-radius:50%;
                box-shadow:0px 0px 10px 10px rgba(173,223,55, 0.5);
            }

            button{
                width:150px;
                height:30px;
                font-size:20px;
                background-color:rgb(1,183,203);
                color:white;
                border:none;
                border-radius:16px;
                text-align:center;
                cursor:pointer;
            }
        `
    ];

    static get properties(){
        return {
            id : {type : String},
            character : {type : Object}
        }
    }

    constructor() {
        super();
        this.id = null;
        this.character = null;
    }

    getCharacterId() {
        const urlParts = window.location.pathname.split('/');
        return urlParts[urlParts.length - 1];
    }


    connectedCallback() {
        super.connectedCallback();
        this.id = this.getCharacterId();
        this.getCharacter(this.id);
    }

    async getCharacter(id){
        const resp = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const characterData = await resp.json();
        this.character = characterData;
    }


    updated(){
        console.log(this.character);
    }

    regresar(){
        window.history.pushState({}, '', '/');
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }



    render() {
        return html`
        <div><img src='${this.character.image}'></div>
        <h1>${this.character.name}</h1>
        <p>Genero : ${this.character.gender}</p>
        <p>Especie : ${this.character.species}</p>
        <p>Estatus : ${this.character.status}</p>
        <p>Aparece en ${this.character.episode.length} capitulos</p>
        <button @click = '${this.regresar}'>Regresar</button>
        `;
    }
}
customElements.define('character-card', CharacterCard);
