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

import swal from 'sweetalert2';

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

  createOrUploadProduct( product: Product ) {
    console.log('Producto para actualizar');
    console.log(product);
    let url = URL_SERVICES + '/products';
    if (product._id) {
      url += '/' + product._id;
      url += '?token=' + this._userService.token;
      // console.log('URL Para actualizar');
      // console.log(url);
      return this.http.put(url, product).map((response: any) => {
        console.log('Producto Actualizado');
        console.log(response.result);
        return response.result;
      });
    } else {
      url += '?token=' + this._userService.token;

      return this.http.post(url, product).map((response: any) => {
        // console.log('Response al crear el producto:');
        // console.log(response.result);
        swal('Producto creado', product.name, 'success');
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

  loadProductByID(id: string) {
    // console.log('Entramos en el back-end');
    let url = URL_SERVICES + '/products';
    url += '?id=' + id;
    url += '&token=' + this._userService.token;
    // console.log('Url del back');
    // console.log(url);
    return this.http.get(url).map((response: any) => {

      // console.log('Producto por id devuelto por el servicio');
      // console.log(response.result.rows[0]);
      return response.result.rows[0];
    });
  }

  deleteProduct(id: string) {
    let url = URL_SERVICES + '/products/' + id;
    url += '?token=' + this._userService.token;
    console.log('La url para borrar productos es:');
    console.log(url);
    return this.http.delete(url).map(response => {
      swal(
        'Producto borrado',
        'El producto ha sido eliminado correctamente',
        'success'
      );
      return true;
    }).catch ( error => {
      const err = error.error.error.message;
      // console.log('Error al borrar el producto');
      // console.log(error.error.error.message);
      swal('No se borro', `Lo sentimos, ${err}`, 'error');

      return Observable.throw(error);
     });
  }

}
