import { Reducer } from "redux";

// probably wouldn't actually want a reducer like this, might want an error saga that processes all errors and toasts them or whatever
export const ErrorReducer: Reducer = (state = '', action) => {
    switch(action.type) {
        case 'ADD_TODO_ERROR':
            return action.message;
        default:
            return state;
    }
}