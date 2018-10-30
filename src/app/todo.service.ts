import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  createTodo(value: string) {
    return {text: value, completed: false};
  }
}
