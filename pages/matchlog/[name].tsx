import React, { useContext, useEffect, useState } from "react";
import MatchLogList from "../../components/matchlog/MatchLogList";
import Profile from "../../components/matchlog/Profile";
import { PlayerData } from "../../types/PlayerType";
import { Data } from "../_app";

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
      data: data,
      matchIds: matchIDs,
    },
  };
}
type MatchLogProps = {
  data: PlayerData;
  matchIds: string[];
};

const MatchLog = ({ data, matchIds }: MatchLogProps) => {
  const { setPlayer } = useContext(Data);
  const [button, setButton] = useState("");

  useEffect(() => {
    setPlayer(data);
    console.log(data);
    console.log(matchIds);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, matchIds]);

  const handleBuild = (matchData: string) => {
    if (matchData === button) {
      setButton("");
    } else {
      setButton(matchData);
    }
  };
  // console.log("レンダリング");

  return (
    <div className="md:grid md:grid-cols-4 min-w-max min-h-screen">
      <div>
        <Profile data={data} />
      </div>
      <div className="col-span-2">
        <ul className="w-[500px] sm:w-[710px] p-[10px] bg-[#2e2e4e] mt-8 m-auto">
          {Array.isArray(matchIds)
            ? matchIds?.map((matchId: string) => (
                <div key={matchId}>
                  <div
                    className="rounded-l-lg mb-2"
                    // onClick={() => handleBuild(matchId)}
                  >
                    <MatchLogList key={matchId} matchId={matchId} />
                  </div>
                </div>
              ))
            : // ここに検索できなかった時の表示
              null}
        </ul>
      </div>
      <div>amari</div>
    </div>
  );
};

export default MatchLog;
