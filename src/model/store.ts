import { BehaviorSubject } from "rxjs"
import { Dog } from "./dog"

export interface Model {
    readonly dogs: Dog[]
}

const initialState: Model = {
    dogs:[]
}

const store = new BehaviorSubject<Model>(initialState);

export default store