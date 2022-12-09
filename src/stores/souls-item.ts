import create from "zustand";
import type { Item } from "~/typings/souls-item";

type SoulsItemStore = Item & {
  [key in keyof Item as `set${Capitalize<string & key>}`]: (
    item: Item[key]
  ) => void;
};

const BROKEN_STRAIGHT_SWORD: Item = {
  name: "부러진 직검",
  description: `날이 중간부터 부러져 없어진 직검

무기로서 눈여겨 볼 곳은 아무것도 없으며 제정신을 잃은 망자라도 되지 않은 이상에야 사용하는 이 따위는 없을 것이다`,
};

export const useSoulsItemStore = create<SoulsItemStore>((set) => ({
  name: BROKEN_STRAIGHT_SWORD.name,
  setName: (name) => set({ name }),

  description: BROKEN_STRAIGHT_SWORD.description,
  setDescription: (description) => set({ description }),
}));
