import Login from "../auth/Login";
import Register from "../auth/Register";
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
    path: "*",
    component: <NotFound />
  }
];
