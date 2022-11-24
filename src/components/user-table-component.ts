import {html, render} from "lit-html"

import store from "../model/store"
import { Bixxn } from "../model/bixxn"
import bixxnService from "../bixxn-service"

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
const rowTemplate = (bixxn: Bixxn) => html`
    <td>${bixxn.description}</td>
`

/* <td>${bixxn.id}</td> (Ln 19, Col 5) */

class BixxnTableComponent extends HTMLElement {
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
        .subscribe(model => this.render(model.bixxn))
        bixxnService.fetchBixxn()
    }
    private render(bixxn: Bixxn[]) {
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        bixxn.forEach(b => {
            const row = body.insertRow()
            row.onclick = () => {
                const event = new CustomEvent("bixxn-selected", {detail: {b}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(b), row)
        })
    }
}

customElements.define("bixxn-table-component", BixxnTableComponent)