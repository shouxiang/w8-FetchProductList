import { configureStore } from "@reduxjs/toolkit";
import { productListReducer } from "./productListSlice";
export const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
});
export default store;
