import { useDispatch, useSelector } from "react-redux";
import { setBasket } from "../../store/slices/BasketSlice";

const useBasket = () => {
  const dispatch = useDispatch();
  function addToCart(product: any,  isLogged:any, basket:any) {
 
 
    if (!isLogged) return alert("Please login to continue");
    const check = basket.every((item: any) => {
      return item._id !== product._id;
    });
   
    if (check) {
      dispatch(setBasket([...basket, { ...product, quantity: 1 }] as any));
    } else {
      alert("this product has been added to cart");
    }
  }

  return {
    addToCart,
    // Other functions you want to expose
  };
};
export default useBasket;
