import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSearch, setSort } from "../../store/slices/ApiSlice";
import { setCallback } from "../../store/slices/CategorieSlice";

type Props = {};

const Filter = (props: Props) => {
  const category = useSelector((state: any) => state.products.category);
  const search = useSelector((state: any) => state.products.search);
  const sort = useSelector((state: any) => state.products.sort);
  const categories = useSelector((state: any) => state.category.categories);
  const dispatch = useDispatch();
  const callback = useSelector((state: any) => state.category.callback);
  

  const handleCategory = (e: any) => {
    const categoryName = e.target.value || "";
  
    if (categoryName === "") {
      // Dispatch the setCategory action with an empty string as the argument
      dispatch(setCategory("" as any));
      dispatch(setCallback(!callback as any));
    } else {
      const category = categories.find(
        (category: any) => category.name === categoryName
      );
  
      if (category) {
        dispatch(setCategory(category.name));
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
          className="border rounded-md ml-2 border-purple-300 px-4 py-2 outline-none"
          name="category"
          value={category}
          onChange={handleCategory}
        >
           <option value="" >All Products</option>
          {categories.map((category: any) => (
            <option value={category.name} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSearch} className="flex gap-4 w-full">
        <input
          className="border rounded-md border-purple-300 px-4 py-2 outline-none w-full"
          type="text"
          placeholder="Search product name"
          value={search}
          onChange={(e: any) => dispatch(setSearch(e.target.value))}
        />
        <button type="submit">
          <BsSearch className="text-2xl  text-purple-300" />
        </button>
      </form>
      <div className="flex items-center ml-4">
        <span>Sort: </span>
        <select
          className="border rounded-md border-purple-300 px-4 py-2 outline-none ml-4"
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
