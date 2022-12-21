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
        <Link href={"/"}>
          <p className="pl-5 text-3xl font-bold">My-OPGG</p>
        </Link>
        <div className="flex space-x-3 pr-5 text-lg font-bold text-white ">
          <Link href={"/"}>
            <p className="">Home</p>
          </Link>
          <Link href="/pros">
            <p className="">Pros</p>
          </Link>
        </div>
      </div>
      <div className="h-6">
        <Input style="w-[40%] sm:w-[15%]" />
      </div>
    </div>
  );
};

export default Navbar;
