export type ChampionStats = {
  armor: number;
  armorperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackrange: number;
  attackspeed: number;
  attackspeedperlevel: number;
  crit: number;
  critperlevel: number;
  hp: number;
  hpperlevel: number;
  hpregen: number;
  hpregenperlevel: number;
  movespeed: number;
  mp: number;
  mpperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
};

export type ChampionInfo = {
  attack: number;
  defense: number;
  difficulty: number;
  magic: number;
};

export type ChampionSprite = {
  full: string;
  group: string;
  h: number;
  sprite: string;
  w: number;
  x: number;
  y: number;
};

export type Champion = {
  0: string;
  1: {
    blurb: string;
    id: string;
    image: ChampionSprite;
    info: ChampionInfo;
    key: string;
    name: string;
    partype: string;
    stats: ChampionStats;
    tags: string[];
    title: string;
    version: string;
  };
};

export type champsType = {
  data: Champion[];
};
