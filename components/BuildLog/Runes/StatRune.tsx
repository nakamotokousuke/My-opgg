import Image from "next/image";
import { ReactElement } from "react";
type runeType = {
  runeKey: number;
  data: number;
  icon: string;
  height: number;
  width: number;
};

const StatRune = ({
  runeKey,
  data,
  icon,
  height,
  width,
}: runeType): ReactElement => {
  return (
    <>
      {runeKey === data ? (
        <Image height={height} width={width} className="" src={icon} alt="" />
      ) : (
        <Image
          height={height}
          width={width}
          className="opacity-40"
          src={icon}
          alt=""
        />
      )}
    </>
  );
};

export default StatRune;
