import { Dog } from "./model/dog"
import store from "./model/store"
import produce from "immer";

const url = "https://api.npoint.io/671c6457bc93c3844c87"
// für bilder:  Request URL: http://www1.lasalle.edu/~blum/c343wks/Dog/boxer.jpg

class DogService {
    async fetchDogs() {
        console.log('resonse', await fetch(url))
        const response = await fetch(url)
        let dogs = await response.json() as Dog[]
        let nextState = produce(store.getValue(), draft => {
            draft.dogs = dogs
        })
        store.next(nextState)
    }
}

const dogService = new DogService()
export default dogService