import { useCallback, useEffect, useRef, useState } from "react";
import {
  STRING_KR,
  DAMAGE_TYPE_COLORS,
  DAMAGE_TYPE_IMAGE_SRCS,
  WIDTH,
  HEIGHT,
  PX,
  PY,
  RARITY_COLORS,
  FONT_FAMILY,
} from "~/lib/constants/destiny-card";
import { downloadImage } from "~/lib/download-image";

const TELESTO = {
  name: "텔레스토",
  level: 1020,
  slot: "energy",
  damageType: "void",
  rarity: "exotic",
  description:
    "여왕의 하빈저가 남긴 자취가 아직도 토성의 위성들 사이를 떠도는군요.",
} as const;

type ItemRarity = "common" | "uncommon" | "rare" | "legendary" | "exotic";

type DamageType = "kinetic" | "arc" | "solar" | "void";

type Slot = "kinetic" | "energy" | "power";

type Item = {
  name: string;
  level: number;
  slot: Slot;
  damageType: DamageType;
  rarity: ItemRarity;
  description: string;
};

export const DestinyCard = () => {
  const [name, setName] = useState(TELESTO.name as Item["name"]);
  const [level, setLevel] = useState(TELESTO.level as Item["level"]);
  const [slot, setSlot] = useState(TELESTO.slot as Item["slot"]);
  const [damageType, setDamageType] = useState(
    TELESTO.damageType as Item["damageType"]
  );
  const [rarity, setRarity] = useState(TELESTO.rarity as Item["rarity"]);
  const [description, setDescription] = useState(
    TELESTO.description as Item["description"]
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const [imageCache, setImageCache] = useState<
    Record<string, HTMLImageElement>
  >({});

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!(canvas && ctx)) {
      return;
    }

    const rarityKr = STRING_KR.rarity[rarity];

    ctx.textBaseline = "alphabetic";

    // bg
    ctx.fillStyle = "#2a232b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // name, type, rarity bg
    ctx.fillStyle = RARITY_COLORS[rarity].bg;
    ctx.fillRect(0, 0, canvas.width, 170);

    // name
    ctx.fillStyle = RARITY_COLORS[rarity].name;
    ctx.font = `bold 4.4rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(name, PX, PY + 56);

    // slot
    ctx.fillStyle = RARITY_COLORS[rarity].type;
    ctx.font = `2.4rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(STRING_KR.slot[slot], PX, PY + 110);

    // rarity
    ctx.fillStyle = RARITY_COLORS[rarity].rarity;
    ctx.font = `2.4rem ${FONT_FAMILY}`;
    ctx.textAlign = "right";
    ctx.fillText(rarityKr, canvas.width - PX, PY + 110);

    // level
    ctx.fillStyle = DAMAGE_TYPE_COLORS[damageType];
    ctx.font = `900 7rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(String(level), PX + 96, PY + 260);

    // damage type image
    const damageTypeImage = imageCache[DAMAGE_TYPE_IMAGE_SRCS[damageType]];
    if (damageTypeImage) {
      ctx.drawImage(damageTypeImage, PX, PY + 178, 86, 86);
    } else {
      const damageTypeImage = new Image();
      damageTypeImage.src = DAMAGE_TYPE_IMAGE_SRCS[damageType];
      damageTypeImage.onload = () => {
        setImageCache((prev) => ({
          ...prev,
          [DAMAGE_TYPE_IMAGE_SRCS[damageType]]: damageTypeImage,
        }));
        ctx.drawImage(damageTypeImage, PX, PY + 178, 86, 86);
      };
    }

    // description
    ctx.fillStyle = RARITY_COLORS[rarity].desc;
    ctx.font = `2.2rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";

    let line = "";
    let y = PY + 332;

    const words = description.split(" ");
    for (let i = 0; i < words.length; i++) {
      const testLine = `${line}${words[i]} `;
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > canvas.width - PX * 2 && i > 0) {
        ctx.fillText(line, PX, y);
        line = `${words[i]} `;
        y += 44;

        if (y > canvas.height - PY * 2) {
          break;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, PX, y);
  }, [imageCache, name, level, slot, damageType, rarity, description]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    if (!isFontLoaded) {
      document.fonts.ready.then(() => setIsFontLoaded(true));
    }

    draw();
  }, [draw, isFontLoaded]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 lg:flex-row lg:gap-12">
      <div className="flex flex-col items-center gap-4">
        <canvas
          id="canvas"
          width={WIDTH}
          height={HEIGHT}
          ref={canvasRef}
          className="h-[280px] w-[280px] shadow-lg dark:shadow-gray-900 md:h-[400px] md:w-[400px]"
        />
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-25"
          onClick={() => {
            if (canvasRef.current) {
              downloadImage(`${name}.png`, canvasRef.current?.toDataURL());
            }
          }}
          disabled={!canvasRef.current}
        >
          {canvasRef.current ? "다운로드" : "준비 중..."}
        </button>
      </div>
      <form className="flex w-full flex-col gap-2 lg:w-80 [&_input]:border [&_input]:p-2 [&_label]:text-lg [&_label]:text-gray-500 [&_label]:dark:text-gray-300">
        <div className="flex flex-col">
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value as Item["name"])}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rarity">등급</label>
          <select
            className="unstyled rounded-none border bg-white p-2"
            id="rarity"
            value={rarity}
            onChange={(e) => setRarity(e.target.value as Item["rarity"])}
          >
            <option value="common">일반</option>
            <option value="uncommon">고급</option>
            <option value="rare">희귀</option>
            <option value="legendary">전설</option>
            <option value="exotic">경이</option>
          </select>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-1 flex-col">
            <label htmlFor="slot">타입</label>
            <select
              className="unstyled rounded-none border bg-white p-2"
              id="slot"
              value={slot}
              onChange={(e) => setSlot(e.target.value as Item["slot"])}
            >
              <option value="kinetic">물리</option>
              <option value="energy">에너지</option>
              <option value="power">파워</option>
            </select>
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="rarity">피해 유형</label>
            <select
              disabled={slot === "kinetic"}
              className="unstyled rounded-none border bg-white p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:dark:bg-gray-500"
              id="rarity"
              value={damageType}
              onChange={(e) =>
                setDamageType(e.target.value as Item["damageType"])
              }
            >
              <option value="arc">전기</option>
              <option value="solar">태양</option>
              <option value="void">공허</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="level">레벨</label>
          <input
            className="border bg-white p-2"
            id="level"
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">설명</label>
          <textarea
            className="border bg-white p-2"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
