import React, { useContext, useEffect, useMemo, useState } from "react";
import { Data } from "../../pages/_app";
import BuildLog from "../BuildLog/BuildLog";
import { msConversion } from "../../lib/msConverter";
import { useFetchFBMatchData } from "../../lib/CustomHook";
import BuildLogButton from "./BuildLogButton";
import LogIndex from "./LogIndex";
import { PlayerDataContext } from "../../context/Context";

type MatchIDsType = {
  matchId: string;
  index: number;
};

const MatchLogList = ({ matchId, index }: MatchIDsType) => {
  const [matchParticipants, setMatchPaticipants] = useState<any>([]);
  const [redTeam, setRedTeam] = useState<any>([]);
  const [blueTeam, setBlueTeam] = useState<any>([]);
  const [issue, setIssue] = useState(true);
  const { player: Player } = useContext(PlayerDataContext);
  // const { player, region } = useContext(Data);
  const [gameTime, setGameTime] = useState<string>("");
  const [damage, setDamage] = useState<number>(0);

  const [button, setButton] = useState("");
  const handleBuild = (matchData: string) => {
    if (matchData === button) {
      setButton("");
    } else {
      setButton(matchData);
    }
  };

  //////////////////////////////////////////////////
  console.count("レンダリング回数");
  const { data, error } = useFetchFBMatchData(matchId);

  const gameMode = data?.data.matchData.info.queueId;
  const time =
    data?.data.matchData.info.gameEndTimestamp -
    data?.data.matchData.info.gameStartTimestamp;

  // useEffect(() => {
  //   console.count("useEffect");
  //   setGameTime(
  //     msConversion(
  //       data?.data.matchData.info.gameEndTimestamp -
  //         data?.data.matchData.info.gameStartTimestamp
  //     )
  //   );
  //   setMatchPaticipants(data?.data.matchData.info.participants);
  //   setBlueTeam(data?.data.matchData.info.participants.slice(0, 5));
  //   setRedTeam(data?.data.matchData.info.participants.slice(5, 10));
  //   let tmp = 0;
  //   data?.data.matchData.info.participants.forEach(
  //     (data: { totalDamageDealtToChampions: number }) => {
  //       if (tmp < data.totalDamageDealtToChampions) {
  //         tmp = data.totalDamageDealtToChampions;
  //       }
  //     }
  //   );
  //   setDamage((prev) => (prev = tmp));
  // }, [data?.data.matchData.info.participants]);

  const getMaxDamage = useMemo(() => {
    let tmp = 0;
    data?.data.matchData.info.participants.forEach(
      (data: { totalDamageDealtToChampions: number }) => {
        if (tmp < data.totalDamageDealtToChampions) {
          tmp = data.totalDamageDealtToChampions;
        }
      }
    );
    return tmp;
  }, [data?.data.matchData.info.participants]);

  // const getMaxDamage = useMemo(() => {
  //   const participants: any[] = data?.data.matchData.info.participants;
  //   return Math.max(
  //     ...participants.map(
  //       ({
  //         totalDamageDealtToChampions,
  //       }: {
  //         totalDamageDealtToChampions: number;
  //       }) => totalDamageDealtToChampions
  //     )
  //   );
  // }, [data?.data.matchData.info.participants]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="rounded-l-lg mb-2">
      <div className="flex">
        <div
          className={`rounded-l-lg w-[670px] ${
            time < 180000
              ? "bg-[#5a5a5a]"
              : issue
              ? "bg-[#496191]"
              : "bg-[#84515a]"
          }`}
        >
          <LogIndex
            // matchParticipants={matchParticipants}
            matchParticipants={data?.data.matchData.info.participants}
            player={Player}
            setIssue={setIssue}
            // gameTime={gameTime}
            gameTime={msConversion(
              data?.data.matchData.info.gameEndTimestamp -
                data?.data.matchData.info.gameStartTimestamp
            )}
            gameMode={gameMode}
            time={time}
            // blueTeam={blueTeam}
            // redTeam={redTeam}
            blueTeam={data?.data.matchData.info.participants.slice(0, 5)}
            redTeam={data?.data.matchData.info.participants.slice(5, 10)}
          />
        </div>
        <BuildLogButton
          handleBuild={handleBuild}
          matchId={matchId}
          button={button}
        />
      </div>
      <div className="w-[480px] sm:w-[690px]">
        {button === matchId && (
          <BuildLog
            matchId={matchId}
            // blueTeam={blueTeam}
            // redTeam={redTeam}
            blueTeam={data?.data.matchData.info.participants.slice(0, 5)}
            redTeam={data?.data.matchData.info.participants.slice(5, 10)}
            participants={data?.data.matchData.info.participants}
            // participants={matchParticipants}
            damage={getMaxDamage}
            Player={Player}
            time={
              data?.data.matchData.info.gameEndTimestamp -
              data?.data.matchData.info.gameStartTimestamp
            }
          />
        )}
      </div>
    </div>
  );
};

export default MatchLogList;
