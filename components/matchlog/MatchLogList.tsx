import React, { useCallback, useContext, useMemo, useState } from "react";
import BuildLog from "../BuildLog/BuildLog";
import { msConversion } from "../../lib/msConverter";
import { useFetchFBMatchData } from "../../lib/CustomHook";
import BuildLogButton from "./BuildLogButton";
import LogIndex from "./LogIndex";
import { PlayerDataContext } from "../../context/Context";
import { GameInfoType } from "../../types/GameInfo";

type MatchIDsType = {
  matchId: string;
  index: number;
};

const MatchLogList = ({ matchId, index }: MatchIDsType) => {
  const [matchParticipants, setMatchPaticipants] = useState<any>([]);
  // const [redTeam, setRedTeam] = useState<any>([]);
  // const [blueTeam, setBlueTeam] = useState<any>([]);
  const [issue, setIssue] = useState(true);
  const { player } = useContext(PlayerDataContext);
  // const { player, region } = useContext(Data);
  // const [gameTime, setGameTime] = useState<string>("");
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
  const infoData: GameInfoType = data?.data.matchData.info;
  console.log(infoData);

  const gameMode = infoData?.queueId;
  const time = infoData?.gameEndTimestamp - infoData?.gameStartTimestamp;
  const gameTime = msConversion(
    infoData?.gameEndTimestamp - infoData?.gameStartTimestamp
  );
  const allParticipants = infoData?.participants;
  const blueTeam = infoData?.participants.slice(0, 5);
  const redTeam = infoData?.participants.slice(5, 10);

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

  const getIssue = useCallback(() => {
    const issue = infoData?.participants.find(
      (data) => player?.puuid === data.puuid
    );
    // console.log(issue.win);
    return issue.win;
  }, [infoData?.participants, player?.puuid]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.count("return ander");
  return (
    <div className="rounded-l-lg mb-2">
      <div className="flex">
        <div
          className={`rounded-l-lg w-[670px] ${
            time < 180000
              ? "bg-[#5a5a5a]"
              : getIssue()
              ? "bg-[#496191]"
              : "bg-[#84515a]"
          }`}
        >
          <LogIndex
            // matchParticipants={matchParticipants}
            matchParticipants={allParticipants}
            // setIssue={setIssue}
            // gameTime={gameTime}
            gameTime={gameTime}
            gameMode={gameMode}
            time={time}
            // blueTeam={blueTeam}
            // redTeam={redTeam}
            blueTeam={blueTeam}
            redTeam={redTeam}
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
            blueTeam={blueTeam}
            redTeam={redTeam}
            participants={allParticipants}
            // participants={matchParticipants}
            damage={getMaxDamage}
            // Player={Player}
            time={time}
          />
        )}
      </div>
    </div>
  );
};

export default MatchLogList;
