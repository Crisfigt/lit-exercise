import { LitElement, html, css } from 'lit';

export class Favoritos extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            h1{
                margin-top:70px; 
            }
            
            .cards-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 5px 10px;
            /* padding: 0px 100px; */
            width: 100%;
        }

            .contenedor-card{
                margin: 0px 30px 25px;
                display: inline-block;
                width: 300px;
                height: 300px;
                border-radius:16px;
                border:0.5px solid black;
                background-color:rgb(1,183,203);
                text-align:center;
                box-shadow:0px 0px 10px 10px rgba(173,223,55, 0.5);
                
            
            }

            

            img{
                border-radius:16px;
                width:80%;
                margin-top:10px;
            }
        `
    ];

    static get properties(){
        return {
            favoritosIds : {type : Array},
            favoritos : {type : Array},
        }
    }

    async getFav(favoritosIds){
        if (favoritosIds.length === 0) {
            this.favoritos = [];
            return;
        }
        const ids = favoritosIds.join(',');
        const resp = await fetch(`https://rickandmortyapi.com/api/character/${ids}`);
        const favoritos = await resp.json();
        this.favoritos = Array.isArray(favoritos) ? favoritos : [favoritos];
        console.log(favoritosIds);
    }

    updated(changedProperties) {
        if (changedProperties.has('favoritosIds')) {
            this.getFav(this.favoritosIds);
        }
    }

    constructor(){
        super();
        this.favoritosIds = [];
        this.favoritos = [];
    }

    eliminar(id) {
        if (this.favoritosIds.includes(id)) {
            this.favoritosIds = this.favoritosIds.filter(favId => favId !== id);
            this.dispatchEvent(new CustomEvent('favoritos-updated', {
                detail: { favoritosIds: this.favoritosIds },
                bubbles: true,
                composed: true
            }));
        }
    }


    render() {
        return html`
        <h1>Favoritos:</h1>
        ${this.favoritosIds.length > 0 ? html `
        
        <div class= "cards-container">
            ${this.favoritos.map( (char) => html `
            
            
            <div class="contenedor-card">
                        <div class='cards' >
                            <img src='${char.image}'>
                              <div>${char.name}</div> 
                        </div>  
                        <button @click=${() => this.eliminar(char.id)} >Eliminar de favoritos</button>
                    </div>
            
            
            `)}
        </div>

        

        ` : html `
        <h3>No hay favoritos</h3>
        `}
        `;
    }
}
customElements.define('favoritos-cards', Favoritos);
