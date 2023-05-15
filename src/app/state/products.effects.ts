import { Injectable } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductsService) { }
/*
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts)
      concatMap(() =>
        this.productService
          .getAll()
          .pipe(
            map(products) =>
            ProductAPIActions.productsLoadSuccess({ products })
          )
      })
    )
  ); */
}
