import Image from "next/image";
import React from "react";
import { PlayerData } from "../../types/PlayerType";
type ProfileType = {
  data: PlayerData;
};

const Profile = ({ data }: ProfileType) => {
  const latest = "12.16.1";
  return (
    <div>
      <Image
        src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/profileicon/${data.profileIconId}.png`}
        alt=""
        height={200}
        width={200}
      />
      <div>{data.name}</div>
    </div>
  );
};

export default Profile;
