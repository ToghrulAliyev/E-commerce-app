import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ProductCard from "../../components/Product/ProductCard";
import React, { useState } from "react";
import { setProducts } from "../../store/slices/ApiSlice";
import axios from "axios";
import { base } from "../../utils/Constants";
import { setCallback } from "../../store/slices/CallbackSlice";
import Filter from "../../components/Product/Filter";
import LoadMore from "../../components/LoadMore";

type Props = {};

function Home({}: Props) {
  const listProducts = useSelector(
    (state: any) => state.products.products.products
  );
 
  const productStatus = useSelector((state: any) => state.products.status);
  const [isChecked, setIsChecked] = useState(false);
  const { isAdmin } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: any) => state.refreshToken);
  const callback = useSelector((state: any) => state.callback.callback);

  const dispatch = useDispatch();

  const deleteProduct = async (id: any, public_id: any) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        `${base}/api/destroy`,
        { public_id: public_id },
        {
          headers: { Authorization: token.token },
        }
      );
      const deleteProduct = axios.delete(`${base}/api/products/${id}`, {
        headers: { Authorization: token },
      });
      await destroyImg;
      await deleteProduct;
      setLoading(false);
      dispatch(setCallback(!callback as any));
      window.location.href = "/";
    } catch (error) {}
  };

  const chekckAll = () => {
    if (listProducts) {
      const checkAllList = listProducts.map((product: any) => ({
        ...product,
        checked: !isChecked,
      }));

      dispatch(setProducts(checkAllList));
      setIsChecked(!isChecked);
    }
  };

  const deleteAll = () => {
    listProducts.forEach((product: any) => {
      if (product.checked) {
        deleteProduct(product._id, product.images.public_id);
      }
    });
  };

  if (productStatus === "loading" || !listProducts) {
    return <Loading />;
  }
  return (
    <>
      <Filter />
      {/* {isAdmin ? (
        <div className="mt-6 w-full flex justify-end gap-6 text-lg items-center">
          <span> Select All </span>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={chekckAll}
            className="w-5 h-5"
          />
          <button
            onClick={deleteAll}
            className="bg-purple-300 px-2 rounded py-1 items-center h-10"
          >
            {" "}
            Delete All
          </button>
        </div>
      ) : null} */}

      <div className="w-full flex mt-12 gap-4 flex-wrap">
        {listProducts?.map((products: any) => (
          <React.Fragment key={products._id}>
            <ProductCard
              productKey={products._id}
              listProducts={listProducts}
              product={products}
              loading={loading}
              deleteProduct={deleteProduct}
            />
          </React.Fragment>
        ))}
      </div>
      <LoadMore />
    </>
  );
}

export default Home;
