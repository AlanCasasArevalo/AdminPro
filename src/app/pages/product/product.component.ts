import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../services/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  product: Product = new Product('');

  constructor(
    public _productsService: ProductsService,
    public _userServices: UserService,
    public router: Router,
    public activateRoute: ActivatedRoute,
  ) {
    activateRoute.params.subscribe( params => {
      // console.log('Parametros recibidos ID del producto');
      // console.log( params );
      const id = params['id'];
      if (id !== 'new') {
        this.loadProductByID( id );
      }
    });
  }

  ngOnInit() {
  }

  createNewAndUpdateProduct ( form: NgForm ) {
    if (form.invalid) {
      console.log('El formulario es invalido');
      console.log(form);
      return;
    }

    // console.log('El producto es:');
    // console.log( this.product );
    this._productsService.createOrUploadProduct(this.product)
        .subscribe( (product: any) => {
          // console.log('La respuesta del servidor al crear el producto es');
          // console.log(product);
          this.product._id = product._id;

          // console.log('El id del producto es');
          // console.log(product._id);

          this.router.navigate(['/product', product._id]);

        });

  }

  loadProductByID(id: string) {
    // console.log('ProductID en component.ts loadProductByID');
    this._productsService.loadProductByID( id )/*?.*/
        .subscribe( product => {
          // console.log('Producto devuelto desde el servidor');
          // console.log(product);
          this.product = product;
        });
  }

}
