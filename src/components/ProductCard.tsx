import React from "react";
import { useNavigate } from "react-router-dom";



interface Product {
    _id: number;
    title: string;
    price: number;
    description: string;
    images: {
      url: string;
    };
  }
  
  type ProductTpye = {
    productKey: number;
    product: Product;
  };
  
const ProductCard = ({product, productKey }:ProductTpye) => {

  const navigate = useNavigate();

   
   return (
    <div key={productKey} onClick={()=>navigate(`/detail/${product._id}`)} className="cursor-pointer flex-[0_0_24%] border border-solid border-gray-300 rounded-xl p-6 hover:shadow-2xl duration-300">
      <img src={product?.images?.url} alt="" />
      <div>
        <h2 className="py-2 text-lg text-green-600">{product.title}</h2>
        <p className="py-2">{product.description}</p>
        <span className="py-2 block">{product.price}</span>

      </div>
    </div>
  );
};

export default ProductCard;
