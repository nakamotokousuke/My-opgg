export type ParticipantsType = {
  [x: string]: any;
  puuid: string;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  summoner1Id: number;
  summoner2Id: number;
  perks: any;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  totalDamageDealtToChampions: number;
  setIssue: React.Dispatch<React.SetStateAction<boolean>>;
  challenges: {
    kda: number;
  };
};
