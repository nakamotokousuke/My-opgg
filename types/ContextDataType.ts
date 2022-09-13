import { Dispatch, SetStateAction } from "react";
import { PlayerData } from "./PlayerType";

export type ContextData = {
  player: PlayerData | undefined;
  setPlayer: Dispatch<SetStateAction<PlayerData | undefined>>;
  latest: string;
  champs: any;
  spellList: any;
  runeIcon: any;
  RuneLists: any;
};
