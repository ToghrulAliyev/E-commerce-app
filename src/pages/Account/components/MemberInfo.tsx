import React from "react";
import MyAccout from "..";

type Props = {};

const MemberInfo = (props: Props) => {
  return (
    <MyAccout>
      <div id="membership" className="mt-24 pl-7 pt-2  w-full">
        <h1 className="text-3xl font-bold ">Membership Info</h1>
        <div className="w-full h-[0.5px] bg-gray-200 mt-4" />
        <form className="mt-8">
          <div className="w-1/2">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="fullname">Full Name</label>
              <input
                className="border border-solid py-2 rounded px-3 border-gray-200"
                type="text"
                name="fullname"
                placeholder="Full Name"
              />
            </div>

            <div className="flex mt-5 flex-col gap-2 ">
              <label htmlFor="email">E-mail</label>
              <input
                className="cursor-not-allowed border border-solid py-2 rounded px-3 border-gray-200"
                type="email"
                name="email"
                placeholder="Email"
                disabled
              />
            </div>
            <div className="flex mt-5 flex-col gap-2 ">
              <label htmlFor="phone">Phone</label>
              <input
                className="border border-solid py-2 rounded px-3 border-gray-200"
                type="text"
                name="phone"
                placeholder="Phone"
              />
            </div>
            <div className="flex mt-5 flex-col gap-2 ">
              <label htmlFor="address">Address</label>
              <textarea
                className="border border-solid py-2 rounded px-3 border-gray-200"
                cols={30}
                rows={10}
                name="address"
                placeholder="Address"
              />
            </div>
            <div className="flex justify-end ">
              <button
                type="submit"
                className="px-6 py-4 rounded-md text-green-800 bg-[#A0DD9F] hover:bg-[#5cd35a] duration-300 mt-4"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </MyAccout>
  );
};

export default MemberInfo;
