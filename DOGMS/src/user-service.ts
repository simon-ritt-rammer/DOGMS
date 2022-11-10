import { User } from "./model/user"
import store from "./model/store"
import produce from "immer";

const url = "https://jsonplaceholder.typicode.com/users"

class UserService {
    async fetchUsers() {
        const response = await fetch(url)
        let model = store.getValue();
        let users: [User] = await response.json()
        let nextState = produce(store.getValue(), draft => {
            draft.users = users
        })
        store.next(nextState)
    }
}

const userService = new UserService()
export default userService