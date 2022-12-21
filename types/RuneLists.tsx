export type PerkSlot = {
  icon: string;
  id: number;
  key: string;
  longDesc: string;
  name: string;
  shortDesc: string;
};

export type Perk = {
  icon: string;
  id: number;
  key: string;
  name: string;
  slots: PerkSlot[];
};
