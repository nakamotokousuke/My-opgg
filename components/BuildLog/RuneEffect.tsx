import React from "react";
type RuneEffect = {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
};

const RuneEffect = ({ perk, var1, var2, var3 }: RuneEffect) => {
  return (
    <div>
      {perk === 8126 ? (
        <div>
          {/* 追い打ち */}
          <div>
            damage dealt : <span className="text-red-500">{var1}</span>
          </div>
        </div>
      ) : perk === 8112 ? (
        <div>
          {/* 電撃 */}
          <div>
            damage dealt : <span className="text-red-500">{var1}</span>
          </div>
        </div>
      ) : perk === 8214 ? (
        <div>
          {/* エアリー */}
          <div>
            damage dealt : <span className="text-red-500">{var1}</span>
          </div>
          <div>
            damage blocked by the shield :{" "}
            <span className="text-blue-500">{var2}</span>
          </div>
        </div>
      ) : perk === 8226 ? (
        <div>
          {/* マナフローバンド */}
          <div>
            Increased mana total : <span className="text-blue-500">{var1}</span>
          </div>
          <div>
            Total Mana Restored : <span className="text-blue-500">{var2}</span>
          </div>
        </div>
      ) : perk === 8230 ? (
        <div>
          {/* フェイズラッシュ */}
          <div>
            Total number of activations :{" "}
            <span className="text-yellow-500">{var1}</span>
          </div>
        </div>
      ) : perk === 8233 ? (
        <div>
          {/* 英気集中 */}
          <div>
            Total activation time :{" "}
            <span>
              {var1}:{var2}
            </span>
          </div>
        </div>
      ) : perk === 8237 ? (
        <div>
          {/* 追い火 */}
          <div>
            damage dealt : <span className="text-red-500">{var1}</span>
          </div>
        </div>
      ) : perk === 8275 ? (
        <div>
          {/* ニンバスクローク */}
          <div>
            Total number of activations :{" "}
            <span className="text-yellow-500">{var1}</span>
          </div>
        </div>
      ) : perk === 8369 ? (
        <div>
          {/* ファーストストライク */}
          <div>
            damage dealt : <span className="text-red-500">{var1}</span>
          </div>
          <div>
            earned gold : <span className="text-yellow-500">{var2}</span>
          </div>
        </div>
      ) : perk === 8451 ? (
        <div>
          {/* 超成長 */}
          <div>
            Total Max Health Increased :{" "}
            <span className="text-green-500">{var1}</span>
          </div>
        </div>
      ) : perk === 8473 ? (
        <div>
          {/* ボーンアーマー */}
          <div>
            Total damage blocked : <span className="text-blue-500">{var1}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RuneEffect;
// 下に追加
// : perk === 8000 ? ( <div><div></div></div> )
// 上に追加
// perk === 8000 ? ( <div><div></div></div> ) :
