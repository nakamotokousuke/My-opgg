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

  return (
    <div className="bg-green-500 pb-3">
      <div className="flex justify-between">
        <div className="pl-5">Logo</div>
        <div className="space-x-3 pr-5">
          <Link href={"/"}>myPege</Link>
          <Link href="/pros">Pros</Link>
          {fbUser && <div>{fbUser.displayName}</div>}
        </div>
      </div>
      <div className="text-center">
        <select
          onChange={handleSelect}
          ref={ref}
          id="select"
          className="rounded-l h-6 pb-1 mb-2"
        >
          <option value={0}>jp</option>
          <option value={1}>kr</option>
        </select>
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button onClick={() => handleClick(`/matchlog/${text}`)}>🔍</button>
      </div>
    </div>
  );
};

export default Navbar;
