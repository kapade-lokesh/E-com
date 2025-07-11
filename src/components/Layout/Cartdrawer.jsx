import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { Cartcontent } from "../Cart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ toggelCartDrawer, isOpen }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  const handleCheckout = () => {
    toggelCartDrawer(!isOpen);
    if (!userId) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed z-50 top-0 right-0 sm:w-1/2 md:w-1/4 h-full bg-white flex flex-col transition transiton-transform duration-300 shadow-lg ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end">
        <button onClick={toggelCartDrawer}>
          <HiMiniXMark className="h-5 w-5 text-gray-500 hover:text-black" />
        </button>
      </div>

      {/* Scrollabel Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

        {/* cart Products */}
        {cart && cart?.products?.length > 0 ? (
          <Cartcontent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your Cart Is Empty</p>
        )}
      </div>

      <div className="sticky bottom-0 px-2">
        {cart && cart?.products?.length > 0 && (
          <>
            {" "}
            <button
              onClick={handleCheckout}
              className="text-white bg-black w-full py-2 rounded-lg font-semibold"
            >
              chekout
            </button>
            <p className="text-sm text-center tracking-tighter text-gray-500">
              shiping charges may apply
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
