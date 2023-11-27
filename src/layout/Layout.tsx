import React, { useEffect, useLayoutEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import { getProducts } from "../store/slices/ApiSlice";
import { refreshToken } from "../store/slices/TokenSlice";
import { getUser } from "../store/slices/UserSlice";
import { getCategories } from "../store/slices/CategorieSlice";
import NavCategories from "../components/Navbar/NavbarCategories/NavCategories";

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
    <div className="relative text-sm">
      <header>
        <Navbar />
        <NavCategories />
      </header>
      <div className="2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm min-h-screen m-auto sm:px-16 px-6">
        {props.children}
      </div>
      {/* <footer className="absolute bottom-0 w-full h-16 bg-slate-500">This is footer</footer> */}
    </div>
  );
};

export default Layout;
