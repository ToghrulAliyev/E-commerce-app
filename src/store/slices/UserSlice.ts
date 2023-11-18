import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base } from "../../utils/Constants";

const initialState = {
  user: [],
  status: null,
  isAdmin: false,
  isLogged: false,
  cart: [],
  favorites: [],
  isFav:false
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
    setCart(state,action) {
      state.cart = action.payload
    },
    setFavorites(state,action) {
      state.favorites = action.payload
    },
    setIsFav(state,action){
      state.isFav = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state:any) => {
      state.status = "loading";
    });
    builder.addCase(getUser.fulfilled, (state:any, { payload }) => {
      state.user = payload;
      state.status = "success";
      state.isLogged = true;
      state.isAdmin = payload.role === 1 ? true : false;
      state.cart = payload.cart;
      state.favorites = payload.favorites
    });
    builder.addCase(getUser.rejected, (state:any) => {
      state.status = "failed";
    });
  },
});

export const { setCart, setFavorites, setIsFav } = userSlice.actions

export const { reducer } = userSlice;
