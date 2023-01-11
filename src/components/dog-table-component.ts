import {html, render} from "lit-html"

import store from "../model/store"
import { Dog } from "../model/dog"
import dogService from "../dog-service"

const tableTemplate = html`
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<div>
    <input id="search-input" type="text" placeholder="Enter dog name">
    <button id="search-button">Search</button>
</div>
<table class="w3-table w3-striped w3-bordered">
    <thead>
        <tr>
        <th>Name</th><th>Photo</th>
        </tr>
    </thead>
    <tbody id="table-body"></tbody>
</table>
`
const rowTemplate = (dog: Dog) => html`
    <td>${dog.dogName}</td>
    <td><img src="http://www1.lasalle.edu/~blum/c343wks/Dog/${dog.dogImage}" alt="${dog.dogImage}">
`

/* <td>${dog.id}</td> (Ln 19, Col 5) */

class DogTableComponent extends HTMLElement {
    private root: ShadowRoot
    private filteredDogs: Dog[] = []
    private originalDogs: Dog[] = []
    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }

    async connectedCallback() {
        store.subscribe(model => {
            this.render(model.dogs)
            this.filteredDogs = model.dogs
            this.originalDogs = model.dogs
        })
        //store
        /*
        .map()
        .distinctUntilChanged()
        */
        //.subscribe(model => this.render(model.dogs))
        dogService.fetchDogs()
        const searchButton = this.root.querySelector("#search-button")
        searchButton.addEventListener("click", () => {
            const searchInput = this.root.querySelector("#search-input") as HTMLInputElement
            const searchTerm = searchInput.value.toLowerCase()
            if (searchInput.value === "doge") {
                const newTab = window.open("https://www.exodus.com/img/news/content/2022/11/flat-550x550-075-f.u1.jpg", "_blank");
            } else {
                this.filteredDogs = this.originalDogs.filter(dog => dog.dogName.toLowerCase().includes(searchTerm))
                this.render(this.filteredDogs)
            }
        })
    }

    private render(dogs: Dog[]) {
        /*render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        dogs.forEach(dog => {
            const row = body.insertRow()
            row.onclick = () => {
                console.log('dog image: ', dog.dogImage)
                const event = new CustomEvent("dog-selected", {detail: {dog}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(dog), row)
        })*/
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        body.innerHTML = ""
        dogs.forEach(dog => {
            const row = body.insertRow()
            // ...
            row.onclick = () => {
                console.log('dog image: ', dog.dogImage)
                const event = new CustomEvent("dog-selected", {detail: {dog}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(dog), row)
        })
    }
}

customElements.define("dog-table-component", DogTableComponent)