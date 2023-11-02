import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type Props = {};

const Cart = (props: Props) => {
  const { items } = useSelector((state: any) => state.basket);

  if (items?.length === 0) {
    return <h1 className="text-center">There are no products in your cart.</h1>;
  }

  return (
    <div className="flex justify-between px-4">
      <div className="w-[75%]">
        {items.map((product: any) => {
          return (
            <div className="flex my-7 items-center py-8 px-8 border border-solid border-[#A0DD9F] rounded-md">
              <div className="flex items-center h-full">
                <img
                  src={product.images.url}
                  alt=""
                  className="w-24 max-w-[96px] h-28"
                />
              </div>
              <div className="ml-10 w-full justify-between flex  items-center h-full gap-8">
                <div>
                  <div className="flex text-green-600 items-center gap-4 w-[420px]">
                    <h1 className="  text-base ">{product.title}</h1>
                    {/* <h1 className=" text-2xl">{product.product_id}</h1> */}{" "}
                    |<p className="py-2 text-sm">{product.description}</p>
                  </div>
                  <p>{product.content}</p>
                </div>
                <div className=" border-solid border-[0.5px] border-purple-500 rounded overflow-hidden flex items-center">
                  <button className="p-2 bg-purple-300 text-white text-[1.25rem]">
                    <AiOutlineMinus />
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button className="p-2 bg-purple-300 text-white text-[1.25rem] ">
                    <AiOutlinePlus />
                  </button>
                </div>
                <div>
                  <span className="py-2 block text-3xl">{product.price}</span>
                  <p>Sold: {product.sold}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border border-solid border-gray-200  p-4 h-[16.5rem] mt-7 w-[25%] ml-7 shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px] sticky top-5">
        <h1 className="text-2xl mb-4">Siparis ozeti</h1>
        <div className="flex justify-between mb-3">
          <span className="text-sm">Ürünün Toplamı</span>
          <div className="font-bold">839,80 TL</div>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-sm">Kargo Toplam</span>
          <div className="font-bold">29,99 TL</div>
        </div>
        <div className=" w-full my-4 h-[1px] bg-slate-300" />
        <div className="w-full flex justify-end">
          <div className="font-bold">1.289,70 TL</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
