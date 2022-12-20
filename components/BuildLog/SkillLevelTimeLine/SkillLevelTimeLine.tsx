import React from "react";

type SkillLevelTimeLine = {
  skill: number;
  index: number;
};

const SkillLevelTimeLine = ({ skill, index }: SkillLevelTimeLine) => {
  if (skill === 1)
    return (
      <div className="">
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
          {index + 1}
        </div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
      </div>
    );

  if (skill === 2)
    return (
      <div className="">
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
          {index + 1}
        </div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
      </div>
    );

  if (skill === 3)
    return (
      <div className="">
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
          {index + 1}
        </div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
      </div>
    );

  if (skill === 4)
    return (
      <div className="">
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1"></div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 bg-[#4b4e87] ml-1 mb-1 text-center">
          {index + 1}
        </div>
      </div>
    );
  return null;
};

export default SkillLevelTimeLine;
