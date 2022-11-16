/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Data } from "../../pages/_app";
import { BuildPlayerType } from "../../types/BuildPlayer";
import StatusRune from "../../data/StatusRune.json";
import StatRune from "./StatRune";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getQuery } from "../../lib/getQuery";
import useSWR from "swr/immutable";
import { useAuth } from "../../context/auth";
import RuneTree from "./RuneTree";
import SubRuneTree from "./SubRuneTree";

const BuildPlayer = (data: BuildPlayerType) => {
  const { RuneLists, runeIcon, latest } = useContext(Data);
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
  const [skillSet, setSkillSet] = useState<any[]>([]);
  const { user } = useAuth();
  let itemArry2: any[] = [];
  let skillArry: number[] = [];
  let Tindex = data.index + 1;

  const words = data.matchId.split("_");
  //firestore変更前
  // const { data: timeline, error } = useSWR(
  //   data.matchId + "TimeLine",
  //   async () => {
  //     const ref = doc(db, data.Player.puuid, "matchIDs", "TimeLine", words[1]);
  //     const snap = await getDoc(ref);
  //     if (snap.exists()) {
  //       return snap.data();
  //     } else {
  //       const TimeLineData = await axios
  //         .get(`http://localhost:3000/api/timeline/${data.matchId}`, {
  //           params: {
  //             region: getQuery("region", user?.region),
  //             platform: getQuery("platform", user?.region),
  //           },
  //         })
  //         .then(function (response) {
  //           return response.data;
  //         })
  //         .catch(function (err) {
  //           console.log(err);
  //         });

  //       await setDoc(
  //         doc(db, data.Player.puuid, "matchIDs", "TimeLine", words[1]),
  //         {
  //           data: TimeLineData,
  //         }
  //       );

  //       const ref = doc(
  //         db,
  //         data.Player.puuid,
  //         "matchIDs",
  //         "TimeLine",
  //         words[1]
  //       );
  //       const newSnap = await getDoc(ref);

  //       return newSnap.data();
  //     }
  //   }
  // );
  //firestore変更後
  const { data: timeline, error } = useSWR(
    data.matchId + "TimeLine",
    async () => {
      const ref = doc(db, "TimeLine", words[1]);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data();
      } else {
        const TimeLineData = await axios
          .get(`http://localhost:3000/api/timeline/${data.matchId}`, {
            params: {
              region: getQuery("region", user?.region),
              platform: getQuery("platform", user?.region),
            },
          })
          .then(function (response) {
            return response.data;
          })
          .catch(function (err) {
            console.log(err);
          });

        await setDoc(doc(db, "TimeLine", words[1]), {
          data: TimeLineData,
        });

        const ref = doc(db, "TimeLine", words[1]);
        const newSnap = await getDoc(ref);

        return newSnap.data();
      }
    }
  );

  useEffect(() => {
    console.log("timelinedesu", timeline);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    itemArry2 = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    skillArry = [];
    // console.log("time", data.timeLine);

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
            if (event.participantId === Tindex) {
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
  }, [timeline]);

  useEffect(() => {
    RuneLists.forEach((runeList: { id: number; icon: string }) => {
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
  }, []);

  useSWR(data.champion + "champion", async () => {
    const URL = `http://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion/${
      data.champion !== "FiddleSticks" ? data.champion : "Fiddlesticks"
    }.json`;
    axios
      .get(URL)
      .then(function (response) {
        var tmp = Object.entries(response.data.data).map(
          ([key, value]: any) => ({ key: key, value: value })
        );
        setSkillSet(tmp[0].value.spells);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  // useEffect(() => {
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

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data.champion]);

  function skillCheck(skill: number, index: number) {
    if (skill === 1) {
      return (
        <div className="">
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
            {index + 1}
          </div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        </div>
      );
    }
    if (skill === 2) {
      return (
        <div className="">
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
            {index + 1}
          </div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        </div>
      );
    }
    if (skill === 3) {
      return (
        <div className="">
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
            {index + 1}
          </div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        </div>
      );
    }
    if (skill === 4) {
      return (
        <div className="">
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
            {index + 1}
          </div>
        </div>
      );
    }
  }

  function mainRuneTree() {
    if (8100 === data.perks.styles[0].style) {
      return (
        <RuneTree
          runeIcon={runeIcon}
          rune={rune}
          runeIconIndex={0}
          perks={data.perks}
        />
      );
    }
    if (8300 === data.perks.styles[0].style) {
      return (
        <RuneTree
          runeIcon={runeIcon}
          rune={rune}
          runeIconIndex={1}
          perks={data.perks}
        />
      );
    }
    if (8000 === data.perks.styles[0].style) {
      return (
        <RuneTree
          runeIcon={runeIcon}
          rune={rune}
          runeIconIndex={2}
          perks={data.perks}
        />
      );
    }
    if (8400 === data.perks.styles[0].style) {
      return (
        <RuneTree
          runeIcon={runeIcon}
          rune={rune}
          runeIconIndex={3}
          perks={data.perks}
        />
      );
    }
    if (8200 === data.perks.styles[0].style) {
      return (
        <RuneTree
          runeIcon={runeIcon}
          rune={rune}
          runeIconIndex={4}
          perks={data.perks}
        />
      );
    }
  }
  function subRuneTree() {
    if (8100 === data.perks.styles[1].style) {
      return (
        <SubRuneTree
          runeIcon={runeIcon}
          rune={rune}
          runeIconIndex={0}
          perks={data.perks}
        />
      );
    }
    if (8300 === data.perks.styles[1].style) {
      return (
        <SubRuneTree
          runeIcon={runeIcon}
          rune={rune}
          runeIconIndex={1}
          perks={data.perks}
        />
      );
    }
    if (8000 === data.perks.styles[1].style) {
      return (
        <SubRuneTree
          runeIcon={runeIcon}
          rune={rune}
          runeIconIndex={2}
          perks={data.perks}
        />
      );
    }
    if (8400 === data.perks.styles[1].style) {
      return (
        <SubRuneTree
          runeIcon={runeIcon}
          rune={rune}
          runeIconIndex={3}
          perks={data.perks}
        />
      );
    }
    if (8200 === data.perks.styles[1].style) {
      return (
        <SubRuneTree
          runeIcon={runeIcon}
          rune={rune}
          runeIconIndex={4}
          perks={data.perks}
        />
      );
    }
  }
  function StatRuneTree() {
    return (
      <>
        <div className="flex">
          {StatusRune[0].map((status: { key: any; icon: string }) => (
            <StatRune
              key={uuidv4()}
              runeKey={status.key}
              data={data.perks.statPerks.offense}
              icon={status.icon}
              height={32}
              width={32}
            />
          ))}
        </div>
        <div className="flex">
          {StatusRune[1].map((status: { key: any; icon: string }) => (
            <StatRune
              key={uuidv4()}
              runeKey={status.key}
              data={data.perks.statPerks.flex}
              icon={status.icon}
              height={32}
              width={32}
            />
          ))}
        </div>
        <div className="flex">
          {StatusRune[2].map((status: { key: any; icon: string }) => (
            <StatRune
              key={uuidv4()}
              runeKey={status.key}
              data={data.perks.statPerks.defense}
              icon={status.icon}
              height={32}
              width={32}
            />
          ))}
        </div>
      </>
    );
  }

  if (Tindex !== data.participantID) return null;
  if (error) return <div>failed to load</div>;
  if (!timeline) return <div className="text-white">loading...</div>;
  return (
    <>
      {Tindex === data.participantID && (
        <div className="text-gray-300">
          <div className="flex flex-col">
            <div className="bg-[#172740] mb-2 rounded-md">
              <div className="bg-[#4b4e87] rounded-t-md font-bold pl-2">
                Rune Build
              </div>
              {rune.mainRune !== "" ? (
                <div className="flex items-center justify-center m-2">
                  <div className="">{mainRuneTree()}</div>
                  <div className="self-end">{subRuneTree()}</div>
                  <div className="self-end">{StatRuneTree()}</div>
                </div>
              ) : null}
            </div>
            <div className="bg-[#172740] mb-2 rounded-md">
              <div className="bg-[#4b4e87] rounded-t-md font-bold pl-2">
                Item Build
              </div>
              {JSON.stringify(itemLog) !== "[]" && (
                <div className="flex flex-wrap w-[450px] sm:w-[690px] m-2 items-center">
                  {itemLog.map((items, index) => (
                    <div key={uuidv4()}>
                      {items.length !== 0 && (
                        <div key={uuidv4()} className="flex items-center">
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
            <div className="bg-[#172740] rounded-md">
              <div className="bg-[#4b4e87] rounded-t-md font-bold pl-2">
                Skill Build
              </div>
              <div className="flex items-center mt-3 mb-2">
                <div>
                  <div className="h-5 w-5 sm:h-6 sm:w-6 sm:ml-1 mb-1 text-center">
                    Q
                  </div>
                  <div className="h-5 w-5 sm:h-6 sm:w-6 sm:ml-1 mb-1 text-center">
                    W
                  </div>
                  <div className="h-5 w-5 sm:h-6 sm:w-6 sm:ml-1 mb-1 text-center">
                    E
                  </div>
                  <div className="h-5 w-5 sm:h-6 sm:w-6 sm:ml-1 mb-1 text-center">
                    R
                  </div>
                </div>
                {JSON.stringify(skillSet) !== "[]" ? (
                  <div className="">
                    {skillSet.map((skill) => (
                      <div
                        key={skill.image.full}
                        className="h-5 w-5 sm:h-6 sm:w-6 ml-1 mb-1 relative"
                      >
                        <Image
                          className=""
                          layout="fill"
                          objectFit="contain"
                          src={`
                        https://ddragon.leagueoflegends.com/cdn/${latest}/img/spell/${skill.image.full}`}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
                {skillLog.length !== 0 ? (
                  <>
                    {skillLog.map((skill, index) => (
                      <div key={index}>{skillCheck(skill, index)}</div>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuildPlayer;
