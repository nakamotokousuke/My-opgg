import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { PlayerData } from "../../../types/PlayerType";

type Data = {
  data: PlayerData;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //puuidでsummonerを取得
  console.log("query", req.query.puuid);
  // const response = await fetch(
  //   `https://${req.query.platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${req.query.puuid}?api_key=${process.env.API_KEY}`
  // );
  // const data = await response.json();
  const data = await axios(
    `https://${req.query.platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${req.query.puuid}?api_key=${process.env.API_KEY}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("api/lol", err);
      return {};
    });

  res.status(200).json({
    data: data,
  });
}
