import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./slices/CounterSlice";
import { reducer as productsSliceReducer } from "./slices/ApiSlice";
import {  reducer as tokenSliceReducer } from "./slices/TokenSlice";
import {  reducer as userSliceReducer } from "./slices/UserSlice";
import {  reducer as categorySlice } from "./slices/CategorieSlice";


export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    products: productsSliceReducer,
    refreshToken: tokenSliceReducer,
    user: userSliceReducer,
    category: categorySlice
  },
});
