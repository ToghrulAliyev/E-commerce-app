import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import axios from "axios";
import { base } from "../../utils/Constants";
import Loading from "../../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { setProducts } from "../../store/slices/ApiSlice";
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
  color: string;
  size: string;
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
  color: "",
  size: "",
};

const CreateProduct = (props: Props) => {
  const [currentProducts, setCurrentProducts] = useState<product>(initialState);
  // const categories = useSelector((state: any) => state.callback.categories);
  // const subcategories = useSelector((state: any) => state.subcategory.subcategories);


  console.log("currentProducts",currentProducts)

  const [images, setImages] = useState<any>(false);
  const [loading, setLoading] = useState(false);
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

  // dispatch(setProducts)

  useEffect(() => {
    if (params.id) {
      setOnEdit(true);
      allProducts.forEach((product: any) => {
        if (product._id === params.id) {
          setCurrentProducts(product);
          setImages(product.images);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!isAdmin) alert("You are not an admin");
      if (!images)
        alert("There is no image, if you want to continue please select image");

      if (onEdit) {
        await axios.put(
          `${base}/api/products/${currentProducts._id}`,
          { ...currentProducts, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          `${base}/api/products`,
          { ...currentProducts, images },
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
  if (!isAdmin) {
    navigate("/");
  }
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
          <label htmlFor="product_id">Product Id</label>
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
          <input
            type="text"
            name="color"
            id="color"
            required
            value={currentProducts.color}
            className="border rounded py-2 pl-2"
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="size">Size</label>
          <input
            type="text"
            name="size"
            id="size"
            required
            value={currentProducts.size}
            className="border rounded py-2 pl-2"
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={currentProducts.category}
            className="border rounded py-2 pl-2"
            onChange={handleChangeInput}
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
