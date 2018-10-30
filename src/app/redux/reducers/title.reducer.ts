import { Reducer } from "redux";

export const TitleReducer: Reducer<string, TitleAction> = (state: string = 'default', action: TitleAction) => {
    switch(action.type) {
        case 'CHANGE_TITLE': 
            return action.value;
        default:
            return state;
    }
}

// example of how we can type actions
export interface TitleAction {
    type: 'CHANGE_TITLE' | 'ANOTHER_TITLE_ACTION'; // we can limit the actions to specific strings this way, not sure if reasonable to do
    value: string;
}