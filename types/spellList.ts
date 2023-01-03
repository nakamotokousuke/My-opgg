export type spellListType = {
  key: string;
  value: {
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    costType: string;
    datavalues: any;
    description: string;
    effect: number | null[];
    effectBurn: string | null[];
    id: string;
    image: Image;
    key: string;
    maxammo: string;
    maxrank: number;
    modes: string[];
    name: string;
    range: number[];
    rangeBurn: string;
    resource: string;
    summonerLevel: number;
    tooltip: string;
    vars: any[];
  };
};

export type Image = {
  full: string;
  group: string;
  h: number;
  sprite: string;
  w: number;
  x: number;
  y: number;
};
