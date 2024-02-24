import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import axios from "axios";
import { base } from "../../utils/Constants";
import Loading from "../../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { setCallback } from "../../store/slices/CallbackSlice";
import { navCategories } from "../../components/Navbar/NavCategories";
type Props = {};

interface product {
  _id?: boolean | undefined;
  product_id: string | number;
  title: string;
  price: number | string;
  description: string;
  brand: string;
  category: string;
  subcategory: string;
  detailedSubCategory: string;
}
const initialState = {
  product_id: "",
  title: "",
  price: 1,
  description: "lorem ipsum test desc",
  brand: "",
  category: "",
  subcategory: "",
  detailedSubCategory: "",
};

const sizeOptions = [
  { key: "xs", value: "XS" },
  { key: "s", value: "S" },
  { key: "m", value: "M" },
  { key: "l", value: "L" },
  { key: "xl", value: "XL" },
];

const CreateProduct = (props: Props) => {
  const [currentProducts, setCurrentProducts] = useState<product>(initialState);
  const [images, setImages] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<any>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [colorName, setColorName] = useState("");
  const [color, setColor] = useState<any>([]);
  const { isAdmin } = useSelector((state: any) => state.user);
  const { token } = useSelector((state: any) => state.refreshToken);
  const params = useParams();
  const navigate = useNavigate();
  const allProducts = useSelector(
    (state: any) => state.products.products.products
  );
  const dispatch = useDispatch();
  const callback = useSelector((state: any) => state.callback.callback);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (params.id) {
      setOnEdit(true);
      allProducts?.forEach((product: any) => {
        if (product._id === params.id) {
          console.log("product", product);
          setCurrentProducts(product);
          setImages(product.images);
          setColor(product.color);
          setSize(product.size);
        }
      });
    } else {
      setOnEdit(false);
      setImages(false);
      setCurrentProducts(initialState);
    }
  }, [params.id]);

  async function handleUpload(e: any) {
    e.preventDefault();
    try {
      if (!isAdmin) alert("You are not an admin");
      const file = e.target.files[0];
      if (!file) return alert("File not exist");
      if (file.size > 1024 * 1024)
        return alert("Size should be less than 1 MB or 1,024 kilobytes.");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert(
          "This file type is not supported. Please upload a JPG or PNG file."
        );
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const response = await axios.post(`${base}/api/upload`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(response.data);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  const handleDestroy = async () => {
    {
      if (!isAdmin) alert("You are not an admin");
      setLoading(true);
      await axios.post(
        `${base}/api/destroy`,
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    }
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setCurrentProducts({ ...currentProducts, [name]: value });
  };

  const handleChange = (event: any) => {
    const optionValue = event.target.value;
    const newSelectedOptions = size.includes(optionValue)
      ? size.filter((option: any) => option !== optionValue)
      : [...size, optionValue];

    setSize(newSelectedOptions);
  };

  const handleColorChange = (event: any) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
  };

  const handleAddColor = () => {
    if (selectedColor && colorName) {
      setColor([...color, { colorName, color: selectedColor }]);
      setSelectedColor("");
      setColorName("");
    }
  };

  const handleRemoveColor = (currentColor: string) => {
    const updatedColors = color.filter(
      (current: any) => current.color !== currentColor
    );
    setColor(updatedColors);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!isAdmin) alert("You are not an admin");
      if (!images)
        alert("There is no image, if you want to continue please select image");

      if (onEdit) {
        await axios.put(
          `${base}/api/products/${currentProducts._id}`,
          { ...currentProducts, images, color, size },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          `${base}/api/products`,
          { ...currentProducts, images, color, size },
          {
            headers: { Authorization: token },
          }
        );
      }
      setImages(false);
      setCurrentProducts(initialState);
      dispatch(setCallback(!callback as any));
      window.location.href = "/";
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex w-full justify-between p-4 mt-12">
      <div className="flex flex-col w-1/2">
        <div
          className={`max-w-[450px] h-[500px] w-full hover:opacity-80 duration-300 border ${
            images ? "border-solid" : "border-dashed"
          } ${
            images ? "" : "cursor-pointer"
          } rounded-md border-gray-400 overflow-hidden p-6 relative`}
        >
          <div className="flex flex-col w-full pt-10 items-center">
            <LiaCloudUploadAltSolid className="w-52 h-52" />
            <input
              onChange={handleUpload}
              type="file"
              name="file"
              required
              id="file_up"
              className="w-full h-full absolute outline-none opacity-0 cursor-pointer top-0 z-50"
            />
            <p>
              Max file size: <span className="font-bold">1024kb</span>
            </p>
            <p className="mt-4">
              Supported file types: <span className="font-bold">JPG, PNG</span>
            </p>
            <p className="mt-4 font-semibold">Click here to browse files</p>
          </div>
          <div
            id="file_img"
            className={`w-full h-full ${
              images ? "block" : "hidden"
            }  absolute top-0 left-0 bg-white`}
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                <img
                  src={images ? images.url : ""}
                  alt=""
                  className="w-full h-full block object-cover z-[9] "
                />
                <div
                  onClick={handleDestroy}
                  className="p-2 cursor-pointer z-50 absolute top-0 right-0"
                >
                  {onEdit ? "" : <AiOutlineClose />}
                </div>
              </>
            )}
          </div>
        </div>
        {images ? (
          <p className="backdrop-blur-lg text-center w-[450px] mt-4">
            Click Image to Change{" "}
          </p>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-1/2 px-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="product_id">Product Id {allProducts?.length}</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={currentProducts.product_id}
            className="border rounded py-2 pl-2"
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={currentProducts.title}
            className="border rounded py-2 pl-2"
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={currentProducts.price}
            className="border rounded py-2 pl-2"
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            required
            value={currentProducts.description}
            className="border rounded py-2 pl-2"
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            id="brand"
            required
            value={currentProducts.brand}
            className="border rounded py-2 pl-2"
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="color">Color</label>
          <div className="flex gap-4 items-center">
            <div className="flex items-center">
              <input
                type="color"
                name="color"
                id="color"
                required
                value={selectedColor}
                className="h-10"
                onChange={handleColorChange}
              />
              <input
                type="text"
                className="border rounded py-2 pl-2 ml-4"
                placeholder="Color Name"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
              />
            </div>
            <button
              className="bg-purple-300 p-2 rounded-sm"
              type="button"
              onClick={handleAddColor}
            >
              Add Color
            </button>
          </div>

          <div>
            <h4>Selected Colors:</h4>
            <ul>
              {color.map((color: any, index: any) => {
                return (
                  <div className="flex items-center" key={index}>
                    <li
                      className="p-2 m-1 text-black w-full"
                      style={{ backgroundColor: color.color }}
                    >
                      {`${color.colorName}: ${color.color}`}{" "}
                      {/* Display both color name and value */}
                    </li>
                    <button
                      onClick={() => handleRemoveColor(color.color)}
                      type="button"
                      className="bg-red-500 py-1 text-white"
                    >
                      <AiOutlineClose className="w-10 h-7" />
                    </button>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="size">Size</label>
          <div className="flex justify-between">
            {sizeOptions.map((option: any) => (
              <div key={option.key} className="flex gap-2 items-center">
                <div>{option.value}</div>
                <input
                  type="checkbox"
                  name="size"
                  id={option.key} // Use a unique identifier for each checkbox
                  value={option.key} // Set the value to the individual option key
                  className="w-6 h-6"
                  onChange={handleChange}
                  checked={size.includes(option.key)} // Check if the option is selected
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={currentProducts.category}
            className="border rounded py-2 pl-2"
            onChange={handleChangeInput}
            required
          >
            <option value="">Please select a category</option>
            {navCategories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        {currentProducts.category ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="subcategory">Subcategory</label>
            <select
              name="subcategory"
              id="subcategory"
              value={currentProducts.subcategory}
              className="border rounded py-2 pl-2"
              onChange={handleChangeInput}
              required
            >
              <option value="">Select a subcategory</option>
              {navCategories
                .find((category) => category.title === currentProducts.category)
                ?.subCategory.map((subCategory) => (
                  <option key={subCategory.subId} value={subCategory.title}>
                    {subCategory.title}
                  </option>
                ))}
            </select>
          </div>
        ) : null}
        {currentProducts.subcategory ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="detailedSubCategory">Detailed SubCategory</label>
            <select
              name="detailedSubCategory"
              id="detailedSubCategory"
              value={currentProducts.detailedSubCategory}
              className="border rounded py-2 pl-2"
              onChange={handleChangeInput}
              required
            >
              <option value="">Select Detailed Subcategory</option>
              {navCategories
                .find((category) => category.title === currentProducts.category)
                ?.detailedSubCategory.find(
                  (detailedSubCategory) =>
                    detailedSubCategory.subCategoryTitle.toLowerCase() ===
                    currentProducts.subcategory.toLowerCase()
                )
                ?.categoryDetails.map((detail) => (
                  <option key={detail.detailedSubId} value={detail.title}>
                    {detail.title}
                  </option>
                ))}
            </select>
          </div>
        ) : null}

        <button className="bg-purple-300 p-4 rounded" type="submit">
          {onEdit ? "Edit Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
