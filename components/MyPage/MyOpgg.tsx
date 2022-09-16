import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { db } from "../../firebase";
import { Data } from "../../pages/_app";
import { PlayerData } from "../../types/PlayerType";
import MatchLogList from "../matchlog/MatchLogList";
import Profile from "../matchlog/Profile";

const MyOpgg = () => {
  const [data, setData] = useState<PlayerData>();
  const [matchIDs, setMatchIDs] = useState<string[]>([]);
  const { setPlayer } = useContext(Data);
  const { fbUser } = useAuth();
  const getData = async () => {
    if (fbUser) {
      const docRef = doc(db, "Summoner", fbUser.uid);
      const docSnap = await getDoc(docRef);
      //   const data = docSnap.data()
      const name = docSnap.data()?.SummonerName;
      const region = docSnap.data()?.region;
      const platform = docSnap.data()?.platform;

      axios
        .get("http://localhost:3000/api/data", {
          params: { name: name, region: region, platform: platform },
        })
        .then(function (res) {
          setData(res.data.data);
          setMatchIDs(res.data.matchIDs);
          setPlayer(res.data.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div></div>
      {data && (
        <div>
          <Profile data={data} />
          {matchIDs.map((matchId, index: number) => (
            <MatchLogList key={index} matchId={matchId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOpgg;
