import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { PlayerDataContext } from "../../context/Context";
import { Data } from "../../pages/_app";
import { PlayerMatchDataType } from "../../types/PlayerMatchDataType";
import Item from "../Item";

const PlayerMatchData = (data: PlayerMatchDataType) => {
  const { spellList, RuneLists, runeIcon } = useContext(Data);
  const { latest, player } = useContext(PlayerDataContext);
  // const { spellList, RuneLists, latest, player, runeIcon } = useContext(Data);
  const [spell, setSpell] = useState({
    spell1: "",
    spell2: "",
  });
  const [rune, setRune] = useState({
    mainRune: "",
    mainRune1: "",
    mainRune2: "",
    mainRune3: "",
    subRune: "",
    subRune1: "",
    subRune2: "",
  });

  // console.log(data);
  useEffect(() => {
    // console.log("data", data);
    if (player?.puuid === data.puuid) {
      // console.log("spellre");

      spellList.forEach((spell: { value: { key: string; id: string } }) => {
        if (spell.value.key === String(data.summoner1Id)) {
          setSpell((prev) => ({ ...prev, spell1: spell.value.id }));
        }
        if (spell.value.key === String(data.summoner2Id)) {
          setSpell((prev) => ({ ...prev, spell2: spell.value.id }));
        }
      });
    }
  }, [
    data.puuid,
    data.summoner1Id,
    data.summoner2Id,
    player?.puuid,
    spellList,
  ]);

  useEffect(() => {
    if (player?.puuid === data.puuid) {
      setRuneImg();
      data.setIssue(data.win);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.puuid]);

  const setRuneImg = useCallback(() => {
    RuneLists.forEach((runeList: { id: any; icon: string }) => {
      if (runeList.id === data.perks.styles[0].selections[0].perk) {
        setRune((prev) => ({ ...prev, mainRune: runeList.icon }));
      }
      // if (runeList.id === data.perks.styles[0].selections[1].perk) {
      //   setRune((prev) => ({ ...prev, mainRune1: runeList.icon }));
      // }
      // if (runeList.id === data.perks.styles[0].selections[2].perk) {
      //   setRune((prev) => ({ ...prev, mainRune2: runeList.icon }));
      // }
      // if (runeList.id === data.perks.styles[0].selections[3].perk) {
      //   setRune((prev) => ({ ...prev, mainRune3: runeList.icon }));
      // }
      // if (runeList.id === data.perks.styles[1].selections[0].perk) {
      //   setRune((prev) => ({ ...prev, subRune1: runeList.icon }));
      // }
      // if (runeList.id === data.perks.styles[1].selections[1].perk) {
      //   setRune((prev) => ({ ...prev, subRune2: runeList.icon }));
      // }
    });
    runeIcon.forEach((rune: { id: number; icon: string }) => {
      if (rune.id === data.perks.styles[1].style) {
        setRune((prev) => ({ ...prev, subRune: rune.icon }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.puuid]);

  const setKda = () => {
    const kda = data.challenges.kda.toFixed(2);
    return kda;
  };

  const setCPM = () => {
    const min = (data.time / 1000 / 60) % 60;
    return (data.cs / min).toFixed(1);
  };

  // console.log("レンダリング");
  return (
    <div className="grid grid-cols-7">
      <div className="flex justify-between col-span-3">
        <div className="font-bold ml-2 sm:ml-4 my-1 text-left">
          {data.gameMode === 420 ? (
            <div>Rank</div>
          ) : data.gameMode === 430 ? (
            <div className="text-sm">Normal</div>
          ) : data.gameMode === 440 ? (
            <div className="text-sm">FlexRank</div>
          ) : data.gameMode === 450 ? (
            <div>ARAM</div>
          ) : (
            <div>{data.gameMode}</div>
          )}
          <div className="h-[1px] w-full bg-white opacity-10"></div>
          {data.time < 180000 ? (
            <div className="text-sm">Remake</div>
          ) : data.win ? (
            <div className="text-blue-500">WIN</div>
          ) : (
            <div className="text-red-500">LOSS</div>
          )}
          <div>{data.gameTime}</div>
          {/* <div>{data.totalDamageDealtToChampions}</div> */}
        </div>
        <div className="flex items-center">
          <div className="relative sm:h-[60px] sm:w-[60px] w-[40px] h-[40px] mr-1">
            <Image
              layout="fill"
              objectFit="contain"
              src={`http://ddragon.leagueoflegends.com/cdn/${
                process.env.NEXT_PUBLIC_LATEST
              }/img/champion/${
                data.championName !== "FiddleSticks"
                  ? data.championName
                  : "Fiddlesticks"
              }.png`}
              alt=""
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <div className="relative sm:h-7 sm:w-7 w-[20px] h-[20px]">
              <Image
                layout="fill"
                objectFit="contain"
                src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/img/spell/${spell.spell1}.png`}
                alt=""
                className="rounded-md"
              ></Image>
            </div>
            <div className="relative sm:h-7 sm:w-7 w-[20px] h-[20px]">
              <Image
                layout="fill"
                objectFit="contain"
                src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/img/spell/${spell.spell2}.png`}
                alt=""
                className="rounded-md"
              ></Image>
            </div>
          </div>
          {rune.mainRune !== "" && (
            <div className="flex flex-col justify-center gap-[4px] ml-1">
              <div className="relative sm:h-7 sm:w-7 w-[20px] h-[20px] bg-black rounded-full">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={
                    "https://ddragon.leagueoflegends.com/cdn/img/" +
                    rune.mainRune
                  }
                  alt=""
                />
              </div>
              <div className="relative sm:h-7 sm:w-7 w-[20px] h-[20px]">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={
                    "https://ddragon.leagueoflegends.com/cdn/img/" +
                    rune.subRune
                  }
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center font-bold col-span-2">
        <div>
          {data.kills}/<span className="text-red-700">{data.deaths}</span>/
          {data.assists}
        </div>
        <div>
          <span className="text-sm">KDA</span> {setKda()}
        </div>
        <div>
          <span className="text-sm">CS</span> {data.cs}{" "}
          <span>({setCPM()})</span>
        </div>
      </div>
      <div className="flex justify-center items-center col-span-2">
        <div className="flex">
          <div className="grid grid-cols-4 gap-[2px]">
            <Item item={data.item0} style={"h-5 w-5 sm:h-8 sm:w-8"} />
            <Item item={data.item1} style={"h-5 w-5 sm:h-8 sm:w-8"} />
            <Item item={data.item2} style={"h-5 w-5 sm:h-8 sm:w-8"} />
            <Item item={data.item6} style={"h-5 w-5 sm:h-8 sm:w-8"} />
            <Item item={data.item3} style={"h-5 w-5 sm:h-8 sm:w-8"} />
            <Item item={data.item4} style={"h-5 w-5 sm:h-8 sm:w-8"} />
            <Item item={data.item5} style={"h-5 w-5 sm:h-8 sm:w-8"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerMatchData;
