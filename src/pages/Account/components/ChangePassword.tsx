import {useState} from "react";
import MyAccout from "..";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {};

const ChangePassword = (props: Props) => {

  const [oldPassShow, setOldPassShow] = useState<boolean>(false);
  const [newPassShow, setNewPassShow] = useState<boolean>(false);
  const [repeatPassShow, setRepeatPassShow] = useState<boolean>(false);

 
  return (
    <MyAccout>
      <div id="password" className="mt-24 pl-7 pt-2  w-full">
        <h1 className="text-3xl font-bold ">Change Password</h1>
        <div className="w-full h-[0.5px] bg-gray-200 mt-4" />
        <form className="mt-8">
          <div className="w-1/2">
          <div className="flex flex-col gap-2 relative ">
              <label htmlFor="oldpass">Old Password</label>
              <input
                className="border border-solid py-2 rounded px-3 border-gray-200"
                type={`${oldPassShow ? "text" : "password"}`}
                name="oldpass"
                placeholder="Old Password"
              />
              {oldPassShow ? <FaEye onClick={()=>setOldPassShow(!oldPassShow)} className="absolute right-3 top-8 text-[#A0DD9F] cursor-pointer text-xl" /> : <FaEyeSlash onClick={()=>setOldPassShow(!oldPassShow)} className="absolute right-3 top-8 text-[#A0DD9F] cursor-pointer text-xl" /> }
              
            </div>
            <div className="flex mt-6 flex-col gap-2 relative">
              <label htmlFor="newpass">New Password</label>
              <input
                className="border border-solid py-2 rounded px-3 border-gray-200"
                type={`${newPassShow ? "text" : "password"}`}
                name="newpass"
                placeholder="New Password"
              />
               {newPassShow ? <FaEye onClick={()=>setNewPassShow(!newPassShow)} className="absolute right-3 top-8 text-[#A0DD9F] cursor-pointer text-xl" /> : <FaEyeSlash onClick={()=>setNewPassShow(!newPassShow)} className="absolute right-3 top-8 text-[#A0DD9F] cursor-pointer text-xl" /> }
            </div>
            <div className="flex mt-6 flex-col gap-2 relative">
              <label htmlFor="repeatpass">Repeat Password</label>
              <input
                className="border border-solid py-2 rounded px-3 border-gray-200"
                type={`${repeatPassShow ? "text" : "password"}`}
                name="repeatpass"
                placeholder="Repeat Password"
              />
               {repeatPassShow ? <FaEye onClick={()=>setRepeatPassShow(!repeatPassShow)} className="absolute right-3 top-8 text-[#A0DD9F] cursor-pointer text-xl" /> : <FaEyeSlash onClick={()=>setRepeatPassShow(!repeatPassShow)} className="absolute right-3 top-8 text-[#A0DD9F] cursor-pointer text-xl" /> }
            </div>
          </div>
          <div className="w-1/2">
          <button
                type="submit"
                className="px-7 py-4 rounded-md text-green-800 bg-[#A0DD9F] hover:bg-[#5cd35a] duration-300 mt-4 flex"
              >
                Update
              </button>
              </div>
        </form>
      </div>
    </MyAccout>
  );
};

export default ChangePassword;
