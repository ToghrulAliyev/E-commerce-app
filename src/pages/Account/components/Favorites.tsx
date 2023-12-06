import React from "react";
import MyAccout from "..";
import { useSelector } from "react-redux";
import ProductCard from "../../../components/Product/ProductCard";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";

type Props = {};

const Favorites = (props: Props) => {
  const favoriteProducts = useSelector((state: any) => state.user.favorites);
  return (
    <MyAccout>
      <div id="favorite" className="mt-24 pl-7 pt-2  w-full">
        <h1 className="text-3xl font-bold ">Favorites</h1>
        <div className="w-full h-[0.5px] bg-gray-200 mt-4" />
        {favoriteProducts.length < 1 ? (
          <div className="flex flex-col justify-center items-center py-40 gap-6">
            <div className="flex justify-center items-center w-20 h-20 bg-[#f7f7f7] rounded-full text-5xl">
              {" "}
              <FaRegHeart />
            </div>
            <p>No order was found for your account.</p>
            <PrimaryButton>
              <Link to="/">Start shopping</Link>
            </PrimaryButton>
          </div>
        ) : (
          <div className="flex gap-4 flex-wrap mt-8">
            {favoriteProducts.map((product: any) => (
              <React.Fragment key={product._id}>
                <ProductCard
                  product={product}
                  productKey={product._id}
                  listProducts={favoriteProducts}
                  loading={false}
                  deleteProduct={undefined}
                  productRef={null}
                />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </MyAccout>
  );
};

export default Favorites;
