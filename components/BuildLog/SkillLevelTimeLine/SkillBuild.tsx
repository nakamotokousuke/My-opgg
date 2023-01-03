import Image from "next/image";
import React, { useContext } from "react";
import { PlayerDataContext } from "../../../context/Context";
import SkillLevelTimeLine from "./SkillLevelTimeLine";

type SkillBuild = {
  skillSet: any[];
  skillLog: number[];
};

const SkillBuild = ({ skillLog, skillSet }: SkillBuild) => {
  const { latest } = useContext(PlayerDataContext);
  // if (!latest) return null;
  return (
    <div className="bg-[#172740] rounded-md">
      <div className="bg-[#4b4e87] rounded-t-md font-bold pl-2">
        Skill Build
      </div>
      <div className="flex items-center mt-3 mb-2">
        <div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 sm:ml-1 mb-1 text-center">
            Q
          </div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 sm:ml-1 mb-1 text-center">
            W
          </div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 sm:ml-1 mb-1 text-center">
            E
          </div>
          <div className="h-5 w-5 sm:h-6 sm:w-6 sm:ml-1 mb-1 text-center">
            R
          </div>
        </div>
        {JSON.stringify(skillSet) !== "[]" ? (
          <div className="">
            {skillSet.map((skill) => (
              <div
                key={skill.image.full}
                className="h-5 w-5 sm:h-6 sm:w-6 ml-1 mb-1 relative"
              >
                <Image
                  className=""
                  layout="fill"
                  objectFit="contain"
                  src={`
                        https://ddragon.leagueoflegends.com/cdn/${latest}/img/spell/${skill.image.full}`}
                  alt=""
                />
              </div>
            ))}
          </div>
        ) : null}
        {skillLog.length !== 0 ? (
          <>
            {skillLog.map((skill, index) => (
              <SkillLevelTimeLine key={index} skill={skill} index={index} />

              // <div key={index}>{skillCheck(skill, index)}</div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SkillBuild;
