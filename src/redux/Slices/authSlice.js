import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// * retrive user info from localstorage if availble
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialGuestId =
  localStorage.getItem("guestId") || `guest${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUSer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}users/login`,
        data
      );
      console.log(response.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("authToken", JSON.stringify(response.data.token));
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}users/register`,
        data
      );
      console.log(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem(
        "authToken",
        JSON.stringify(response.data.token) || ""
      );
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.message);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state, action) => {
      (state.user = null), (state.guestId = `guest${new Date().getTime()}`);

      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      localStorage.setItem(guestId, state.guestId);
      state.loading = false;
    },
    generateGuestId: (state, action) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem(guestId, state.guestId);
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        (state.loading = true), (state.error = false);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.loading = true), (state.error = action.payload.message);
      })

      .addCase(registerUser.pending, (state, action) => {
        (state.loading = true), (state.error = false);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.loading = true), (state.error = action.payload.message);
      });
  },
});

export const { generateGuestId, logout } = authSlice.actions;

export default authSlice.reducer;
