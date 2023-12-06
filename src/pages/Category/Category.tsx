// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setCallback } from "../../store/slices/CategorieSlice";
// import axios from "axios";
// import { base } from "../../utils/Constants";
// import { useNavigate } from "react-router-dom";

// type Props = {};

// const Category = (props: Props) => {
//   const { isAdmin } = useSelector((state: any) => state.user);
//   const { token } = useSelector((state: any) => state.refreshToken);
//   const dispatch = useDispatch();
//   const categories = useSelector((state: any) => state.callback.categories);
//   const subcategories = useSelector((state: any) => state.subcategory.subcategories);

  
//   const callback = useSelector((state: any) => state.callback.callback);
//   const [edit, setEdit] = useState(false);
//   const [subEdit, setSubEdit]= useState(false)
//   const [id, setId] = useState("");
//   const [subid, setSubid] = useState("");

//   const [category, setCategory] = useState("");
//   const [subcategory, setSubcategory] = useState("");

//   const navigate = useNavigate();


//   const createCategory = async (e: any) => {
//     e.preventDefault();
//     try {
//       if (edit) {
//         const response = await axios.put(`${base}/api/category/${id}`,
//           { name: category },
//           { headers: { Authorization: token },}
//         );
//         setEdit(false);
//         alert(response.data.msg);
//       } else {
//         const response = await axios.post(`${base}/api/category`,
//           { name: category },
//           { headers: { Authorization: token },}
//         );
//         alert(response.data.msg);
//       }
//       setCategory("");
//       dispatch(setCallback(!callback as any));
//     } catch (error: any) {
//       alert(error.response.data.msg);
//     }
//   };

//   const createSubcategory = async (e: any) => {
//     e.preventDefault();
//     try {
//       if (subEdit) {
//         const response = await axios.put(
//           `${base}/api/subcategory/${subid}`,
//           { name: subcategory },
//           { headers: { Authorization: token } }
//         );
//         setSubEdit(false);
//         alert(response.data.msg);
//       } else {
//         const response = await axios.post(
//           `${base}/api/subcategory`,
//           { name: subcategory },
//           { headers: { Authorization: token } }
//         );
//         alert(response.data.msg);
//       }
//       setSubcategory("");
//       dispatch(setCallback(!callback as any));
//     } catch (error: any) {
//       alert(error.response.data.msg);
//     }
//   };

//   const editCategory = async (id: any, name: any) => {
//     setId(id);
//     setCategory(name);
//     setEdit(true);
//   };

//   const editSubcategory = async (id: any, name: any) => {
//     setSubid(id);
//     setSubcategory(name);
//     setSubEdit(true);
//   };

//   const deleteCategory = async (id: any) => {
//     try {
//       const response = await axios.delete(`${base}/api/category/${id}`, {
//         headers: { Authorization: token },
//       });
//       alert(response.data.message);
//       dispatch(setCallback(!callback as any));
//     } catch (error) {}
//   };


//   const deleteSubcategory  = async (id: any) => {
//     try {
//       const response = await axios.delete(`${base}/api/subcategory/${id}`, {
//         headers: { Authorization: token },
//       });
//       alert(response.data.message);
//       dispatch(setCallback(!callback as any));
//     } catch (error) {}
//   };


//   if (!isAdmin) {
//     navigate("/");
//   }

//   console.log("categoriescategoriescategoriescategories",subcategories)

//   return (
//     <div className="flex justify-between">

    
//     <div className="flex justify-start p-8 flex-col">
//       <form onSubmit={createCategory} className="flex  gap-4 mb-5 items-end w-full">
//         <div>
//           <label htmlFor="category">Create Category</label>
//           <input
//             className="border rounded py-2 pl-2 mt-3 w-full"
//             type="text"
//             name="category"
//             value={category}
//             required
//             onChange={(e: any) => setCategory(e.target.value)}
//           />
//         </div>
//         <button className="bg-purple-300 w-32 h-10 px-4 py-2 rounded" type="submit">
  
//           {edit ? "Update" : "Save"}
//         </button>
//       </form>

//       <div className="flex flex-col gap-4">
//         {categories.map((category: any) => (
//           <div
//             key={category.name}
//             className="flex p-4 border border-solid gap-8 items-center max-w-[500px]"
//           >
//             <p className="w-1/2 h-auto">{category.name}</p>

//             <div className="flex gap-4 ">
//               <button
//                 onClick={() => editCategory(category._id, category.name)}
//                 className="bg-green-300 w-24 px-2 py-2 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteCategory(category._id)}
//                 className="bg-red-300 w-24 px-2 py-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
    


//     <div className="flex justify-start p-8 flex-col">
//       <form onSubmit={createSubcategory} className="flex w-full gap-4 mb-5 items-end">
//         <div>
//           <label htmlFor="subcategory">Create Subcategory</label>
//           <input
//             className="border rounded py-2 pl-2 mt-3 w-full"
//             type="text"
//             name="subcategory"
//             value={subcategory}
//             required
//             onChange={(e: any) => setSubcategory(e.target.value)}
//           />
//         </div>
//         <button className="bg-purple-300 w-32 h-10 px-4 py-2 rounded" type="submit">
  
//           {subEdit ? "Update" : "Save"}
//         </button>
//       </form>

//       <div className="flex flex-col gap-4">
//         {subcategories?.map((subcategory: any) => (
//           <div
//             key={subcategory.name}
//             className="flex p-4 border border-solid gap-8 items-center max-w-[500px]"
//           >
//             <p className="w-1/2 h-auto">{subcategory.name}</p>

//             <div className="flex gap-4 ">
//               <button
//                 onClick={() => editSubcategory(subcategory._id, subcategory.name)}
//                 className="bg-green-300 w-24 px-2 py-2 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteSubcategory(subcategory._id)}
//                 className="bg-red-300 w-24 px-2 py-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>


//     </div>
//   );
// };

// export default Category;
