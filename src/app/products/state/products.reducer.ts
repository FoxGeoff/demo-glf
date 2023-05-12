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
