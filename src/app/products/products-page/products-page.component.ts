import { Component } from '@angular/core';
import { sumProducts } from 'src/app/utils/sum-products';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { ProductPageActions } from 'src/app/state/products.actions';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products: Product[] = [];
  total = 0;
  loading = true;
  //showProductCode = false; replaced by observable
  showProductCode$ =  this.store.select(
    (state: any) => state.products.showProductCode
  );
  errorMessage = '';

  constructor(
    private productsService: ProductsService,
    private store: Store
  ) {
    this.store.subscribe((store) => {
      console.log(store);
    })
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.total = sumProducts(products);
        this.loading = false;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
   // this.showProductCode = !this.showProductCode;
   // this.store.dispatch({type: '[Products Page] Toggle Show Product Code'})
   this.store.dispatch(ProductPageActions.toggleShowProductCode())
  }
}
