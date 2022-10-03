import axios from "axios";
import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { getQuery } from "../../lib/getQuery";
import { Data } from "../../pages/_app";
import { PlayerData } from "../../types/PlayerType";
import { TierType } from "../../types/TierType";
type ProfileType = {
  data: PlayerData;
};

const Profile = ({ data }: ProfileType) => {
  const { region, latest } = useContext(Data);
  const { fbUser, user } = useAuth();
  const [tier, setTier] = useState<TierType | null>(null);
  useEffect(() => {
    getTier();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.puuid]);

  const getTier = useCallback(() => {
    axios
      .get(`http://localhost:3000/api/tier`, {
        params: { id: data.id, platform: getQuery("platform", user?.platform) },
      })
      .then(function (res) {
        console.log("tier", res.data.tier);
        console.log(getQuery("platform", fbUser?.uid));

        setTier(res.data.tier[0]);
      })
      .catch(function (err) {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);

  return (
    <div className="flex justify-center md:mt-10">
      <div className="mr-5">
        <Image
          className=""
          src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/profileicon/${data.profileIconId}.png`}
          alt=""
          height={150}
          width={150}
          objectFit="contain"
          priority={false}
        />
      </div>
      <div className="flex flex-col justify-center text-white font-bold">
        <div>{data.name}</div>
        <div>
          {tier?.rank !== undefined ? (
            <div>
              {tier?.tier} {tier?.rank} {tier?.leaguePoints}LP
            </div>
          ) : (
            <div>unranked</div>
          )}
        </div>

        <div>
          win {tier?.wins} / lose {tier?.losses}
        </div>
      </div>
    </div>
  );
};

export default Profile;
