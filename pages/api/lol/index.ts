import type { NextApiRequest, NextApiResponse } from "next";
import { PlayerData } from "../../../types/PlayerType";

type Data = {
  data: PlayerData;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("query", req.query.puuid);
  const response = await fetch(
    `https://${req.query.platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${req.query.puuid}?api_key=${process.env.API_KEY}`
  );
  const data = await response.json();

  res.status(200).json({
    data: data,
  });
}
