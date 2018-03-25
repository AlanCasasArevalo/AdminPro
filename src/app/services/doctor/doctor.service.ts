import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Doctor } from '../../models/doctor.model';
import { UserService } from '../user/user.service';

@Injectable()
export class DoctorService {
  totalDoctors: number = 0;

  constructor(public http: HttpClient, public _userService: UserService) {}

  loadDoctorsFromServer(from: number = 0) {
    const url = URL_SERVICES + '/doctor?from=' + from;
    return this.http.get(url).map((response: any) => {
      // console.log(response);
      this.totalDoctors = response.total;
      return response.doctor;
    });
  }

  loadDoctorById(id: string) {
    const url = URL_SERVICES + '/doctor/' + id;
    return this.http.get(url).map((response: any) => response.doctor);
  }

  searchDoctorFromServer(doctorToSearch: string) {
    if (doctorToSearch.length <= 0) {
      this.loadDoctorsFromServer();
      return;
    }
    const url = URL_SERVICES + '/search/collection/doctors/' + doctorToSearch;
    return this.http.get(url).map((response: any) => response.doctors);
  }

  deleteDoctor(id: string) {
    let url = URL_SERVICES + '/doctor/' + id;
    url += '?token=' + this._userService.token;
    return this.http.delete(url).map(response => {
      swal(
        'Doctor borrado',
        'El doctor ha sido eliminado correctamente',
        'success'
      );
      return true;
    });
  }

  saveADoctor(doctor: Doctor) {
    let url = URL_SERVICES + '/doctor';

    if (doctor._id) {
      url += '/' + doctor._id;
      url += '?token=' + this._userService.token;

      return this.http.put(url, doctor).map((response: any) => {
        swal('Doctor actualizado', doctor.name, 'success');
        return response.doctor;
      });
    } else {
      url += '?token=' + this._userService.token;

      return this.http.post(url, doctor).map((response: any) => {
        swal('Doctor creado', doctor.name, 'success');
        return response.doctor;
      });
    }
  }
}
