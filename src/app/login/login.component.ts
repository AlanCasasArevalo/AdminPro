import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { URL_SERVICES } from '../config/config';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberme: boolean = false;
  email: string;
  auth2: any;

  constructor(public router: Router, public _userServices: UserService) {}

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberme = true;
    }
  }

  login(form: NgForm) {

    if ( form.invalid ) {
      return;
    }

    const user = new User(null, form.value.email, form.value.password);

    this._userServices.login( user, form.value.rememberme )
      .subscribe( validationCorrect => this.router.navigate(['/dashboard']));
  }
}
