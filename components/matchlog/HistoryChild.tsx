import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { getQuery } from "../../lib/getQuery";

type data = {
  data: { name: string; platform: string; profileIconId: number; id: string };
};

const HistoryChild = (props: data) => {
  const [fav, setFav] = useState(false);
  const [button, setBtton] = useState(false);
  const data = props.data;

  useEffect(() => {
    if (!localStorage) return;
    const json = localStorage.getItem("favorite");
    if (!json) return;
    let favorite = JSON.parse(json);
    favorite.forEach((fav: { name: string }) => {
      if (fav.name === data.name) {
        setFav(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favAdd = () => {
    if (!localStorage) return;
    const json = localStorage.getItem("favorite");
    if (!json) {
      const favorite = [data];
      let json = JSON.stringify(favorite, undefined, 1);
      localStorage.setItem("favorite", json);
    } else {
      let favorite = JSON.parse(json);
      if (fav) {
        favorite.forEach((fav: { name: string }, index: number) => {
          if (fav.name === data.name) {
            let newFav = favorite.filter(
              (fav: { name: string }) => data.name !== fav.name
            );
            let json = JSON.stringify(newFav, undefined, 1);
            localStorage.setItem("favorite", json);
            setFav(false);
          }
        });
      } else {
        favorite.push(data);
        let json2 = JSON.stringify(favorite, undefined, 1);
        localStorage.setItem("favorite", json2);
        setFav(true);
      }
    }
  };
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push({
      pathname: path,
      query: {
        region: getQuery("region", user?.region),
        platform: getQuery("platform", user?.platform),
      },
    });
  };

  return (
    <div
      key={data.id}
      className="text-white flex text-center cursor-pointer justify-between w-[60%]"
    >
      <div
        onClick={() => handleClick(`/matchlog/${data.name}`)}
        className="flex"
      >
        <Image
          className="rounded-md"
          src={`http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_LATEST}/img/profileicon/${data.profileIconId}.png`}
          alt=""
          height={30}
          width={30}
          objectFit="contain"
          priority={false}
        />
        <div className="text-xl ml-2">{data.name}</div>
      </div>
      {/* <button className="" onClick={favAdd}>
        {fav ? <div>orini</div> : <div>zako</div>}
      </button> */}
      <input type="checkbox" checked={fav} onClick={favAdd} />
    </div>
  );
};

export default HistoryChild;
