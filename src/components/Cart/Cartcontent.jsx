import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/Slices/cartSlice";

const Cartcontent = ({ userId, guestId, cart }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    console.log(productId);
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  // const cartProducts = [
  //   {
  //     productId: 1,
  //     name: "T-shirt",
  //     size: "L",
  //     color: "Blue",
  //     quantity: 1,
  //     price: 230,
  //     image: "https://picsum.photos/200?random=1",
  //   },

  //   {
  //     productId: 2,
  //     name: "Jeans",
  //     size: "L",
  //     color: "Black",
  //     quantity: 1,
  //     price: 330,
  //     image: "https://picsum.photos/200?random=1",
  //   },
  // ];

  return (
    <>
      <div>
        {cart.products.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-start justify-between p-4 border-b"
            >
              <div className="flex items-start">
                <img
                  src={item.image}
                  alt="product"
                  className="w-20 h-24 object-cover mr-4 rounded"
                />

                <div>
                  <h3>{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    size:{item.size} | color:{item.color}
                  </p>

                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        handleAddToCart(
                          item.productId,
                          1,
                          item.quantity,
                          item.size,
                          item.color
                        )
                      }
                      className="font-medium border rounded px-1  text-xl"
                    >
                      +
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleAddToCart(
                          item.productId,
                          -1,
                          item.quantity,
                          item.size,
                          item.color
                        )
                      }
                      className="font-medium border rounded px-1  text-xl"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-medium">&#8377;{item.price}</p>
                <button
                  onClick={() => {
                    handleRemoveFromCart(item.productId, item.size, item.color);
                  }}
                >
                  <RiDeleteBin2Line className="mt-2 ms-4 h-5 w-5 text-red-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cartcontent;
