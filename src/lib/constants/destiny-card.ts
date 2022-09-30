import type { DamageType, ItemRarity } from "~/typings/destiny-item";

export const WIDTH = 280;
export const HEIGHT = 280;
export const PX = 16;
export const PY = 16;
export const FONT_FAMILY = "pretendard variable";

export const DAMAGE_TYPE_IMAGE_SRCS: Record<DamageType, string> = {
  kinetic: "/images/destiny-card/destiny-kinetic.webp",
  solar: "/images/destiny-card/destiny-solar.webp",
  arc: "/images/destiny-card/destiny-arc.webp",
  void: "/images/destiny-card/destiny-void.webp",
};

type DAMAGE_TYPE_COLOR = {
  [key in DamageType]: string;
};

export const DAMAGE_TYPE_COLORS: DAMAGE_TYPE_COLOR = {
  kinetic: "#868686",
  solar: "#f0631e",
  arc: "#79bbe8",
  void: "#b185df",
};

type RARITY_COLOR = {
  bg: string;
  name: string;
  type: string;
  rarity: string;
  desc: string;
};
export const RARITY_COLORS: Record<ItemRarity, RARITY_COLOR> = {
  common: {
    bg: "#c3bcb4",
    name: "#000",
    type: "#000a",
    rarity: "#0006",
    desc: "#fffc",
  },
  uncommon: {
    bg: "#367040",
    name: "#fff",
    type: "#fff8",
    rarity: "#fff6",
    desc: "#fffc",
  },
  rare: {
    bg: "#4d78a5",
    name: "#fff",
    type: "#fffc",
    rarity: "#fff6",
    desc: "#fffc",
  },
  legendary: {
    bg: "#522f65",
    name: "#fff",
    type: "#fffc",
    rarity: "#fff6",
    desc: "#fffc",
  },
  exotic: {
    bg: "#ceae35",
    name: "#fff",
    type: "#fffc",
    rarity: "#fff6",
    desc: "#fffc",
  },
} as const;

export const STRING_KR = {
  rarity: {
    common: "기본",
    uncommon: "고급",
    rare: "희귀",
    legendary: "전설",
    exotic: "경이",
  },
  slot: {
    kinetic: "물리 무기",
    energy: "에너지 무기",
    power: "파워 무기",
  },
};
