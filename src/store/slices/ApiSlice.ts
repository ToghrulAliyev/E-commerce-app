// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { base } from "../../utils/Constants";
// import { Product } from "../../components/Product/ProductCard";



// type ProductsState = {
//   products: Product; // Replace any[] with the actual type of your products array
//   category: string;
//   sort: string;
//   search: string;
//   page: number;
//   result: number;
// };

// const initialState = {
//   products: [],
//   category: '',
//   sort:'',
//   search: '',
//   page:1,
//   result:0

// };
// export const getProducts = createAsyncThunk(
//   'products/getProducts',
//   async (_, { getState, dispatch }) => {
//     const state = getState() as { products: ProductsState }; // Typecast the state to ProductsState
//     const { page,category, sort, search } = state.products;

//     const searchParams = new URLSearchParams();
//     searchParams.append('limit', String(page *11));
//     searchParams.append('sort', sort);
//     searchParams.append('title[regex]', search);
//     const getAllProductsEndpoint = `${base}/api/products?${searchParams.toString()}`;
//     let url;
//     if (category === "") {
     
//       url = getAllProductsEndpoint;
//     } else {
      
//       url = `${base}/api/products?category=${category}&${searchParams.toString()}`;
//     }

//     const result = await axios.get(url);
//     return result.data;
//   }
// );


// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     setProducts: (state:any,action:any)=>{
//       state.products.products = action.payload
//     },
//     setCategory: (state:any, action:any)=>{
//       state.category = action.payload
//     },
//     setSort: (state:any, action:any)=>{
//       state.sort = action.payload
//     },
//     setSearch: (state:any, action:any)=>{
//       state.search = action.payload
//     },
//     setPage: (state:any, action:any)=>{
//       state.page = action.payload
//     },
//     setResult: (state:any, action:any)=>{
//       state.result = action.payload
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getProducts.pending, (state: any) => {
//       state.status = "loading";
//     });
//     builder.addCase(getProducts.fulfilled, (state:any, { payload }) => {
//       state.products = payload;
//       state.result = payload.result;
//       state.status = "success";
//     });
//     builder.addCase(getProducts.rejected, (state:any) => {
//       state.status = "failed";
//     });
//   },
// });
// export const {setProducts, setCategory, setSort, setSearch, setPage,setResult} = productsSlice.actions;
// export const { reducer } = productsSlice;



import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { base } from "../../utils/Constants";
import { Product } from "../../components/Product/ProductCard";

type ProductsState = {
  products: Product[];
  category: string;
  subcategory: string; // Add subcategory
  detailedSubCategory: string; // Add detailedSubCategory
  sort: string;
  search: string;
  page: number;
  result: number;
};

const initialState: ProductsState = {
  products: [],
  category: "",
  subcategory: "", // Initialize with an empty string
  detailedSubCategory: "", // Initialize with an empty string
  sort: "",
  search: "",
  page: 1,
  result: 0,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { getState, dispatch }) => {
    const state = getState() as { products: ProductsState };
    const { page, category, subcategory, detailedSubCategory, sort, search } =
      state.products;

    const searchParams = new URLSearchParams();
    searchParams.append("limit", String(page * 11));
    searchParams.append("sort", sort);
    searchParams.append("title[regex]", search);

    // Add subcategory and detailedSubCategory to the request if they are set
    if (subcategory) {
 
      searchParams.append("subcategory", subcategory);
    }

    if (detailedSubCategory) {
     
      searchParams.append("detailedSubCategory", detailedSubCategory);
    }

    // const getAllProductsEndpoint = `${base}/api/products?${searchParams.toString()}`;
    let url;

    // Check if category is set
    url = `${base}/api/products?${searchParams.toString()}`;

    if (category !== "") {
      url += `&category=${category}`;
    }
    
    if (subcategory !== "") {
      url += `&subcategory=${subcategory}`;
    }
    
    if (detailedSubCategory !== "") {
      url += `&detailedSubCategory=${detailedSubCategory}`;
    }
    const result = await axios.get(url);
    return result.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSubcategory: (state, action: PayloadAction<string>) => {
      state.subcategory = action.payload;
    },
    setDetailedSubCategory: (state, action: PayloadAction<string>) => {
      state.detailedSubCategory = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setResult: (state, action: PayloadAction<number>) => {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state:any) => {
      state.status = "loading";
    });
    builder.addCase(getProducts.fulfilled, (state:any, { payload }) => {
      state.products = payload;
      state.result = payload.result;
      state.status = "success";
    });
    builder.addCase(getProducts.rejected, (state:any) => {
      state.status = "failed";
    });
  },
});

export const {
  setProducts,
  setCategory,
  setSubcategory,
  setDetailedSubCategory,
  setSort,
  setSearch,
  setPage,
  setResult,
} = productsSlice.actions;

export const { reducer } = productsSlice;