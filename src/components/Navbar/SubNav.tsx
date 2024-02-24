import { FC, useEffect } from "react";
import { GoChevronRight } from "react-icons/go";
import { TbCategory } from "react-icons/tb";
import { navCategories } from "./NavCategories";
import {
  setCategory,
  setDetailedSubCategory,
  setSubcategory,
} from "../../store/slices/ApiSlice";
import { setCallback } from "../../store/slices/CallbackSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {
  openSubNav: boolean;
  setOpenSubNav: (value: boolean) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
  openCategory: string;
  setOpenCategory: (value: string) => void;
};

const SubNav: FC<Props> = ({
  openSubNav,
  setOpenSubNav,
  activeTab,
  setActiveTab,
  openCategory,
  setOpenCategory,
}) => {
  const dispatch = useDispatch();
  const callback = useSelector((state: any) => state.callback.callback);
  const navigate = useNavigate();
  const subc = useSelector((state: any) => state.products.subcategory);

  const getWomenClothingSubcategory = (title: string) => {
    return navCategories.find((item) => item.title === title);
  };

  const womenClothingSubcategory = getWomenClothingSubcategory(openCategory);

  if (!womenClothingSubcategory) {
    console.log("There is no such category");
  }

  useEffect(() => {}, [womenClothingSubcategory]);

  function handleSubCategoryActions(category: any, subcategory: any) {
    dispatch(setCategory(encodeURIComponent(category)));
    dispatch(setSubcategory(encodeURIComponent(subcategory)));
    dispatch(setDetailedSubCategory(""));
    dispatch(setCallback(!callback as any));
    setOpenSubNav(false);
    navigate("/");
  }
  function handleSubCategoryDetails(
    category: any,
    subcategory: any,
    detailedCategory: any
  ) {
    dispatch(setCategory(encodeURIComponent(category)));
    dispatch(setSubcategory(encodeURIComponent(subcategory)));
    dispatch(setDetailedSubCategory(encodeURIComponent(detailedCategory)));

    dispatch(setCallback(!callback as any));
    setOpenSubNav(false);
    navigate("/");
  }

  return (
    <div
      onMouseOver={() => setOpenSubNav(true)}
      onMouseLeave={() => {
        setOpenSubNav(false);
        setActiveTab("");
      }}
      className={`${
        openSubNav ? "visible opacity-100" : "invisible opacity-0 "
      } h-[600px] duration-200 absolute flex w-full   bg-gray-100 gap-4 z-[301]  top-[99%] delay-300`}
    >
      <div className="p-10 flex overflow-hidden w-full">
        <div className="flex flex-col w-[30%]">
          {navCategories.map((category: any) => {
            return (
              <div
                key={category.title}
                onMouseOver={() => {
                  setActiveTab(category.title);
                  setOpenCategory(category.title);
                }}
                className={`flex p-3 justify-between  ${
                  activeTab === category.title ? "bg-gray-200" : ""
                } duration-200 items-center`}
              >
                <div className="">{category.title}</div>
                <div>
                  <GoChevronRight />
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-full w-[1px] bg-gray-300 ml-4" />
        <div className="ml-12 mr-12 max-w-md w-full">
          <div className="flex mb-4 text-xl text-red-500 items-center gap-2">
            <TbCategory />
            <h1>SHOP BY CATEGORY</h1>
          </div>
          <div className="category-scrollbar flex flex-wrap overflow-y-auto">
            {womenClothingSubcategory?.subCategory?.map((subcategory: any) => {
              console.log(
                "womenClothingSubcategory",
                womenClothingSubcategory.title
              );
              return (
                <div
                  onClick={() =>
                    handleSubCategoryActions(
                      womenClothingSubcategory.title,
                      subcategory.title
                    )
                  }
                  key={subcategory.title}
                  className="flex flex-col flex-[0_0_33%] mb-3 items-center cursor-pointer "
                >
                  <div className="w-[82px] h-[82px] rounded-full bg-gray-300 overflow-hidden hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:scale-105 duration-300 mb-1">
                    <img
                      className="w-full h-full bg-cover"
                      src={subcategory.image}
                      alt=""
                    />
                  </div>
                  <span>{subcategory.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-full w-[1px] bg-gray-300" />
        <div
          id="subofsub"
          className="w-full pr-12 pl-12 category-scrollbar  overflow-y-auto"
        >
          {womenClothingSubcategory?.detailedSubCategory?.map((detail: any) => (
            <div key={detail.subCategoryTitle} className="mb-8">
              <div className="flex mb-4 text-xl text-red-500 items-center gap-2">
                <h1>{detail.subCategoryTitle}</h1>
              </div>
              <div className="category-scrollbar flex flex-wrap overflow-y-auto gap-4">
                {detail?.categoryDetails?.map((categoryDetail: any) => {
                  return (
                    <div
                      onClick={() =>
                        handleSubCategoryDetails(
                          womenClothingSubcategory.title,
                          detail.subCategoryTitle,
                          categoryDetail.title
                        )
                      }
                      key={categoryDetail.detailedSubId}
                      className="flex flex-col flex-[0_0_14%] mb-3 items-center cursor-pointer "
                    >
                      <div className="w-[82px] h-[82px] rounded-full bg-gray-300 overflow-hidden hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:scale-105 duration-300 mb-1">
                        <img
                          className="w-full h-full bg-cover"
                          src={categoryDetail.image}
                          alt=""
                        />
                      </div>
                      <span className="text-center">
                        {categoryDetail.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubNav;
