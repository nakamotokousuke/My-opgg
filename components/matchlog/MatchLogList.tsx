import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlayerMatchData from "./PlayerMatchData";
import { Data } from "../../pages/_app";
import { ParticipantsType } from "../../types/matchParticipants";
import { TeamType } from "../../types/teamType";
import PlayerList from "./PlayerList";
import { v4 as uuidv4 } from "uuid";

type MatchIDsType = {
  matchId: string;
};

const MatchLogList = ({ matchId }: MatchIDsType) => {
  const [matchParticipants, setMatchPaticipants] = useState<any>([]);
  const [redTeam, setRedTeam] = useState<any>([]);
  const [blueTeam, setBlueTeam] = useState<any>([]);
  const [issue, setIssue] = useState(true);
  const { player } = useContext(Data);
  useEffect(() => {
    console.log(matchId);
    getMatchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMatchData = async () => {
    axios
      .get(`http://localhost:3000/api/lol/${matchId}`, {
        params: { matchID: matchId, region: "asia" },
      })
      .then(function (res) {
        console.log(res.data);
        setMatchPaticipants(res.data.matchData.info.participants);
        setBlueTeam(res.data.matchData.info.participants.slice(0, 5));
        setRedTeam(res.data.matchData.info.participants.slice(5, 10));
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    //修正が必要
    <div
      key={matchId}
      className={`rounded-l-lg w-[670px] ${
        issue ? "bg-[#496191]" : "bg-[#84515a]"
      }`}
    >
      <div className="">
        <div className="grid grid-cols-4 content-center items-center">
          <div className="col-span-3">
            {matchParticipants.map((data: ParticipantsType) => (
              <>
                {/* uniquekeyerr */}
                {data.puuid === player?.puuid && (
                  <PlayerMatchData
                    key={uuidv4()}
                    puuid={data.puuid}
                    championName={data.championName}
                    kills={data.kills}
                    deaths={data.deaths}
                    assists={data.assists}
                    win={data.win}
                    summoner1Id={data.summoner1Id}
                    summoner2Id={data.summoner2Id}
                    perks={data.perks}
                    item0={data.item0}
                    item1={data.item1}
                    item2={data.item2}
                    item3={data.item3}
                    item4={data.item4}
                    item5={data.item5}
                    item6={data.item6}
                    cs={data.totalMinionsKilled + data.neutralMinionsKilled}
                    setIssue={setIssue}
                  />
                )}
              </>
            ))}
          </div>
          <div className="grid grid-cols-2">
            <div>
              {blueTeam.map((data: TeamType, index: number) => (
                <PlayerList
                  key={index}
                  champExperience={data.champExperience}
                  championName={data.championName}
                  kills={data.kills}
                  deaths={data.deaths}
                  assists={data.assists}
                  item0={data.item0}
                  item1={data.item1}
                  item2={data.item2}
                  item3={data.item3}
                  item4={data.item4}
                  item5={data.item5}
                  item6={data.item6}
                  cs={data.totalMinionsKilled + data.neutralMinionsKilled}
                  wardsKilled={data.wardsKilled}
                  summonerName={data.summonerName}
                  puuid={data.puuid}
                />
              ))}
            </div>
            <div>
              {redTeam.map((data: TeamType, index: number) => (
                <PlayerList
                  key={index}
                  champExperience={data.champExperience}
                  championName={data.championName}
                  kills={data.kills}
                  deaths={data.deaths}
                  assists={data.assists}
                  item0={data.item0}
                  item1={data.item1}
                  item2={data.item2}
                  item3={data.item3}
                  item4={data.item4}
                  item5={data.item5}
                  item6={data.item6}
                  cs={data.totalMinionsKilled + data.neutralMinionsKilled}
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
  );
};

export default MatchLogList;
