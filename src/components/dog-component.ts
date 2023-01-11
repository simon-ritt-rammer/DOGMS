import { html, render } from "lit-html"
import { Dog } from "../model/dog"

class UserComponent extends HTMLElement {
    private dog: Dog
    static get observedAttributes() {
        return ["id"]
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    attributeChangedCallback(name: string, oldValue: string, value: string) {
        

    }
    connectedCallback() {
        console.log("dog connected")
        this.addEventListener("dog-selected", (event: CustomEvent<{dog: Dog}>) => {
            this.dog = event.detail.dog
            console.log(`Selected dog ID: ${this.dog.dogName}`)
        })
    }
}

customElements.define("dog-component", UserComponent)
