import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import productReducer from "./Slices/productSlice";
import cartReducers from "./Slices/cartSlice";
import checkoutReducers from "./Slices/checkoutSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducers,
    chekout: checkoutReducers,
  },
});

export default store;
