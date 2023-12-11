import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSearch, setSort } from "../../store/slices/ApiSlice";
import { setCallback } from "../../store/slices/CallbackSlice";
import { navCategories } from "../Navbar/NavCategories";

type Props = {};

const Filter = (props: Props) => {
  const category = useSelector((state: any) => state.products.category);
  const search = useSelector((state: any) => state.products.search);
  const sort = useSelector((state: any) => state.products.sort);
  const dispatch = useDispatch();
  const callback = useSelector((state: any) => state.callback.callback);
 
  const handleCategory = (e: any) => {
    const categoryName = e.target.value || "";
  
    if (categoryName === "") {
      dispatch(setCategory("" as any));
      dispatch(setCallback(!callback as any));
    } else {
      const category = navCategories.find(
        (category: any) => category.title === categoryName
      );
  
      if (category) {
        const encodedCategoryValue = encodeURIComponent(category.title);
        dispatch(setCategory(encodedCategoryValue as any));
        dispatch(setCallback(!callback as any));
      }
    }
  };

  
  const handleSearch = (e: any) => {
    e.preventDefault();
    dispatch(setCallback(!callback as any));
  };
  return (
    <div className="justify-between mt-4  lg:flex hidden">
      <div className="flex items-center mr-4">
        <span>Filters: </span>
        <select
          className="border rounded-md ml-2 border-gray-600 px-4 py-2 outline-none"
          name="category"
          value={decodeURIComponent(category)}
          onChange={handleCategory}
        >
           <option value="" >All Products</option>
          {navCategories.map((category: any) => (
            <option value={category.name} key={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div>
 

      </div>
      <form onSubmit={handleSearch} className="flex gap-4 w-full">
        <input
          className="border rounded-md border-gray-600 px-4 py-2 outline-none w-full"
          type="text"
          placeholder="Search product name"
          value={search}
          onChange={(e: any) => dispatch(setSearch(e.target.value))}
        />
        <button type="submit">
          <BsSearch className="text-2xl  text-gray-600" />
        </button>
      </form>
      <div className="flex items-center ml-4">
        <span>Sort: </span>
        <select
          className="border rounded-md border-gray-600 px-4 py-2 outline-none ml-4"
          value={sort}
          onChange={(e: any) => {
            dispatch(setSort(e.target.value)),
              dispatch(setCallback(!callback as any));
          }}
        >
          <option value="">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="-sold">Best Sales</option>
          <option value="-price">Price: High-Low</option>
          <option value="price">Price: Low-High</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
