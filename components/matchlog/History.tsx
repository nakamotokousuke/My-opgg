import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import HistoryChild from "./HistoryChild";
type name = {
  name?: string | string[];
};

const History = (name: name) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    HistoryUpdate();
  }, [name.name]);

  const HistoryUpdate = () => {
    const t = localStorage.getItem("history");
    if (t) {
      let history = JSON.parse(t);
      console.log("history", history);

      setHistory(history);
    }
  };

  return (
    <div className="bg-[#2e2e4e]  p-4 rounded-b-sm">
      <ul className=" flex flex-col">
        {history.map(
          (
            data: {
              name: string;
              platform: string;
              region: string;
              profileIconId: number;
              id: string;
            },
            index
          ) => (
            <div key={data.id} style={{ order: -index }} className="my-1">
              <HistoryChild data={data} />
            </div>
          )
        )}
      </ul>
    </div>
  );
};

export default History;
