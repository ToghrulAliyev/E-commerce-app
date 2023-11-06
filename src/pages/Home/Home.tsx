import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard";
import React from "react";

type Props = {};

function Home({}: Props) {
  const listProducts = useSelector((state: any) => state.products.products.products);
  const productStatus = useSelector((state: any) => state.products.status);
  

  if (productStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="w-full flex mt-12 gap-4 flex-wrap">
      {listProducts?.map((products: any) => (
        <React.Fragment key={products._id}>
          <ProductCard productKey={products._id} product={products} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Home;
