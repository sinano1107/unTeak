import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromCore from '../store/reducers';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private store: Store<fromCore.State>) {
    console.log(this.store.select(fromCore.getSession));
  }

  ngOnInit() {
  }

}
