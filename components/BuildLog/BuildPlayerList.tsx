import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { getQuery } from "../../lib/getQuery";
import { Data } from "../../pages/_app";
import { BuidlPlayerListProps } from "../../types/BuildPlayerListProps";

const BuildPlayerList = (data: BuidlPlayerListProps) => {
  const { spellList, runeIcon, RuneLists, latest, region, player } =
    useContext(Data);
  const [spell1ID, setSpell1ID] = useState("");
  const [spell2ID, setSpell2ID] = useState("");
  const [mainrune, setMainrune] = useState("");
  const [subrune, setSubrune] = useState("");
  const router = useRouter();
  const { fbUser, user } = useAuth();

  useEffect(() => {
    spellList.forEach((spell: { value: { key: string; id: string } }) => {
      if (spell.value.key === String(data.spell1)) {
        setSpell1ID(spell.value.id);
      }
      if (spell.value.key === String(data.spell2)) {
        setSpell2ID(spell.value.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    RuneLists.forEach((runeList: { id: number; icon: string }) => {
      if (runeList.id === data.perks.styles[0].selections[0].perk) {
        setMainrune(runeList.icon);
      }
    });
    runeIcon.forEach((rune: { id: number; icon: string }) => {
      if (rune.id === data.perks.styles[1].style) {
        setSubrune(rune.icon);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (path: string) => {
    router.push({
      pathname: path,
      query: {
        region: getQuery("region", user?.region),
        platform: getQuery("platform", user?.platform),
      },
    });
  };

  return (
    <li
      key={data.summonerName}
      className={`flex justify-between m-1 items-center p-1 ${
        data.puuid === player?.puuid && "bg-blue-500 rounded-md"
      }`}
    >
      <div className="flex w-[45%] items-center">
        <div className="flex">
          <Image
            className=""
            height={32}
            width={32}
            src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/champion/${data.championName}.png`}
            alt=""
          />
          {data.spell1 !== undefined ? (
            <div className="flex flex-col">
              <Image
                height={16}
                width={16}
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/spell/${spell1ID}.png`}
                alt=""
              />
              <Image
                height={16}
                width={16}
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/spell/${spell2ID}.png`}
                alt=""
              />
            </div>
          ) : (
            <></>
          )}
          {mainrune !== "" ? (
            <div className="flex flex-col">
              <Image
                height={16}
                width={16}
                src={`https://ddragon.leagueoflegends.com/cdn/img/${mainrune}`}
                alt=""
              />
              <Image
                height={16}
                width={16}
                src={`https://ddragon.leagueoflegends.com/cdn/img/${subrune}`}
                alt=""
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className="font-bold truncate ... w-[60%] cursor-pointer"
          onClick={() => handleClick(`/matchlog/${data.summonerName}`)}
        >
          {data.summonerName}
        </div>
      </div>

      <div className="font-bold pr-[5%] w-[10%] text-right">
        {data.kills}/{data.deaths}/{data.assists}
      </div>
      <div className="font-bold ml-2 pr-[5%] w-[10%] text-right">
        {data.cs}cs
      </div>

      <div className="flex ml-2 w-[35%] gap-[2px]">
        {data.item0 !== 0 ? (
          <div className="h-5 w-5 sm:h-8 sm:w-8 relative">
            <Image
              className="rounded-md"
              layout="fill"
              objectFit="contain"
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item0}.png`}
              alt=""
            />
          </div>
        ) : (
          <div className="h-5 w-5 sm:h-8 sm:w-8 bg-white rounded-md opacity-20"></div>
        )}
        {data.item1 !== 0 ? (
          <div className="h-5 w-5 sm:h-8 sm:w-8 relative">
            <Image
              className="rounded-md"
              layout="fill"
              objectFit="contain"
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item1}.png`}
              alt=""
            />
          </div>
        ) : (
          <div className="h-5 w-5 sm:h-8 sm:w-8 bg-white rounded-md opacity-20"></div>
        )}
        {data.item2 !== 0 ? (
          <div className="h-5 w-5 sm:h-8 sm:w-8 relative">
            <Image
              className="rounded-md"
              layout="fill"
              objectFit="contain"
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item2}.png`}
              alt=""
            />
          </div>
        ) : (
          <div className="h-5 w-5 sm:h-8 sm:w-8 bg-white rounded-md opacity-20"></div>
        )}
        {data.item3 !== 0 ? (
          <div className="h-5 w-5 sm:h-8 sm:w-8 relative">
            <Image
              className="rounded-md"
              layout="fill"
              objectFit="contain"
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item3}.png`}
              alt=""
            />
          </div>
        ) : (
          <div className="h-5 w-5 sm:h-8 sm:w-8 bg-white rounded-md opacity-20"></div>
        )}
        {data.item4 !== 0 ? (
          <div className="h-5 w-5 sm:h-8 sm:w-8 relative">
            <Image
              className="rounded-md"
              layout="fill"
              objectFit="contain"
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item4}.png`}
              alt=""
            />
          </div>
        ) : (
          <div className="h-5 w-5 sm:h-8 sm:w-8 bg-white rounded-md opacity-20"></div>
        )}
        {data.item5 !== 0 ? (
          <div className="h-5 w-5 sm:h-8 sm:w-8 relative">
            <Image
              className="rounded-md"
              layout="fill"
              objectFit="contain"
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item5}.png`}
              alt=""
            />
          </div>
        ) : (
          <div className="h-5 w-5 sm:h-8 sm:w-8 bg-white rounded-md opacity-20"></div>
        )}
        <div className="h-5 w-5 sm:h-8 sm:w-8 relative">
          <Image
            className="rounded-md"
            layout="fill"
            objectFit="contain"
            src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item6}.png`}
            alt=""
          />
        </div>
      </div>
    </li>
  );
};

export default BuildPlayerList;
