import React from "react";
import { ParticipantsType } from "../../types/matchParticipants";
import { TeamType } from "../../types/teamType";
import PlayerList from "./PlayerList";
import PlayerMatchData from "./PlayerMatchData";
import { v4 as uuidv4 } from "uuid";
import { PlayerData } from "../../types/PlayerType";

type LogIndex = {
  matchParticipants: any;
  player: PlayerData | undefined;
  setIssue: React.Dispatch<React.SetStateAction<boolean>>;
  gameTime: string;
  gameMode: any;
  time: number;
  blueTeam: any;
  redTeam: any;
};

const LogIndex = ({
  matchParticipants,
  player,
  setIssue,
  gameTime,
  gameMode,
  time,
  blueTeam,
  redTeam,
}: LogIndex) => {
  return (
    <div className="">
      <div className="grid grid-cols-4 content-center items-center">
        <div className="col-span-3">
          {Array.isArray(matchParticipants) &&
            matchParticipants.map((data: ParticipantsType) => (
              <div key={uuidv4()}>
                {data.puuid === player?.puuid && (
                  <PlayerMatchData
                    cs={data.totalMinionsKilled + data.neutralMinionsKilled}
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
  );
};

export default LogIndex;
