import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/state/auth.slice";
import productReducer from '../feature/products/state/product.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer
  },
});

export default store;
