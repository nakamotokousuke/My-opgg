import type { NextPage } from "next";
import MyPage from "../components/MyPage/Mypage";
import Signin from "../components/MyPage/Signin";
import Signout from "../components/MyPage/Signout";
import { useAuth } from "../context/auth";

const Home: NextPage = () => {
  const { fbUser } = useAuth();
  return (
    <div className="h-screen">
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
