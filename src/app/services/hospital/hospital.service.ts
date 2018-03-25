import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../../models/user.model';
import { UploadFileService } from '../../services/uploadFiles/upload-file.service';
import { UserService } from '../user/user.service';

@Injectable()
export class HospitalService {
  hospital: Hospital;
  user: User;

  constructor(
    public http: HttpClient,
    public _uploadFileService: UploadFileService,
    public _userService: UserService
  ) {
    this.loadHospitalFromLocalStorage();
  }

  loadHospitalFromLocalStorage() {
    if (localStorage.getItem('token')) {
      this._userService.token = localStorage.getItem('token');
      this.hospital = JSON.parse(localStorage.getItem('hospital'));
    } else {
      this._userService.token = '';
      this.hospital = null;
    }
  }

  saveHospitalIntoStorage(id: string, hospital: Hospital) {
    localStorage.setItem('hospital', JSON.stringify(hospital));
    localStorage.setItem('hospitalId', hospital._id);

    this.hospital = hospital;
  }

  getHospitalById(id: string) {
    const url = URL_SERVICES + '/hospital/' + id;
    return this.http.get( url )
               .map( (response: any) => {
                //  console.log(response);
                return response.hospital;
               });
  }

  deleteHospitalFromService(id: string) {
    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this._userService.token;
    return this.http.delete ( url ).map( response =>  swal('Hospital borrado', 'El Hospital ha sido eliminado correctamente', 'success'));
  }

  searchHospitalsFromServer ( hospitalToSearch: string ) {
    const url = URL_SERVICES + '/search/collection/hospitals/' + hospitalToSearch;
    return this.http.get( url )
      .map( (response: any) => {
        // console.log(response.hospitals);
        return response.hospitals;
      });
  }

  updateHospital(hospitalToUpdate: Hospital) {
    let url = URL_SERVICES + '/hospital/' + hospitalToUpdate._id;
    url += '?token=' + this._userService.token;
    // console.log(`El hospital a actualizar es: `);
    // console.log(hospitalToUpdate);
    return this.http.put(url, hospitalToUpdate ).map( (response: any) => {
      swal('Hospital actualizado', `El Hospital ${hospitalToUpdate.name} ha sido actualizado correctamente`, 'success');
      return response.hospital;
    });
  }

  loadHospitalsFromServer( from: number = 0) {
    const url = URL_SERVICES + '/hospital?from=' + from;
    return this.http.get( url );
    // return this.http.get( url ).map( (response: any) => {
    //   return response.hospitals;
    // });

  }

  createNewHospital( name: string ) {

    let url: string = URL_SERVICES + '/hospital';
    url += '?token=' + this._userService.token;
    console.log(`Peticion con url es : ${url} ${name}`);
    // console.log(`El valor del nombre del hospital en el servicio es : ${name}`);
    return this.http.post(url,  {name}  ).map( (response: any) => {
      console.log(response);
      return response.hospital;
    });
  }

  uploadHospitalImage ( file: File, id: string ) {
    this._uploadFileService.uploadFiles( file, 'hospitals', id)
      .then( (response: any) => {

        console.log(response);
        console.log(`La respuesta al subir imagen es:`, response.hopsital.img);
        this.hospital.img = response.hopsital.img;
        swal ( 'Imagen de usuario actualizada', this.hospital.name, 'success');
        this.saveHospitalIntoStorage(response._id, response.hospital);
      })
      .catch( response => {
        console.log( response );
      });
  }




}
