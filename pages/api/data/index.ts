import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase";
import { PlayerData } from "../../../types/PlayerType";

type Data = {
  data: PlayerData;
  matchIDs: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req);

  const response = await fetch(
    `https://${req.query.platform}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.name}?api_key=${process.env.API_KEY}`
  );
  const data = await response.json();

  const URL: string = `https://${req.query.region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${data.puuid}/ids?count=100&api_key=${process.env.API_KEY}`;
  const responseM = await fetch(URL);
  let matchIDs = await responseM.json();

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

  res.status(200).json({
    data: data,
    matchIDs: newdocSnap.data()?.matchIDs.reverse(),
  });
}

//今は使ってない
