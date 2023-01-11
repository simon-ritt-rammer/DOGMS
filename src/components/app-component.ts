import {html, render} from "lit-html"
import "./dog-table-component"
import "./dog-component"

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
        dogComponent.style.display = "none"
        dogTableComponent.addEventListener("dog-selected", (e: CustomEvent) => {
            const dog = e.detail.dog
            dogTableComponent.style.display = "none"
            console.log("dog selected", dog.dogId)
            dogComponent.setAttribute("id", dog.dogId)
            dogComponent.style.display = "block"
        })
    }
}

customElements.define("app-component", AppComponent)