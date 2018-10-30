import { call, put, takeEvery } from 'redux-saga/effects';
import { TodoService } from 'src/app/todo.service';
import { SagaMiddleware } from 'redux-saga';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TodoSaga {
    constructor(private todoService: TodoService) { }

    private * addTodo(action) {
        try {
            const result = yield call(this.todoService.createTodo, action.value);
            yield put({type: 'ADD_TODO_SUCCEEDED', payload: result});
        } catch (e) {
            yield put({type: 'ADD_TODO_ERROR', message: e });
        }
    }
    
    public * AddTodoSaga() {
        yield takeEvery('ADD_TODO', this.addTodo.bind(this));
    }

    public runSagas(sagaMiddleware: SagaMiddleware<{}>) {
        sagaMiddleware.run(this.AddTodoSaga.bind(this));
    }
}