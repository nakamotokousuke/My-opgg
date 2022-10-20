import Image from "next/image";
import React from "react";
type itemType = {
  item: number;
  latest: string;
};

const Item = ({ item, latest }: itemType) => {
  return (
    <>
      {item !== 0 ? (
        <div className="h-5 w-5 sm:h-8 sm:w-8 relative">
          <Image
            layout="fill"
            objectFit="contain"
            className="rounded-md"
            src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${item}.png`}
            alt=""
          />
        </div>
      ) : (
        <div className="h-5 w-5 sm:h-8 sm:w-8 bg-white rounded-md opacity-20"></div>
      )}
    </>
  );
};

export default Item;
