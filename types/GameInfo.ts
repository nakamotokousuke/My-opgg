export type GameInfoType = {
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: any[];
  //   {
  //     summonerName: string;
  //     summonerId: number;
  //     teamId: number;
  //     championId: number;
  //     spell1Id: number;
  //     spell2Id: number;
  //   }[];
  platformId: string;
  queueId: number;
  teams: {
    teamId: number;
    win: "Win" | "Fail";
  }[];
  tournamentCode: string;
};
