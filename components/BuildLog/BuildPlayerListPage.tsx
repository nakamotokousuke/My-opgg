import React from "react";
import { BuidlPlayerList } from "../../types/BuildPlayerListType";
import BuildPlayerList from "./BuildPlayerList";

type BuildPlayerListPage = {
  blueTeam: any;
  redTeam: any;
  damage: number;
  time: number;
};

const BuildPlayerListPage = ({
  blueTeam,
  redTeam,
  damage,
  time,
}: BuildPlayerListPage) => {
  return (
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
      ) : null}
      {redTeam[0] !== undefined && (
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
      )}
    </div>
  );
};

export default BuildPlayerListPage;
