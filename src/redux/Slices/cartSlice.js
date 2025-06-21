import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

console.log("calling cart slice");

//helper function
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart")
    ? localStorage.getItem("cart")
    : "";
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

const getCartItemCount = () => {
  console.log("calling count items reducer");
  console.log(
    "cart",
    JSON.parse(localStorage.getItem("cart"))?.products?.length
  );
  return JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0;
};

const saveCartToStorage = (cart) => {
  if (cart === undefined || cart === null) return;
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, guestId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}cart/getcart?${userId || guestId}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, size, quantity, color, userId, guestId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}cart/create`,
        { productId, size, quantity, color, userId, guestId }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.message);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { userId, guestId, productId, size, quantity, color },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}cart/updatecart`,
        { userId, guestId, productId, size, quantity, color }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    { userId, guestId, productId, size, quantity, color },
    { rejectWithValue }
  ) => {
    console.log({ userId, guestId, productId, size, quantity, color });
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}cart/deleteCart`,
        { data: { userId, guestId, productId, size, quantity, color } }
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.message);
    }
  }
);

export const mergCart = createAsyncThunk(
  "cart/mergCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}cart/mergeCart`,
        { userId, guestId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.message);
    }
  }
);

const carSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage() || state.cart,
    loading: false,
    error: null,
    itemsCount: getCartItemCount() || 0,
  },
  reducers: {
    clearCart: (state, action) => {
      state.cart = { products: [] };
      state.itemsCount = 0;
      localStorage.removeItem("cart");
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchCart.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.newcart;
        console.log(state.itemsCount);
        state.itemsCount = state.cart?.products?.length || 0;
        saveCartToStorage(action.payload.newcart);
        getCartItemCount();
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      .addCase(updateCartItemQuantity.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        console.log("update calling");
        state.loading = false;
        state.cart = action.payload;
        console.log("update cart", state.cart);
        state.itemsCount = state.cart.products.length;
        saveCartToStorage(action.payload);
        getCartItemCount();
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      .addCase(removeFromCart.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        console.log("calling remove Cart");
        state.loading = false;
        state.cart = action.payload.cart;
        console.log(state.cart);
        state.itemsCount = state.cart.products.length || 0;
        saveCartToStorage(action.payload.cart);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      .addCase(mergCart.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.itemsCount = action.payload.products?.length || 0;
        saveCartToStorage(action.payload);
      })
      .addCase(mergCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Restore cart from localStorage to prevent data loss
        state.cart = loadCartFromStorage();
        state.itemsCount = getCartItemCount();
      }),
});

export const { clearCart } = carSlice.actions;
export default carSlice.reducer;
