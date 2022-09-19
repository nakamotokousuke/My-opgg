import React, { useState } from "react";
import { BuidlPlayerList } from "../../types/BuildPlayerListType";
import BuildPlayer from "./BuildPlayer";
import BuildPlayerList from "./BuildPlayerList";
interface BuildLogProps {
  matchId: string;
  blueTeam: any;
  redTeam: any;
  participants: any;
  timeLine: any;
  damage: number;
}

const BuildLog = ({
  matchId,
  blueTeam,
  redTeam,
  participants,
  timeLine,
  damage,
}: BuildLogProps) => {
  // const [redTeam, setRedTeam] = useState<any>([]);
  // const [blueTeam, setBlueTeam] = useState<any>([]);
  const [buildLog, setBuildLog] = useState({
    BuildPlayerList: true,
    BuildPlayer: false,
  });

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
                  <div className="w-[10%] font-bold text-right">kda</div>
                  <div className="w-[10%] font-bold text-right">dmage</div>
                  <div className="w-[10%] font-bold text-right">cs</div>
                  <div className="w-[15%] font-bold text-center">item</div>
                </div>
                <div className="">
                  {blueTeam.map((data: BuidlPlayerList) => (
                    <BuildPlayerList
                      key={data.summonerName}
                      // summonerName={data.summonerName}
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
                      // wardsKilled={data.wardsKilled}
                      spell1={data.summoner1Id}
                      spell2={data.summoner2Id}
                      // perks={data.perks}
                      // puuid={data.puuid}
                      {...data}
                      damage={damage}
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
                  <div className="w-[10%] font-bold text-right">kda</div>
                  <div className="w-[10%] font-bold text-right">dmage</div>
                  <div className="w-[10%] font-bold text-right">cs</div>
                  <div className="w-[15%] font-bold text-center">item</div>
                </div>
                <div>
                  {redTeam.map((data: BuidlPlayerList) => (
                    <BuildPlayerList
                      key={data.summonerName}
                      // summonerName={data.summonerName}
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
                      // wardsKilled={data.wardsKilled}
                      spell1={data.summoner1Id}
                      spell2={data.summoner2Id}
                      // perks={data.perks}
                      // puuid={data.puuid}
                      {...data}
                      damage={damage}
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
            <div className="">
              {participants.map(
                (
                  data: { puuid: string; perks: any; championName: string },
                  index: number
                ) => (
                  <BuildPlayer
                    key={data.puuid}
                    timeLine={timeLine}
                    puuid={data.puuid}
                    index={index}
                    perks={data.perks}
                    champion={data.championName}
                  />
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildLog;
