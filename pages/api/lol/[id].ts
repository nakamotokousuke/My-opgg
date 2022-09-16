import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  matchData: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const matchData = await axios
    .get(
      `https://${req.query.region}.api.riotgames.com/lol/match/v5/matches/${req.query.id}?api_key=${process.env.API_KEY}`
    )
    .then((response) => response.data)
    .catch((err) => err);

  // console.log(req.query.region);
  res.status(200).json({
    matchData,
  });
}