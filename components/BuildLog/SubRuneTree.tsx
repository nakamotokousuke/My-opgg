import React from "react";
import SubRune from "./SubRune";
import { v4 as uuidv4 } from "uuid";
type RuneTree = {
  runeIcon: any;
  rune: {
    subRune1: string;
    subRune2: string;
  };
  runeIconIndex: number;
  perks: any;
};

const SubRuneTree = ({ runeIcon, rune, runeIconIndex, perks }: RuneTree) => {
  return (
    <div>
      <div className="flex justify-center">
        {runeIcon[runeIconIndex].slots[1].runes.map(
          (data: { icon: string; id: number }) => (
            <SubRune
              key={uuidv4()}
              subRune1={rune.subRune1}
              subRune2={rune.subRune2}
              icon={data.icon}
              height={32}
              width={32}
              id={data.id}
              selection1={perks.styles[1].selections[0]}
              selection2={perks.styles[1].selections[1]}
            />
          )
        )}
      </div>
      <div className="flex justify-center">
        {runeIcon[runeIconIndex].slots[2].runes.map(
          (data: { icon: string; id: number }) => (
            <SubRune
              key={uuidv4()}
              subRune1={rune.subRune1}
              subRune2={rune.subRune2}
              icon={data.icon}
              height={32}
              width={32}
              id={data.id}
              selection1={perks.styles[1].selections[0]}
              selection2={perks.styles[1].selections[1]}
            />
          )
        )}
      </div>
      <div className="flex justify-center">
        {runeIcon[runeIconIndex].slots[3].runes.map(
          (data: { icon: string; id: number }) => (
            <SubRune
              key={uuidv4()}
              subRune1={rune.subRune1}
              subRune2={rune.subRune2}
              icon={data.icon}
              height={32}
              width={32}
              id={data.id}
              selection1={perks.styles[1].selections[0]}
              selection2={perks.styles[1].selections[1]}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SubRuneTree;
