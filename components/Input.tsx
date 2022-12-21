import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayerDataContext } from "../context/Context";
import { Data } from "../pages/_app";
import InputLogFav from "./InputLogFav";

type InputStylesType = {
  style: string;
};

const Input = (style: InputStylesType) => {
  const [text, setText] = useState("");
  const [searchLog, setSearchLog] = useState(false);
  const router = useRouter();
  const ref = useRef<any>();
  const [effect, setEffect] = useState<string | string[] | undefined>("");
  const { regionChange, setPlayerRegion, playerRegion, region } =
    useContext(PlayerDataContext);
  // const { regionChange, setPlayerRegion, playerRegion, region } =
  //   useContext(Data);

  const handleClick = (path: string) => {
    router.push({
      pathname: path,
      query: {
        region: region.region,
        platform: region.platform,
      },
    });
  };
  const handleSelect = () => {
    console.log(ref.current.value);
    regionChange(ref.current.value);
    setPlayerRegion(ref.current.value);
    // console.log(ref);
  };

  useEffect(() => {
    const select = ref.current;
    const options = select.options;
    options[playerRegion].selected = true;
    console.log(playerRegion);
  }, [playerRegion]);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setSearchLog(false);
      setEffect(router.query.name);
    });

    return () => {
      router.events.off("routeChangeComplete", () => {
        setSearchLog(false);
        setEffect(router.query.name);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(router.query.name);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick(`/matchlog/${text}`);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center text-center w-full h-full">
        <select
          onChange={handleSelect}
          ref={ref}
          id="select"
          className="rounded-l h-full w-10 font-bold text-center pl-[1px] pb-[1px]"
        >
          <option value={0} className="font-bold">
            jp
          </option>
          <option value={1} className="font-bold">
            kr
          </option>
        </select>
        <input
          type="text"
          className={`${style.style} font-bold h-full`}
          placeholder="SummonerName"
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setText(e.target.value)}
          onClick={() => setSearchLog((prev) => (prev = !prev))}
        />
        <button
          className="bg-white  rounded-r h-full"
          onClick={() => handleClick(`/matchlog/${text}`)}
        >
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {searchLog && (
        <div className={`flex justify-center text-center w-full h-full pl-4`}>
          <div className={`${style.style} text-left z-50`}>
            <InputLogFav name={effect} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
