import React from "react";
import MyAccout from "..";
import { FaCreditCard } from "react-icons/fa";

type Props = {};

const RegisteredCards = (props: Props) => {
  return (
    <MyAccout>
      <div id="cards" className="mt-24 pl-7 pt-2  w-full">
        <h1 className="text-3xl font-bold ">Membership Info</h1>
        <div className="w-full h-[0.5px] bg-gray-200 mt-4" />
        <div className="flex flex-col justify-center items-center py-40 gap-6">
          <div className="flex justify-center items-center w-20 h-20 bg-[#f7f7f7] rounded-full text-5xl">
            {" "}
            <FaCreditCard />
          </div>
          <p>
            You do not have a registered card. To register a card, You need to
            create an order.
          </p>
        </div>
      </div>
    </MyAccout>
  );
};

export default RegisteredCards;
