import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-pagedidnotfound',
  templateUrl: './pagedidnotfound.component.html',
  styles: []
})
export class PagedidnotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
