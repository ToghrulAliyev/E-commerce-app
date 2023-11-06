import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useBasket from "../common/SpecialFunctions/AddToCart";
import axios from "axios";
import { base } from "../utils/Constants";
import { setCallback } from "../store/slices/CategorieSlice";

interface Product {
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
};

const ProductCard = ({ product, productKey }: ProductTpye) => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.refreshToken);
  const { isLogged } = useSelector((state: any) => state.user);
  const basket = useSelector((state: any) => state.user.cart);
  const { addToCart } = useBasket();
  const callback = useSelector((state: any) => state.category.callback);
  const dispatch = useDispatch()

  const deleteProduct = async () => {
    try {
      const destroyImg = axios.post(`${base}/api/destroy`,{public_id: product.images.public_id},{
        headers: {Authorization:token.token}
      })
      const deleteProduct =  axios.delete(`${base}/api/products/${product._id}`,{
        headers: {Authorization:token}
      })
      await destroyImg
      await deleteProduct
      dispatch(setCallback(!callback as any))
    } catch (error) {}
  };

  return (
    <div
      className={`${
        isAdmin ? "cursor-auto" : "cursor-pointer"
      }  border border-solid overflow-hidden border-gray-300 flex-[0_0_24%] rounded-xl relative hover:${
        isAdmin ? "shadow-none" : "shadow-2xl"
      } duration-300`}
    >
      <div
        key={productKey}
        onClick={isAdmin ? undefined : () => navigate(`/detail/${product._id}`)}
      >
        {/* checked={product.checked}  */}
        {isAdmin ? (
          <input
            className="w-5 h-5 absolute top-4 left-4"
            type="checkbox"
            // checked={product.checked}
          />
        ) : null}
        <img src={product?.images?.url} alt="" />
        <div className="p-6">
          <h2 className="py-2 text-lg text-green-600">{product.title}</h2>
          <p className="py-2">{product.description}</p>
          <span className="py-2 block">${product.price}</span>

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
                <button onClick={() => deleteProduct()}>Delete</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <button
        onClick={() => addToCart(product, isLogged, basket, token)}
        className="px-7 py-3 bg-purple-400 ml-6 mb-6 rounded text-white"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
