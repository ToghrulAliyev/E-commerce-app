import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/slices/ApiSlice";
import { setCallback } from "../store/slices/CallbackSlice";

type Props = {};

const LoadMore = (props: Props) => {
  const page = useSelector((state: any) => state.products.page);
  const result = useSelector((state: any) => state.products.result);
  const dispatch = useDispatch();
  const callback = useSelector((state: any) => state.callback.callback);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.scrollingElement!.scrollHeight
    ) {
      if (result < page * 15) {
        return;
      }
      dispatch(setPage(page + 1));
      dispatch(setCallback(!callback as any));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center my-8">
      {/* <button
        className="px-6 py-2 rounded text-white bg-purple-300"
      >
        Load More
      </button> */}
    </div>
  );
};

export default LoadMore;

