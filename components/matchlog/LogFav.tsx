import React, { useEffect, useState } from "react";
import Favorite from "./Favorite";
import History from "./History";
type data = {
  name: string;
};

const LogFav = (data: data) => {
  const [button, setButton] = useState(true);
  useEffect(() => {
    console.log(button);
  }, [button]);
  return (
    <div className="text-white mt-8 w-[60%] rounded-t-sm">
      <div className="grid grid-cols-2 w-full">
        <div
          className={`${
            button ? "bg-[#2e2e4e]" : "bg-[#191931]"
          } w-full text-center rounded-tl-sm font-bold`}
          onClick={() => setButton((prev) => (prev = !prev))}
        >
          Log
        </div>
        <div
          className={`${
            !button ? "bg-[#2e2e4e]" : "bg-[#191931]"
          } w-full text-center rounded-tr-sm font-bold`}
          onClick={() => setButton((prev) => (prev = !prev))}
        >
          Fav
        </div>
      </div>
      {button ? <History name={data.name} /> : <Favorite name={data.name} />}
    </div>
  );
};

export default LogFav;
