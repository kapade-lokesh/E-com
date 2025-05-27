import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//helper function
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart")
    ? localStorage.getItem("cart")
    : "";
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

const saveCartToStorage = (cart) => {
  if (cart === undefined || cart === null) return;
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
  async ({ productId, size, quantity, color }, { rejectWithValue }) => {
    console.log("add to cart api is calling", color);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}cart/create`,
        { productId, size, quantity, color }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
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
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}cart/deleteCart`,
        { userId, guestId, productId, size, quantity, color }
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
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}cart/mergeCart`,
        { userId, guestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.message);
    }
  }
);

const carSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state, action) => {
      (state.cart = { products: [] }), localStorage.removeItem("cart");
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchCart.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        (state.loading = true), (state.error = action.payload.message);
      })
      .addCase(addToCart.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload.newcart);
        saveCartToStorage(action.payload.newcart);
      })
      .addCase(addToCart.rejected, (state, action) => {
        (state.loading = true), (state.error = action.payload.message);
      })
      .addCase(updateCartItemQuantity.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        (state.loading = true), (state.error = action.payload.message);
      })
      .addCase(removeFromCart.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        (state.loading = true), (state.error = action.payload.message);
      })
      .addCase(mergCart.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(mergCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToStorage(action.payload);
      })
      .addCase(mergCart.rejected, (state, action) => {
        (state.loading = true), (state.error = action.payload.message);
      }),
});

export const { clearCart } = carSlice.actions;
export default carSlice.reducer;
