import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { URL_SERVICES } from '../../config/config';
import { Product } from '../../models/product.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
// const swal: SweetAlert = _swal as any;
declare var swal: SweetAlert;

@Injectable()
export class ProductsService {

  user: User;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _userService: UserService
  ) { }

  loadProductsFromServer() {
    let url = URL_SERVICES + '/products/';
    url += '?token=' + this._userService.token;
    // console.log('Url en la carga de productos del servidor');
    // console.log(url);
    return this.http.get( url );
  }

  createNewProduct( product: Product ) {
    // http://localhost:3000/apiv1/products/
    // const url = URL_SERVICES + '/products';
    let url = URL_SERVICES + '/products';
    url += '?token=' + this._userService.token;

    console.log('La url es:');
    console.log(url);
    console.log('Producto recibido');
    console.log( product );

    return this.http.post(url, product).map((response: any) => {

      console.log('La url es:');
      console.log(url);
      console.log('Respuesta al crear producto');
      console.log( response );

      return response;

    }).catch( error => {
      console.log('Error en profuct.services al crear producto');
      console.log( error );
      // const err = error.error.error.message;
      // swal('Error en autenticacion', err, 'error');
      return Observable.throw(error);
    });
  }

}
