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
    <div className="text-white mt-8 w-[60%]">
      {/* <button onClick={() => setButton((prev) => (prev = !prev))}>ggg</button> */}
      <div className="grid grid-cols-2 w-full">
        <div
          className={`${
            button ? "bg-blue-500" : "bg-gray-500"
          } w-full text-center`}
          onClick={() => setButton((prev) => (prev = !prev))}
        >
          log
        </div>
        <div
          className={`${
            !button ? "bg-blue-500" : "bg-gray-500"
          } w-full text-center`}
          onClick={() => setButton((prev) => (prev = !prev))}
        >
          fav
        </div>
      </div>
      {button ? <History name={data.name} /> : <Favorite name={data.name} />}
    </div>
  );
};

export default LogFav;
