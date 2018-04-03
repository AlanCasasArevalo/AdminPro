import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Service } from '../../models/service.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert2';
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

  createOrUploadService( service: Service ) {
    console.log('service para actualizar');
    console.log(service);
    let url = URL_SERVICES + '/services';
    if (service._id) {
      url += '/' + service._id;
      url += '?token=' + this._userService.token;
      // console.log('URL Para actualizar');
      // console.log(url);
      return this.http.put(url, service).map((response: any) => {
        console.log('service Actualizado');
        console.log(response.result);
        return response.result;
      });
    } else {
      url += '?token=' + this._userService.token;

      return this.http.post(url, service).map((response: any) => {
        // console.log('Response al crear el service:');
        // console.log(response.result);
        swal('service creado', service.name, 'success');
        return response.result;
      }).catch( error => {
        const err0 = error.error.error.err.errors[0].message;
        const err1 = error.error.error.err.errors[1].message;
        console.log('Error en crear el usuario');
        // console.log(error.status);
        console.log(error.error.error.err.errors);

        swal('Error en creacion o actualizacion', `Los sentimos ${err0} o ${err1}`, 'error');

        return Observable.throw(error);
      });
    }

  }

  loadServiceByID(id: string) {
    // console.log('Entramos en el back-end');
    let url = URL_SERVICES + '/services';
    url += '?id=' + id;
    url += '&token=' + this._userService.token;
    // console.log('Url del back');
    // console.log(url);
    return this.http.get(url).map((response: any) => {

      // console.log('service por id devuelto por el servicio');
      // console.log(response.result.rows[0]);
      return response.result.rows[0];
    });
  }

  deleteService(id: string) {
    let url = URL_SERVICES + '/services/' + id;
    url += '?token=' + this._userService.token;
    console.log('La url para borrar servicios es:');
    console.log(url);
    return this.http.delete(url).map(response => {
      swal(
        'Servicio borrado',
        'El servicio ha sido eliminado correctamente',
        'success'
      );
      return true;
    }).catch ( error => {
      const err = error.error.error.message;
      console.log('Error al borrar el servicio');
      console.log(error.error.error.message);
      swal('No se borro', `Lo sentimos, ${err}`, 'error');

      return Observable.throw(error);
     });
  }

}
