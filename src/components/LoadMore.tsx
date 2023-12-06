import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/slices/ApiSlice";
import { setCallback } from "../store/slices/CallbackSlice";

type Props = {};

const LoadMore = (props: Props) => {
  const page = useSelector((state: any) => state.products.page);
  const result = useSelector((state: any) => state.products.result);
  const dispatch = useDispatch();
  const callback = useSelector((state: any) => state.callback.callback);
 
  return (
    <div className="flex justify-center my-8">
      {result < page * 11 ? null : (
        <button
          className="px-6 py-2 rounded text-white bg-purple-300"
          onClick={() => {
            dispatch(setPage(page + 1)),
            dispatch(setCallback(!callback as any));
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default LoadMore;
