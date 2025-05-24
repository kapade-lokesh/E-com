import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByFilter = createAsyncThunk(
  "products/fetchProductsByFilter",
  async (params) => {
    const query = new URLSearchParams();

    for ([Key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, value);
      }
    }

    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }products/getfilterproducts/${query.toString()}`
    );
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}products/getproduct/${id}`
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (id, productData) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}products/update/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchSimilerProducts = createAsyncThunk(
  "products/fetchSimilerProducts",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}products/getsimilerproducts/${id}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProducts: null,
    similerProducts: [],
    loading: false,
    error: null,
    filters: {
      collection: "",
      size: "",
      color: "",
      gender: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      category: "",
      material: "",
      brand: "",
      limit: "",
    },
  },

  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state, action) => {
      state.filters = {
        collection: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        category: "",
        material: "",
        brand: "",
        limit: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilter.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProductsByFilter.fulfilled, (state, action) => {
        (state.loading = false),
          (state.products = Array.isArray(action.payload)
            ? action.payload
            : []);
      })
      .addCase(fetchProductsByFilter.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload.message);
      })

      .addCase(fetchProductDetails.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        (state.loading = false), (state.products = action.payload);
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload.message);
      })
      .addCase(updateProduct.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updateProduct._id
        );

        if (index != -1) {
          state.products[index] = updateProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload.message);
      })
      .addCase(fetchSimilerProducts.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchSimilerProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.similerProducts = action.payload;
      })
      .addCase(fetchSimilerProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload.message);
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
