import React from "react";
import { BuildPlayerType } from "../../../types/BuildPlayer";
import { rune } from "../../../types/Rune";
import SubRuneTree from "./SubRuneTree";

type SubRuneTreeList = {
  data: BuildPlayerType;
  runeIcon: any;
  rune: rune;
};

const SubRuneTreeList = ({ data, runeIcon, rune }: SubRuneTreeList) => {
  if (8100 === data.perks.styles[1].style)
    return (
      <SubRuneTree
        runeIcon={runeIcon}
        rune={rune}
        runeIconIndex={0}
        perks={data.perks}
      />
    );
  if (8300 === data.perks.styles[1].style)
    return (
      <SubRuneTree
        runeIcon={runeIcon}
        rune={rune}
        runeIconIndex={1}
        perks={data.perks}
      />
    );
  if (8000 === data.perks.styles[1].style)
    return (
      <SubRuneTree
        runeIcon={runeIcon}
        rune={rune}
        runeIconIndex={2}
        perks={data.perks}
      />
    );
  if (8400 === data.perks.styles[1].style)
    return (
      <SubRuneTree
        runeIcon={runeIcon}
        rune={rune}
        runeIconIndex={3}
        perks={data.perks}
      />
    );
  if (8200 === data.perks.styles[1].style)
    return (
      <SubRuneTree
        runeIcon={runeIcon}
        rune={rune}
        runeIconIndex={4}
        perks={data.perks}
      />
    );
  return null;
};

export default SubRuneTreeList;
