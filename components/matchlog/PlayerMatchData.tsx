import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Data } from "../../pages/_app";
import { PlayerMatchDataType } from "../../types/PlayerMatchDataType";

const PlayerMatchData = (data: PlayerMatchDataType) => {
  const { spellList, RuneLists, latest, player } = useContext(Data);
  const [spell, setSpell] = useState({
    spell1: "",
    spell2: "",
  });
  const [rune, setRune] = useState({
    mainRune: "",
    mainRune1: "",
    mainRune2: "",
    mainRune3: "",
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.puuid]);

  const setRuneImg = useCallback(() => {
    RuneLists.forEach((runeList: { id: any; icon: string }) => {
      if (runeList.id === data.perks.styles[0].selections[0].perk) {
        setRune((prev) => ({ ...prev, mainRune: runeList.icon }));
      }
      if (runeList.id === data.perks.styles[0].selections[1].perk) {
        setRune((prev) => ({ ...prev, mainRune1: runeList.icon }));
      }
      if (runeList.id === data.perks.styles[0].selections[2].perk) {
        setRune((prev) => ({ ...prev, mainRune2: runeList.icon }));
      }
      if (runeList.id === data.perks.styles[0].selections[3].perk) {
        setRune((prev) => ({ ...prev, mainRune3: runeList.icon }));
      }
      if (runeList.id === data.perks.styles[1].selections[0].perk) {
        setRune((prev) => ({ ...prev, subRune1: runeList.icon }));
      }
      if (runeList.id === data.perks.styles[1].selections[1].perk) {
        setRune((prev) => ({ ...prev, subRune2: runeList.icon }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.puuid]);

  // console.log("レンダリング");
  return (
    <div className="grid grid-cols-3">
      <div className="flex justify-between">
        <div className="font-bold m-2 text-center">
          {data.win ? (
            <div className="text-blue-400">win</div>
          ) : (
            <div className="text-red-400">defeat</div>
          )}
          <div>
            {data.kills}/<span className="text-red-700">{data.deaths}</span>/
            {data.assists}
          </div>
          {data.gameTime}
        </div>
        <div className="flex items-center">
          <div>
            <Image
              width={64}
              height={64}
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/champion/${data.championName}.png`}
              alt=""
            />
          </div>
          <div className="flex flex-col pb-[6px]">
            <Image
              height={32}
              width={32}
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/spell/${spell.spell1}.png`}
              alt=""
            ></Image>
            <Image
              height={32}
              width={32}
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/spell/${spell.spell2}.png`}
              alt=""
            ></Image>
          </div>
        </div>
      </div>
      {rune.mainRune !== "" && (
        <div className="flex justify-center items-center">
          <div className="w-max flex">
            <Image
              width={64}
              height={64}
              src={
                "https://ddragon.leagueoflegends.com/cdn/img/" + rune.mainRune
              }
              alt=""
            />
            <div className="grid grid-cols-3 w-max">
              <Image
                width={32}
                height={32}
                src={
                  "https://ddragon.leagueoflegends.com/cdn/img/" +
                  rune.mainRune1
                }
                alt=""
              />
              <Image
                width={32}
                height={32}
                src={
                  "https://ddragon.leagueoflegends.com/cdn/img/" +
                  rune.mainRune2
                }
                alt=""
              />
              <Image
                width={32}
                height={32}
                src={
                  "https://ddragon.leagueoflegends.com/cdn/img/" +
                  rune.mainRune3
                }
                alt=""
              />
              <Image
                width={32}
                height={32}
                src={
                  "https://ddragon.leagueoflegends.com/cdn/img/" + rune.subRune1
                }
                alt=""
              />
              <Image
                width={32}
                height={32}
                src={
                  "https://ddragon.leagueoflegends.com/cdn/img/" + rune.subRune2
                }
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="flex">
          <div className="grid grid-cols-4 gap-[2px]">
            {data.item0 !== 0 ? (
              <Image
                width={32}
                height={32}
                className="rounded-md"
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item0}.png`}
                alt=""
              />
            ) : (
              <div className="w-[32px] h-[32px] bg-white rounded-md opacity-20"></div>
            )}
            {data.item1 !== 0 ? (
              <Image
                width={32}
                height={32}
                className="rounded-md"
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item1}.png`}
                alt=""
              />
            ) : (
              <div className="w-[32px] h-[32px] bg-white rounded-md opacity-20"></div>
            )}
            {data.item2 !== 0 ? (
              <Image
                width={32}
                height={32}
                className="rounded-md"
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item2}.png`}
                alt=""
              />
            ) : (
              <div className="w-[32px] h-[32px] bg-white rounded-md opacity-20"></div>
            )}
            <Image
              className="rounded-md ml-[2px] mb-[2px] max-h-max"
              width={32}
              height={32}
              src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item6}.png`}
              alt=""
            />
            {data.item3 !== 0 ? (
              <Image
                width={32}
                height={32}
                className="rounded-md"
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item3}.png`}
                alt=""
              />
            ) : (
              <div className="w-[32px] h-[32px] bg-white rounded-md opacity-20"></div>
            )}
            {data.item4 !== 0 ? (
              <Image
                width={32}
                height={32}
                className="rounded-md"
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item4}.png`}
                alt=""
              />
            ) : (
              <div className="w-[32px] h-[32px] bg-white rounded-md opacity-20"></div>
            )}
            {data.item5 !== 0 ? (
              <Image
                width={32}
                height={32}
                className="rounded-md"
                src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/item/${data.item5}.png`}
                alt=""
              />
            ) : (
              <div className="w-[32px] h-[32px] bg-white rounded-md opacity-20"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerMatchData;
