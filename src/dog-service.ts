import { Dog } from "./model/dog"
import store from "./model/store"
import produce from "immer";

const url = "https://api.npoint.io/c147bdce7a9ba8ebfa35"
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