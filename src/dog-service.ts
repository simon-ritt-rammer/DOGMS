import { Dog } from "./model/dog"
import store from "./model/store"
import produce from "immer";

const url = "http://www1.lasalle.edu/~blum/c343wks/Dog/DogData.json"
// für bilder:  Request URL: http://www1.lasalle.edu/~blum/c343wks/Dog/boxer.jpg


class DogService {
    async fetchDogs() {
        const response = await fetch(url)
        let model = store.getValue();
        let dogs: [Dog] = await response.json()
        let nextState = produce(store.getValue(), draft => {
            draft.dogs = dogs
        })
        store.next(nextState)
    }
}

const dogService = new DogService()
export default dogService