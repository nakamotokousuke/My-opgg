import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const timeLineData = await axios
    .get(
      `https://${req.query.region}.api.riotgames.com/lol/match/v5/matches/${req.query.matchid}/timeline?api_key=${process.env.API_KEY}`
    )
    .then((response) => response.data)
    .catch((err) => err);

  if (timeLineData.code === "ERR_BAD_REQUEST") {
    const err = { error: { message: "ユーザーが見つかりません" } };
    return res.status(404).json(err);
  }

  // console.log(req.query.region);
  res.status(200).json({
    timeLineData,
  });
}
