import { Injectable } from '@angular/core';
import { createStore, Store, Reducer } from 'redux';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public store: Store;
  private data: BehaviorSubject<any> = new BehaviorSubject(initialState);

  public readonly storeObservable: Observable<any> = this.data.asObservable();

  constructor() {
    let reducer: Reducer = (state = initialState, action) => {
      if(action.type == 'CHANGE_TITLE') {
        return Object.assign({}, state, {title: action.value});
      }

      return state;
    };

    this.store = createStore(reducer);

    this.store.subscribe(() => this.data.next(this.store.getState()));
  }

  getTitle() : Observable<any> {
    return this.storeObservable.pipe(map(s => s.title));
  }

  getState(query: (state) => any): Observable<any> {
    return this.storeObservable.pipe(map(query));
  }

  dispatch(action: any) {
    this.store.dispatch(action);
  }
}

const initialState = {
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  title: 'TEST'
}