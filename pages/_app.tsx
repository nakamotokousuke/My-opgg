import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { ContextData } from "../types/ContextDataType";
import { createContext, useEffect, useState } from "react";
import { PlayerData } from "../types/PlayerType";
import axios from "axios";
import { AuthProvider } from "../context/auth";

//SSG
// export async function getStaticProps() {
//   const res = await fetch(
//     `http://ddragon.leagueoflegends.com/cdn/12.16.1/data/en_US/champion.json`
//   );
//   const data = await res.json();
//   console.log(process.env.LATEST);

//   return {
//     props: {
//       champImg: data,
//     },
//   };
// }

//useContext
export const Data = createContext({} as ContextData);
function MyApp({ Component, pageProps }: AppProps) {
  const [player, setPlayer] = useState<PlayerData>();
  const latest = "12.18.1";
  const [region, setRegion] = useState({ platform: "jp1", region: "asia" });
  const [playerRegion, setPlayerRegion] = useState<number>(0);

  const regionArry = [
    { platform: "jp1", region: "asia" },
    { platform: "kr", region: "asia" },
  ];

  const regionChange = (value: number) => {
    // console.log(value);
    const newnumber = Number(value);
    // console.log(newnumber);
    setRegion(regionArry[newnumber]);
  };

  //ChampionData
  const [champs, setChamp] = useState<any[]>([]);

  const fetchChampion = async () => {
    const res = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`
    );
    const champ = await res.json();
    const champData: any = Object.entries(champ.data);
    setChamp(champData);
    console.log(champData);
  };

  useEffect(() => {
    fetchChampion();
  }, []);

  //spell
  const [spellList, setSpellList] = useState<any>([]);
  useEffect(() => {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/summoner.json`
      )
      .then(function (response) {
        console.log("spell", response.data.data);
        var tmp = Object.entries(response.data.data).map(
          ([key, value]: any) => ({ key: key, value: value })
        );
        setSpellList(tmp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //ddragon rune
  let runes: any[] = [];
  let mainRunes: any[] = [];
  let runeLists: any[] = [];
  const [RuneLists, setRuneLists] = useState<any>([]);
  const [runeIcon, setRuneIcon] = useState<any>([]);
  useEffect(() => {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/${latest}/data/ja_JP/runesReforged.json`
      )
      .then(function (response) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        runes = [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mainRunes = [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        runeLists = [];
        console.log("rune", response.data);
        setRuneIcon(response.data);
        let tmp = response.data;
        var tmp1 = Object.entries(tmp).map(([key, value]: any) => ({
          key: key,
          value: value,
        }));
        console.log(tmp1);
        tmp1.forEach((tmp1_1) => {
          // console.log(tmp1_1.value.slots);
          runes.push(tmp1_1.value.slots);
        });
        runes.forEach((rune) => {
          // console.log(rune[0]);
          mainRunes.push(rune[0].runes);
          mainRunes.push(rune[1].runes);
          mainRunes.push(rune[2].runes);
          mainRunes.push(rune[3].runes);
        });
        mainRunes.forEach((mainRune) => {
          mainRune.forEach((main: any) => {
            runeLists.push(main);
          });
        });
        setRuneLists(runeLists);
        console.log(runeLists);
      })
      .catch((err) => err);
    // console.log(runes);
    // console.log("main", mainRunes);
  }, []);

  const value = {
    player,
    setPlayer,
    latest,
    champs,
    spellList,
    runeIcon,
    RuneLists,
    region,
    setRegion,
    setPlayerRegion,
    regionChange,
    regionArry,
    playerRegion,
  };
  return (
    <AuthProvider>
      <Data.Provider value={value}>
        <div className="bg-slate-900 min-w-max w-screen overflow-hidden">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </Data.Provider>
    </AuthProvider>
  );
}

export default MyApp;
