import {html, render} from "lit-html"

import store from "../model/store"
import { Dog } from "../model/dog"
import dogService from "../dog-service"

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <table class="w3-table w3-striped w3-bordered">
        <thead>
            <tr>
            <th>Id</th><th>Photo</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`
const rowTemplate = (dog: Dog) => html`
    <td>${dog.dogName}</td>
    <td><img src="http://www1.lasalle.edu/~blum/c343wks/Dog/${dog.dogImage}" alt="${dog.dogImage}">
`

/* <td>${dog.id}</td> (Ln 19, Col 5) */

class DogTableComponent extends HTMLElement {
    private root: ShadowRoot
    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }
    async connectedCallback() {
        store
        /*
        .map()
        .distinctUntilChanged()
        */
        .subscribe(model => this.render(model.dogs))
        dogService.fetchDogs()
    }
    private render(dogs: Dog[]) {
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        dogs.forEach(dog => {
            const row = body.insertRow()
            row.onclick = () => {
                const event = new CustomEvent("dog-selected", {detail: {dog}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(dog), row)
        })
    }
}

customElements.define("dog-table-component", DogTableComponent)