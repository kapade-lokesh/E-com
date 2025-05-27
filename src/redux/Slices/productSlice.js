import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByFilter = createAsyncThunk(
  "products/fetchProductsByFilter",
  async (params) => {
    try {
      const query = new URLSearchParams();

      for (var [Key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== "") {
          query.append(Key, value);
        }
      }

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }products/getfilterproducts?${query.toString()}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
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
      `${
        import.meta.env.VITE_BACKEND_URL
      }products/getsimilerproducts/${id}?limit=8`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProducts: null,
    similarProducts: [],
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
          (state.products = Array.isArray(action.payload.products)
            ? action.payload.products
            : []);
      })
      .addCase(fetchProductsByFilter.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })

      .addCase(fetchProductDetails.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        console.log("callig api");
        state.loading = false;
        state.selectedProducts = action.payload.product;
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
          (product) => product._id === updatedProduct._id
        );

        if (index != -1) {
          state.products[index] = updatedProduct;
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

        state.similarProducts = action.payload.similerProducts;
      })
      .addCase(fetchSimilerProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload.message);
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
