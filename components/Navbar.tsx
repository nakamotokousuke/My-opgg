import Link from "next/link";
import { useRouter } from "next/router";
import path from "path";
import React, { useState } from "react";

const Navbar = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push({
      pathname: path,
      query: {
        region: "asia",
        platform: "jp1",
      },
    });
  };
  return (
    <div className="bg-green-500 pb-3">
      <div className="flex justify-between">
        <div className="ml-5">Logo</div>
        <div className="space-x-3 mr-5">
          <Link href={"/"}>myPege</Link>
          <Link href="/pros">Pros</Link>
        </div>
      </div>
      <div>
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button onClick={() => handleClick(`/matchlog/${text}`)}>🔍</button>
      </div>
    </div>
  );
};

export default Navbar;
