import React, { useContext, useEffect, useState } from "react";
import MatchLogList from "../../components/matchlog/MatchLogList";
import Profile from "../../components/matchlog/Profile";
import { PlayerData } from "../../types/PlayerType";
import { Data } from "../_app";
import BuildLog from "../../components/BuildLog/BuildLog";

export async function getServerSideProps(params: {
  query: { name: string; region: string; platform: string };
}) {
  const res = await fetch(
    `https://${params.query.platform}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.query.name}?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();

  const URL: string = `https://${params.query.region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${data.puuid}/ids?queue=420&type=ranked&start=0&count=3&api_key=${process.env.API_KEY}`;
  const matchID = await fetch(URL);
  const matchIDs = await matchID.json();
  console.log(data);
  console.log(matchIDs);
  console.log(process.env.API_KEY);
  return {
    props: {
      data,
      matchIDs,
    },
  };
}

const MatchLog = (props: { data: PlayerData; matchIDs: string[] }) => {
  const { setPlayer } = useContext(Data);
  const [button, setButton] = useState("");

  useEffect(() => {
    setPlayer(props.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const handleBuild = (matchData: string) => {
    if (matchData === button) {
      setButton("");
    } else {
      setButton(matchData);
    }
  };

  return (
    <div>
      <div>matchlog</div>
      <Profile data={props.data} />
      <ul className="w-[710px] p-[10px] bg-[#2e2e4e] mt-8 m-auto">
        {props.matchIDs.map((matchId) => (
          <div key={matchId}>
            <div
              className="rounded-l-lg mb-2 flex"
              onClick={() => handleBuild(matchId)}
            >
              <MatchLogList key={matchId} matchId={matchId} />
              <div
                onClick={() => handleBuild(matchId)}
                className="flex rounded-r-lg bg-zinc-400 max-h-max items-end"
              >
                <div className="w-[20px] text-center">
                  {button === matchId ? "-" : "+"}
                </div>
                <div>
                  {button === matchId ? <BuildLog matchId={matchId} /> : <></>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MatchLog;
