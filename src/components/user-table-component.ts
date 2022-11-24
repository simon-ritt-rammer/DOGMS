import {html, render} from "lit-html"

import store from "../model/store"
import { User } from "../model/user"
import userService from "../user-service"

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <table class="w3-table w3-striped w3-bordered">
        <thead>
            <tr>
            <th>Id</th><th>Name</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`
const rowTemplate = (user: User) => html`
    <td>${user.id}</td><td>${user.name}</td>
`
class UserTableComponent extends HTMLElement {
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
        .subscribe(model => this.render(model.users))
        userService.fetchUsers()
    }
    private render(users: User[]) {
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        users.forEach(user => {
            const row = body.insertRow()
            row.onclick = () => {
                const event = new CustomEvent("user-selected", {detail: {user}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(user), row)
        })
    }
}
customElements.define("user-table-component", UserTableComponent)