import React from "react";
import Rune from "./Rune";
import { v4 as uuidv4 } from "uuid";
type RuneTree = {
  runeIcon: any;
  rune: {
    mainRune: string;
    mainRune1: string;
    mainRune2: string;
    mainRune3: string;
  };
  runeIconIndex: number;
  perks: any;
};

const RuneTree = ({ runeIcon, rune, runeIconIndex, perks }: RuneTree) => {
  return (
    <div>
      <div className="flex">
        {runeIcon[runeIconIndex].slots[0].runes.map(
          (data: { icon: string }) => (
            <Rune
              key={uuidv4()}
              Rune={rune.mainRune}
              icon={data.icon}
              height={40}
              width={40}
              selection={perks.styles[0].selections[0]}
            />
          )
        )}
      </div>
      <div className="flex justify-center">
        {runeIcon[runeIconIndex].slots[1].runes.map(
          (data: { icon: string }) => (
            <Rune
              key={uuidv4()}
              Rune={rune.mainRune1}
              icon={data.icon}
              height={32}
              width={32}
              selection={perks.styles[0].selections[1]}
            />
          )
        )}
      </div>
      <div className="flex justify-center">
        {runeIcon[runeIconIndex].slots[2].runes.map(
          (data: { icon: string }) => (
            <Rune
              key={uuidv4()}
              Rune={rune.mainRune2}
              icon={data.icon}
              height={32}
              width={32}
              selection={perks.styles[0].selections[2]}
            />
          )
        )}
      </div>
      <div className="flex justify-center">
        {runeIcon[runeIconIndex].slots[3].runes.map(
          (data: { icon: string }) => (
            <Rune
              key={uuidv4()}
              Rune={rune.mainRune3}
              icon={data.icon}
              height={32}
              width={32}
              selection={perks.styles[0].selections[3]}
            />
          )
        )}
      </div>
    </div>
  );
};

export default RuneTree;
