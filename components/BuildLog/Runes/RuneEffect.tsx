import React from "react";
type RuneEffect = {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
};

const RuneEffect = ({ perk, var1, var2, var3 }: RuneEffect) => {
  const totalUphealth = "増加体力合計:";
  const totalAddDamage = "追加ダメージ:";
  const totalDamage = "与ダメージ合計:";
  const totalHeal = "回復量合計:";
  const totalHealUp = "増加回復量:";
  const totalShield = "シールド合計量:";
  const totalShieldUp = "増加シールド量:";
  const totalAdApUp = "増加攻撃力/魔力合計:";
  const totalEarned = "獲得したゴールド:";
  const totalStack = "合計スタック:";
  const totalManaUp = "増加マナ合計:";
  const totalManaRegen = "回復したマナ合計:";
  const completeTime = "完了した時間:";
  const LethalTempo = "攻撃速度が最大に到達していた時間:";
  const activeTime = "発動時間合計:";
  const totalActive = "発動回数:";
  const MsUpActiveTime = "移動速度が増加した時間:";
  const IncreasedTravelDistance = "増加移動距離:";
  const MsPercentUp = "移動速度増加:";
  const damageReduction = "ダメージ軽減:";
  const timeGivenSlow = "スロウ効果を与えた時間:";
  //
  const Conditioning = {
    activeTime: "試合中有効だった割合:",
    totalArUp: "増加物理防御合計:",
    totalMrUp: "増加魔法防御合計:",
  };
  const Unflinching = "戦闘中に最大の行動妨害耐性が付与されていた時間(秒):";
  const DarkHarvest = "収穫した魂の合計:";
  const FuturesMarket = "先行投資額:";
  const HextechFlashtraption = "へクスフラッシュ使用回数:";
  const PressTheAttack = "敵を無力化して与えたダメージ:";
  const MinionDematerializer = "ミニオンに与えた追加ダメージ量:";
  const UnsealedSpellbook = "入れ替えたサモナースペル数:";
  const BiscuitDelivery = "受け取ったビスケット:";
  const TimeWarpTonic = {
    HealthInstantlyHeal: "即座に回復した体力合計:",
    ManaInstantlyHeal: "即座に回復したマナ合計:",
  };
  const Transcendence = "解消された秒数:";
  const Guardian = "シールドの合計耐久値:";
  const FontOfLife = "味方の回復量合計:";
  const HailOfBlades = {
    totalAttack: "攻撃速度が増加した状態で行った攻撃回数:",
    hitPercentage: "へイルブレードの攻撃が命中した割合:",
  };
  const GhostPoro = {
    poro: "出現したゴーストポロ:",
    enemiesFound: "発見した敵の数：",
  };
  const ZombieWard = {
    ward: "発生したゾンビワード数:",
    Adaptive: "獲得したアダプティブフォース:",
  };
  const IngeniousHunter = "アイテム発動回数合計(トリンケット含む):";

  return (
    // 下に追加
    // : perk === 8000 ? ( <div><div></div></div> )
    // 上に追加
    // perk === 8000 ? ( <div><div></div></div> ) :

    <div>
      {perk === 8112 ? (
        <div>
          {/* 電撃 */}
          <div>
            {totalDamage}
            <span className="text-red-500">{var1}</span>
          </div>
        </div>
      ) : perk === 8124 ? (
        <div>
          {/* プレデター */}
          <div>
            {totalDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8128 ? (
        <div>
          {/* 魂の収穫 */}
          <div>
            {totalDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {DarkHarvest}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 9923 ? (
        <div>
          {/* ヘイルブレード */}
          <div>
            {HailOfBlades.totalAttack}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {HailOfBlades.hitPercentage}
            <span className="ml-[2px]">{var2}%</span>
          </div>
        </div>
      ) : perk === 8126 ? (
        <div>
          {/* 追い打ち */}
          <div>
            {totalAddDamage}
            <span className="text-red-500">{var1}</span>
          </div>
        </div>
      ) : perk === 8139 ? (
        <div>
          {/* 血の味わい */}
          <div>
            {totalHeal}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8143 ? (
        <div>
          {/* サドンインパクト */}
          <div>
            {totalAddDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8136 ? (
        <div>
          {/* ゾンビワード */}
          <div>
            {ZombieWard.ward}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {ZombieWard.Adaptive}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8120 ? (
        <div>
          {/* ゴーストポロ */}
          <div>
            {GhostPoro.poro}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {GhostPoro.enemiesFound}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8138 ? (
        <div>
          {/* 目玉コレクター */}
          <div>
            {totalAdApUp}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8135 ? (
        <div>
          {/* 貪欲な賞金首狩り */}
          <div>
            {totalEarned}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {totalStack}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8134 ? (
        <div>
          {/* 巧妙な賞金首狩り */}
          <div>
            {totalStack}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {IngeniousHunter}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8105 ? (
        <div>
          {/* 執拗な賞金首狩り */}
          <div>
            {totalStack}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {MsPercentUp}
            <span className="ml-[2px]">{var2}%</span>
          </div>
        </div>
      ) : perk === 8106 ? (
        <div>
          {/* 至極の賞金首狩り */}
          <div>
            {totalStack}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8351 ? (
        <div>
          {/* グレイシャルオーグメント */}
          <div>
            {timeGivenSlow}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {damageReduction}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8360 ? (
        <div>
          {/* 解放の魔導書 */}
          <div>
            {UnsealedSpellbook}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8369 ? (
        <div>
          {/* ファーストストライク */}
          <div>
            {totalDamage}
            ヘクステックフラッシュネイター
          </div>
          <div>
            {totalEarned}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8306 ? (
        <div>
          {/* ヘクステックフラッシュネイター */}
          <div>
            {HextechFlashtraption}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8304 ? (
        <div>
          {/* 魔法の靴 */}
          <div>
            {completeTime}
            <span className="ml-[2px]">
              {var1}:{var2}
            </span>
          </div>
        </div>
      ) : perk === 8313 ? (
        <div>
          {/* パーフェクトタイミング */}
          <div>
            {completeTime}
            <span className="ml-[2px]">
              {var1}:{var2}
            </span>
          </div>
        </div>
      ) : perk === 8321 ? (
        <div>
          {/* 先行投資 */}
          <div>
            {FuturesMarket}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8316 ? (
        <div>
          {/* ミニオン吸収装置 */}
          <div>
            {MinionDematerializer}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8345 ? (
        <div>
          {/* ビスケットデリバリー */}
          <div>
            {BiscuitDelivery}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8347 ? null : perk === 8410 ? ( // 宇宙の英知
        <div>
          {/* 疾駆 */}
          <div>
            {MsUpActiveTime}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8352 ? (
        <div>
          {/* タイムワープトニック */}
          <div>
            {MsUpActiveTime}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {TimeWarpTonic.HealthInstantlyHeal}
            <span className="ml-[2px]">{var2}</span>
          </div>
          <div>
            {TimeWarpTonic.ManaInstantlyHeal}
            <span className="ml-[2px]">{var3}</span>
          </div>
        </div>
      ) : perk === 8005 ? (
        <div>
          {/* プレスアタック */}
          <div>
            {totalDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {totalAddDamage}
            <span className="ml-[2px]">{var2}</span>
          </div>
          <div>
            {PressTheAttack}
            <span className="ml-[2px]">{var3}</span>
          </div>
        </div>
      ) : perk === 8008 ? (
        <div>
          {/* リーサルテンポ */}
          <div>
            {LethalTempo}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8021 ? (
        <div>
          {/* フリートフットワーク */}
          <div>
            {totalHeal}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8010 ? (
        <div>
          {/* 征服者 */}
          <div>
            {totalHeal}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 9101 ? (
        <div>
          {/* オーバーヒール */}
          <div>
            {totalShield}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 9111 ? (
        <div>
          {/* 凱旋 */}
          <div>
            {totalHeal}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {totalEarned}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8009 ? (
        <div>
          {/* 冷静沈着 */}
          <div>
            {totalManaRegen}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 9104 ? (
        <div>
          {/* レジェンド: 迅速 */}
          <div>
            {completeTime}
            <span className="ml-[2px]">
              {var1}:{var2}
            </span>
          </div>
        </div>
      ) : perk === 9105 ? (
        <div>
          {/* レジェンド: 強靭 */}
          <div>
            {completeTime}
            <span className="ml-[2px]">
              {var1}:{var2}
            </span>
          </div>
        </div>
      ) : perk === 9103 ? (
        <div>
          {/* レジェンド: 血脈 */}
          <div>
            {completeTime}
            <span className="ml-[2px]">
              {var1}:{var2}
            </span>
          </div>
        </div>
      ) : perk === 8014 ? (
        <div>
          {/* 最期の慈悲 */}
          <div>
            {totalAddDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8017 ? (
        <div>
          {/* 切り崩し */}
          <div>
            {totalAddDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8299 ? (
        <div>
          {/* 背水の陣 */}
          <div>
            {totalAddDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8437 ? (
        <div>
          {/* 不死者の握撃 */}
          <div>
            {totalDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {totalHeal}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8439 ? (
        <div>
          {/* アフターショック */}
          <div>
            {totalDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {damageReduction}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8465 ? (
        <div>
          {/* ガーディアン */}
          <div>
            {Guardian}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8446 ? (
        <div>
          {/* 打ちこわし */}
          <div>
            {totalAddDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8463 ? (
        <div>
          {/* 生命の泉 */}
          <div>
            {FontOfLife}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8401 ? (
        <div>
          {/* シールドバッシュ */}
          <div>
            {totalDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8429 ? (
        <div>
          {/* 心身調整 */}
          <div>
            {Conditioning.activeTime}
            <span className="ml-[2px]">{var1}%</span>
          </div>
          <div>
            {Conditioning.totalArUp}
            <span className="ml-[2px]">{var2}</span>
          </div>
          <div>
            {Conditioning.totalMrUp}
            <span className="ml-[2px]">{var3}</span>
          </div>
        </div>
      ) : perk === 8444 ? (
        <div>
          {/* 息継ぎ */}
          <div>
            {totalHeal}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8473 ? (
        <div>
          {/* ボーンアーマー */}
          <div>
            {damageReduction}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8451 ? (
        <div>
          {/* 超成長 */}
          <div>
            {totalUphealth}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8453 ? (
        <div>
          {/* 生気付与 */}
          <div>
            {totalHealUp}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {totalShieldUp}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8242 ? (
        <div>
          {/* 気迫 */}
          <div>
            {Unflinching}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8214 ? (
        <div>
          {/* エアリー召喚 */}
          <div>
            {totalDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {totalShield}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8229 ? (
        <div>
          {/* 秘儀の彗星 */}
          <div>
            {totalDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8230 ? (
        <div>
          {/* フェイズラッシュ */}
          <div>
            {totalActive}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8224 ? (
        <div>
          {/* 魔除けのオーブ */}
          <div>
            {totalShield}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8226 ? (
        <div>
          {/* マナフローバンド */}
          <div>
            {totalManaUp}
            <span className="ml-[2px]">{var1}</span>
          </div>
          <div>
            {totalManaRegen}
            <span className="ml-[2px]">{var2}</span>
          </div>
        </div>
      ) : perk === 8275 ? (
        <div>
          {/* ニンバスクローク */}
          <div>
            {totalActive}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8210 ? (
        <div>
          {/* 至高 */}
          <div>
            {Transcendence}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8234 ? (
        <div>
          {/* 追い風 */}
          <div>
            {IncreasedTravelDistance}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8233 ? (
        <div>
          {/* 英気集中 */}
          <div>
            {activeTime}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8237 ? (
        <div>
          {/* 追火 */}
          <div>
            {totalAddDamage}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8000 ? (
        <div>
          {/* 水走り */}
          <div>
            {activeTime}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : perk === 8000 ? (
        <div>
          {/* 強まる嵐 */}
          <div>
            {totalAdApUp}
            <span className="ml-[2px]">{var1}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RuneEffect;
// 下に追加
// : perk === 8000 ? ( <div><div>{}<span className = "ml-[2px]">{var1}</span></div></div> )
// 上に追加
// perk === 8000 ? ( <div><div></div></div> ) :
