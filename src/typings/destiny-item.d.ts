export type ItemRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "legendary"
  | "exotic";

export type DamageType = "kinetic" | "arc" | "solar" | "void";

export type Slot = "kinetic" | "energy" | "power";

export type Item = {
  name: string;
  level: number;
  slot: Slot;
  damageType: DamageType;
  rarity: ItemRarity;
  description: string;
};
