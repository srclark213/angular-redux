import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-redux';

  constructor(private store: StoreService) {
  }

  ngOnInit() {
    this.store.getState(s => s.title).subscribe((data) => this.title = data);
  }

  changeTitle() {
    this.store.dispatch({type: 'CHANGE_TITLE', value: 'changed'});
  }
}
