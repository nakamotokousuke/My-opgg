import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Data } from "../../pages/_app";
import { PlayerMatchDataType } from "../../types/PlayerMatchDataType";
import Item from "./Item";

const PlayerMatchData = (data: PlayerMatchDataType) => {
  const { spellList, RuneLists, latest, player, runeIcon } = useContext(Data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.puuid]);

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
        <div className="font-bold ml-4 my-1 text-center">
          {data.gameMode === "CLASSIC" ? (
            <div>Rank</div>
          ) : (
            <div>{data.gameMode}</div>
          )}
          <div className="h-[1px] w-full bg-white opacity-10"></div>
          {data.win ? (
            <div className="text-blue-400">win</div>
          ) : (
            <div className="text-red-400">Loss</div>
          )}
          <div>{data.gameTime}</div>
          {/* <div>{data.totalDamageDealtToChampions}</div> */}
        </div>
        <div className="flex items-center">
          <div className="relative sm:h-[60px] sm:w-[60px] w-[40px] h-[40px] mr-1">
            <Image
              layout="fill"
              objectFit="contain"
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/champion/${
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
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/spell/${spell.spell1}.png`}
                alt=""
                className="rounded-md"
              ></Image>
            </div>
            <div className="relative sm:h-7 sm:w-7 w-[20px] h-[20px]">
              <Image
                layout="fill"
                objectFit="contain"
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/spell/${spell.spell2}.png`}
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
            <Item item={data.item0} latest={latest} />
            <Item item={data.item1} latest={latest} />
            <Item item={data.item2} latest={latest} />
            <div className="h-5 w-5 sm:h-8 sm:w-8 relative">
              <Image
                className="rounded-md ml-[2px] mb-[2px] max-h-max"
                layout="fill"
                objectFit="contain"
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item6}.png`}
                alt=""
              />
            </div>
            <Item item={data.item3} latest={latest} />
            <Item item={data.item4} latest={latest} />
            <Item item={data.item5} latest={latest} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerMatchData;
