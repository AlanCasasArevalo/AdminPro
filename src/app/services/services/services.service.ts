import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Service } from '../../models/service.model';
const swal: SweetAlert = _swal as any;

@Injectable()
export class ServicesService {

  user: User;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _userService: UserService
  ) {  }

  loadServicesFromServer() {
    let url = URL_SERVICES + '/services/';
    url += '?token=' + this._userService.token;
    // console.log('Url en la carga de servicios del servidor');
    // console.log(url);
    return this.http.get( url );
  }

  createNewService( service: Service ) {
    let url = URL_SERVICES + '/services';
    url += '?token=' + this._userService.token;
    // console.log('La url es:');
    // console.log(url);
    // console.log('Servicio recibido');
    // console.log( service );

    return this.http.post(url, service).map((response: any) => {

      // console.log('La url es:');
      // console.log(url);
      // console.log('Respuesta al crear service');
      console.log( response );

      return response;

    }).catch( error => {
      console.log('Error en profuct.services al crear service');
      console.log( error );
      // console.log( error );
      // const err = error.error.error.message;
      // swal('Error en autenticacion', err, 'error');
      return Observable.throw(error);
    });
  }



}
