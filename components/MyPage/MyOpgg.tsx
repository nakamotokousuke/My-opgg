import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { PlayerDataContext } from "../../context/Context";
import { db } from "../../firebase";
import { Data } from "../../pages/_app";
import { PlayerData } from "../../types/PlayerType";
import MatchLogList from "../matchlog/MatchLogList";
import Profile from "../matchlog/Profile";

const MyOpgg = () => {
  const [data, setData] = useState<PlayerData>();
  const [matchIDs, setMatchIDs] = useState<string[]>([]);
  const { setPlayer, player } = useContext(PlayerDataContext);
  const { fbUser } = useAuth();
  const getData = async () => {
    if (fbUser) {
      const docRef = doc(db, "Summoner", fbUser.uid);
      const docSnap = await getDoc(docRef);
      //   const data = docSnap.data()
      const name = docSnap.data()?.SummonerName;
      const region = docSnap.data()?.region;
      const platform = docSnap.data()?.platform;
      console.log(docSnap.data());

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
  const [loadIndex, setLoadIndex] = useState(5);
  const [isEmpty, setIsEmpty] = useState(false);

  const displayMore = () => {
    if (loadIndex > matchIDs.length) {
      setIsEmpty(true);
    } else {
      setLoadIndex((prev) => prev + 5);
    }
  };

  return (
    <>
      {data && (
        <div className="md:grid md:grid-cols-4 min-w-max min-h-screen">
          <div>
            <Profile data={data} />
          </div>
          <div className="col-span-2">
            <ul className="w-[500px] sm:w-[710px] p-[10px] bg-[#2e2e4e] mt-8 m-auto">
              {Array.isArray(matchIDs)
                ? matchIDs.slice(0, loadIndex)?.map((matchId: string) => (
                    <div key={matchId}>
                      <div
                        className="rounded-l-lg mb-2"
                        // onClick={() => handleBuild(matchId)}
                      >
                        <MatchLogList
                          key={matchId}
                          matchId={matchId}
                          Player={data}
                        />
                      </div>
                    </div>
                  ))
                : null}
            </ul>
            <button disabled={isEmpty ? true : false} onClick={displayMore}>
              さらに表示
            </button>
          </div>
          <div>amari</div>
        </div>
      )}
    </>
  );
};

export default MyOpgg;
