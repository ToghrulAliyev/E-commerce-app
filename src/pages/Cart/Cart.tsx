import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/slices/UserSlice";
import { base } from "../../utils/Constants";

type Props = {};

const Cart = (props: Props) => {
  const basket = useSelector((state: any) => state.user.cart);

  console.log("basket",basket)
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.refreshToken);

  const addToCart = async (updatedBasket: any) => {
    await axios.patch(
      `${base}/user/addcart`,
      { basket: updatedBasket },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id: any) => {
    const updatedBasket = basket.map((item: any) => {
      if (item._id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    dispatch(setCart(updatedBasket));
    addToCart(updatedBasket);
  };

  const decrement = (id: any) => {
    const updatedBasket = basket.map((item: any) => {
      if (item._id === id && item.quantity > 0) {
        return {
          ...item,
          quantity:
            item.quantity === 1 ? (item.quantity = 1) : item.quantity - 1,
        };
      }
      return item;
    });
    dispatch(setCart(updatedBasket));
    addToCart(updatedBasket);
  };

  const removeProduct = (id: any) => {
    // if (window.confirm("Do you really want to delete this product")) {
      const updatedBasket = basket.filter((item: any) => item._id !== id);
      dispatch(setCart(updatedBasket));
      addToCart(updatedBasket);
    // }
  };

  useEffect(() => {
    const getTotal = () => {
      const total = basket?.reduce((prev: any, item: any) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [basket]);
  
  return (
    <div className="flex justify-between px-4">
      <div className="w-[75%]">
        {basket.map((product: any) => {
          return (
            <div
              key={product._id}
              className="flex my-7 items-center py-8 px-8 border border-solid border-gray-500 rounded-md"
            >
              <div className="flex items-center h-full">
                <img
                  src={product.images.url}
                  alt=""
                  className="w-24 max-w-[96px] h-28"
                />
              </div>
              <div className="ml-10 w-full justify-between flex  items-center h-full gap-8">
                <div className="flex flex-col items-start">
                  <div className=" text-red-600 items-center   w-[420px]">
                    <h1 className="text-lg mb-1">{product.title}</h1>
                
                    <p className=" text-sm">{product.description}</p>
                  </div>
                  <p>{product.content}</p>
                </div>
                <div className=" border-solid border-[0.5px] border-gray-500 rounded overflow-hidden flex items-center">
                  <button
                    onClick={() => decrement(product._id)}
                    className="p-2 bg-gray-100 text-black text-[1.25rem]"
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="mx-2 text-lg">{product.quantity}</span>
                  <button
                    onClick={() => increment(product._id)}
                    className="p-2 bg-gray-100 text-black text-[1.25rem] "
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <div>
                  <span className="py-2 block text-3xl">
                    ${product.price * product.quantity}
                  </span>
                  <p>Sold: {product.sold}</p>
                </div>
                <div
                  onClick={() => removeProduct(product._id)}
                  className="text-xl p-1 cursor-pointer"
                >
                  <BsTrash />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border border-solid border-gray-200  p-4 h-[16.5rem] mt-7 w-[25%] ml-7 shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px] sticky top-5">
        <h1 className="text-2xl mb-4">Order summary</h1>
        <div className="flex justify-between mb-3">
          <span className="text-sm">Total of Product</span>
          <div className="font-bold">${total - 18}</div>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-sm">Shipping Total</span>
          <div className="font-bold">$18</div>
        </div>
        <div className=" w-full my-4 h-[1px] bg-slate-300" />
        <div className="w-full flex justify-end">
          <div className="font-bold">${total}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
