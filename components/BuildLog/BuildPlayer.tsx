import React, { useCallback, useEffect, useState } from "react";
import { BuildPlayerType } from "../../types/BuildPlayer";
import {
  useFetchFBTimeLine,
  useFetchRuneList,
  useFetchSkillSet,
} from "../../lib/CustomHook";
import RuneBuild from "./Runes/RuneBuild";
import ItemBuild from "./ItemBuild/ItemBuild";
import SkillBuild from "./SkillLevelTimeLine/SkillBuild";

const BuildPlayer = (data: BuildPlayerType) => {
  const { runeIcon, runeList: RuneLists } = useFetchRuneList();

  const [itemLog, setItemLog] = useState<any[]>([]);
  const [skillLog, setSkillLog] = useState<number[]>([]);
  const [rune, setRune] = useState({
    mainRune: "",
    mainRune1: "",
    mainRune2: "",
    mainRune3: "",
    subRune1: "",
    subRune2: "",
    statRune1: "",
    statRune2: "",
    statRune3: "",
  });
  let participantIndex = data.index + 1;

  const words = data.matchId.split("_");

  //customHookに変更
  const { timeline, error } = useFetchFBTimeLine(data, words);

  //customHookに変更
  const skillSet = useFetchSkillSet(data);

  const setRuneList = useCallback(() => {
    RuneLists?.forEach((runeList: { id: number; icon: string }) => {
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
  }, [RuneLists, data.perks.styles]);

  useEffect(() => {
    console.log("timelinedesu", timeline);

    let itemArry2: any[] = [];
    let skillArry: number[] = [];

    timeline?.data.timeLineData.info.frames.forEach(
      (frame: { events: any }, framIndex: number) => {
        itemArry2.push([]);
        frame.events.forEach(
          (event: {
            participantId: number;
            type: string;
            itemId: number;
            skillSlot: number;
          }) => {
            if (event.participantId === participantIndex) {
              if (event.type === "ITEM_PURCHASED") {
                itemArry2[framIndex].push(event.itemId);
              }
              if (event.type === "SKILL_LEVEL_UP") {
                skillArry.push(event.skillSlot);
              }
            }
          }
        );
      }
    );
    setItemLog(itemArry2);
    setSkillLog(skillArry);
    setRuneList();
  }, [participantIndex, setRuneList, timeline]);
  // useEffect(() => {
  //   // setTimeLine();
  //   setRuneList();
  // }, [setRuneList]);

  // useSWR(data.champion + "champion", async () => {
  //   const URL = `http://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion/${
  //     data.champion !== "FiddleSticks" ? data.champion : "Fiddlesticks"
  //   }.json`;
  //   axios
  //     .get(URL)
  //     .then(function (response) {
  //       var tmp = Object.entries(response.data.data).map(
  //         ([key, value]: any) => ({ key: key, value: value })
  //       );
  //       setSkillSet(tmp[0].value.spells);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // });

  if (participantIndex !== data.participantID) return null;
  if (error) return <div className="text-white">failed to load</div>;
  if (!timeline) return <div className="text-white">loading...</div>;
  return (
    <>
      {participantIndex === data.participantID && (
        <div className="text-gray-300">
          <div className="flex flex-col">
            <RuneBuild data={data} runeIcon={runeIcon} rune={rune} />
            <ItemBuild itemLog={itemLog} />
            <SkillBuild skillLog={skillLog} skillSet={skillSet} />
          </div>
        </div>
      )}
    </>
  );
};

export default BuildPlayer;

// function skillCheck(skill: number, index: number) {
//   if (skill === 1) {
//     return (
//       <div className="">
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
//           {index + 1}
//         </div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//       </div>
//     );
//   }
//   if (skill === 2) {
//     return (
//       <div className="">
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
//           {index + 1}
//         </div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//       </div>
//     );
//   }
//   if (skill === 3) {
//     return (
//       <div className="">
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
//           {index + 1}
//         </div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//       </div>
//     );
//   }
//   if (skill === 4) {
//     return (
//       <div className="">
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
//         <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
//           {index + 1}
//         </div>
//       </div>
//     );
//   }
// }
// //コンポーネント可済み
// function mainRuneTree() {
//   if (8100 === data.perks.styles[0].style) {
//     return (
//       <RuneTree
//         runeIcon={runeIcon}
//         rune={rune}
//         runeIconIndex={0}
//         perks={data.perks}
//       />
//     );
//   }
//   if (8300 === data.perks.styles[0].style) {
//     return (
//       <RuneTree
//         runeIcon={runeIcon}
//         rune={rune}
//         runeIconIndex={1}
//         perks={data.perks}
//       />
//     );
//   }
//   if (8000 === data.perks.styles[0].style) {
//     return (
//       <RuneTree
//         runeIcon={runeIcon}
//         rune={rune}
//         runeIconIndex={2}
//         perks={data.perks}
//       />
//     );
//   }
//   if (8400 === data.perks.styles[0].style) {
//     return (
//       <RuneTree
//         runeIcon={runeIcon}
//         rune={rune}
//         runeIconIndex={3}
//         perks={data.perks}
//       />
//     );
//   }
//   if (8200 === data.perks.styles[0].style) {
//     return (
//       <RuneTree
//         runeIcon={runeIcon}
//         rune={rune}
//         runeIconIndex={4}
//         perks={data.perks}
//       />
//     );
//   }
// }
// //コンポーネント可済み
// function subRuneTree() {
//   if (8100 === data.perks.styles[1].style) {
//     return (
//       <SubRuneTree
//         runeIcon={runeIcon}
//         rune={rune}
//         runeIconIndex={0}
//         perks={data.perks}
//       />
//     );
//   }
//   if (8300 === data.perks.styles[1].style) {
//     return (
//       <SubRuneTree
//         runeIcon={runeIcon}
//         rune={rune}
//         runeIconIndex={1}
//         perks={data.perks}
//       />
//     );
//   }
//   if (8000 === data.perks.styles[1].style) {
//     return (
//       <SubRuneTree
//         runeIcon={runeIcon}
//         rune={rune}
//         runeIconIndex={2}
//         perks={data.perks}
//       />
//     );
//   }
//   if (8400 === data.perks.styles[1].style) {
//     return (
//       <SubRuneTree
//         runeIcon={runeIcon}
//         rune={rune}
//         runeIconIndex={3}
//         perks={data.perks}
//       />
//     );
//   }
//   if (8200 === data.perks.styles[1].style) {
//     return (
//       <SubRuneTree
//         runeIcon={runeIcon}
//         rune={rune}
//         runeIconIndex={4}
//         perks={data.perks}
//       />
//     );
//   }
// }
// //コンポーネント可済み
// function StatRuneTree1() {
//   return (
//     <>
//       <div className="flex">
//         {StatusRune[0].map((status: { key: any; icon: string }) => (
//           <StatRune
//             key={uuidv4()}
//             runeKey={status.key}
//             data={data.perks.statPerks.offense}
//             icon={status.icon}
//             height={32}
//             width={32}
//           />
//         ))}
//       </div>
//       <div className="flex">
//         {StatusRune[1].map((status: { key: any; icon: string }) => (
//           <StatRune
//             key={uuidv4()}
//             runeKey={status.key}
//             data={data.perks.statPerks.flex}
//             icon={status.icon}
//             height={32}
//             width={32}
//           />
//         ))}
//       </div>
//       <div className="flex">
//         {StatusRune[2].map((status: { key: any; icon: string }) => (
//           <StatRune
//             key={uuidv4()}
//             runeKey={status.key}
//             data={data.perks.statPerks.defense}
//             icon={status.icon}
//             height={32}
//             width={32}
//           />
//         ))}
//       </div>
//     </>
//   );
// }
