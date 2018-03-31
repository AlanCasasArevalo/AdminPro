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
        // console.log('Respuesta al recibir los productos desde el servidor');
        // console.log(response.result.rows);
        this.totalProducts = response.result.rows.length;
        this.products = response.result.rows;
        this.loading = false;
      });
  }

  toShowModal(productID: string) {
    // console.log(this._modalUploadService.toShowModal('products', productID));
    this._modalUploadService.toShowModal('products', productID);
  }

  updateProduct(product) {}
  productToDelete(product) {}
}
