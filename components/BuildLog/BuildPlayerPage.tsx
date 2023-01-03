import React from "react";
import { PlayerData } from "../../types/PlayerType";
import BuildPlayer from "./BuildPlayer";
import ParticipantsList from "./ParticipantsList";

type BuildPlayerPage = {
  blueTeam: any;
  redTeam: any;
  participantID: number;
  setParticipantID: React.Dispatch<React.SetStateAction<number>>;
  participants: any;
  matchId: string;
  // Player: PlayerData;
};

const BuildPlayerPage = ({
  blueTeam,
  redTeam,
  participantID,
  setParticipantID,
  participants,
  matchId,
}: // Player,
BuildPlayerPage) => {
  return (
    <div id="div2" className="rounded-md">
      <div className="flex justify-center">
        <div className="flex space-x-2 mr-3">
          {blueTeam.map(
            (data: { championName: string; participantId: number }) => (
              <ParticipantsList
                key={data.participantId}
                champion={data.championName}
                participantId={data.participantId}
                participantID={participantID}
                setParticipantID={setParticipantID}
              />
            )
          )}
        </div>
        <div className="flex space-x-2 ml-3">
          {redTeam.map(
            (data: { championName: string; participantId: number }) => (
              <ParticipantsList
                key={data.participantId}
                champion={data.championName}
                participantId={data.participantId}
                participantID={participantID}
                setParticipantID={setParticipantID}
              />
            )
          )}
        </div>
      </div>
      {participants.map(
        (
          data: {
            puuid: string;
            perks: any;
            championName: string;
            participantId: number;
          },
          index: number
        ) => (
          <div key={data.puuid}>
            {participantID === data.participantId && (
              <BuildPlayer
                key={data.puuid}
                puuid={data.puuid}
                index={index}
                perks={data.perks}
                champion={data.championName}
                matchId={matchId}
                participantID={participantID}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default BuildPlayerPage;
