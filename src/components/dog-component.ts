import { html, render } from "lit-html"
import { Dog } from "../model/dog"
import store from "../model/store"

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <table class="w3-table w3-striped w3-bordered">
        <thead>
            <tr>
            <th>Description</th><th>Colors</th><th>Height</th><th>Group</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`
const rowTemplate = (dog: Dog) => html`
    <td>${dog.dogDesc}</td>
    <td>${dog.dogColors}</td>
    <td>${dog.dogHeight}</td>
    <td>${dog.dogGroup}</td>
`

class DogComponent extends HTMLElement {
    static get observedAttributes() {
        return ["id"]
    }

    private root: ShadowRoot
    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }

    attributeChangedCallback(name: string, oldValue: string, value: string) {
        console.log("TODO: display dog", value)
        store
        .subscribe(model => this.render(model.dogs[parseInt(value)]))
    }

    connectedCallback() {
        console.log("dog connected: ", store.subscribe(model => model.dogs.entries))
    }

    private render(dog: Dog) {
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        const row = body.insertRow()
        render(rowTemplate(dog), row)
    }
}

customElements.define("dog-component", DogComponent)
