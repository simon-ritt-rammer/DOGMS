import { Person } from "./model/person"
import store from "./model/store"
import produce from "immer";

const url = "https://gist.githubusercontent.com/awadhawan18/54592d9ec5e7be1b39013cdd7e78dae4/raw/54a90fe99b8e821e273e1997f356d04308bdb232/Random-images.json"

class PersonService {
    async fetchPeople() {
        const response = await fetch(url)
        let model = store.getValue();
        let people: [Person] = await response.json()
        let nextState = produce(store.getValue(), draft => {
            draft.people = people
        })
        store.next(nextState)
    }
}

const personService = new PersonService()
export default personService