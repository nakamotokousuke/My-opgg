import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/auth";
import { Data } from "../pages/_app";

const Navbar = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const ref = useRef<any>();
  const { regionChange, setPlayerRegion, playerRegion, region } =
    useContext(Data);
  const { fbUser } = useAuth();

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick(`/matchlog/${text}`);
    }
  };

  return (
    <div className="bg-blue-900 pb-3">
      <div className="flex justify-between mx-4 py-2">
        <div className="pl-5">Logo</div>
        <div className="space-x-3 pr-5 text-lg font-bold text-white">
          <Link href={"/"} className="">
            myPege
          </Link>
          <Link href="/pros">Pros</Link>
          <div className="flex">
            {fbUser && <div>{fbUser.displayName}</div>}
            {fbUser?.photoURL && (
              <div>
                <Image
                  className="rounded-full"
                  height={30}
                  width={30}
                  src={fbUser.photoURL}
                  alt=""
                ></Image>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-center">
        <select
          onChange={handleSelect}
          ref={ref}
          id="select"
          className="rounded-l h-6 w-10 font-bold text-center pl-[1px] pb-[1px]"
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
          className="font-bold"
          placeholder="SummonerName"
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-white  rounded-r"
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
    </div>
  );
};

export default Navbar;
