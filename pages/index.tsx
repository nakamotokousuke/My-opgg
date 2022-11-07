import type { NextPage } from "next";
import Input from "../components/Input";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full h-10">
        <Input style="w-[30%] text-2xl" />
      </div>
    </div>
  );
};

export default Home;
