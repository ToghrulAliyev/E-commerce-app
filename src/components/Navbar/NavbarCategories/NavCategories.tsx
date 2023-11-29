import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import SubNav from "../SubNav";
import { navItems } from "../NavCategories";

type Props = {};

const NavCategories = (props: Props) => {
  const [openSubNav, setOpenSubNav] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const [openCategory,setOpenCategory] = useState<string>("");
 
  useEffect(()=>{
    if(!openSubNav){
      setActiveTab("")
    }
  },[openSubNav])
  return (
    <div className="h-12 flex items-center justify-center border-b border-solid text-slate-900 border-[#A0DD9F] relative">
      <div
        onMouseOver={() => setOpenSubNav(true)}
        onMouseLeave={() => {setOpenSubNav(false); setActiveTab("");}}
        className="flex gap-1 items-center  hover:bg-gray-200 justify-center h-full px-2"
      >
        <div>Categories</div>
        <MdKeyboardArrowRight
          className={`text-xl  ${openSubNav ? "rotate-90" : ""} duration-300`}
        />
      </div>
      {navItems.map((category: any) => (
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
            className={`flex items-center h-full px-3 ${
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