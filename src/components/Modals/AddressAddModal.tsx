import React, { FC } from "react";
import { IoCloseOutline } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

const AddressAddModal: FC<Props> = ({ openModal, setOpenModal }) => {
  return (
    <>
      <div
        className={`${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } duration-200 fixed z-[1040] w-full h-screen bg-[rgba(0,0,0,0.4)] backdrop-blur-[0.5px] left-0 top-0 flex justify-center items-center`}
      >
        <div className="w-1/3 h-3/4 rounded-md bg-white">
          <div className="border-b border-solid border-gray-200 px-6 py-3 font-semibold text-xl flex justify-between items-center">
            <h1>Add Address</h1>
            <div
              onClick={() => setOpenModal(!openModal)}
              className="cursor-pointer"
            >
              <IoCloseOutline className="text-2xl " />
            </div>
          </div>

          <form className="m-5 flex flex-col gap-4">
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-2 w-[48%]">
                <label htmlFor="name">Name</label>
                <input
                  className="border border-solid border-gray-300 rounded px-[10px] py-[5px]"
                  type="text"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-2 w-[48%]">
                <label htmlFor="surname">Surname</label>
                <input
                  className="border border-solid border-gray-300 rounded px-[10px] py-[5px]"
                  type="text"
                  name="surname"
                />
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-2 w-[48%]">
                <label htmlFor="phone">Phone</label>
                {/* <input type="phone" name="phone" /> */}
                <PhoneInput
                  // className="border border-solid border-gray-300 rounded px-[10px] py-[6px]"
                  placeholder="Enter your phone number"
                  // value={phoneNumber}
                  // onChange={handleChangePhoneNumber}
                  inputStyle={{ width: "100%" }}
                  country="US"
                  // isValid={phoneNumber.length >= 10
                  value="+994"
                />
              </div>
              <div className="flex flex-col gap-2 w-[48%]">
                <label htmlFor="surname">City</label>
                <select
                  className="border border-solid border-gray-300 rounded px-[10px] py-[5px]"
                  name="surname"
                >
                  <option value="">Baku</option>
                  <option value="">Sumgait</option>
                  <option value="">Ganja</option>
                  <option value="">Mingachevir</option>
                  <option value="">Hirdalan</option>
                  <option value="">Shirvan</option>
                  <option value="">Nahchivan</option>
                  <option value="">Shaki</option>
                  <option value="">Yevlakh</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-2 w-[48%]">
                <label htmlFor="district">District</label>
                <input
                  className="border border-solid border-gray-300 rounded px-[10px] py-[5px]"
                  type="text"
                  name="district"
                />
              </div>
              <div className="flex flex-col gap-2 w-[48%]">
                <label htmlFor="settlement">Settlement</label>
                <input
                  className="border border-solid border-gray-300 rounded px-[10px]  py-[5px]"
                  type="text"
                  name="settlement"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address">Address</label>
              <textarea
                className="border border-solid py-2 rounded px-3 border-gray-200 h-28"
                cols={30}
                rows={10}
                name="address"
              />
            </div>
            <div className="flex flex-col gap-2">
            <label htmlFor="title">Address Title</label>
            <input
                  className="border border-solid border-gray-300 rounded px-[10px] py-[5px]"
                  type="text"
                  name="title"
                />
            </div>
            <button
              type="submit"
              className="px-6 py-4 rounded-md text-black bg-[#F3EEEA] hover:bg-[#EBE3D5] duration-300 mt-4"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressAddModal;
