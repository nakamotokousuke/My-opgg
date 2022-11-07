import React, { useEffect, useState } from "react";
import HistoryChild from "./matchlog/HistoryChild";

const SearchLog = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const t = localStorage.getItem("history");
    if (t) {
      let history = JSON.parse(t);
      setHistory(history);
    }
  }, []);

  return (
    <div className="bg-[#2e2e4e] p-4">
      <ul className="flex flex-col">
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

export default SearchLog;
