import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUser = async (id) => {
  const { data } = await axios.get(`/api/users/${id}`);
  return data;
};

export const fetchUserThunk = createAsyncThunk(
  "fetchUser/handleFetchUser",
  async (payload) => {
    try {
      const data = await fetchUser(payload.id);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: undefined,
    isLoggedIn: false,
  },
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });
  },
});

export const { storeUser, removeUser } = userSlice.actions;
export default userSlice;
