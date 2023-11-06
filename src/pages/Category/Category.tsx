import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCallback, setCategories } from "../../store/slices/CategorieSlice";
import axios from "axios";
import { base } from "../../utils/Constants";

type Props = {};

const Category = (props: Props) => {
  const categories = useSelector((state: any) => state.category.categories);
  const callback = useSelector((state: any) => state.category.callback);

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const { token } = useSelector((state: any) => state.refreshToken);

  const createCategory = async (e: any) => {
    e.preventDefault();
    try {
      if (edit) {
        const response = await axios.put(`${base}/api/category/${id}`,{ name: category },{
            headers: { Authorization: token },
          }
        );
        setEdit(false)
        alert(response.data.msg);
      } else {
        const response = await axios.post(`${base}/api/category`,{ name: category },{
            headers: { Authorization: token },
          }
        );
        alert(response.data.msg);
      }
      setCategory("");
      dispatch(setCallback(!callback as any));
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  const editCategory = async (id: any, name: any) => {
    setId(id);
    setCategory(name);
    setEdit(true);
  };


  const deleteCategory = async (id:any)=>{
    try {
        const response = await axios.delete(`${base}/api/category/${id}`,{
            headers: {Authorization: token}
        })
        alert(response.data.message)
        dispatch(setCallback(!callback as any))
    } catch (error) {
        
    }
  }

  return (
    <div className="flex justify-around p-8 ">
      <form onSubmit={createCategory} className="flex flex-col w-1/4 gap-4">
        <label htmlFor="category">Category</label>
        <input
          className="border rounded py-2 pl-2"
          type="text"
          name="category"
          value={category}
          required
          onChange={(e: any) => setCategory(e.target.value)}
        />
        <button className="bg-purple-300 w-32 px-4 py-2 rounded" type="submit">
          {" "}
          {edit ? "Update" : "Save"}
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {categories.map((category: any) => (
          <div
            key={category.name}
            className="flex p-4 border border-solid gap-8 items-center max-w-[500px]"
          >
            <p className="w-1/2 h-auto">{category.name}</p>

            <div className="flex gap-4 ">
              <button
                onClick={() => editCategory(category._id, category.name)}
                className="bg-green-300 w-24 px-2 py-2 rounded"
              >
                Edit
              </button>
              <button onClick={()=> deleteCategory(category._id)} className="bg-red-300 w-24 px-2 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
