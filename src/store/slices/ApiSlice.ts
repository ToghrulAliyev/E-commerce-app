import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base } from "../../utils/Constants";

const initialState = {
  products: [],
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const result = await axios.get(`${base}/api/products`);
    return result.data;
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state:any,action:any)=>{
      state.products = action.payload
    }
  },
  extraReducers: {
    [getProducts.pending as any]: (state: any, action: any) => {
      state.status = "loading";
    },
    [getProducts.fulfilled as any]: (state: any, { payload }) => {
      state.products = payload;
      state.status = "success";
    },
    [getProducts.rejected as any]: (state: any, action) => {
      state.status = "failed";
    },
  },
});
export const {setProducts} = productsSlice.actions;
export const { reducer } = productsSlice;
