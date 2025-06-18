import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slices/authSlice";
import { mergCart } from "../redux/Slices/cartSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  //TODO: search about this code what is the working of it

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const ischeckoutRedirect = redirect.includes("checkout");
  console.log(user);
  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergCart(user, guestId)).then(() => {
          navigate(ischeckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(ischeckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, ischeckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user:", { email, password });
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">E-com</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Hey there !</h2>
          <p className="text-center mb-6">
            Enter your username and password to login
          </p>

          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name=""
              id=""
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name=""
              id=""
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded-md py-2 hover:bg-gray-800 font-semibold"
          >
            Login
          </button>

          <p className="mt-6 text-center text-sm">
            Don't have an account ?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2  bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={login}
            alt="login"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
