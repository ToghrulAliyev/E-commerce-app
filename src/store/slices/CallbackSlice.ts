import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callback: false,
  callBackProduct: false
};

const callbackSlice = createSlice({
  name: "callback",
  initialState,
  reducers: {
    setCallback: (state:any, action:any)=>{
      state.callback = action.payload
    },
    setCallBackProduct: (state:any, action:any)=>{
      state.callback = action.payload
    }
  },
  
});

export const { setCallback,setCallBackProduct } = callbackSlice.actions;
export const { reducer } = callbackSlice;
