import React, { useEffect, useState } from "react";
import FavChild from "./FavChild";
type name = {
  name?: string | string[];
};

const Favorite = (name: name) => {
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const t = localStorage.getItem("favorite");
    if (t) {
      let fav = JSON.parse(t);
      setFav(fav);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#2e2e4e]  p-4 ">
      <ul className="flex flex-col">
        {fav.map(
          (
            data: {
              name: string;
              platform: string;
              region: string;
              profileIconId: number;
              id: string;
            },
            index
          ) => (
            <div key={data.id} style={{ order: -index }} className="my-1">
              <FavChild data={data} />
            </div>
          )
        )}
      </ul>
    </div>
  );
};

export default Favorite;
