import React from "react";
import { auth } from "../../firebase";
import { provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth";

const Signin = () => {
  const { fbUser } = useAuth();
  const router = useRouter();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <div className="h-screen text-center">
      <button onClick={signInWithGoogle} className="text-white">
        Google account signin
      </button>
    </div>
  );
};

export default Signin;
