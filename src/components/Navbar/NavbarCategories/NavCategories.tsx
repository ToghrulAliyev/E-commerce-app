import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import SubNav from "../SubNav";
import { navCategories } from "../NavCategories";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../store/slices/ApiSlice";
import { setCallback } from "../../../store/slices/CallbackSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

const NavCategories = (props: Props) => {
  const [openSubNav, setOpenSubNav] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const [openCategory, setOpenCategory] = useState<string>("");
  const navigate = useNavigate();
  const callback = useSelector((state: any) => state.callback.callback);
  const dipatch = useDispatch();
  useEffect(() => {
    if (openSubNav) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "17px";
    } else {
      setActiveTab("");
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
  }, [openSubNav]);

  function handleCategoryActions(category: any) {
    dipatch(setCategory(encodeURIComponent(category.title)));
    dipatch(setCallback(!callback as any));
    setOpenSubNav(false);
    navigate("/");
  }
  return (
    <div className="h-12 flex items-center justify-center border-b border-solid text-slate-900 border-gray-600 relative">
      <div
        onMouseOver={() => setOpenSubNav(true)}
        onMouseLeave={() => {
          setOpenSubNav(false);
          setActiveTab("");
        }}
        className="flex gap-1 items-center  hover:bg-gray-200 justify-center h-full px-2"
      >
        <div>Categories</div>
        <MdKeyboardArrowRight
          className={`text-xl  ${openSubNav ? "rotate-90" : ""} duration-300`}
        />
      </div>
      {navCategories.map((category: any) => (
        <React.Fragment key={category.title}>
          <div
            onMouseOver={() => {
              setOpenSubNav(true);
              setActiveTab(category.title);
              setOpenCategory(category.title);
            }}
            onMouseLeave={() => {
              setOpenSubNav(false);
            }}
            onClick={() => handleCategoryActions(category)}
            className={`cursor-pointer flex items-center h-full px-3 ${
              activeTab === category.title ? "bg-gray-200" : ""
            } duration-300`}
          >
            {category.title}
          </div>
        </React.Fragment>
      ))}

      <SubNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSubNav={openSubNav}
        setOpenSubNav={setOpenSubNav}
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
      />
    </div>
  );
};

export default NavCategories;

// group at parent
// group-hover:children
