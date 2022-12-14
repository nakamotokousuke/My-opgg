import Image from "next/image";
import React, { useContext } from "react";
import { PlayerDataContext } from "../../context/Context";
type ParticipantsListType = {
  champion: string;
  participantId: number;
  participantID: number;
  setParticipantID: React.Dispatch<React.SetStateAction<number>>;
};

const ParticipantsList = (data: ParticipantsListType) => {
  const { latest } = useContext(PlayerDataContext);
  const handleClick = () => {
    data.setParticipantID(data.participantId);
  };
  return (
    <div>
      <Image
        className={`w-full ${
          data.participantID !== data.participantId && "opacity-50"
        }`}
        height={32}
        width={32}
        src={`http://ddragon.leagueoflegends.com/cdn/${latest}/img/champion/${
          data.champion !== "FiddleSticks" ? data.champion : "Fiddlesticks"
        }.png`}
        alt=""
        onClick={handleClick}
      />
    </div>
  );
};

export default ParticipantsList;
