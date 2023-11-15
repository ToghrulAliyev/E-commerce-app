import React from "react";
import MyAccout from "..";
import { useParams } from "react-router-dom";

type Props = {};

const MyOrders = (props: Props) => {

    const params = useParams()
    console.log("params",params)
  return (
    <MyAccout>
      <div id="order" className="mt-28 p-7 h-screen bg-red-400 w-full">
        <h1>My Orders</h1>
      </div>
    </MyAccout>
  );
};

export default MyOrders;
