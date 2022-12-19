import {
  doc,
  getDoc,
  collection,
  query as fbquery,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
// myPageならregionPlatをreturnする
export const getQuery = (
  query: string
  // regionPlat: string | undefined | null
) => {
  let url = new URL(window.location.href); // URLを取得
  let params = url.searchParams; // URLSearchParamsオブジェクトを取得
  const platform = params.get(query);
  if (platform) {
    return platform;
  }
  // if (regionPlat) {
  //   return regionPlat;
  // }
};
