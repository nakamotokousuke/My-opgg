import axios from "axios";
import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { PlayerDataContext } from "../../context/Context";
import { useFetchTier } from "../../lib/CustomHook";
import { getQuery } from "../../lib/getQuery";
import { Data } from "../../pages/_app";
import { PlayerData } from "../../types/PlayerType";
import { TierType } from "../../types/TierType";
type ProfileType = {
  data: PlayerData;
};

const Profile = ({ data }: ProfileType) => {
  // const { region, latest } = useContext(Data);
  const { region, latest } = useContext(PlayerDataContext);

  const [tier, setTier] = useState<TierType | null>(null);
  useEffect(() => {
    if (!localStorage) return;
    const t = localStorage.getItem("history");
    if (t === null) {
      let array = [data];
      let json = JSON.stringify(array, undefined, 1);
      localStorage.setItem("history", json);
      return;
    }
    if (t) {
      let history = JSON.parse(t);
      console.log(history.length);
      let history2 = history.filter((local: any) => data.name !== local.name);
      data.platform = getQuery("platform");
      data.region = getQuery("region");
      history2.push(data);
      if (history2.length > 5) {
        history2.shift();
      }
      // const history2 = Array.from(new Set(history));
      let json = JSON.stringify(history2, undefined, 1);
      localStorage.setItem("history", json);
      console.log("history", history);
      console.log(history2);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.puuid]);

  useFetchTier(data, setTier);

  return (
    <div className="flex justify-center md:mt-10 mt-6">
      <div className="mr-5">
        <Image
          className="rounded-sm"
          src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/img/profileicon/${data.profileIconId}.png`}
          alt=""
          height={150}
          width={150}
          objectFit="contain"
          priority={false}
        />
      </div>
      <div className="flex flex-col justify-center text-white font-bold">
        <div className="text-2xl">{data.name}</div>
        <div className="text-xl">
          {tier?.rank !== undefined ? (
            <div>
              {tier?.tier} {tier?.rank}{" "}
              <span className="text-base">{tier?.leaguePoints}LP</span>
            </div>
          ) : (
            <div>unranked</div>
          )}
        </div>

        <div>
          WIN {tier?.wins} / LOSE {tier?.losses}
        </div>
        {tier && (
          <div>
            WIN RATE{" "}
            {((tier?.wins / (tier?.wins + tier?.losses)) * 100).toFixed(0)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
