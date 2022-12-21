import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  useFetchChampion,
  useFetchRuneList,
  useFetchSpellList,
} from "../lib/CustomHook";
import { ContextData } from "../types/ContextDataType";
import { PlayerDataContextType } from "../types/PlayerDataContextType";
import { PlayerData } from "../types/PlayerType";
type ContextType = {
  children: ReactNode;
};

export const PlayerDataContext = createContext({} as PlayerDataContextType);

const Context = ({ children }: ContextType) => {
  const [player, setPlayer] = useState<PlayerData>();
  const latest = "12.18.1";
  const [region, setRegion] = useState({ platform: "jp1", region: "asia" });
  const [playerRegion, setPlayerRegion] = useState<number>(0);

  const regionArry = [
    { platform: "jp1", region: "asia" },
    { platform: "kr", region: "asia" },
  ];

  //app.tsxにいらなくね？
  const regionChange = (value: number) => {
    // console.log(value);
    const newnumber = Number(value);
    // console.log(newnumber);
    setRegion(regionArry[newnumber]);
  };
  //   const champs = useFetchChampion();
  //   const spellList = useFetchSpellList();
  //   const { RuneLists, runeIcon } = useFetchRuneList();
  const value = {
    player,
    setPlayer,
    latest,
    // champs,
    // spellList,
    // runeIcon,
    // RuneLists,
    region,
    setRegion,
    setPlayerRegion,
    regionChange,
    regionArry,
    playerRegion,
  };

  return (
    <PlayerDataContext.Provider value={value}>
      {children}
    </PlayerDataContext.Provider>
  );
};

export default Context;
