import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {


  product: Product = new Product();

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _productsService: ProductsService,
  ) { }

  ngOnInit() {
  }

  loadProduct( id: string) {
    // TODO: hacer el 
    this._productsService.loadProductsFromServer()
        .subscribe( response => {
          console.log(response);
        });
  }

}
