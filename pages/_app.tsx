import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { ContextData } from "../types/ContextDataType";
import { createContext } from "react";
import {
  useFetchChampion,
  useFetchRuneList,
  useFetchSpellList,
} from "../lib/CustomHook";
import Context from "../context/Context";

export const Data = createContext({} as ContextData);
function MyApp({ Component, pageProps }: AppProps) {
  // const champs = useFetchChampion();

  // const spellList = useFetchSpellList();

  // const { runeIcon, runeList: RuneLists } = useFetchRuneList();

  console.count("レンダリング");
  // console.log("champs", champs);
  // console.log("spellList", spellList);
  // console.log("runeIcon", runeIcon);
  // console.log("RuneLists", RuneLists);

  // const value = {
  //   champs,
  //   spellList,
  //   runeIcon,
  //   RuneLists,
  // };
  return (
    // <Data.Provider value={value}>
    <Context>
      <div className="bg-slate-900 min-w-max w-screen overflow-hidden">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </Context>
    // </Data.Provider>
  );
}

export default MyApp;
