import React, { useEffect, useState } from "react";

import HistoryChild from "./HistoryChild";
type name = {
  name: string;
};

const History = (name: name) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const t = localStorage.getItem("history");
    if (t) {
      let history = JSON.parse(t);
      setHistory(history);
    }
  }, [name.name]);

  return (
    <div className="bg-[#2e2e4e]  p-4">
      <ul className="space-y-2">
        {history.map(
          (data: {
            name: string;
            platform: string;
            profileIconId: number;
            id: string;
          }) => (
            <HistoryChild key={data.id} data={data} />
          )
        )}
      </ul>
    </div>
  );
};

export default History;
