import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HeaderComponent } from '../../shared/header/header.component';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { UploadFileService } from '../uploadFiles/upload-file.service';

@Injectable()
export class UserService {
  user: User;
  token: string;
  menu: any = [];

  constructor(public http: HttpClient, public router: Router, public _uploadFileService: UploadFileService) {
    this.loadFromLocalStorage();
  }

  authenticated() {
    return this.token.length > 5 ? true : false;
  }

  loadFromLocalStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse( localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  logOut() {
    this.user = null;
    this.token = '';
    this.menu = [];


    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_SERVICES + '/login/google';
    return this.http.post(url, { token }).map((response: any) => {
      this.saveUserIntoStorage(response.id, response.token, response.user, response.menu);
      return true;
    });
  }

  saveUserIntoStorage(id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  login(user: User, rememberme: boolean = false) {
    if (rememberme) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';
    return this.http.post(url, user).map((response: any) => {
      // console.log(response);
      this.saveUserIntoStorage(response.id, response.token, response.user, response.menu);

      return true;
    });
  }

  createNewUser(user: User) {
    const url: string = URL_SERVICES + '/user';
    return this.http.post(url, user).map((response: any) => {
      swal('Usuario creado', user.email, 'success');
      return response.user;
    });
  }

  updateUser(user: User) {
    let url = URL_SERVICES + '/user/' + user._id;
    url += '?token=' + this.token;

    return this.http.put(url, user).map((response: any) => {

      if ( user._id === this.user._id) {
        const userDB: User = response.user;
        this.saveUserIntoStorage(userDB._id, this.token, userDB, this.menu);
      }

      swal('Usuario actualizado correctamente', user.name, 'success');

      return true;
    });
  }

  uploadUserImage ( file: File, id: string ) {
    this._uploadFileService.uploadFiles( file, 'users', id)
      .then( (response: any) => {

        // console.log(`La respuesta al subir imagen es:`, response.User.img);
        this.user.img = response.User.img;
        swal ( 'Imagen de usuario actualizada', this.user.name, 'success');
        this.saveUserIntoStorage( id, this.token, this.user, this.menu );
      })
      .catch( response => {
        console.log( response );
      });
  }

  loadUsersFromServer( from: number = 0) {
    const url = URL_SERVICES + '/user?from=' + from;
    return this.http.get( url );
  }

  searchUsersFromServer ( userToSearch: string ) {
    const url = URL_SERVICES + '/search/collection/users/' + userToSearch;
    return this.http.get( url )
      .map( (response: any) => response.users);
  }

  deleteUserFromService(id: string) {
    let url = URL_SERVICES + '/user/' + id;
    url += '?token=' + this.token;
    return this.http.delete ( url ).map( response => {
      swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
      return true;
    });
  }

}
