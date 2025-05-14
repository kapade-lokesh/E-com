import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import productReducer from "./Slices/productSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    product:productReducer
  },
});

export default store;
