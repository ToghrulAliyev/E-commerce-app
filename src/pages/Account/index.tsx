import React, {useEffect} from "react";
import { BsTruck } from "react-icons/bs";
import { CiHeart, CiLock } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa";
import { MdOutlineMyLocation } from "react-icons/md";
import { PiUserThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

type Props = {
  children: React.ReactNode | any;
};

const navLinks = [
  {
    id:"order",
    name: "Orders",
    link: "/account/my-orders",
    icon: <BsTruck className=" text-3xl" />,
  },
  {
    id:"favorite",
    name: "Favorites",
    link: "/account/favorites",
    icon: <CiHeart className=" text-3xl" />,
  },
  {
    id:'membership',
    name: "Membership Information",
    link: "/account/membership",
    icon: <PiUserThin className=" text-2xl" />,
  },
  {
    id:"address",
    name: "Address Information",
    link: "/account/address",
    icon: <MdOutlineMyLocation className=" text-2xl" />,
  },
  {
    id:"cards",
    name: "Registered Cards",
    link: "/account/cards",
    icon: <FaCreditCard className=" text-2xl" />,
  },
  {
    id:"password",
    name: "Change Password",
    link: "/account/change-password",
    icon: <CiLock className=" text-2xl" />,
  },
];

const MyAccout = ({ children }: Props) => {
  const { isLogged } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
   
  const childrenId = children.props.id
  
  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <div className="flex w-full">
      <div className="w-[350px] max-w-[350px] h-full flex flex-col mt-28 mr-8">
        {navLinks.map((link: any) => (
          <div key={link.name}>
            <Link
              to={link.link}
              className={`hover:bg-gray-100 ${childrenId === link.id ? "bg-[#edf8ed] text-[#3ca735]" : "" }  duration-300 flex px-6 py-6 items-center gap-2 rounded-lg`}
            >
              {link.icon}
              {link.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
};

export default MyAccout;
