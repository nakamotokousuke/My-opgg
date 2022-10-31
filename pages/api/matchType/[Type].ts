import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const matchList: string[] = await axios
    .get(
      `https://${req.query.region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.query.puuid}/ids?type=${req.query.Type}&start=0&count=100&api_key=${process.env.API_KEY}`
    )
    .then((response) => response.data)
    .catch((err) => err);

  // console.log(req.query.region);
  res.status(200).json({
    matchList,
  });
}
