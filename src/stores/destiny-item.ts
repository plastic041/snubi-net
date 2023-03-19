import { create } from "zustand";
import type { Item } from "~/typings/destiny-item";

type DestinyItemStore = Item & {
  [key in keyof Item as `set${Capitalize<string & key>}`]: (
    item: Item[key]
  ) => void;
};

const TELESTO: Item = {
  name: "텔레스토",
  level: 1020,
  slot: "energy",
  damageType: "void",
  rarity: "exotic",
  description:
    "여왕의 하빈저가 남긴 자취가 아직도 토성의 위성들 사이를 떠도는군요.",
};

export const useDestinyItemStore = create<DestinyItemStore>((set) => ({
  name: TELESTO.name,
  setName: (name) => set({ name }),

  level: TELESTO.level,
  setLevel: (level) => set({ level }),

  slot: TELESTO.slot,
  setSlot: (slot) => {
    if (slot === "kinetic") {
      set({ damageType: "kinetic" });
    } else {
      set({ damageType: "arc" });
    }
    set({ slot });
  },

  damageType: TELESTO.damageType,
  setDamageType: (type) => {
    set({ damageType: type });
  },

  rarity: TELESTO.rarity,
  setRarity: (rarity) => set({ rarity }),

  description: TELESTO.description,
  setDescription: (description) => set({ description }),
}));
