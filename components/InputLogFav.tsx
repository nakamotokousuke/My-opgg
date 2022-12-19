import React, { useEffect, useState } from "react";
import Favorite from "./matchlog/Favorite";
import History from "./matchlog/History";

type data = {
  name?: string | string[];
};

const InputLogFav = (data: data) => {
  const [button, setButton] = useState(true);

  return (
    <div className="">
      {/* <button onClick={() => setButton((prev) => (prev = !prev))}>ggg</button> */}
      <div className="grid grid-cols-2 w-full">
        <div
          className={`${
            button ? "bg-[#2e2e4e]" : "bg-[#191931]"
          } w-full text-center font-bold text-white`}
          onClick={() => setButton((prev) => (prev = !prev))}
        >
          Log
        </div>
        <div
          className={`${
            !button ? "bg-[#2e2e4e]" : "bg-[#191931]"
          } w-full text-center font-bold text-white`}
          onClick={() => setButton((prev) => (prev = !prev))}
        >
          Fav
        </div>
      </div>
      {button ? <History name={data.name} /> : <Favorite name={data.name} />}
    </div>
  );
};

export default InputLogFav;
