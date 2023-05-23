# Project

## First Look

### Task: Toggle Show Product Code [First Demo]

Add Imports to app.module.ts and products.module

1. run `npm i @ngrx/store`
2. app.module.ts add`StoreModule.forRoot{InMemoryService}`
3. product.module.ts add `StoreModule.forFeature('products', {})` // second var is the reducer

```typescript
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryDataService } from './in-memory-data.service';
import { HomeComponent } from './home/home.component';

import {  StoreModule } from '@ngrx/store' //added

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    StoreModule.forRoot({}) // added
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductPageComponent } from './product-page/product-page.component';

import {  StoreModule } from '@ngrx/store'

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsListComponent,
    ProductEditComponent,
    ProductPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('products', {}) // added, first var is feature module, second var is the reducer(TBD)
  ]
})
export class ProductsModule { }
```

1. Dependence Injection of `store` and `subscribe` in ProductsPageComponent

```typescript
export class ProductsPageComponent {
  products: Product[] = [];
  total = 0;
  loading = true;
  showProductCode = false;
  errorMessage = '';

  constructor(
    private productsService: ProductsService,
    private store: Store
  ) {
    this.store.subscribe((store) => {
      console.log(store);
    })
  }
  ...
  ```

### Note: Our store has been initialized

![Initial Store](src\assets\init-store.png)

### Task: Add A Products Reducer to process actions

1. Add: products/stateproducts.reducer.ts

```typescript
import { createAction, createReducer, on } from "@ngrx/store";

export interface ProductState {
  showProductCode: boolean;
}

const initialState: ProductState = {
  showProductCode: true
}

export const productReducer = createReducer(
  initialState,
  on(createAction('[Products Page] toggle Show  Product Code'), (state) => ({
    ...state,
    showProductCode: !state.showProductCode
  }))
)
```

1. file:  products.module.ts `StoreModule.forFeature('products', productReducer)`

![Initial Store set true](src\assets\show-products-code-true.png)

### Task: Dispatch an Action to Change State

```html
<!-- products-page template  -->
...
<div *ngIf="!loading; else loadingElement">
  <div class="container">
    <!-- (toggleProductCode)="toggleShowProductCode()" -->
    <app-products-list
      [total]="total"
      [products]="products"
      [showProductCode]="showProductCode"
      (toggleProductCode)="toggleShowProductCode()"
    ></app-products-list>
  </div>
</div>
```

```html
<!-- products-list template  -->
...
<li>
      Total: {{ this.total | currency }}
      <div>
        <!--  (change)="toggleProductCode.emit()"  -->
        <input
          id="showProductCode"
          type="checkbox"
          (change)="toggleProductCode.emit()"
          [checked]="showProductCode"
        />
        <label for="showProductCode">Show Product Code</label>
      </div>
    </li>
    ...
    ```
```

```typescript
//products.reucer.ts
import { createAction, createReducer, on } from "@ngrx/store";

export interface ProductState {
  showProductCode: boolean;
}

const initialState: ProductState = {
  showProductCode: true
}

export const productReducer = createReducer(
  initialState,
  on(createAction('[Products Page] Toggle Show Product Code'), (state) => ({
    ...state,
    showProductCode: !state.showProductCode
  }))
)
```

insert imge here

===

### Task:Bind the store value

```Typescript
// product-page.component.ts
export class ProductsPageComponent {
  products: Product[] = [];
  total = 0;
  loading = true;
  //showProductCode = false; replaced by observable
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
}
```

```html
<!-- products-page.component.html  -->
...
<div *ngIf="!loading; else loadingElement">
  <div class="container">
    <!-- (toggleProductCode)="toggleShowProductCode()" -->
    <app-products-list
      [total]="total"
      [products]="products"
      [showProductCode]="showProductCode$ | async" ,<!--here-->
      (toggleProductCode)="toggleShowProductCode()"
    ></app-products-list>
  </div>
</div>
...
```

### Task: Add Strongly Typing Actions with Action Creators

1. HERE 5-15-2023 HERE 5-16-2023>

====

### Task: Add NgRx Effects

1. run `npm i @ngrx/effects`
2.

```typescript
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    StoreModule.forRoot({}),
    EffectsModule.forRoot({}) // here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```typescript
@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsListComponent,
    ProductEditComponent,
    ProductPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature({}) //here
  ]
})
export class ProductsModule { }
```

1. create "state/products.effects.ts " (from service)
2. Video clip Unit #5 <https://app.pluralsight.com/course-player?clipId=306e1e36-cd6f-47c7-8307-9f649db6b522>

### Task: Strongly Typing Actions with Action Creaters

1. Ref.  Video: <https://app.pluralsight.com/course-player?clipId=306e1e36-cd6f-47c7-8307-9f649db6b522>
