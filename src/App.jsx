import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Userlayout from "./components/Layout/Userlayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Collection from "./Pages/Collection";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConformation from "./Pages/OrderConformation";
import OrderDetails from "./Pages/OrderDetails";
import MyOrders from "./Pages/MyOrders";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./Pages/AdminHomePage";
import UserManage from "./components/Admin/UserManage";
import NotFound from "./Pages/NotFound";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProduct from "./components/Admin/EditProduct";
import OrderManagement from "./components/Admin/OrderManagement";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Userlayout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collections/:collection" element={<Collection />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConformation />} />
            <Route path="order/:id" element={<OrderDetails />} />
            <Route path="my-orders" element={<MyOrders />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManage />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
