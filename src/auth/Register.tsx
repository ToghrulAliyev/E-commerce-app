import React, { useEffect, useState } from "react";
import { PiUserThin } from "react-icons/pi";
import { CiLock, CiUnlock } from "react-icons/ci";
import axios from "axios";
import { TfiEmail } from "react-icons/tfi";
import { base } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
type Props = {};

const Register = (props: Props) => {
  const [user, setUser] = useState({ name:"", email: "", password: "" });
  const [passShow, setPassShow] = useState<boolean>(false);
  const { isAdmin, isLogged } = useSelector((state: any) => state.user);
  const navigate = useNavigate()
  
  function showPass() {
    setPassShow(!passShow);
  }

  function onChangeInput(e: any) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleRegisterSubmit(e: any) {
    e.preventDefault();
    try {
      await axios.post(`${base}/user/register`, { ...user });
      localStorage.setItem("userLogin", "true");
      window.location.href = "/login";
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  }

  
  if(isAdmin || isLogged){
    navigate('/')
  }
 
  return (
    <div className="h-[80vh] p-20">
      <h1 className="text-center text-4xl">Register</h1>
      <form
        onSubmit={handleRegisterSubmit}
        className="mt-8 flex justify-center items-center flex-col gap-2"
      >
        <div className="w-1/2 flex justify-center items-center relative">
          <PiUserThin className="text-[#A0DD9F] text-3xl absolute left-[1.2rem]" />
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            onChange={onChangeInput}
            value={user.name}
            className="rounded !bg-white border border-solid border-[#edf1f2] h-[55px] w-full px-16  "
          />
        </div>
        <div className="w-1/2 flex justify-center items-center relative">
        <TfiEmail className="text-[#A0DD9F] text-2xl absolute left-[1.4rem]" />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            onChange={onChangeInput}
            value={user.email}
            className="rounded !bg-white border border-solid border-[#edf1f2] h-[55px] w-full px-16  "
          />
        </div>
        <div className="w-1/2 flex justify-center items-center relative">
          {passShow ? (
            <CiUnlock
              onClick={() => showPass()}
              className="text-[#A0DD9F] cursor-pointer text-3xl absolute left-[1.2rem]"
            />
          ) : (
            <CiLock
              onClick={() => showPass()}
              className="text-[#A0DD9F] cursor-pointer text-3xl absolute left-[1.2rem]"
            />
          )}

          <input
            type={`${passShow ? "text" : "password"}`}
            name="password"
            placeholder="Password"
            className="rounded border border-solid border-[#edf1f2] h-[55px] w-full px-16 bg-white"
            onChange={onChangeInput}
            value={user.password}
          />
        </div>
        <button
          className="px-6 py-3 bg-green-500 hover:bg-green-600 duration-300 text-white rounded"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
