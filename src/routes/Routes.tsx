import Login from "../auth/Login";
import Register from "../auth/Register";
import Cart from "../pages/Cart/Cart";
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
    path: "/detail/:id",
    component: <ProductDetail />,
  },
  {
    path: "*",
    component: <NotFound />
  }
];
