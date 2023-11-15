import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base } from "../../utils/Constants";

export const refreshToken = createAsyncThunk("token/refreshToken", async () => {
  const token = await axios.get(`${base}/user/refresh_token`, {
    withCredentials: true,
  });
  return token.data.accessToken;
});

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.token = payload;
    });
  },
});

export const { actions, reducer } = tokenSlice;