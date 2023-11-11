import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../store/slices/ApiSlice';
import { setCallback } from '../store/slices/CategorieSlice';

type Props = {}

const LoadMore = (props: Props) => {

    const category = useSelector((state: any) => state.products.category);
    const state = useSelector((state: any) => state);
  
    const page = useSelector((state: any) => state.products.page);
    const result = useSelector((state: any) => state.products.result);
    const search = useSelector((state: any) => state.products.search);
    const sort = useSelector((state: any) => state.products.sort);
    const categories = useSelector((state: any) => state.category.categories);
    const dispatch = useDispatch();
    const callback = useSelector((state: any) => state.category.callback);
    
  return (
    <div>
        {
            result < page * 9 ? ""
            : <button onClick={()=> {dispatch(setPage(page + 1)), dispatch(setCallback(!callback as any))}}>Load More</button>
        }
    </div>
  )
}

export default LoadMore