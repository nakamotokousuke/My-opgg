import React, { ReactElement } from "react";

type RoleType = {
  Role: any;
  RoleName: string;
  setPlayerRegion: React.Dispatch<React.SetStateAction<number>>;
  setRegion: React.Dispatch<
    React.SetStateAction<{
      platform: string;
      region: string;
    }>
  >;
  regionArry: {
    platform: string;
    region: string;
  }[];
  handleClick(puuid: string, region: number): void;
};
const Pros = ({
  Role,
  RoleName,
  setPlayerRegion,
  setRegion,
  regionArry,
  handleClick,
}: RoleType): ReactElement => {
  return (
    <div className="mx-10">
      <h1 className="text-center text-3xl mb-4 ">{RoleName}</h1>
      <ul className="m-1">
        {Role.map(
          (ProPlayer: { name: string; puuid: string; region: number }) => (
            <li
              key={ProPlayer.name}
              className="m-1 cursor-pointer text-2xl text-center"
              onClick={() => {
                console.log(ProPlayer.puuid);
                setPlayerRegion(ProPlayer.region);
                setRegion(regionArry[ProPlayer.region]);
                handleClick(ProPlayer.puuid, ProPlayer.region);
              }}
            >
              {ProPlayer.name}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Pros;
