import Login from "../auth/Login";
import Register from "../auth/Register";
import Adress from "../pages/Account/components/Adress";
import ChangePassword from "../pages/Account/components/ChangePassword";
import Favorites from "../pages/Account/components/Favorites";
import MemberInfo from "../pages/Account/components/MemberInfo";
import MyOrders from "../pages/Account/components/MyOrders";
import RegisteredCards from "../pages/Account/components/RegisteredCards";
import Cart from "../pages/Cart/Cart";
import Category from "../pages/Category/Category";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import Home from "../pages/Home/Home";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import NotFound from "../utils/NotFound";

export interface PageRoute {
  path: string;
  component: any;
  exact?: boolean;
}
export const PageRoutes: PageRoute[] = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/cart",
    component: <Cart />,
  },
  {
    path: "/category",
    component: <Category />,
  },
  {
    path: "/create-product",
    component: <CreateProduct />,
  },
  {
    path: "/edit-product/:id",
    component: <CreateProduct />,
  },
  {
    path: "/detail/:id",
    component: <ProductDetail />,
  },
  {
    path: "/account/my-orders",
    component: <MyOrders />,
  },
  {
    path: "/account/favorites",
    component: <Favorites />,
  },
  {
    path: "/account/membership",
    component: <MemberInfo />,
  },
  {
    path: "/account/address",
    component: <Adress />,
  },
  {
    path: "/account/cards",
    component: <RegisteredCards />,
  },
  {
    path: "/account/change-password",
    component: <ChangePassword />,
  },
  {
    path: "*",
    component: <NotFound />
  }
];
