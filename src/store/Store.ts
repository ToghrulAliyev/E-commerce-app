import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./slices/CounterSlice";
import { reducer as productsSliceReducer } from "./slices/ApiSlice";
import {  reducer as tokenSliceReducer } from "./slices/TokenSlice";
import {  reducer as userSliceReducer } from "./slices/UserSlice";
import {  reducer as callBackSlice } from "./slices/CallbackSlice";
 


export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    products: productsSliceReducer,
    refreshToken: tokenSliceReducer,
    user: userSliceReducer,
    callback: callBackSlice,
   },
});
