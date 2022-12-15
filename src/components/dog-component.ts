import { html, render } from "lit-html"

class UserComponent extends HTMLElement {
    static get observedAttributes() {
        return ["id"]
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    attributeChangedCallback(name: string, oldValue: string, value: string) {
        console.log("TODO: display dog", value)
    }
    connectedCallback() {
        console.log("dog connected")
        
    }
}

customElements.define("dog-component", UserComponent)
