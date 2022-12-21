import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { getQuery } from "../../lib/getQuery";
import { Data } from "../../pages/_app";
import { PlayerListType } from "../../types/PlayerListType";
import { v4 as uuidv4 } from "uuid";
import { PlayerDataContext } from "../../context/Context";

const PlayerList = (data: PlayerListType) => {
  const { latest, player } = useContext(PlayerDataContext);
  // const { latest, player } = useContext(Data);
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push({
      pathname: path,
      query: {
        region: getQuery("region"),
        platform: getQuery("platform"),
      },
    });
  };
  return (
    <li className="list-none" key={uuidv4()}>
      <div className="flex h-4 items-center">
        <Image
          height={16}
          width={16}
          src={`http://ddragon.leagueoflegends.com/cdn/${
            process.env.NEXT_PUBLIC_LATEST
          }/img/champion/${
            data.championName !== "FiddleSticks"
              ? data.championName
              : "Fiddlesticks"
          }.png`}
          alt=""
        />
        <div
          className={`text-[12px] truncate ... w-[100%] font-normal cursor-pointer ${
            player?.puuid === data.puuid ? "text-white" : "text-slate-300"
          }`}
          onClick={() => handleClick(`/matchlog/${data.summonerName}`)}
        >
          {data.summonerName}
        </div>
      </div>
    </li>
  );
};

export default PlayerList;
