import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import useSWR from "swr";
import { db } from "../firebase";
import { BuildPlayerType } from "../types/BuildPlayer";
import { PlayerData } from "../types/PlayerType";
import { Perk, PerkSlot } from "../types/RuneLists";
import { SkillSetType } from "../types/SkillSet";
import { TierType } from "../types/TierType";
import { getQuery } from "./getQuery";

export const useTest = () => {
  console.count("TEST");
};

export const useFetchVersion = () => {
  const { data: version, error } = useSWR<string>("version", async () => {
    const version: string = await axios
      .get("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((response) => {
        console.log(response.data[0]);
        return response.data[0];
      })
      .catch((error) => {
        console.error(error);
        return process.env.NEXT_PUBLIC_LATEST;
      });
    return version;
  });
  return version;
};

//チャンピオンデータの取得 今は必要ない
export const useFetchChampion = () => {
  const fetchChampion = async () => {
    const res = await fetch(
      `http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/data/en_US/champion.json`
    );
    const champ = await res.json();
    const champData: any = Object.entries(champ.data);
    // const testcham: any = Object.values(champ.data);
    // setChamp(champData);
    // console.log(champData);
    // console.log("test", testcham);
    return champData;
  };
  const { data, error } = useSWR("championList", fetchChampion);
  return { data };
};

//スペルデータの取得
export const useFetchSpellList = () => {
  // console.count("スペルデータの取得");
  const { data: spellList, error } = useSWR("spellList", () => {
    const res = axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/data/en_US/summoner.json`
      )
      .then((response) => {
        // console.log("spell", response.data.data);
        // console.count("スペルデータの内部");
        var tmp = Object.entries(response.data.data).map(
          ([key, value]: any) => ({ key: key, value: value })
        );
        // setSpellList(tmp);
        return tmp;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  });
  return spellList;
};

// export const useFetchRuneList2 = () => {
//   const [runeLists, setRuneLists] = useState<any[]>([]);
//   const [runeIcon, setRuneIcon] = useState<any>([]);

//   useSWR("RuneList", () => {
//     axios
//       .get(
//         `http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/data/ja_JP/runesReforged.json`
//       )
//       .then((response) => {
//         setRuneIcon(response.data);

//         const runes = Object.values(response.data).map(
//           (value: any) => value.slots
//         );
//         const mainRunes = runes.flatMap((slot: any) =>
//           slot.map((rune: any) => rune.runes)
//         );
//         const runeList = mainRunes.flat();

//         setRuneLists(runeList);
//       })
//       .catch((err) => err);
//   });

//   return { runeLists, runeIcon };
// };

//ルーンデータ取得
export const useFetchRuneList = () => {
  const { data, error } = useSWR("RuneList2", async () => {
    // try {
    //   const response = await axios.get(
    //     `http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/data/ja_JP/runesReforged.json`
    //   );
    //   const runeIcon = response.data;

    //   const runes = Object.values(response.data).map(
    //     (value_1: any) => value_1.slots
    //   );
    //   const mainRunes = runes.flatMap((slot: any) =>
    //     slot.map((rune: any) => rune.runes)
    //   );
    //   const runeList = mainRunes.flat();
    //   return { runeIcon, runeList };
    // } catch (err) {
    //   return console.log(err);
    // }
    return axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/data/ja_JP/runesReforged.json`
      )
      .then((response) => {
        const runeIcon = response.data;

        const runes = Object.values(response.data).map(
          (value_1: any) => value_1.slots
        );
        const mainRunes = runes.flatMap((slot: any) =>
          slot.map((rune: any) => rune.runes)
        );
        const runeList = mainRunes.flat();
        return { runeIcon, runeList };
      })
      .catch((err) => console.log(err));
  });
  // console.log("useFetchRuneList2", data);
  const runeIcon: Perk[] | undefined = data?.runeIcon;
  const runeList: PerkSlot[] | undefined = data?.runeList;

  return { runeIcon, runeList };
};

//マッチデータの取得
export const useFetchFBMatchData = (matchId: string) => {
  const words = matchId.split("_");
  const { data, error } = useSWR(matchId, async () => {
    const ref = doc(db, "matchList", words[1]);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    } else {
      const matchData = await axios
        .get(`http://localhost:3000/api/lol/${matchId}`, {
          params: {
            region: getQuery("region"),
            platform: getQuery("platform"),
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      await setDoc(doc(db, "matchList", words[1]), {
        data: matchData,
      });

      const ref = doc(db, "matchList", words[1]);
      const newSnap = await getDoc(ref);

      return newSnap.data();
    }
  });
  return { data, error };
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
          .then((response) => {
            return response.data;
          })
          .catch((err) => {
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

//ランクの取得
export const useFetchTier = (
  data: PlayerData,
  setFunction: (value: React.SetStateAction<TierType | null>) => void
) => {
  useSWR(data.puuid + "tier", async () => {
    axios
      .get(`http://localhost:3000/api/tier`, {
        params: { id: data.id, platform: getQuery("platform") },
      })
      .then((response) => {
        // console.log("useFetchTier", res.data.tier);
        // console.log(getQuery("platform"));
        setFunction(response.data.tier[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//スキルセットの取得
export const useFetchSkillSet = (data: BuildPlayerType): SkillSetType[] => {
  const { data: skillSet, error } = useSWR(
    data.champion + "champion",
    async () => {
      return axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/${
            process.env.NEXT_PUBLIC_LATEST
          }/data/en_US/champion/${
            data.champion !== "FiddleSticks" ? data.champion : "Fiddlesticks"
          }.json`
        )
        .then((response) => {
          var tmp = Object.entries(response.data.data).map(
            ([key, value]: any) => ({ key: key, value: value })
          );
          return tmp[0].value.spells;
        })
        .catch((err) => {
          console.log(error);
        });
    }
  );
  console.log("skillSet", skillSet);

  return skillSet;
};
