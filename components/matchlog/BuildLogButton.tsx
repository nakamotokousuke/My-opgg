import React from "react";

type BuildLogButton = {
  handleBuild: (matchData: string) => void;
  matchId: string;
  button: string;
};

const BuildLogButton = ({ handleBuild, matchId, button }: BuildLogButton) => {
  return (
    <div
      onClick={() => handleBuild(matchId)}
      className="flex rounded-r-lg bg-zinc-400 max-h-max items-end"
    >
      <div className="w-[20px] flex justify-center">
        {button === matchId ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default BuildLogButton;
