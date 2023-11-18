 import { Link } from "react-router-dom";
import MyAccout from "..";
 import { PiShoppingCartLight } from "react-icons/pi";

type Props = {};

const MyOrders = (props: Props) => {

  
 
  return (
    <MyAccout>
      <div id="order" className="mt-24 pl-7 pt-2  w-full">
        <h1 className="text-3xl font-bold ">My Orders</h1>
        <div className="w-full h-[0.5px] bg-gray-200 mt-4" />
        <div className="flex flex-col justify-center items-center py-40 gap-6">
               <div className="flex justify-center items-center w-20 h-20 bg-[#f7f7f7] rounded-full text-5xl"> <PiShoppingCartLight /></div>
               <p>No order was found for your account.</p>
               <Link to="/" className="px-6 py-4 rounded-md text-green-800 bg-[#A0DD9F] hover:bg-[#5cd35a] duration-300">Start shopping</Link>
        </div>
      </div>
    </MyAccout>
  );
};

export default MyOrders;
