import { BehaviorSubject } from "rxjs"
import { Person } from "./person"

export interface Model {
    readonly people: Person[]
}

const initialState: Model = {
    people:[]
}

const store = new BehaviorSubject<Model>(initialState);

export default store