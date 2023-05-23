import { createAction, createReducer, on } from "@ngrx/store";
import { ProductPageActions } from "./products.actions"
import { state } from "@angular/animations";

export interface ProductState {
  showProductCode: boolean;
}

const initialState: ProductState = {
  showProductCode: true
}

export const productReducer = createReducer(
  initialState,
  //on(createAction('[Products Page] Toggle Show Product Code'), (state) => ({
  on(ProductPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode
  }))
);
