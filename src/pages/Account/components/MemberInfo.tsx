import React, { useState } from "react";
import MyAccout from "..";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";

type Props = {};

const MemberInfo = (props: Props) => {
  const { user } = useSelector((state: any) => state.user);
  const [userName, setUserName] = useState("");

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
                value={user.email}
                type="email"
                name="email"
                placeholder="Email"
                disabled
              />
            </div>
            <div className="flex mt-5 flex-col gap-2 ">
              <label htmlFor="phone">Phone</label>
              <PhoneInput
                placeholder="Enter your phone number"
                inputStyle={{ width: "100%", borderColor: "#e5e7eb" }}
                country="US"
                value="+994"
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
              <PrimaryButton extraClassName="mt-4">Save</PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </MyAccout>
  );
};

export default MemberInfo;
