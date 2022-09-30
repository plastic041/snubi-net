import { useCallback, useEffect, useRef } from "react";
import Layout from "~/components/layout";
import {
  STRING_KR,
  DAMAGE_TYPE_COLORS,
  DAMAGE_TYPE_IMAGE_SRCS,
  WIDTH,
  HEIGHT,
  PX,
  PY,
  FONT_FAMILY,
  RARITY_COLORS,
} from "~/lib/constants/destiny-card";
import { useDestinyItemStore } from "~/stores/destiny-item";
import type { DamageType, Item, ItemRarity } from "~/typings/destiny-item";

const DestinyCardPage = () => {
  const item = useDestinyItemStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    const rarityKr = STRING_KR.rarity[item.rarity];

    // bg
    ctx.fillStyle = "#2a232b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // name, type, rarity bg
    ctx.fillStyle = RARITY_COLORS[item.rarity].bg;
    ctx.fillRect(0, 0, canvas.width, 86);

    // name
    ctx.fillStyle = RARITY_COLORS[item.rarity].name;
    ctx.font = `bold 2rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(item.name, PX, 40);

    // slot
    ctx.fillStyle = RARITY_COLORS[item.rarity].type;
    ctx.font = `1rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(STRING_KR.slot[item.slot], PX, 70);

    // rarity
    ctx.fillStyle = RARITY_COLORS[item.rarity].rarity;
    ctx.font = `1rem ${FONT_FAMILY}`;
    ctx.textAlign = "right";
    ctx.fillText(rarityKr, canvas.width - PX, 70);

    // level
    ctx.fillStyle = DAMAGE_TYPE_COLORS[item.damageType];
    ctx.font = `900 3rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(String(item.level), PX + 44, 140);

    // damage type image
    const damageTypeImage = new Image();
    damageTypeImage.src = DAMAGE_TYPE_IMAGE_SRCS[item.damageType];
    damageTypeImage.onload = () => {
      ctx.drawImage(damageTypeImage, PX, 104, 40, 40);
    };

    // description
    ctx.fillStyle = RARITY_COLORS[item.rarity].desc;
    ctx.font = `1rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";

    let line = "";
    let y = 174;

    const words = item.description.split(" ");
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > canvas.width - PX * 2 && i > 0) {
        ctx.fillText(line, PX, y);
        line = words[i] + " ";
        y += 20;

        if (y > canvas.height - PY * 2) {
          break;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, PX, y);
  }, [item]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    draw();
  }, [draw]);

  return (
    <Layout title="Destiny Card | snubi" description="Destiny Card">
      <div className="flex flex-col items-center justify-center gap-8 p-8 lg:flex-row lg:justify-between lg:gap-0">
        <canvas
          id="canvas"
          width={WIDTH}
          height={HEIGHT}
          ref={canvasRef}
          className="align-self-start shadow-lg dark:shadow-gray-900"
        />
        <form className="flex w-full flex-col gap-2 lg:w-80 [&_input]:border [&_input]:p-2 [&_label]:text-lg [&_label]:text-gray-500 [&_label]:dark:text-gray-300">
          <div className="flex flex-col">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              value={item.name}
              onChange={(e) => item.setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="rarity">등급</label>
            <select
              className="border p-2"
              id="rarity"
              value={item.rarity}
              onChange={(e) => item.setRarity(e.target.value as Item["rarity"])}
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
                className="border p-2"
                id="slot"
                value={item.slot}
                onChange={(e) => item.setSlot(e.target.value as Item["slot"])}
              >
                <option value="kinetic">물리</option>
                <option value="energy">에너지</option>
                <option value="power">파워</option>
              </select>
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="rarity">피해 유형</label>
              <select
                disabled={item.slot === "kinetic"}
                className="border p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:dark:bg-gray-500"
                id="rarity"
                value={item.damageType}
                onChange={(e) =>
                  item.setDamageType(e.target.value as Item["damageType"])
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
              id="level"
              type="number"
              value={item.level}
              onChange={(e) => item.setLevel(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">설명</label>
            <textarea
              className="border p-2"
              id="description"
              value={item.description}
              onChange={(e) => item.setDescription(e.target.value)}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DestinyCardPage;
