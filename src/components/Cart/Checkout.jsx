import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
 
const cartProducts = {
  products: [
    {
      name: "T-shirt",
      size: "L",
      color: "Blue",
      price: 230,
      image: "https://picsum.photos/200?random=1",
    },

    {
      name: "Jeans",
      size: "L",
      color: "Black",

      price: 330,
      image: "https://picsum.photos/200?random=1",
    },
  ],
  totalPrice: 1200,
};
const Checkout = () => {
  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleCheckOut = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="px-6 py-10 max-w-6xl grid grid-cols-1 md:grid-cols-2   lg:gird-cols-2 gap-8 mx-auto tracking-tighter">
      {/* Left section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        <form onSubmit={handleCheckOut}>
          <h3 className="text-lg mb-4">Contact details</h3>

          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name=""
              id=""
              value="lkkapade@gmail.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id=""
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  });
                }}
                value={shippingAddress.firstName}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id=""
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  });
                }}
                value={shippingAddress.lastName}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              id=""
              onChange={(e) => {
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                });
              }}
              value={shippingAddress.address}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                id=""
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  });
                }}
                value={shippingAddress.city}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                id=""
                onChange={(e) => {
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  });
                }}
                value={shippingAddress.postalCode}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              id=""
              onChange={(e) => {
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                });
              }}
              value={shippingAddress.country}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="address"
              id=""
              onChange={(e) => {
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                });
              }}
              value={shippingAddress.phone}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
              onClick={handlePaymentSuccess}
            >
              continue to payment
            </button>
          </div>
        </form>
      </div>

      {/* Right Section */}

      <div className="bg-gray-50  p-6 rounded-lg ">
        <h3 className="text-lg mb-4">Order Summary</h3>

        <div className="border-t py-4 mb-4">
          {cartProducts.products.map((product, index) => {
            return (
              <div className="flex items-start justify-between py-2 border-b">
                <div className="flex items-start">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover mr-4"
                  />
                </div>

                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size:{product.size}</p>
                  <p className="text-gray-500">Color:{product.color}</p>
                </div>

                <p className="text-xl">
                  &#8377; {product.price.toLocaleString()}
                </p>
              </div>
            );
          })}

          <div className="flex justify-between items-center text-lg mb-4">
            <p>Subtotal</p>
            <p>&#8377;{cartProducts?.totalPrice?.toLocaleString()}</p>
          </div>

          <div className="flex justify-between items-center text-lg">
            <p>shipping</p>
            <p>free</p>
          </div>
          <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
            <p>Total price</p>
            <p>&#8377;{cartProducts?.totalPrice?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
