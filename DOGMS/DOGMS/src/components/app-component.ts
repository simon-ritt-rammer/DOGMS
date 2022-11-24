import {html, render} from "lit-html"
import "./user-table-component"
import "./user-component"

const appComponentTemplate = html`
    <user-table-component id="table"></user-table-component>
    <user-component id="user"></user-component>
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
        const userTableComponent = this.shadowRoot.getElementById("table")
        const userComponent: HTMLElement = this.shadowRoot.querySelector("user-component")
        userTableComponent.addEventListener("user-selected", (e: CustomEvent) => {
            const user = e.detail.user
            console.log("user selected", user)
            userComponent.setAttribute("id", user.id)
            userTableComponent.style.display = "none"
            userComponent.style.display = "block"
        })
    }
}

customElements.define("app-component", AppComponent)