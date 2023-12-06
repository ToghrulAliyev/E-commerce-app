import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  callback: false,
};

const callbackSlice = createSlice({
  name: "callback",
  initialState,
  reducers: {
    setCallback: (state:any, action:any)=>{
      state.callback = action.payload
    }
  },
  
});

export const { setCallback } = callbackSlice.actions;
export const { reducer } = callbackSlice;
