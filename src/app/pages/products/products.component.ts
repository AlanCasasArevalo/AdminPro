import { Component, OnInit } from '@angular/core';

import { Service } from '../../models/service.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products/products.service';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';

import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = true;
  totalProducts: number = 0;

  constructor(
    public _productsService: ProductsService,
    public _userServices: UserService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this._modalUploadService.notification
    .subscribe((response: any) => {
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    this._productsService
      .loadProductsFromServer()
      .subscribe((response: any) => {
        console.log('Respuesta al recibir los productos desde el servidor');
        console.log(response.result.rows);
        this.totalProducts = response.result.rows.length;
        this.products = response.result.rows;
        this.loading = false;
      });
  }

  toShowModal(productID: string) {
    // console.log(this._modalUploadService.toShowModal('products', productID));
    this._modalUploadService.toShowModal('products', productID);
  }

  productToDelete( product ) {

    swal({
      title: '¿Seguro que quieres borrar?',
      text: `Vas a borrar ${ product.name }` ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._productsService.deleteProduct(product._id)
        .subscribe( deleted => {
          swal('Borrado', `${product.name} ha sido borrado`, 'success');
          console.log('Al borrar:');
          console.log( deleted );
          this.loadProducts();
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal(
          'Cancelado',
          'Tu servicio esta a salvo 😊',
          'error'
        );
      }
    });
  }
}
