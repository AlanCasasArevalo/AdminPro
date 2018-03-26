import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-pagedidnotfound',
  templateUrl: './pagedidnotfound.component.html',
  styleUrls: ['./pagedidnotfound.component.css']
})
export class PagedidnotfoundComponent implements OnInit {


  getDateOfYear: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
