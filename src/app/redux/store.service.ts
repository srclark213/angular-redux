import { Injectable } from '@angular/core';
import { createStore, Store, Reducer, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { TitleReducer } from './reducers/title.reducer';
import { TodoReducer } from './reducers/todo.reducer';
import { ErrorReducer } from './reducers/error.reducer';
import { TodoSaga } from './sagas/todo.sagas';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public store: Store;
  private data: BehaviorSubject<any>;

  public readonly storeObservable: Observable<any>;

  constructor(saga: TodoSaga) {
    console.log(saga);
    let reducer: Reducer = combineReducers({
      title: TitleReducer,
      todos: TodoReducer,
      error: ErrorReducer
    });

    let sagaMiddleware = createSagaMiddleware();

    this.store = createStore(reducer, applyMiddleware(sagaMiddleware));

    saga.runSagas(sagaMiddleware);
    
    this.data = new BehaviorSubject(this.store.getState());
    this.storeObservable = this.data.asObservable();

    this.store.subscribe(() => this.data.next(this.store.getState()));
  }

  getState(query: (state) => any): Observable<any> {
    return this.storeObservable.pipe(map(query));
  }

  dispatch(action: any) {
    this.store.dispatch(action);
  }
}