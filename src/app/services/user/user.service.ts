import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HeaderComponent } from '../../shared/header/header.component';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { Router } from '@angular/router';
import { UploadFileService } from '../uploadFiles/upload-file.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert2';

@Injectable()
export class UserService {
  user: User;
  token: string;
  menu: any = [];

  constructor(public http: HttpClient, public router: Router, public _uploadFileService: UploadFileService) {
    this.loadFromLocalStorage();
  }

  authenticated() {
    // console.log('Token del user en authenticated');
    // console.log(this.token);
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

  tokenRenew() {
    let url = URL_SERVICES + '/login/tokenRenew';
    url += '?token=' + this.token;
    return this.http.get( url )
               .map( (response: any) => {
                  this.token = response.token;
                  localStorage.setItem('token', this.token);
                  console.log('Token renovado');
                  return true;
               }).catch ( error => {

                // console.log('Error en Login');
                // console.log(error.status);
                // console.log(error.error.errors.message);

                swal('No se pudo renovar el token', 'No fue posible renovar el token, lo sentimos', 'error');

                return Observable.throw(error);
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
      console.log(url);
      console.log('Respuesta en el login RESPONSE');
      console.log( response );
      console.log('Respuesta en el login USER');
      console.log( response.user );
      console.log('Respuesta en el login response TOKEN');
      console.log(response.token);
      //   saveUserIntoStorage(id: string, token: string, user: User, menu: any) {
      this.saveUserIntoStorage(response.user._id, response.token, response.user, response.menu);
      return true;
    }).catch( error => {
      console.log(error);

      // const err = error.error.error.message;
      // // console.log('Error en Login');
      // // console.log(err);

      // swal('Error en autenticacion', err, 'error');

      return Observable.throw(error);
    });
  }

  createNewUser(user: User) {
    const url = URL_SERVICES + '/register';
    console.log('La url es:');
    console.log(url);

    return this.http.post(url, user).map((response: any) => {
      // console.log('La url es:');
      // console.log(url);
      // console.log('Respuesta al crear usuario');
      // console.log( user );

      swal('Usuario creado', user.email, 'success');
      return response.user;

    }).catch( error => {
      console.log( error );
      // console.log( error.error.error.message );
      // const err = error.error.error.message;

      // swal('Error en autenticacion', err, 'error');

      return Observable.throw(error);
    });
  }

  updateUser(userToUpdate: User) {
    // http://localhost:3000/apiv1/users/5abfb66045e5b30975958b29
    let url = URL_SERVICES + '/users/' + userToUpdate._id;
    url += '?token=' + this.token;

    console.log('URL para actualizar los usuarios por id');
    console.log( url );
    console.log('User para actualizar');
    console.log( userToUpdate );

    return this.http.put(url, userToUpdate).map((response: any) => {

      // console.log('Respuesta de user a actualizar');
      // console.log(response.result);

      if ( userToUpdate._id === this.user._id) {
        console.log('Resultado de actualizar');
        console.log(response.result);
        const userDB: User = response.result;
        this.saveUserIntoStorage(userDB._id, this.token, userDB, this.menu);
      }

      swal('Usuario actualizado correctamente', userToUpdate.name, 'success');

      return true;

    }).catch( error => {
      console.log('Error al Actualizar');
      console.log(error);

      // const err = error.error.error.message;
      // console.log(err);

      // swal('Error en autenticacion', err, 'error');

      return Observable.throw(error);
    });
  }

  uploadUserImage ( file: File, id: string ) {
    this._uploadFileService.uploadFiles( file, 'users', id)
      .then( (response: any) => {

        console.log(`La respuesta al subir imagen es:`, response);
        this.user.img = response.User.img;
        swal ( 'Imagen de usuario actualizada', this.user.name, 'success');
        this.saveUserIntoStorage( id, this.token, this.user, this.menu );
      })
      .catch( response => {
        console.log(`La respuesta al no poder subir la imagen es:`);
        console.log( response );
      });
  }

  loadUsersFromServer( from: number = 0) {
    let url = URL_SERVICES + '/users';
    url += '?token=' + this.token;
    return this.http.get( url );
  }

  searchUsersFromServer ( userToSearch: string ) {
    const url = URL_SERVICES + '/search/collection/users/' + userToSearch;
    return this.http.get( url )
      .map( (response: any) => response.users);
  }

  deleteUserFromService(id: string) {
    // let url = URL_SERVICES + '/users/';
    // tslint:disable-next-line:max-line-length
/*http://localhost:3000/apiv1/users/5ac081809f349207942ba6c2?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7Il9pZCI6IjVhYzA4MTBjOWYzNDkyMDc5NDJiYTZjMCIsIm5hbWUiOiJhbGFuIiwiZW1haWwiOiJkaW9zQHRlc3QuY29tIiwicGFzc3dvcmQiOiI4ZDk2OWVlZjZlY2FkM2MyOWEzYTYyOTI4MGU2ODZjZjBjM2Y1ZDVhODZhZmYzY2ExMjAyMGM5MjNhZGM2YzkyIiwiaW1nIjoiIiwiX192IjowLCJkZWxldGVkIjpmYWxzZSwiaXNQcm9mZXNzaW9uYWwiOnRydWV9LCJpYXQiOjE1MjI1NjUzOTQsImV4cCI6MTUyMjczODE5NH0.UJj9MsnckNDDULijeB6AuJ0JeBk5_YbK7ZFothfzzDo?email=dios@test.com?password=%F0%9F%A4%94%20%F0%9F%91%BB%20%F0%9F%98%9C*/ 
    let url = URL_SERVICES + '/users/' + id;
    url += '?token=' + this.token;
    // url += '?email=' + this.user.email;
    // url += '?password=' + this.user.password;
    return this.http.delete ( url ).map( (response: any) => {
      console.log('Usuario a borrar');
      console.log(response);
      swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
      return true;
    });
  }

}
