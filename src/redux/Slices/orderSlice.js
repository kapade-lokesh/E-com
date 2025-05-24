import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}orders/getall-orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(authToken)}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.message);
    }
  }
);

const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}order/getorder/${orderId}`,
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

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: true,
  },
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(fetchUserOrders.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchOrderDetails.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        (state.loading = true), (state.error = null);
      });
  },
});

export default orderSlice.reducer;
