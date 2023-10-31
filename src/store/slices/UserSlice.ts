import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { base } from "../../utils/Constants";

const initialState = {
  user: [],
  status: null,
  isAdmin: false,
  isLogged: false,
};


export const getUser = createAsyncThunk("user/getUser", async (token: any) => {
  try {
    const result = await axios.get(`${base}/user/info`, {
      headers: { Authorization: token },
    });
    return result.data;
  } catch (error: any) {
    throw Error(error.message);
  }
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setLogged(state, action) {
      state.isLogged = action.payload;
    },
  },
  extraReducers: {
    [getUser.pending as any]: (state: any, action: any) => {
      state.status = "loading";
    },
    [getUser.fulfilled as any]: (state: any, { payload }) => {
      state.user = payload;
      state.status = "success";
      state.isLogged = true; // Set isLogged to true after successful getUser
      state.isAdmin = payload.role === 1 ? true : false; // Set isAdmin based on the role
    },
    [getUser.rejected as any]: (state: any, action) => {
      state.status = "failed";
    },
  },
});

export const { reducer } = userSlice;
