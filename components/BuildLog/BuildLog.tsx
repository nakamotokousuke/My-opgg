import React, { useEffect, useState } from "react";
import { PlayerData } from "../../types/PlayerType";
import BuildPlayerListPage from "./BuildPlayerListPage";
import BuildPlayerPage from "./BuildPlayerPage";
interface BuildLogProps {
  matchId: string;
  blueTeam: any;
  redTeam: any;
  participants: any;
  timeLine: any;
  damage: number;
  Player: PlayerData;
  time: number;
}

const BuildLog = ({
  matchId,
  blueTeam,
  redTeam,
  participants,
  timeLine,
  damage,
  Player,
  time,
}: BuildLogProps) => {
  const [buildLog, setBuildLog] = useState({
    BuildPlayerList: true,
    BuildPlayer: false,
  });

  const [participantID, setParticipantID] = useState(0);

  useEffect(() => {
    participants.forEach((data: { puuid: string; participantId: number }) => {
      if (Player.puuid === data.puuid) {
        setParticipantID(data.participantId);
      }
    });
  }, [Player.puuid, participants]);

  const handleSwitch = () => {
    setBuildLog((prev) => ({ ...prev, BuildPlayerList: true }));
    setBuildLog((prev) => ({ ...prev, BuildPlayer: false }));
  };
  const handleSwitch2 = () => {
    setBuildLog((prev) => ({ ...prev, BuildPlayerList: false }));
    setBuildLog((prev) => ({ ...prev, BuildPlayer: true }));
  };
  return (
    <div className="mb-4">
      <div className="flex bg-[#4b4e87] my-2 rounded-md text-gray-300 font-bold">
        <div
          onClick={handleSwitch}
          className={`w-[10%] text-center rounded-lg m-2 hover:bg-[#172740] ${
            buildLog.BuildPlayerList ? "bg-[#172740]" : ""
          }`}
        >
          team
        </div>
        <div
          onClick={handleSwitch2}
          className={`w-[10%] text-center rounded-lg m-2 hover:bg-[#172740] ${
            buildLog.BuildPlayer ? "bg-[#172740]" : ""
          }`}
        >
          build
        </div>
      </div>
      <div className="min-h-max">
        {buildLog.BuildPlayerList && (
          <BuildPlayerListPage
            blueTeam={blueTeam}
            redTeam={redTeam}
            damage={damage}
            time={time}
          />
        )}
        {buildLog.BuildPlayer && (
          <BuildPlayerPage
            blueTeam={blueTeam}
            redTeam={redTeam}
            participantID={participantID}
            setParticipantID={setParticipantID}
            participants={participants}
            timeLine={timeLine}
            matchId={matchId}
            Player={Player}
          />
        )}
      </div>
    </div>
  );
};

export default BuildLog;
