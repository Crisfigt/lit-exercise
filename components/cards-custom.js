import { LitElement, html, css } from 'lit';


export class CardsCustom extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                width: 100%;
                margin : 0px auto;
                display: flex;
                justify-content: center;
                flex-direction: row;
                font-family: Arial, Helvetica, sans-serif ;
                font-weight:bold;
                color:white;
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
                cursor:pointer;
                transition: transform 0.3s ease;
            }

            .contenedor-card:hover{
                transform: scale(1.1);
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
            characters : {type : Object},
            favoritosIds : {type : Array}
        }
    }

    constructor(){
        super();
        this.characters = {}
        this.favoritosIds = []
    }
    
    fav(id){
        if (!this.favoritosIds.includes(id)) {
            this.favoritosIds = [...this.favoritosIds, id];
            this.dispatchEvent(new CustomEvent('favoritos-updated', {
                detail: { favoritosIds: this.favoritosIds },
                bubbles: true,
                composed: true
            }));
            console.log(this.favoritosIds);
        }
    }
    


    updated(){
        // console.log('Ha cambiado la lista desde cards customs ' + this.favoritosIds);
    }

    navigate(characterId) {
        window.history.pushState({}, '', `/CharacterCard/${characterId}`);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }


    render() {
        return html`
        
        <div class = 'cards-container'>
            ${this.characters.map((char) => html` 
            
            <div class="contenedor-card">
                    <div class='cards' @click = '${() => this.navigate(char.id)}' >
                        <img src='${char.image}'>
                          <div>${char.name}</div> 
                    </div>  
                    <button @click = '${()=> this.fav(char.id)}' >Agregar a favoritos</button>
                </div>
            
              
              `)}

        </div>

        `;
    }
}
customElements.define('cards-custom', CardsCustom);
