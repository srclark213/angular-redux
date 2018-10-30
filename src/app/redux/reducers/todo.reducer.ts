import { Reducer } from "redux";

export const TodoReducer: Reducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO_SUCCEEDED':
            return [...state, action.payload];
        default:
            return state;
    }
}