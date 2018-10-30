import { call, put } from 'redux-saga/effects';

function* addTodo(action) {
    try {
        const result = yield call(createTodo, action.value);
        yield put({type: "ADD_TODO_SUCCEEDED", payload: result});
    } catch (e) {
        yield put({type: "ADD_TODO_FAILED", message: e.message })
    }
}

function createTodo(value) {
    return {text: value, completed: false};
}