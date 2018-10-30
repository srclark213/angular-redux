import { Reducer } from "redux";

export const TodoReducer: Reducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, {text: action.value, completed: false}];
        default:
            return state;
    }
}