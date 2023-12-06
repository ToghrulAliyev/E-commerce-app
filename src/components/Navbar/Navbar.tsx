import axios from "axios";
import { BsTruck } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { PiShoppingCartLight, PiUserThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { base } from "../../utils/Constants";

type Props = {};

const navRoutesAdmin = [
  { path: "/create-product", name: "Create Product" },
  // { path: "/category", name: "Category" },
  {
    path: "/account/favorites",
    name: "Favorites",
    icon: <CiHeart className="text-2xl" />,
  },
  {
    path: "/account/my-orders",
    name: "Account",
    icon: <PiUserThin className="text-2xl" />,
  },
  { path: "/", name: "Logout" },
];

const navRoutesUser = [
  {
    path: "/account/favorites",
    name: "Favorites",
    icon: <CiHeart className="text-2xl" />,
  },
  {
    path: "/account/my-orders",
    name: "Account",
    icon: <PiUserThin className=" text-2xl" />,
  },
  { path: "/", name: "Logout" },
];

const navRoutesUnauth = [
  { path: "/shop", name: "Shop" },
  { path: "/login", name: "Login" },
  { path: "/register", name: "Register" },
];

//#e1f8e7

const getNavRoutes = (isLogged: boolean, isAdmin: boolean) => {
  const routes = [];

  if (isLogged) {
    routes.push(...(isAdmin ? navRoutesAdmin : navRoutesUser));
  } else {
    routes.push(...navRoutesUnauth);
  }

  return routes;
};

const Navbar = (props: Props) => {
  const cart = useSelector((state: any) => state.user.cart);
  const { isAdmin, isLogged } = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const navbarRoutes = getNavRoutes(isLogged, isAdmin);
  const loggedOut = async () => {
    await axios.get(`${base}/user/logout`, {
      withCredentials: true,
    });
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="w-full px-16 py-6 border-b border-solid text-slate-900 border-gray-600">
      <div className="flex justify-between w-full max-w-screen-xl m-auto">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex gap-2 items-center text-gray-600 text-2xl"
        >
          <HiOutlineShoppingBag className="text-3xl" />
          Softrade
        </div>
        <div className="flex items-center">
          <ul className="gap-8 text-sm text-slate-900 mr-4 md:flex hidden">
            {navbarRoutes.map((route: any) => (
              <div key={route.name} className="flex gap-1 items-center hover:text-red-500 hover:cursor-pointer   duration-300">
                 {route?.icon ? route.icon : null}
                <li
                  onClick={() => {
                    if (route.name === "Logout") {
                      loggedOut();
                      // Perform any other logout logic here if needed
                    } else {
                      navigate(route.path);
                    }
                  }}
                  className=""
                >
                  {route.name}
                </li>
               
              </div>
            ))}
             
          </ul>
          {isLogged ? (
            /* @ts-ignore */
            <Link before={`${cart.length}`} to="/cart" className={`text-3xl relative text-slate-900 before:content-[attr(before)] before:absolute before:flex before:items-center before:justify-center before:h-5 before:rounded-full before:w-5 before:bg-gray-500 before:text-white before:text-sm before:left-4 before:top-[-6px]`}>
              <PiShoppingCartLight />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
