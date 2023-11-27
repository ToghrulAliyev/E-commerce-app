import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import SubNav from "../SubNav";
import { navItems } from "../NavCategories";

type Props = {};

const NavCategories = (props: Props) => {
  

  const [openSubNav, setOpenSubNav] = useState<boolean>(false);
  // group at parent
  // group-hover:children
  return (
    <div className="h-12 flex items-center justify-center border-b border-solid text-slate-900 border-[#A0DD9F] relative">
      <div
        onMouseOver={() => setOpenSubNav(true)}
        onMouseLeave={() => setOpenSubNav(false)}
        className="flex gap-1 items-center  hover:bg-gray-200 justify-center h-full px-2"
      >
        <div>Categories</div>
        <MdKeyboardArrowRight
          className={`text-xl  ${openSubNav ? "rotate-90" : ""} duration-300`}
        />
      </div>
      {navItems.map((item: any) => (
        <>
          <div
            onMouseOver={() => setOpenSubNav(true)}
            onMouseLeave={() => setOpenSubNav(false)}
            className="flex items-center h-full px-3 hover:bg-gray-200 duration-300"
          >
            {item.title}
          </div>
        </>
      ))}

      <SubNav openSubNav={openSubNav} setOpenSubNav={setOpenSubNav} />
    </div>
  );
};

export default NavCategories;
