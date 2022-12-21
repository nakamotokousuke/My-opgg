import { Dispatch, SetStateAction } from "react";
import { PlayerData } from "./PlayerType";

export type PlayerDataContextType = {
  player: PlayerData | undefined;
  setPlayer: Dispatch<SetStateAction<PlayerData | undefined>>;
  latest: string;
  region: {
    platform: string;
    region: string;
  };
  setRegion: React.Dispatch<
    React.SetStateAction<{
      platform: string;
      region: string;
    }>
  >;
  setPlayerRegion: React.Dispatch<React.SetStateAction<number>>;
  regionChange: (value: number) => void;
  regionArry: {
    platform: string;
    region: string;
  }[];
  playerRegion: number;
};
