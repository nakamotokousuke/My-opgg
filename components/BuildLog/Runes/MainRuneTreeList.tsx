import React from "react";
import { BuildPlayerType } from "../../../types/BuildPlayer";
import RuneTree from "./RuneTree";
type rune = {
  mainRune: string;
  mainRune1: string;
  mainRune2: string;
  mainRune3: string;
  subRune1: string;
  subRune2: string;
  statRune1: string;
  statRune2: string;
  statRune3: string;
};

type SubRuneTreeList = {
  data: BuildPlayerType;
  runeIcon: any;
  rune: rune;
};

const MainRuneTreeList = ({ data, runeIcon, rune }: SubRuneTreeList) => {
  if (8100 === data.perks.styles[0].style)
    return (
      <RuneTree
        runeIcon={runeIcon}
        rune={rune}
        runeIconIndex={0}
        perks={data.perks}
      />
    );
  if (8300 === data.perks.styles[0].style)
    return (
      <RuneTree
        runeIcon={runeIcon}
        rune={rune}
        runeIconIndex={1}
        perks={data.perks}
      />
    );

  if (8000 === data.perks.styles[0].style)
    return (
      <RuneTree
        runeIcon={runeIcon}
        rune={rune}
        runeIconIndex={2}
        perks={data.perks}
      />
    );

  if (8400 === data.perks.styles[0].style)
    return (
      <RuneTree
        runeIcon={runeIcon}
        rune={rune}
        runeIconIndex={3}
        perks={data.perks}
      />
    );

  if (8200 === data.perks.styles[0].style)
    return (
      <RuneTree
        runeIcon={runeIcon}
        rune={rune}
        runeIconIndex={4}
        perks={data.perks}
      />
    );

  return null;
};

export default MainRuneTreeList;
