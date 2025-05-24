import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}users/admin/getallusers`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const addUser = createAsyncThunk("admin/addUser", async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}users/admin/adduser`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk("admin/updateUser", async (user) => {
  const { id, name, email, role } = user;
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}users/admin/updateuser/${id}`,
      { name, email, role },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}users/admin/deleteuser/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      return { user: response.data, id };
    } catch (error) {
      console.log(error);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        (state.loading = false),
          (state.users = action.payload),
          (state.error = null);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload.message);
      })
      .addCase(updateUser.fulfilled, async (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const userIndex = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (userIndex > -1) {
          state.users[userIndex] = updateUser;
        }
      })
      .addCase(deleteUser.fulfilled, async (state, action) => {
        (state.loading = false),
          (state.users = state.users.filter(
            (user) => user._id != action.payload.id
          ));
      })
      .addCase(addUser.fulfilled, async (state, action) => {
        (state.loading = false),
          (state.users = state.users.push(action.payload));
      })
      .addCase(addUser.rejected, async (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default adminSlice.reducer;
