import {html, render} from "lit-html"

import store from "../model/store"
import { Person } from "../model/person"
import personService from "../person-service"

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
const rowTemplate = (people: Person) => html`
    <td>${people.description}</td>
`

/* <td>${person.id}</td> (Ln 19, Col 5) */

class PeopleTableComponent extends HTMLElement {
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
        .subscribe(model => this.render(model.people))
        personService.fetchPeople()
    }
    private render(people: Person[]) {
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        people.forEach(person => {
            const row = body.insertRow()
            row.onclick = () => {
                const event = new CustomEvent("person-selected", {detail: {person}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(person), row)
        })
    }
}

customElements.define("people-table-component", PeopleTableComponent)