import { html, render } from "lit-html"

const template = html`
    <div>User: Max Mustermann</div>
`

class UserComponent extends HTMLElement {
    static get observedAttributes() {
        return ["id"]
    }
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    attributeChangedCallback(name: string, oldValue: string, value: string) {
        console.log("TODO: display user", value)
    }
    connectedCallback() {
        console.log("user connected")
        this.render()
    }
    private render() {
        render(template, this.shadowRoot)
    }


}

customElements.define("user-component", UserComponent)
