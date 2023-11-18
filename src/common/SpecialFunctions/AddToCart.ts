import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart, setFavorites } from "../../store/slices/UserSlice";
import { base } from "../../utils/Constants";

const useBasket = () => {
  const dispatch = useDispatch();
  async function addToCart(
    product: any,
    isLogged: any,
    basket: any,
    token: any
  ) {
    if (!isLogged) return alert("Please login to continue");
    const check = basket.every((item: any) => {
      return item._id !== product._id;
    });

    if (check) {
      dispatch(setCart([...basket, { ...product }] as any));
      await axios.patch(
        `${base}/user/addcart`,
        { basket: [...basket, { ...product }] },
        {
          headers: { Authorization: token.token },
        }
      );
    } else {
      alert("this product has been added to cart");
    }
  }

  async function addToFavorites(product: any,isLogged: any,allFavorites: any,token: any) {
    if (!isLogged) return alert("Please login to continue");
    console.log("allFavorites",allFavorites)
    dispatch(setFavorites([...allFavorites, { ...product }] as any));
    await axios.patch(
      `${base}/user/addfavorites`,
      { favorites: [...allFavorites, { ...product }] },
      {
        headers: { Authorization: token.token },
      }
    );
  }

  async function removeFavorites(
    isLogged: any,
    updatedFav: any,
    token: any
  ) {
    if (!isLogged) return alert("Please login to continue");
    console.log("allFavorites",updatedFav)
    dispatch(setFavorites([...updatedFav] as any));
    await axios.patch(
      `${base}/user/addfavorites`,
      { favorites: [...updatedFav] },
      {
        headers: { Authorization: token.token },
      }
    );
  }

  return {
    addToCart,
    addToFavorites,
    removeFavorites
  };
};
export default useBasket;
