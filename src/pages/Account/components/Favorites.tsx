import React from "react";
import MyAccout from "..";

type Props = {};

const Favorites = (props: Props) => {
  return (
    <MyAccout>
      <div id="favorite" className="mt-28 p-7 h-screen bg-pink-400">Favorites</div>
    </MyAccout>
  );
};

export default Favorites;
