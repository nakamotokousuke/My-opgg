import React from "react";
import { BuildPlayerType } from "../../../types/BuildPlayer";
import { rune } from "../../../types/Rune";
import MainRuneTreeList from "./MainRuneTreeList";
import StatRuneTree from "./StatRuneTree";
import SubRuneTreeList from "./SubRuneTreeList";

type RuneBuild = {
  data: BuildPlayerType;
  runeIcon: any;
  rune: rune;
};

const RuneBuild = ({ data, runeIcon, rune }: RuneBuild) => {
  return (
    <div className="bg-[#172740] mb-2 rounded-md">
      <div className="bg-[#4b4e87] rounded-t-md font-bold pl-2">Rune Build</div>
      {rune.mainRune !== "" ? (
        <div className="flex items-center justify-center m-2">
          {/* <div className="">{mainRuneTree()}</div> */}
          <div className="">
            <MainRuneTreeList data={data} runeIcon={runeIcon} rune={rune} />
          </div>
          {/* <div className="self-end">{subRuneTree()}</div> */}
          <div className="self-end">
            <SubRuneTreeList data={data} runeIcon={runeIcon} rune={rune} />
          </div>
          {/* <div className="self-end">{StatRuneTree()}</div> */}
          <div className="self-end">
            <StatRuneTree data={data} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RuneBuild;
