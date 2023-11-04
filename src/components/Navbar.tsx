import React, { useState } from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  CounterState,
  decrement,
  increment,
  incrementByAmount,
} from "../store/slices/CounterSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { base } from "../utils/Constants";
type Props = {};

const navRoutesAdmin = [
  { path: "/create-product", name: "Create Product" },
  { path: "/categories", name: "Categories" },
  { path: "/products", name: "Products" },
  { path: "/history", name: "History" },
  { path: "/", name: "Logout" },
];

const navRoutesUser =[
  { path: "/products", name: "Products" },
  { path: "/history", name: "History" },
  { path: "/", name: "Logout" },
]

const navRoutesUnauth = [
  { path: "/shop", name: "Shop" },
  { path: "/login", name: "Login" },
  { path: "/register", name: "Register" },
];

//#e1f8e7

const getNavRoutes = (isLogged: boolean, isAdmin: boolean) => {
  const routes = [];

  if (isLogged) {
    routes.push(...(isAdmin ? navRoutesAdmin : navRoutesUser));
  } else {
    routes.push(...navRoutesUnauth);
  }

  return routes;
};

const Navbar = (props: Props) => {
  const cart = useSelector((state: any) => state.user.cart);
  const { isAdmin, isLogged } = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const navbarRoutes = getNavRoutes(isLogged, isAdmin);
  const loggedOut = async () => {
    await axios.get(`${base}/user/logout`,{
      withCredentials:true
    });
    localStorage.clear();
    window.location.href = "/"
  };
  

  return (
    <div className=" w-full px-16 py-6 border-b border-solid text-slate-900 border-[#A0DD9F]">
      <div className="flex justify-between w-full max-w-screen-xl m-auto">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex gap-2 items-center text-[#A0DD9F] text-xl"
        >
          <HiOutlineShoppingBag className="text-3xl" />
          Softrade
        </div>
        <div className="flex items-center">
          <ul className="flex gap-8 text-lg text-slate-900 mr-4">
            {navbarRoutes.map((route) => (
              <li
                key={route.path}
                onClick={() => {
                  if (route.name === "Logout") {
                    loggedOut();
                    // Perform any other logout logic here if needed
                  } else {
                    navigate(route.path);
                  }
                }}
                className="hover:cursor-pointer hover:text-[#A0DD9F] duration-300"
              >
                {route.name}
              </li>
            ))}
            {/* <button onClick={()=> dispatch(increment())}>plus</button>
          <button onClick={()=> dispatch(decrement())}>minus</button> */}
          </ul>
          {/* @ts-ignore */}
          {isLogged ? ( <Link before={`${cart.length}`} to="/cart" className={`text-3xl relative text-slate-900 before:content-[attr(before)] before:absolute before:flex before:items-center before:justify-center before:h-5 before:rounded-full before:w-5 before:bg-[#A0DD9F] before:text-stone-950 before:text-sm before:left-4 before:top-[-6px]`}
            >
              <PiShoppingCartLight />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
