import React from "react";
import StatRune from "./StatRune";
import StatusRune from "../../../data/StatusRune.json";
import { v4 as uuidv4 } from "uuid";
import { BuildPlayerType } from "../../../types/BuildPlayer";

type StatRuneTree = {
  data: BuildPlayerType;
};

const StatRuneTree = ({ data }: StatRuneTree) => {
  return (
    <>
      <div className="flex">
        {StatusRune[0].map((status: { key: any; icon: string }) => (
          <StatRune
            key={uuidv4()}
            runeKey={status.key}
            data={data.perks.statPerks.offense}
            icon={status.icon}
            height={32}
            width={32}
          />
        ))}
      </div>
      <div className="flex">
        {StatusRune[1].map((status: { key: any; icon: string }) => (
          <StatRune
            key={uuidv4()}
            runeKey={status.key}
            data={data.perks.statPerks.flex}
            icon={status.icon}
            height={32}
            width={32}
          />
        ))}
      </div>
      <div className="flex">
        {StatusRune[2].map((status: { key: any; icon: string }) => (
          <StatRune
            key={uuidv4()}
            runeKey={status.key}
            data={data.perks.statPerks.defense}
            icon={status.icon}
            height={32}
            width={32}
          />
        ))}
      </div>
    </>
  );
};

export default StatRuneTree;
