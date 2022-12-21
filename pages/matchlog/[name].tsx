import axios from "axios";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import LogFav from "../../components/matchlog/LogFav";
import MatchLogList from "../../components/matchlog/MatchLogList";
import Profile from "../../components/matchlog/Profile";
import NotExist from "../../components/NotExist";
import { PlayerDataContext } from "../../context/Context";
import { db } from "../../firebase";
import { getQuery } from "../../lib/getQuery";
import { PlayerData } from "../../types/PlayerType";
import { Data } from "../_app";

export async function getServerSideProps(params: {
  query: { name: string; region: string; platform: string };
}) {
  const res = await fetch(
    `https://${params.query.platform}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.query.name}?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();
  if (data.puuid === undefined) {
    return {
      props: {
        data,
        matchIDs: [],
      },
    };
  }
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
    if (data !== undefined) {
      await setDoc(doc(db, data.puuid, "matchIDs"), {
        matchIDs: matchIDs.reverse(),
      });
    }
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
  const { setPlayer } = useContext(PlayerDataContext);
  // const { setPlayer } = useContext(Data);
  const [matchList, setMatchList] = useState<string[]>([]);
  const [matchType, setMatchType] = useState({
    all: true,
    rank: false,
    normal: false,
  });

  useEffect(() => {
    setPlayer(data);
    console.log(data);
    console.log(matchIDs);
    setMatchList(matchIDs);
  }, [data, matchIDs, setPlayer]);

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

  const getMatchList = async (Type: string) => {
    const matchList = await axios
      .get(`http://localhost:3000/api/matchType/${Type}`, {
        params: {
          puuid: data.puuid,
          region: getQuery("region"),
        },
      })
      .then(function (response) {
        console.log("Type", response.data);

        return response.data;
      })
      .catch(function (err) {
        console.log(err);
      });
    setMatchList(matchList.matchList);
  };

  return (
    <>
      {data.puuid !== undefined ? (
        <div className="md:grid md:grid-cols-4 min-w-max min-h-screen">
          <div>
            <Profile data={data} />
          </div>
          <div className="col-span-2">
            <div className="flex space-x-3 mx-auto w-[500px] sm:w-[710px] mt-8 text-white font-bold text-xl bg-gray-600 rounded-t-sm">
              <div
                className={`p-2 hover:text-blue-500 cursor-pointer ${
                  matchType.all ? "text-blue-500" : ""
                }`}
                onClick={() => {
                  setMatchList(matchIDs);
                  setMatchType((prev) => ({
                    ...prev,
                    all: true,
                    rank: false,
                    normal: false,
                  }));
                }}
              >
                All Game
              </div>
              <div
                className={`p-2 hover:text-blue-500 cursor-pointer ${
                  matchType.rank ? "text-blue-500" : ""
                }`}
                onClick={() => {
                  getMatchList("ranked");
                  setMatchType((prev) => ({
                    ...prev,
                    all: false,
                    rank: true,
                    normal: false,
                  }));
                }}
              >
                Ranked
              </div>
              <div
                className={`p-2 hover:text-blue-500 cursor-pointer ${
                  matchType.normal ? "text-blue-500" : ""
                }`}
                onClick={() => {
                  getMatchList("normal");
                  setMatchType((prev) => ({
                    ...prev,
                    all: false,
                    rank: false,
                    normal: true,
                  }));
                }}
              >
                Nomal
              </div>
            </div>
            <ul className="w-[500px] h-max sm:w-[710px] p-[10px] bg-[#2e2e4e] mx-auto rounded-b-sm">
              {Array.isArray(matchList)
                ? matchList.slice(0, loadIndex)?.map((matchId: string) => (
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
          <div className="flex justify-center md:justify-start ml-3">
            <LogFav name={data.name} />
          </div>
        </div>
      ) : (
        <NotExist />
      )}
    </>
  );
};

export default MatchLog;
