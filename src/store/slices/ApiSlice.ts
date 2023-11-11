import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base } from "../../utils/Constants";
import { Product } from "../../components/Product/ProductCard";



type ProductsState = {
  products: Product; // Replace any[] with the actual type of your products array
  category: string;
  sort: string;
  search: string;
  page: number;
  result: number;
};

const initialState = {
  products: [],
  category: '',
  sort:'',
  search: '',
  page:1,
  result:0

};
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { getState, dispatch }) => {
    const state = getState() as { products: ProductsState }; // Typecast the state to ProductsState
    const { page,category, sort, search } = state.products;

    const searchParams = new URLSearchParams();
    searchParams.append('limit', String(page *10));
    searchParams.append('sort', sort);
    searchParams.append('title[regex]', search);
    const getAllProductsEndpoint = `${base}/api/products?${searchParams.toString()}`;
    let url;
    if (category === "") {
     
      url = getAllProductsEndpoint;
    } else {
      
      url = `${base}/api/products?category=${category}&${searchParams.toString()}`;
    }

    const result = await axios.get(url);
    return result.data;
  }
);


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state:any,action:any)=>{
      state.products.products = action.payload
    },
    setCategory: (state:any, action:any)=>{
      state.category = action.payload
    },
    setSort: (state:any, action:any)=>{
      state.sort = action.payload
    },
    setSearch: (state:any, action:any)=>{
      state.search = action.payload
    },
    setPage: (state:any, action:any)=>{
      state.page = action.payload
    },
    setResult: (state:any, action:any)=>{
      state.result = action.payload
    },
  },
  extraReducers: {
    [getProducts.pending as any]: (state: any, action: any) => {
      state.status = "loading";
    },
    [getProducts.fulfilled as any]: (state: any, { payload }) => {
      state.products = payload;
      state.result = payload.result
      state.status = "success";
    },
    [getProducts.rejected as any]: (state: any, action) => {
      state.status = "failed";
    },
  },
});
export const {setProducts, setCategory, setSort, setSearch, setPage,setResult} = productsSlice.actions;
export const { reducer } = productsSlice;
