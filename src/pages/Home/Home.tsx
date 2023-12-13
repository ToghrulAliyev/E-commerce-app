import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ProductCard from "../../components/Product/ProductCard";
import React, { useEffect, useState } from "react";
import { getProducts, setPage, setProducts } from "../../store/slices/ApiSlice";
import axios from "axios";
import { base } from "../../utils/Constants";
import { setCallback } from "../../store/slices/CallbackSlice";
import Filter from "../../components/Product/Filter";
import LoadMore from "../../components/LoadMore";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {};

function Home({}: Props) {
  const listProducts = useSelector(
    (state: any) => state.products.products.products
  );
  const productStatus = useSelector((state: any) => state.products.status);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: any) => state.refreshToken);
  const callback = useSelector((state: any) => state.callback.callback);
  const dispatch = useDispatch();
  const page = useSelector((state: any) => state.products.page);
  const result = useSelector((state: any) => state.products.result);

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

  if (!listProducts) {
    return <Loading />;
  }
 

  return (
    <>
      <Filter />
      <div className="w-full flex mt-12 gap-4 flex-wrap">
        <InfiniteScroll
          className="w-full flex mt-12 gap-4 flex-wrap"
          dataLength={listProducts?.length > 0 ? listProducts.length : 0}
          next={() => {
            dispatch(setPage(page + 1));
            dispatch(getProducts() as any);
          }}
          hasMore={result == page * 15} // Replace with your condition to check if there are more pages
          loader={loading && <Loading />}
        >
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
        </InfiniteScroll>
      </div>
      {/* <LoadMore /> */}
    </>
  );
}

export default Home;
