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
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Userlayout />}>
            <Route index element={<Home />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/collections/:collection" element={<Collection />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConformation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
