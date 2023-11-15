import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useBasket from "../../common/SpecialFunctions/AddToCart";
import axios from "axios";
import { base } from "../../utils/Constants";
import { setCallback } from "../../store/slices/CategorieSlice";
import { useState } from "react";
import Loading from "../Loading";
import { setProducts } from "../../store/slices/ApiSlice";
import { LiaCartPlusSolid } from "react-icons/lia";

export interface Product {
  checked: boolean | undefined;
  _id: number;
  title: string;
  price: number;
  description: string;
  images: {
    public_id: any;
    url: string;
  };
}

type ProductTpye = {
  productKey: number;
  product: Product;
  listProducts: any;
  loading: boolean;
  deleteProduct: any;
};

const ProductCard = ({
  product,
  productKey,
  listProducts,
  loading,
  deleteProduct,
}: ProductTpye) => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.refreshToken);
  const { isLogged } = useSelector((state: any) => state.user);
  const basket = useSelector((state: any) => state.user.cart);
  const { addToCart } = useBasket();
  const dispatch = useDispatch();

  const handleCheck = (id: any) => {
    const updatedListProducts = listProducts?.map((product: any) => {
      if (product._id === id) {
        return {
          ...product,
          checked: !product.checked,
        };
      }
      return product;
    });

    dispatch(setProducts(updatedListProducts));
  };

  // if(loading) return <Loading />

  return (
    <div
      className={`border border-solid overflow-hidden border-gray-300 2xl:flex-[0_0_19.09%] xl:flex-[0_0_23.95%] lg:flex-[0_0_32.13%] md:flex-[0_0_31.6%] sm:flex-[0_0_100%] flex-[0_0_100%] rounded-xl relative hover:${
        isAdmin ? "shadow-none" : "shadow-2xl"
      } duration-300`}
    >
      <div
        className="flex flex-col gap-[10px]   justify-between h-full  "
        key={productKey}
      >
        <div className="sm:block flex">
          {isAdmin ? (
            <input
              className="w-5 h-5 absolute top-4 left-4"
              type="checkbox"
              checked={product.checked}
              onChange={() => handleCheck(product._id)}
            />
          ) : null}

          <div
            onClick={
              isAdmin ? undefined : () => navigate(`/detail/${product._id}`)
            }
            className="w-1/2 sm:w-full overflow-hidden cursor-pointer"
          >
            <img src={product?.images?.url} className="w-full  object-cover " />
          </div>

          <div className="p-2 ">
            <div className="w-full h-24">
              <h2 className="py-1 text-xs text-green-600">{product.title}</h2>
              <p className="py-1 text-sm ">{product.description}</p>
            </div>
            <div className="flex justify-between mt-4">
              <span className="py-2 block">${product.price}</span>

              <button
                onClick={() => addToCart(product, isLogged, basket, token)}
                className="px-3 flex justify-center items-center  rounded-md border-[0.5px] border-solid border-black z-[300]"
              >
                <LiaCartPlusSolid className="text-xl" />
              </button>
            </div>

            {isAdmin ? (
              <div className="flex justify-between gap-3 mt-12">
                <button onClick={() => navigate(`/detail/${product._id}`)}>
                  View
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      deleteProduct(product._id, product.images.public_id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

{
  /* <button
        onClick={() => addToCart(product, isLogged, basket, token)}
        className="px-7 py-3 bg-purple-400 ml-6 mb-6 rounded text-white"
      >
        Add to Cart
      </button> */
}
