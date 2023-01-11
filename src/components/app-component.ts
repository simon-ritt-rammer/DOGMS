import {html, render} from "lit-html"
import "./dog-table-component"
import "./dog-component"
import { Dog } from "../model/dog"

const appComponentTemplate = html`
    <dog-table-component id="table"></dog-table-component>
    <dog-component id="dog"></dog-component>
`

class AppComponent extends HTMLElement {
    
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        console.log("connected")
        this.render()

    }
    render() {
        render(appComponentTemplate, this.shadowRoot)
        const dogTableComponent = this.shadowRoot.getElementById("table")
        const dogComponent: HTMLElement = this.shadowRoot.querySelector("dog-component")
        dogTableComponent.addEventListener("dog-selected", (e: CustomEvent) => {
            const dog = e.detail.dog
            console.log("dog selected", dog)
            dogComponent.setAttribute("id", dog.id)
            dogTableComponent.style.display = "none"
            dogComponent.style.display = "block"
        })

        
    }
}

customElements.define("app-component", AppComponent)