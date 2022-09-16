import type { NextApiRequest, NextApiResponse } from "next";
import { PlayerData } from "../../../types/PlayerType";

type Data = {
  data: PlayerData;
  matchIDs: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(
    `https://${req.query.platform}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.name}?api_key=${process.env.API_KEY}`
  );
  const data = await response.json();

  const URL: string = `https://${req.query.region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${data.puuid}/ids?queue=420&type=ranked&start=0&count=3&api_key=${process.env.API_KEY}`;
  const responseM = await fetch(URL);
  const matchIDs = await responseM.json();

  res.status(200).json({
    data: data,
    matchIDs: matchIDs,
  });
}
