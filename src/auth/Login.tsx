import React, { useState, useEffect } from "react";
import { TfiEmail } from "react-icons/tfi";
import { CiLock, CiUnlock } from "react-icons/ci";
import axios from "axios";
import { base } from "../utils/Constants";
type Props = {};

const Login = (props: Props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [passShow, setPassShow] = useState<boolean>(false);

  function showPass() {
    setPassShow(!passShow);
  }
  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${base}/user/login`,{ ...user },{ withCredentials: true });
      localStorage.setItem("userLogin", "true"); 
      window.location.href = "/";
    } catch (err: any) {
      alert(err.response.data.msg);
    }
  };

  return (
    <form className="h-[80vh] p-20" onSubmit={handleLoginSubmit}>
      <h1 className="text-center text-4xl">Login</h1>
      <div className="mt-8 flex justify-center items-center flex-col gap-2">
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
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
