import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { NextPage } from "next";
import MyPage from "../components/MyPage/Mypage";
import Signin from "../components/MyPage/Signin";
import Signout from "../components/MyPage/Signout";
import { useAuth } from "../context/auth";
import { db } from "../firebase";
import { PlayerData } from "../types/PlayerType";

const Home: NextPage = () => {
  const { fbUser } = useAuth();
  return (
    <div className="min-h-screen">
      {fbUser ? (
        <div>
          <Signout />
          <MyPage />
        </div>
      ) : (
        <Signin />
      )}
    </div>
  );
};

export default Home;
