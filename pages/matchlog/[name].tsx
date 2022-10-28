import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Favorite from "../../components/matchlog/Favorite";
import History from "../../components/matchlog/History";
import LogFav from "../../components/matchlog/LogFav";
import MatchLogList from "../../components/matchlog/MatchLogList";
import Profile from "../../components/matchlog/Profile";
import { db } from "../../firebase";
import { PlayerData } from "../../types/PlayerType";
import { Data } from "../_app";

export async function getServerSideProps(params: {
  query: { name: string; region: string; platform: string };
}) {
  const res = await fetch(
    `https://${params.query.platform}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.query.name}?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();
  console.log(data.puuid);
  const URL: string = `https://${params.query.region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${data.puuid}/ids?count=100&api_key=${process.env.API_KEY}`;

  const matchID = await fetch(URL);
  let matchIDs = await matchID.json();

  const docSnap = await getDoc(doc(db, data.puuid, "matchIDs"));

  //RiotAPI error用
  if (docSnap.exists()) {
    if (data === undefined) {
      matchIDs = docSnap.data();
    }
    await updateDoc(doc(db, data.puuid, "matchIDs"), {
      matchIDs: arrayUnion(...matchIDs.reverse()),
    });
  } else {
    await setDoc(doc(db, data.puuid, "matchIDs"), {
      matchIDs: matchIDs.reverse(),
    });
  }

  const newdocSnap = await getDoc(doc(db, data.puuid, "matchIDs"));

  return {
    props: {
      data,
      matchIDs: newdocSnap.data()?.matchIDs.reverse(),
    },
  };
}
type MatchLogProps = {
  data: PlayerData;
  matchIDs: string[];
};

const MatchLog = ({ data, matchIDs }: MatchLogProps) => {
  const { setPlayer } = useContext(Data);

  useEffect(() => {
    setPlayer(data);
    console.log(data);
    console.log(matchIDs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, matchIDs]);

  // console.log("レンダリング");
  const [loadIndex, setLoadIndex] = useState(5);
  const [isEmpty, setIsEmpty] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", handleChangeRoute);

    return () => {
      router.events.off("routeChangeComplete", handleChangeRoute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeRoute = () => {
    setLoadIndex(5);
  };

  const displayMore = () => {
    if (loadIndex > matchIDs.length) {
      setIsEmpty(true);
    } else {
      setLoadIndex((prev) => prev + 5);
    }
  };

  return (
    <>
      {data.puuid !== undefined ? (
        <div className="md:grid md:grid-cols-4 min-w-max min-h-screen">
          <div>
            <Profile data={data} />
          </div>
          <div className="col-span-2">
            <ul className="w-[500px] h-max sm:w-[710px] p-[10px] bg-[#2e2e4e] mt-8 m-auto">
              {Array.isArray(matchIDs)
                ? matchIDs.slice(0, loadIndex)?.map((matchId: string) => (
                    <div key={matchId}>
                      <div className="rounded-l-lg mb-2">
                        <MatchLogList
                          key={matchId}
                          matchId={matchId}
                          Player={data}
                        />
                      </div>
                    </div>
                  ))
                : null}
              <button
                disabled={isEmpty ? true : false}
                onClick={displayMore}
                className="flex w-full h-max items-center justify-center text-white bg-slate-600 rounded-md"
              >
                <div className="text-xl font-bold">show more</div>
              </button>
            </ul>
          </div>
          <div className="flex justify-center md:justify-start">
            <LogFav name={data.name} />
          </div>
        </div>
      ) : (
        <>empty</>
      )}
    </>
  );
};

export default MatchLog;
