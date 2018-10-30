import { Component, OnInit } from '@angular/core';
import { StoreService } from './redux/store.service';
import { TitleAction } from './redux/reducers/title.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title;
  todos = [];

  constructor(private store: StoreService) {
  }

  ngOnInit() {
    this.store.getState(s => s.title).subscribe((data) => this.title = data);
    this.store.getState(s => s.todos).subscribe(d => this.todos = d);
  }

  changeTitle(val: string) {
    var action: TitleAction = {
      type: 'CHANGE_TITLE',
      value: val
    }
    this.store.dispatch(action);
  }

  addTodo(val: string) {
    this.store.dispatch({type: 'ADD_TODO', value: val});
  }
}
