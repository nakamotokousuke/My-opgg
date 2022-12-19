import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Data } from "../pages/_app";
import Input from "./Input";

const Navbar = () => {
  return (
    <div className="bg-blue-900 pb-3">
      <div className="flex justify-between mx-4 py-2">
        <div className="pl-5">Logo</div>
        <div className="space-x-3 pr-5 text-lg font-bold text-white">
          <Link href={"/"} className="">
            myPege
          </Link>
          <Link href="/pros">Pros</Link>
        </div>
      </div>
      <div className="h-6">
        <Input style="w-[40%] sm:w-[15%]" />
      </div>
    </div>
  );
};

export default Navbar;
