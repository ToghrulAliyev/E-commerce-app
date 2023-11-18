import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { MdOutlineArrowBack } from "react-icons/md";
import ProductCard from "../../components/Product/ProductCard";
type Props = {};

const ProductDetail = (props: Props) => {
  const params = useParams();
  const productRef = useRef(null)
  const listProducts = useSelector(
    (state: any) => state.products.products.products
  );
  const [selectedProduct, setSelectedProduct] = useState<any>();

  useEffect(() => {
    if (params) {
      listProducts?.forEach((product: any) => {
        if (product._id === params.id) {
          setSelectedProduct(product);
        }
      });
    }
  }, [listProducts, params]);

  if (!selectedProduct) {
    return <Loading />;
  }

  return (
    <>
      {/* <button className="cursor-pointer p-3 bg-slate-400 text-2xl"> <MdOutlineArrowBack /></button> */}
      <div ref={productRef} className="flex my-28  py-8 px-8 border border-solid border-[#A0DD9F]">
        <img src={selectedProduct.images.url} alt="" className="w-[40%]" />
        <div className="ml-10 flex flex-col justify-between">
          <div>
            <div className="flex text-green-600 items-center">
              <h1 className="  text-2xl ">{selectedProduct.title}</h1>
              <h1 className=" text-2xl">{selectedProduct.product_id}</h1>
            </div>
            <p className="py-2 text-3xl">{selectedProduct.description}</p>
            <p>{selectedProduct.content}</p>

            <span className="py-2 block text-3xl">
              ${selectedProduct.price}
            </span>
            <p>Sold: {selectedProduct.sold}</p>
          </div>

          <Link
            to="/cart"
            className="flex px-4 py-2 rounded mt-8 items-center justify-center bg-[#FFD9B7]"
          >
            Buy now
          </Link>
        </div>
      </div>
      <div>
        {" "}
        <h1 className="text-center mb-16 text-2xl ">
          Similar Options That May Interest You
        </h1>
        <div className="flex gap-4 flex-wrap">
          {listProducts.map((product: any) => {
            return product.category === selectedProduct.category ? (
              <React.Fragment key={product._id}>
                <ProductCard product={product} productKey={product._id} listProducts={listProducts} loading={false} deleteProduct={undefined} productRef={productRef} />
              </React.Fragment>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
