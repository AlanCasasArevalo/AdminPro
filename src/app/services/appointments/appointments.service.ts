import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { URL_SERVICES } from '../../config/config';

@Injectable()
export class AppointmentsService {

  user: User;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _userService: UserService
  ) { }

  loadAppoitmentsFromServer() {
    let url = URL_SERVICES + '/appointments/professional';
    url += '?token=' + this._userService.token;
    console.log('URL en la carga de citas');
    console.log( url );

    return this.http.get( url );
  }

}
