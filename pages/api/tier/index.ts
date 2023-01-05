import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { TierType } from "../../../types/TierType";

type Data = {
  tier: [TierType];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tier = await axios
    .get(
      `https://${req.query.platform}.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.query.id}?api_key=${process.env.API_KEY}`
    )
    .then((response) => response.data)
    .catch((err) => console.log(err));

  // console.log(tier);
  res.status(200).json({
    tier,
  });
}
