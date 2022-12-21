import { doc, setDoc } from "firebase/firestore";
import React, { RefObject, useContext, useRef, useState } from "react";
import { useAuth } from "../../context/auth";
import { PlayerDataContext } from "../../context/Context";
import { db } from "../../firebase";
import { Data } from "../../pages/_app";
import { PlayerData } from "../../types/PlayerType";
import MyOpgg from "./MyOpgg";

const MyPage = () => {
  const { fbUser } = useAuth();
  const [name, setName] = useState("");
  const [region, setRegion] = useState({ platform: "jp1", region: "asia" });
  const { regionArry } = useContext(PlayerDataContext);
  // const { regionArry } = useContext(Data);
  const ref = useRef<any>();

  if (!fbUser) {
    return null;
  }

  const setSummoner = async () => {
    await setDoc(doc(db, "Summoner", fbUser.uid), {
      SummonerName: name,
      region: region.region,
      platform: region.platform,
    });
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && setSummoner();
  };

  const handleSelect = () => {
    const index = Number(ref.current.value);
    setRegion(regionArry[index]);
  };
  return (
    <div>
      <select
        onChange={handleSelect}
        ref={ref}
        id="select"
        className="rounded-l h-6 pb-1 mb-2"
      >
        <option value={"0"}>jp</option>
        <option value={"1"}>kr</option>
      </select>
      <input
        type="text"
        onKeyDown={(e) => handleKey(e)}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={setSummoner} className="text-white">
        click
      </button>
      <MyOpgg />
    </div>
  );
};

export default MyPage;
