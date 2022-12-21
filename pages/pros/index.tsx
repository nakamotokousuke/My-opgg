import React, { useContext } from "react";
import Pros from "../../components/Pros/Pros";
import MIDPros from "../../data/PlayerData/MIDPros.json";
import TOPPros from "../../data/PlayerData/TOPPros.json";
import JUGPros from "../../data/PlayerData/JUGPros.json";
import ADCPros from "../../data/PlayerData/ADCPros.json";
import SUPPros from "../../data/PlayerData/SUPPros.json";
import { Data } from "../_app";
import { useRouter } from "next/router";
import axios from "axios";
import { PlayerDataContext } from "../../context/Context";

const Index = () => {
  const { setPlayerRegion, setRegion, regionArry, region } =
    useContext(PlayerDataContext);
  // const { setPlayerRegion, setRegion, regionArry, region } = useContext(Data);

  const router = useRouter();

  const PageChange = (path: string, region: number) => {
    router.push({
      pathname: path,
      query: {
        region: regionArry[region].region,
        platform: regionArry[region].platform,
      },
    });
  };

  function handleClick(puuid: string, region: number) {
    axios
      .get("http://localhost:3000/api/lol", {
        params: {
          puuid: puuid,
          platform: regionArry[region].platform,
        },
      })
      .then(function (response) {
        console.log(response.data);
        PageChange(`/matchlog/${response.data.data.name}`, region);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  return (
    <div className="grid grid-cols-5 mt-10 text-white min-h-screen">
      <Pros
        Role={TOPPros}
        RoleName="TOPLANE"
        setPlayerRegion={setPlayerRegion}
        setRegion={setRegion}
        regionArry={regionArry}
        handleClick={handleClick}
      />
      <Pros
        Role={JUGPros}
        RoleName="JUNGLE"
        setPlayerRegion={setPlayerRegion}
        setRegion={setRegion}
        regionArry={regionArry}
        handleClick={handleClick}
      />
      <Pros
        Role={MIDPros}
        RoleName="MIDLANE"
        setPlayerRegion={setPlayerRegion}
        setRegion={setRegion}
        regionArry={regionArry}
        handleClick={handleClick}
      />
      <Pros
        Role={ADCPros}
        RoleName="ADCLANE"
        setPlayerRegion={setPlayerRegion}
        setRegion={setRegion}
        regionArry={regionArry}
        handleClick={handleClick}
      />
      <Pros
        Role={SUPPros}
        RoleName="SUPPORT"
        setPlayerRegion={setPlayerRegion}
        setRegion={setRegion}
        regionArry={regionArry}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Index;
