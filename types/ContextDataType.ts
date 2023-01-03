import { Dispatch, SetStateAction } from "react";
import { Champion, champsType } from "./Champion";
import { PlayerData } from "./PlayerType";
import { Perk, PerkSlot } from "./RuneLists";
import { spellListType } from "./spellList";

export type ContextData = {
  champs: champsType;
  spellList?: void | spellListType[];
  runeIcon: Perk[];
  RuneLists: PerkSlot[] | undefined;
};
// export type ContextData = {
//   player: PlayerData | undefined;
//   setPlayer: Dispatch<SetStateAction<PlayerData | undefined>>;
//   latest: string;
//   champs: any;
//   spellList: any;
//   runeIcon: any;
//   RuneLists: any;
//   region: { platform: string; region: string };
//   setRegion: React.Dispatch<
//     React.SetStateAction<{
//       platform: string;
//       region: string;
//     }>
//   >;
//   setPlayerRegion: React.Dispatch<React.SetStateAction<number>>;
//   regionChange: (value: number) => void;
//   regionArry: {
//     platform: string;
//     region: string;
//   }[];
//   playerRegion: number;
// };
