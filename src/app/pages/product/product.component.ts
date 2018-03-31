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
    public _userServices: UserService
  ) { }

  ngOnInit() {
  }

  createNewProduct ( form: NgForm ) {
    if (form.invalid) {
      console.log('El formulario es invalido');
      console.log(form);
      return;
    }

    // if (this.areActive[0] === 'no') {
    //   isActive = false;
    // } else {
    //   isActive = true;
    // }

    console.log(`El formulario es: ${form.valid}`);
    console.log(form.value);
    console.log(form.value.price);
    console.log(form.value.name);
    console.log(form.value.description);

    this.product.professional = this._userServices.user._id;
    this.product.name = form.value.name;
    this.product.description = form.value.description;
    this.product.price = form.value.price;

    console.log('El producto es:');
    console.log( this.product );
    this._productsService.createNewProduct(this.product)
        .subscribe( (response: any) => {
          console.log('La respuesta del servidor al crear el servicio es');
          console.log(response);
        });

  }

}
