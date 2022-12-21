import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { PlayerDataContext } from "../../context/Context";
import { getQuery } from "../../lib/getQuery";
import { Data } from "../../pages/_app";
import { BuidlPlayerListProps } from "../../types/BuildPlayerListProps";
import Item from "../Item";

const BuildPlayerList = (data: BuidlPlayerListProps) => {
  const { spellList, runeIcon, RuneLists } = useContext(Data);
  const { latest, region, player } = useContext(PlayerDataContext);
  // const { spellList, runeIcon, RuneLists, latest, region, player } =
  //   useContext(Data);
  const [spell1ID, setSpell1ID] = useState("");
  const [spell2ID, setSpell2ID] = useState("");
  const [mainrune, setMainrune] = useState("");
  const [subrune, setSubrune] = useState("");
  const router = useRouter();
  const [dmg, setDmg] = useState("50");
  const [cpm, setCpm] = useState(0);

  useEffect(() => {
    setDmg(
      (prev) =>
        (prev = Math.floor(
          (data.totalDamageDealtToChampions / data.damage) * 100
        ).toFixed(0))
    );

    const min = (data.time / 1000 / 60) % 60;
    setCpm(data.cs / min);

    spellList.forEach((spell: { value: { key: string; id: string } }) => {
      if (spell.value.key === String(data.spell1)) {
        setSpell1ID(spell.value.id);
      }
      if (spell.value.key === String(data.spell2)) {
        setSpell2ID(spell.value.id);
      }
    });

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

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleClick = (path: string) => {
    router.push({
      pathname: path,
      query: {
        region: getQuery("region"),
        platform: getQuery("platform"),
      },
    });
  };
  const setKda = () => {
    const kda = data.challenges.kda.toFixed(2);
    return kda;
  };

  return (
    <li
      key={data.summonerName}
      className={`flex justify-between items-center mx-[2px] px-[4px] py-[1px] ${
        data.puuid === player?.puuid && "bg-blue-500 rounded-md"
      }`}
    >
      <div className="flex w-[40%] items-center">
        <div className="flex">
          <div className="relative h-8 w-8">
            <Image
              className="w-full"
              height={32}
              width={32}
              src={`http://ddragon.leagueoflegends.com/cdn/${
                process.env.NEXT_PUBLIC_LATEST
              }/img/champion/${
                data.championName !== "FiddleSticks"
                  ? data.championName
                  : "Fiddlesticks"
              }.png`}
              alt=""
            />
            <div className="absolute z-10 bottom-0 bg-gray-800 text-white text-[2px] ">
              {data.champLevel}
            </div>
          </div>
          {data.spell1 !== undefined ? (
            <div className="flex flex-col">
              <Image
                height={16}
                width={16}
                src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/img/spell/${spell1ID}.png`}
                alt=""
              />
              <Image
                height={16}
                width={16}
                src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/img/spell/${spell2ID}.png`}
                alt=""
              />
            </div>
          ) : null}
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
          ) : null}
        </div>
        <div
          className="font-bold truncate ... w-[60%] cursor-pointer"
          onClick={() => handleClick(`/matchlog/${data.summonerName}`)}
        >
          {data.summonerName}
        </div>
      </div>

      <div className="font-bold w-[10%] text-right text-sm">
        <div>
          {data.kills}/{data.deaths}/{data.assists}
        </div>
        <div className="">{setKda()}</div>
      </div>
      <div className="font-bold ml-2 w-[10%] text-right text-sm">
        <div>{data.totalDamageDealtToChampions}</div>
        <div className="relative h-[3px] bg-gray-600">
          <div
            className={`absolute left-0 top-0 bottom-0 m-auto bg-white h-[2px]`}
            style={{
              width: dmg + "%",
            }}
          ></div>
        </div>
        <div className="text-sm">{dmg}%</div>
      </div>
      <div className="font-bold ml-2 w-[10%] text-right text-sm">
        <div>{data.cs}cs</div>
        <div>{cpm.toFixed(1)}/min</div>
      </div>

      <div className="grid grid-cols-4 w-max ml-2 gap-[2px]">
        <Item item={data.item0} style={"h-[15px] w-[15px] sm:h-5 sm:w-5"} />
        <Item item={data.item1} style={"h-[15px] w-[15px] sm:h-5 sm:w-5"} />
        <Item item={data.item2} style={"h-[15px] w-[15px] sm:h-5 sm:w-5"} />
        <Item item={data.item6} style={"h-[15px] w-[15px] sm:h-5 sm:w-5"} />
        <Item item={data.item3} style={"h-[15px] w-[15px] sm:h-5 sm:w-5"} />
        <Item item={data.item4} style={"h-[15px] w-[15px] sm:h-5 sm:w-5"} />
        <Item item={data.item5} style={"h-[15px] w-[15px] sm:h-5 sm:w-5"} />
      </div>
    </li>
  );
};

export default BuildPlayerList;
