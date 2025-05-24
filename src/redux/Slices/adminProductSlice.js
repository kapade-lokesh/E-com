import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAdminProducts = createAsyncThunk("admin/products", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}products/getallproducts`,
      {
        headers: {
          Authorization: `Bearer `,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}products/createproduct`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async (updateData) => {
    const { id, data } = updateData;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}products/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

const deleteProduct = createAsyncThunk("admin/deleteProduct", async (id) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}products/delete/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

const adminProductSlice = createSlice({
  name: "adminProductSlice",
  initialState: {
    products: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        (state.loading = false),
          (state.products = state.products.push(action.payload));
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const productIndex = state.products.findIndex(
          (item) => item._id === action.payload._id
        );

        if (productIndex > -1) {
          state.products[productIndex] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const productIndex = state.products.findIndex(
          (item) => item._id === action.payload._id
        );

        if (productIndex > -1) {
          state.products = state.products.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }),
});

export default adminProductSlice.reducer;
