import React, { useEffect, useState } from "react";
import { BuidlPlayerList } from "../../types/BuildPlayerListType";
import BuildPlayer from "./BuildPlayer";
import BuildPlayerList from "./BuildPlayerList";
import { PlayerData } from "../../types/PlayerType";
import ParticipantsList from "./ParticipantsList";
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
  // const [redTeam, setRedTeam] = useState<any>([]);
  // const [blueTeam, setBlueTeam] = useState<any>([]);
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
        {buildLog.BuildPlayerList ? (
          <div id="div" className="">
            {blueTeam[0] !== undefined ? (
              <div
                className={`p-1 rounded-t-md ${
                  blueTeam[0].win ? "bg-[#496191]" : "bg-[#84515a]"
                }`}
              >
                <div className="flex justify-between items-center">
                  {blueTeam[0] !== undefined && (
                    <div className="pr-1 flex w-[40%] font-bold">
                      {blueTeam[0].win ? "win" : "defeat"}
                      <div className="font-bold">(blue team)</div>
                    </div>
                  )}
                  <div className="w-[10%] font-bold text-right">KDA</div>
                  <div className="w-[10%] font-bold text-right">DMAGE</div>
                  <div className="w-[10%] font-bold text-right">CS</div>
                  <div className="w-[15%] font-bold text-center">ITEMS</div>
                </div>
                <div className="">
                  {blueTeam.map((data: BuidlPlayerList) => (
                    <BuildPlayerList
                      key={data.summonerName}
                      cs={data.totalMinionsKilled + data.neutralMinionsKilled}
                      spell1={data.summoner1Id}
                      spell2={data.summoner2Id}
                      {...data}
                      damage={damage}
                      time={time}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
            {redTeam[0] !== undefined ? (
              <div
                className={`p-1 rounded-b-md ${
                  redTeam[0].win ? "bg-[#496191]" : "bg-[#84515a]"
                }`}
              >
                <div className="flex justify-between items-center">
                  {redTeam[0] !== undefined && (
                    <div className="pr-1 flex w-[40%] font-bold">
                      {redTeam[0].win ? "win" : "defeat"}
                      <div className="font-bold">(red team)</div>
                    </div>
                  )}
                  <div className="w-[10%] font-bold text-right">KDA</div>
                  <div className="w-[10%] font-bold text-right">DMAGE</div>
                  <div className="w-[10%] font-bold text-right">CS</div>
                  <div className="w-[15%] font-bold text-center">ITEMS</div>
                </div>
                <div>
                  {redTeam.map((data: BuidlPlayerList) => (
                    <BuildPlayerList
                      key={data.summonerName}
                      cs={data.totalMinionsKilled + data.neutralMinionsKilled}
                      spell1={data.summoner1Id}
                      spell2={data.summoner2Id}
                      {...data}
                      damage={damage}
                      time={time}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {buildLog.BuildPlayer && (
          <div id="div2" className="rounded-md">
            <div className="flex justify-center">
              <div className="flex space-x-2 mr-3">
                {blueTeam.map(
                  (
                    data: { championName: string; participantId: number },
                    index: number
                  ) => (
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
                  (
                    data: { championName: string; participantId: number },
                    index: number
                  ) => (
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
                <>
                  {participantID === data.participantId && (
                    <BuildPlayer
                      key={data.puuid}
                      timeLine={timeLine}
                      puuid={data.puuid}
                      index={index}
                      perks={data.perks}
                      champion={data.championName}
                      matchId={matchId}
                      Player={Player}
                      participantID={participantID}
                    />
                  )}
                </>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildLog;
