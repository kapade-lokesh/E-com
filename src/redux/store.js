import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import productReducer from "./Slices/productSlice";
import cartReducers from "./Slices/cartSlice";
import checkoutReducers from "./Slices/checkoutSlice";
import orderReducers from "./Slices/orderSlice";
import adminReducers from "./Slices/adminSlice";
import adminProductReducers from "./Slices/adminProductSlice";
import adminOrderReducers from "./Slices/adminOrders";
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducers,
    chekout: checkoutReducers,
    orders: orderReducers,
    admin: adminReducers,
    adminProductSlice: adminProductReducers,
    adminOrderSlice: adminOrderReducers,
  },
});

export default store;
