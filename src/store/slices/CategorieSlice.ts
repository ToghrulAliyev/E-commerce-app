import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base } from "../../utils/Constants";

const initialState = {
  categories: [],
  callback: false,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      const result = await axios.get(`${base}/api/category`);
      return result.data;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state: any, action: any) => {
    state.categories = action.payload;
    },
    setCallback: (state:any, action:any)=>{
      state.callback = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state:any) => {
      state.status = "loading";
    });
    builder.addCase(getCategories.fulfilled, (state:any, { payload }) => {
      state.categories = payload;
      state.status = "success";
    });
    builder.addCase(getCategories.rejected, (state:any) => {
      state.status = "failed";
    });
  },
});

export const { setCategories, setCallback } = categorySlice.actions;
export const { reducer } = categorySlice;
