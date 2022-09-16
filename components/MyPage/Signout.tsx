import { signOut } from "firebase/auth";
import { ReactNode } from "react";
import { auth } from "../../firebase";

const Signout = () => {
  const signoutBtn = () => {
    signOut(auth).then(() => {
      alert("サインアウトしました");
    });
  };
  return <button onClick={signoutBtn}>signout</button>;
};

export default Signout;
