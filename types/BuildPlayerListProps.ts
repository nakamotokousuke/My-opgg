export type BuidlPlayerListProps = {
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
  cs: number;
  wardsKilled: number;
  spell1: number;
  spell2: number;
  perks: any;
  puuid: string;
  totalDamageDealtToChampions: number;
  champLevel: number;
  challenges: {
    kda: number;
  };
  damage: number;
  time: number;
};
