import Image from "next/image";
import { ReactElement, ReactNode } from "react";
type runeType = {
  Rune: string;
  icon: string;
  height: number;
  width: number;
};

const Rune = ({ Rune, icon, height, width }: runeType): ReactElement => {
  return (
    <>
      {Rune === icon ? (
        <Image
          height={height}
          width={width}
          className=""
          src={`https://ddragon.leagueoflegends.com/cdn/img/${icon}`}
          alt=""
        />
      ) : (
        <Image
          height={height}
          width={width}
          className="opacity-40"
          src={`https://ddragon.leagueoflegends.com/cdn/img/${icon}`}
          alt=""
        />
      )}
    </>
  );
};

export default Rune;
