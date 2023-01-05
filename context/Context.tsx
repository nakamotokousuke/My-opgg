import React, { createContext, ReactNode, useState } from "react";
import { useFetchVersion } from "../lib/CustomHook";
import { PlayerDataContextType } from "../types/PlayerDataContextType";
import { PlayerData } from "../types/PlayerType";
type ContextType = {
  children: ReactNode;
};

export const PlayerDataContext = createContext({} as PlayerDataContextType);

const Context = ({ children }: ContextType) => {
  const [player, setPlayer] = useState<PlayerData>();
  const [region, setRegion] = useState({ platform: "jp1", region: "asia" });
  const [playerRegion, setPlayerRegion] = useState<number>(0);

  const latest: string | undefined = useFetchVersion();

  const regionArry = [
    { platform: "jp1", region: "asia" },
    { platform: "kr", region: "asia" },
  ];

  const regionChange = (value: number) => {
    const newnumber = Number(value);
    setRegion(regionArry[newnumber]);
  };

  const value = {
    player,
    setPlayer,
    latest,
    region,
    setRegion,
    setPlayerRegion,
    regionChange,
    regionArry,
    playerRegion,
  };

  if (!latest) return null;
  return (
    <PlayerDataContext.Provider value={value}>
      {children}
    </PlayerDataContext.Provider>
  );
};

export default Context;
