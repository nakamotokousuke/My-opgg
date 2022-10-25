import Image from "next/image";
import { ReactElement, ReactNode, useRef } from "react";
import RuneEffect from "./RuneEffect";
type runeType = {
  subRune1: string;
  subRune2: string;
  icon: string;
  height: number;
  width: number;
  id: number;
  selection1?: {
    perk: number;
    var1: number;
    var2: number;
    var3: number;
  };
  selection2?: {
    perk: number;
    var1: number;
    var2: number;
    var3: number;
  };
};

const SubRune = ({
  subRune1,
  subRune2,
  icon,
  height,
  width,
  id,
  selection1,
  selection2,
}: runeType): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);

  // マウスが乗ったらツールチップを表示
  const handleMouseEnter = () => {
    if (!ref.current) return;
    ref.current.style.opacity = "1";
    ref.current.style.visibility = "visible";
  };
  // マウスが離れたらツールチップを非表示
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.opacity = "0";
    ref.current.style.visibility = "hidden";
  };
  return (
    <>
      {subRune1 === icon || subRune2 === icon ? (
        <div
          className="relative flex items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex before:block absolute before:absolute top-full before:-top-1 left-1/2 before:left-1/2 invisible z-10 before:z-0 items-center py-[2px] px-2 mx-auto mt-2 before:w-2 before:h-2 text-xs text-white whitespace-nowrap before:bg-black bg-black rounded transition-all duration-150 transform before:transform before:rotate-45 -translate-x-1/2 before:-translate-x-1/2"
            ref={ref}
          >
            {selection1?.perk === id ? (
              <div>
                <RuneEffect
                  perk={selection1.perk}
                  var1={selection1.var1}
                  var2={selection1.var2}
                  var3={selection1.var3}
                />
                <div>perk {selection1.perk} </div>
                <div>var1 {selection1.var1} </div>
                <div>var2 {selection1.var2} </div>
                <div>var3 {selection1.var3} </div>
              </div>
            ) : (
              selection2?.perk === id && (
                <div>
                  <RuneEffect
                    perk={selection2.perk}
                    var1={selection2.var1}
                    var2={selection2.var2}
                    var3={selection2.var3}
                  />
                  <div>perk {selection2.perk} </div>
                  <div>var1 {selection2.var1} </div>
                  <div>var2 {selection2.var2} </div>
                  <div>var3 {selection2.var3} </div>
                </div>
              )
            )}
          </div>
          <Image
            height={height}
            width={width}
            className=""
            src={`https://ddragon.leagueoflegends.com/cdn/img/${icon}`}
            alt=""
          />
        </div>
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
