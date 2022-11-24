import { BehaviorSubject } from "rxjs"
import { Bixxn } from "./bixxn"

export interface Model {
    readonly bixxn: Bixxn[]
}

const initialState: Model = {
    bixxn:[]
}

const store = new BehaviorSubject<Model>(initialState);

export default store