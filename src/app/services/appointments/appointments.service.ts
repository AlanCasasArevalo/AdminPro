import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { URL_SERVICES } from '../../config/config';
import { Appointment } from '../../models/appointment.model';
import { Service } from '../../models/service.model';
import { ServicesService } from '../services/services.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert2';
@Injectable()
export class AppointmentsService {

  constructor(
    public http: HttpClient,
    public router: Router,
    public _userService: UserService,
    public _serviceService: ServicesService
  ) { }

  loadProfessionalAppointmentsFromServer() {
    // http://localhost:3000/apiv1/appointments/professional?id=5adaf5355552e8243796f79e
    let url = URL_SERVICES + '/appointments/professional';
    url += '?id=' + this._userService.user._id;
    url += '&token=' + this._userService.token;
    console.log('URL en la carga de citas');
    console.log( url );

    return this.http.get( url );
  }

  loadCustomerAppointmentsFromServer() {
    let url = URL_SERVICES + '/appointments/customer';
    url += '?token=' + this._userService.token;
    console.log('URL en la carga de citas');
    console.log( url );

    return this.http.get( url );
  }

  loadProfessionalsFromServer() {
    let url = URL_SERVICES + '/users';
    url += '?isProfessional=true';
    url += '&token=' + this._userService.token;
    return this.http.get(url).map((response: any) => {
      console.log(response);
      return response.result.rows;
    });
  }

  loadProfessionalByID(id: string) {
    // console.log('Entramos en el back-end');
    let url = URL_SERVICES + '/users';
    // http://localhost:3000/apiv1/users?isProfessional=true
    url += '?isProfessional=true';
    url += '&token=' + this._userService.token;
    // console.log('Url del back');
    // console.log(url);
    return this.http.get(url).map((response: any) => {
      console.log(response);
      return response.result.rows;
    });
  }


  createOrUploadAppointment( appointment: Appointment ) {
    let url = URL_SERVICES + '/appointments';
    if (appointment._id) {
      url += '/';
      url += appointment._id;
      url += '?token=' + this._userService.token;
      console.log('URL Para actualizar');
      console.log(url);
      console.log('appointment para actualizar');
      console.log(appointment);
      return this.http.put(url, appointment).map((response: any) => {
        // console.log('service Actualizado');
        // console.log(response.result);
        return response.result;
      }).catch( error => {
        console.log('Error en crear la cita');
        console.log(error.status);
        console.log(error);

        // const err = error.error.error.message;
        const err = error;
        swal('Error en creacion o actualizacion', `Los sentimos ${err}`, 'error');

        return Observable.throw(error);
      });
    } else {
      url += '?token=' + this._userService.token;
      console.log('URL Para crear');
      console.log(url);
      console.log('Cita para Crear');
      console.log(appointment);

      return this.http.post(url, appointment).map((response: any) => {
        // console.log('Response al crear el service:');
        // console.log(response.result);
        swal('Cita creado', `Cita para el dia ${appointment.date} creada`, 'success');
        return response.result;

      }).catch( error => {
        console.log('Error en crear la cita');
        console.log(error.error.error.err.message); /*?.error*/
        const err = error.error.error.err.message;
        swal('Error en creacion o actualizacion', `Los sentimos ${err}`, 'error');

        return Observable.throw(error);
      });
    }

  }

  loadAppointmentByID(id: string) {
    // console.log('Entramos en el back-end');
    let url = URL_SERVICES + '/appointments';
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
    let url = URL_SERVICES + '/appointments/' + id;
    url += '?token=' + this._userService.token;
    // console.log('La url para borrar servicios es:');
    // console.log(url);
    return this.http.delete(url).map(response => {
      swal(
        'Servicio borrado',
        'El servicio ha sido eliminado correctamente',
        'success'
      );
      return true;
    }).catch ( error => {
      const err = error.error.error.message;
      // console.log('Error al borrar el servicio');
      // console.log(error.error.error.message);
      swal('No se borro', `Lo sentimos, ${err}`, 'error');

      return Observable.throw(error);
     });
  }

}
