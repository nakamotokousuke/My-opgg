import React, { useEffect, useState } from "react";
import FavChild from "./FavChild";
type name = {
  name: string;
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
      <ul className="space-y-2">
        {fav.map(
          (data: {
            name: string;
            platform: string;
            profileIconId: number;
            id: string;
          }) => (
            <FavChild key={data.id} data={data} />
          )
        )}
      </ul>
    </div>
  );
};

export default Favorite;
