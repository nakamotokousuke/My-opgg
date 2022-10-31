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
  const { user } = useAuth();

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
  const gameMode = data?.data.matchData.info.queueId;
  const time =
    data?.data.matchData.info.gameEndTimestamp -
    data?.data.matchData.info.gameStartTimestamp;

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
          className={`rounded-l-lg w-[670px] ${
            time < 720000
              ? "bg-[#5a5a5a]"
              : issue
              ? "bg-[#496191]"
              : "bg-[#84515a]"
          }`}
        >
          <div className="">
            <div className="grid grid-cols-4 content-center items-center">
              <div className="col-span-3">
                {Array.isArray(matchParticipants) &&
                  matchParticipants.map((data: ParticipantsType) => (
                    <div key={uuidv4()}>
                      {/* uniquekeyerr */}
                      {data.puuid === player?.puuid && (
                        <PlayerMatchData
                          cs={
                            data.totalMinionsKilled + data.neutralMinionsKilled
                          }
                          {...data}
                          setIssue={setIssue}
                          gameTime={gameTime}
                          gameMode={gameMode}
                          time={time}
                        />
                      )}
                    </div>
                  ))}
              </div>
              <div className="grid grid-cols-2">
                <div key={uuidv4()}>
                  {Array.isArray(blueTeam) &&
                    blueTeam.map((data: TeamType, index: number) => (
                      <PlayerList
                        key={index}
                        cs={data.totalMinionsKilled + data.neutralMinionsKilled}
                        {...data}
                        wardsKilled={data.wardsKilled}
                        summonerName={data.summonerName}
                        puuid={data.puuid}
                      />
                    ))}
                </div>
                <div key={uuidv4()}>
                  {Array.isArray(redTeam) &&
                    redTeam.map((data: TeamType, index: number) => (
                      <PlayerList
                        key={index}
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
          <div className="w-[20px] flex justify-center">
            {button === matchId ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                />
              </svg>
            )}
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
            time={
              data?.data.matchData.info.gameEndTimestamp -
              data?.data.matchData.info.gameStartTimestamp
            }
          />
        )}
      </div>
    </>
  );
};

export default MatchLogList;
