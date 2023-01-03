import Image from "next/image";
import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlayerDataContext } from "../../../context/Context";

type ItemBuild = {
  itemLog: any[];
};

const ItemBuild = ({ itemLog }: ItemBuild) => {
  const { latest } = useContext(PlayerDataContext);
  return (
    <div className="bg-[#172740] mb-2 rounded-md">
      <div className="bg-[#4b4e87] rounded-t-md font-bold pl-2">Item Build</div>
      {JSON.stringify(itemLog) !== "[]" && (
        <div className="flex flex-wrap w-[450px] sm:w-[690px] m-2 items-center">
          {itemLog.map((items, index) => (
            <div key={uuidv4()}>
              {items.length !== 0 && (
                <div className="flex items-center">
                  {items.length !== 0 && (
                    <div className="text-[13px] h-5">{index}min</div>
                  )}
                  <div className="flex m-1">
                    {items.map((item: string) => (
                      // eslint-disable-next-line react/jsx-key
                      <Image
                        key={uuidv4()}
                        height={20}
                        width={20}
                        src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${item}.png`}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemBuild;
