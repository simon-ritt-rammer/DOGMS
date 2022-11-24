import { BehaviorSubject } from "rxjs"
import {User} from "./user"

export interface Model {
    readonly users: User[]
}

const initialState: Model = {
    users:[]
}

const store = new BehaviorSubject<Model>(initialState);

export default store