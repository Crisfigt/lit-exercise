import { LitElement, html, css } from 'lit';
import './cards-custom'
import './favoritos'

export class HomePage extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                font-family: Arial, Helvetica, sans-serif ;
                color:rgb(1,183,203);
            }

            .titulos{
                width:90%;
                margin:0px auto 70px;
            }

            .img-logo{
                width:30%;
                min-width:400px;
            }

            .img-container{
                display:flex;
                justify-content:center;
                margin:0px auto;
            }

            h1{
                margin-top:100px;
            }

            favoritos-cards{
                width:90%;
                margin:0px auto
            }
        `
    ];

    async getCharacter(){
        const resp = await fetch('https://rickandmortyapi.com/api/character');
        const data = await resp.json()

        this.characters = data.results;

        
    }


    static get properties(){
        return {
            characters : {type : Array},
            favoritosIds : {type : Array}
        }
    }


    


    firstUpdated(){
        this.getCharacter();
    }

    

    updated(){
    
       console.log(this.characters);
            

    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('favoritos-updated', this.handleFavoritosUpdated.bind(this));
        // this.getCharacter();
    }


    constructor(){
        super();
        this.characters = [];
        this.favoritosIds = [];
        
    }

    handleFavoritosUpdated(event) {
        this.favoritosIds = event.detail.favoritosIds;
    }


    render() {
        return html`
        <div class='titulos'>
            <div class='img-container'>
                <img class='img-logo' src='../img/inicio-logo.png'>
            </div>
            <h1>Algunos personajes:</h1>
        </div>

        <div><cards-custom .characters = "${this.characters}" .favoritosIds="${this.favoritosIds}" ></cards-custom></div>
        <div><favoritos-cards .favoritosIds="${this.favoritosIds}" ></favoritos-cards></div>
        `;
    }
}
customElements.define('home-page', HomePage);
