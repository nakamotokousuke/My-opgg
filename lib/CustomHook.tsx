import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { db } from "../firebase";
import { BuildPlayerType } from "../types/BuildPlayer";
import { getQuery } from "./getQuery";

//チャンピオンデータの取得
export const useFetchChampion = () => {
  const [champs, setChamp] = useState<any[]>([]);

  const fetchChampion = async () => {
    const res = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/data/en_US/champion.json`
    );
    const champ = await res.json();
    const champData: any = Object.entries(champ.data);
    setChamp(champData);
    console.log(champData);
  };

  useEffect(() => {
    fetchChampion();
  }, []);
  return champs;
};

//スペルデータの取得
export const useFetchSpellList = () => {
  const [spellList, setSpellList] = useState<any>([]);
  useEffect(() => {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/data/en_US/summoner.json`
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
  return spellList;
};

//ルーンデータの取得
export const useFetchRuneList = () => {
  let runes: any[] = [];
  let mainRunes: any[] = [];
  let runeList: any[] = [];
  const [RuneLists, setRuneLists] = useState<any>([]);
  const [runeIcon, setRuneIcon] = useState<any>([]);
  useEffect(() => {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/data/ja_JP/runesReforged.json`
      )
      .then(function (response) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        runes = [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mainRunes = [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        runeList = [];
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
            runeList.push(main);
          });
        });
        setRuneLists(runeList);
        console.log(runeList);
      })
      .catch((err) => err);
    // console.log(runes);
    // console.log("main", mainRunes);
  }, []);
  return { RuneLists, runeIcon };
};

//タイムラインの取得
export const useFetchFBTimeLine = (data: BuildPlayerType, words: string[]) => {
  const { data: timeline, error } = useSWR(
    data.matchId + "TimeLine",
    async () => {
      const ref = doc(db, "TimeLine", words[1]);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data();
      } else {
        const TimeLineData = await axios
          .get(`http://localhost:3000/api/timeline/${data.matchId}`, {
            params: {
              region: getQuery("region"),
              platform: getQuery("platform"),
            },
          })
          .then(function (response) {
            return response.data;
          })
          .catch(function (err) {
            console.log(err);
          });

        await setDoc(doc(db, "TimeLine", words[1]), {
          data: TimeLineData,
        });

        const ref = doc(db, "TimeLine", words[1]);
        const newSnap = await getDoc(ref);

        return newSnap.data();
      }
    }
  );
  return { timeline, error };
};

//スキルセットの取得
export const useFetchSkillSet = (
  data: BuildPlayerType,
  setSkillSet: (value: React.SetStateAction<any[]>) => void
) => {
  useSWR(data.champion + "champion", async () => {
    const URL = `http://ddragon.leagueoflegends.com/cdn/${
      process.env.NEXT_PUBLIC_LATEST
    }/data/en_US/champion/${
      data.champion !== "FiddleSticks" ? data.champion : "Fiddlesticks"
    }.json`;
    axios
      .get(URL)
      .then(function (response) {
        var tmp = Object.entries(response.data.data).map(
          ([key, value]: any) => ({ key: key, value: value })
        );
        setSkillSet(tmp[0].value.spells);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};
