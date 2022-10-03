import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import PlayerMatchData from "./PlayerMatchData";
import { Data } from "../../pages/_app";
import { ParticipantsType } from "../../types/matchParticipants";
import { TeamType } from "../../types/teamType";
import PlayerList from "./PlayerList";
import { v4 as uuidv4 } from "uuid";
import BuildLog from "../BuildLog/BuildLog";
import { msConversion } from "../../lib/msConverter";
import { getQuery } from "../../lib/getQuery";
import { useAuth } from "../../context/auth";
import useSWR from "swr";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

type MatchIDsType = {
  matchId: string;
  Player: any;
};

const MatchLogList = ({ matchId, Player }: MatchIDsType) => {
  const [matchParticipants, setMatchPaticipants] = useState<any>([]);
  const [redTeam, setRedTeam] = useState<any>([]);
  const [blueTeam, setBlueTeam] = useState<any>([]);
  const [issue, setIssue] = useState(true);
  const { player, region } = useContext(Data);
  const [gameTime, setGameTime] = useState<string>("");
  const [damage, setDamage] = useState<number>(0);
  const { fbUser, user } = useAuth();

  const [timeLine, setTimeLine] = useState<any>({});

  const [button, setButton] = useState("");
  const handleBuild = (matchData: string) => {
    if (matchData === button) {
      setButton("");
    } else {
      setButton(matchData);
    }
  };

  //////////////////////////////////////////////////

  const words = matchId.split("_");

  const { data, error } = useSWR(matchId, async () => {
    const ref = doc(db, Player.puuid, "matchIDs", "matchData", words[1]);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    } else {
      const matchData = await axios
        .get(`http://localhost:3000/api/lol/${matchId}`, {
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

      await setDoc(doc(db, Player.puuid, "matchIDs", "matchData", words[1]), {
        data: matchData,
      });

      const ref = doc(db, Player.puuid, "matchIDs", "matchData", words[1]);
      const newSnap = await getDoc(ref);

      return newSnap.data();
    }
  });

  useEffect(() => {
    console.log("index", data);
    setGameTime(
      msConversion(
        data?.data.matchData.info.gameEndTimestamp -
          data?.data.matchData.info.gameStartTimestamp
      )
    );
    setMatchPaticipants(data?.data.matchData.info.participants);
    setBlueTeam(data?.data.matchData.info.participants.slice(0, 5));
    setRedTeam(data?.data.matchData.info.participants.slice(5, 10));
    let tmp = 0;
    data?.data.matchData.info.participants.forEach(
      (data: { totalDamageDealtToChampions: number }) => {
        if (tmp < data.totalDamageDealtToChampions) {
          tmp = data.totalDamageDealtToChampions;
        }
      }
    );
    setDamage((prev) => (prev = tmp));
  }, [data]);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    //修正が必要
    <>
      <div className="flex">
        <div
          key={matchId}
          className={`rounded-l-lg w-[670px] ${
            issue ? "bg-[#496191]" : "bg-[#84515a]"
          }`}
        >
          <div className="">
            <div className="grid grid-cols-4 content-center items-center">
              <div className="col-span-3">
                {Array.isArray(matchParticipants) &&
                  matchParticipants.map((data: ParticipantsType) => (
                    <>
                      {/* uniquekeyerr */}
                      {data.puuid === player?.puuid && (
                        <PlayerMatchData
                          key={uuidv4()}
                          // puuid={data.puuid}
                          // championName={data.championName}
                          // kills={data.kills}
                          // deaths={data.deaths}
                          // assists={data.assists}
                          // win={data.win}
                          // summoner1Id={data.summoner1Id}
                          // summoner2Id={data.summoner2Id}
                          // perks={data.perks}
                          // item0={data.item0}
                          // item1={data.item1}
                          // item2={data.item2}
                          // item3={data.item3}
                          // item4={data.item4}
                          // item5={data.item5}
                          // item6={data.item6}
                          cs={
                            data.totalMinionsKilled + data.neutralMinionsKilled
                          }
                          {...data}
                          setIssue={setIssue}
                          gameTime={gameTime}
                        />
                      )}
                    </>
                  ))}
              </div>
              <div className="grid grid-cols-2">
                <div>
                  {Array.isArray(blueTeam) &&
                    blueTeam.map((data: TeamType, index: number) => (
                      <PlayerList
                        key={index}
                        // champExperience={data.champExperience}
                        // championName={data.championName}
                        // kills={data.kills}
                        // deaths={data.deaths}
                        // assists={data.assists}
                        // item0={data.item0}
                        // item1={data.item1}
                        // item2={data.item2}
                        // item3={data.item3}
                        // item4={data.item4}
                        // item5={data.item5}
                        // item6={data.item6}
                        cs={data.totalMinionsKilled + data.neutralMinionsKilled}
                        {...data}
                        wardsKilled={data.wardsKilled}
                        summonerName={data.summonerName}
                        puuid={data.puuid}
                      />
                    ))}
                </div>
                <div>
                  {Array.isArray(redTeam) &&
                    redTeam.map((data: TeamType, index: number) => (
                      <PlayerList
                        key={index}
                        // champExperience={data.champExperience}
                        // championName={data.championName}
                        // kills={data.kills}
                        // deaths={data.deaths}
                        // assists={data.assists}
                        // item0={data.item0}
                        // item1={data.item1}
                        // item2={data.item2}
                        // item3={data.item3}
                        // item4={data.item4}
                        // item5={data.item5}
                        // item6={data.item6}
                        cs={data.totalMinionsKilled + data.neutralMinionsKilled}
                        {...data}
                        wardsKilled={data.wardsKilled}
                        summonerName={data.summonerName}
                        puuid={data.puuid}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => handleBuild(matchId)}
          className="flex rounded-r-lg bg-zinc-400 max-h-max items-end"
        >
          <div className="w-[20px] text-center">
            {button === matchId ? "↑" : "↓"}
          </div>
        </div>
      </div>
      <div className="w-[480px] sm:w-[690px]">
        {button === matchId && (
          <BuildLog
            matchId={matchId}
            blueTeam={blueTeam}
            redTeam={redTeam}
            participants={matchParticipants}
            timeLine={timeLine}
            damage={damage}
            Player={Player}
          />
        )}
      </div>
    </>
  );
};

export default MatchLogList;
