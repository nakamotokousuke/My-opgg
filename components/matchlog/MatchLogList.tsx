import React, { useContext, useEffect, useState } from "react";
import { Data } from "../../pages/_app";
import BuildLog from "../BuildLog/BuildLog";
import { msConversion } from "../../lib/msConverter";
import { useFetchFBMatchData } from "../../lib/CustomHook";
import BuildLogButton from "./BuildLogButton";
import LogIndex from "./LogIndex";
import { PlayerDataContext } from "../../context/Context";

type MatchIDsType = {
  matchId: string;
  Player: any;
};

const MatchLogList = ({ matchId, Player }: MatchIDsType) => {
  const [matchParticipants, setMatchPaticipants] = useState<any>([]);
  const [redTeam, setRedTeam] = useState<any>([]);
  const [blueTeam, setBlueTeam] = useState<any>([]);
  const [issue, setIssue] = useState(true);
  const { player, region } = useContext(PlayerDataContext);
  // const { player, region } = useContext(Data);
  const [gameTime, setGameTime] = useState<string>("");
  const [damage, setDamage] = useState<number>(0);

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
  const { data, error } = useFetchFBMatchData(matchId, words);

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
    <>
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
            matchParticipants={matchParticipants}
            player={player}
            setIssue={setIssue}
            gameTime={gameTime}
            gameMode={gameMode}
            time={time}
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
