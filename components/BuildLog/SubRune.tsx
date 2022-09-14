import Image from "next/image";
import { ReactElement, ReactNode } from "react";
type runeType = {
  subRune1: string;
  subRune2: string;
  icon: string;
  height: number;
  width: number;
};

const SubRune = ({
  subRune1,
  subRune2,
  icon,
  height,
  width,
}: runeType): ReactElement => {
  return (
    <>
      {subRune1 === icon || subRune2 === icon ? (
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

export default SubRune;
