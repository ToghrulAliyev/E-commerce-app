import React, { useEffect, useLayoutEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { getProducts } from "../store/slices/ApiSlice";
import { refreshToken } from "../store/slices/TokenSlice";
import { getUser } from "../store/slices/UserSlice";
import { getCategories } from "../store/slices/CategorieSlice";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const token = useSelector((state: any) => state.refreshToken);
  const dispatch = useDispatch();
  const callback = useSelector((state: any) => state.category.callback);
  const category = useSelector((state: any) => state.products.category);
 
  useEffect(() => {
    dispatch(getProducts() as any);
   
  }, [dispatch,callback]);
  useEffect(()=>{
    dispatch(getCategories() as any)
  },[callback, category])

  useEffect(() => {
    if (token.token) {
      dispatch(getUser(token.token) as any);
    }
  }, [dispatch, token]);

  useLayoutEffect(() => {
    const firstlogin = localStorage.getItem("userLogin");
    if (firstlogin) {
      dispatch(refreshToken() as any);
    }
  }, []);


  return (
    <div className="relative">
      <header>
        <Navbar />
      </header>
      <div className="max-w-screen-xl min-h-screen m-auto  ">
        {props.children}
      </div>
      {/* <footer className="absolute bottom-0 w-full h-16 bg-slate-500">This is footer</footer> */}
    </div>
  );
};

export default Layout;
