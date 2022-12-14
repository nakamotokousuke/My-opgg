export type BuidlPlayerList = {
  summonerName: string;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  wardsKilled: number;
  summoner1Id: number;
  summoner2Id: number;
  perks: any;
  puuid: string;
  champLevel: number;
  totalDamageDealtToChampions: number;
  challenges: {
    kda: number;
  };
};
