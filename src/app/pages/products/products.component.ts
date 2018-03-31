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
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this._productsService.loadProductsFromServer()
        .subscribe( (response: any) => {
          // console.log('Respuesta al recibir los productos desde el servidor');
          // console.log(response.result.rows);
          this.totalProducts = response.result.rows.length;
          this.products = response.result.rows;
          this.loading = false;
        });
  }

  toShowModal( productID: string ) {
    // console.log(this._modalUploadService.toShowModal('products', productID));
    this._modalUploadService.toShowModal( 'products', productID );
  }

  createNewProduct() {
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4']
    });
    const steps = [
      { title: 'Nombre', text: 'Necesitamos un nombre que mostrar al usuario' },
      { title: 'Descripción', text: 'Necesitamos una descripción que mostrar al usuario' },
      { title: 'Precio', text: 'Necesitamos un precio que mostrar al usuario' },
      { title: '¿Esta activo?', text: 'Solo diganos un si o un no por favor' },
    ];
    swal.queue(steps).then((result) => {
      swal.resetDefaults();

      if (result.value) {
        const name: string = result.value[0];
        const description: string = result.value[1];
        const price: number = result.value[2];
        const isActiveString: string = result.value[3];
        let isActive = true;

        if (
          (name && name.length <= 0) ||
          (description && description.length <= 0) ||
          (price && price <= 0) ||
          ( isActiveString.toLowerCase() === 'si' || isActiveString.toLowerCase() === 'no' )
        ) {
          if (isActiveString === 'no') {
            isActive = false;
          }

          const product = new Product(
            name, description, price, isActive
          );
          // console.log('Valores del produto');
          // console.log(result.value);
          // console.log(product);

          console.log('Llamando a crear nuevo producto');
          this._productsService.createNewProduct( product );

          swal({
            title: 'Genial se creo el producto OK',
            confirmButtonText: 'Genial!'
          });
        } else {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Alguno de los campos no fue rellenado correctamente'
            });
        }
      }
    });
  }
  productToDelete( product ) {

  }

  updateProduct( product ) {

  }
}
