import Image from "next/image";
import React, { useContext } from "react";
import { Data } from "../../pages/_app";
import { PlayerListType } from "../../types/PlayerListType";

const PlayerList = (data: PlayerListType) => {
  const { latest, player } = useContext(Data);
  return (
    <li className="list-none">
      <div className="flex h-4 items-center">
        <Image
          height={16}
          width={16}
          src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/champion/${data.championName}.png`}
          alt=""
        />
        <div
          className={`text-[12px] truncate ... w-[100%] font-bold cursor-pointer text-white ${
            player?.puuid === data.puuid ? "opacity-90" : "opacity-60"
          }`}
        >
          {data.summonerName}
        </div>
      </div>
    </li>
  );
};

export default PlayerList;
