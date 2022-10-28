"use client";

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
} from "./contants";
import { downloadImage } from "./download-image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDestinyItemStore } from "~/stores/destiny-item";

export const CardCanvas = () => {
  const item = useDestinyItemStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imageCache, setImageCache] = useState<
    Record<string, HTMLImageElement>
  >({});

  const isFirstRender = useRef(true);

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    const rarityKr = STRING_KR.rarity[item.rarity];

    ctx.textBaseline = "alphabetic";

    // bg
    ctx.fillStyle = "#2a232b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // name, type, rarity bg
    ctx.fillStyle = RARITY_COLORS[item.rarity].bg;
    ctx.fillRect(0, 0, canvas.width, 170);

    // name
    ctx.fillStyle = RARITY_COLORS[item.rarity].name;
    ctx.font = `bold 4.4rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(item.name, PX, PY + 56);

    // slot
    ctx.fillStyle = RARITY_COLORS[item.rarity].type;
    ctx.font = `2.4rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(STRING_KR.slot[item.slot], PX, PY + 110);

    // rarity
    ctx.fillStyle = RARITY_COLORS[item.rarity].rarity;
    ctx.font = `2.4rem ${FONT_FAMILY}`;
    ctx.textAlign = "right";
    ctx.fillText(rarityKr, canvas.width - PX, PY + 110);

    // level
    ctx.fillStyle = DAMAGE_TYPE_COLORS[item.damageType];
    ctx.font = `900 7rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(String(item.level), PX + 96, PY + 260);

    // damage type image
    const damageTypeImage = imageCache[DAMAGE_TYPE_IMAGE_SRCS[item.damageType]];
    if (damageTypeImage) {
      ctx.drawImage(damageTypeImage, PX, PY + 178, 86, 86);
    } else {
      const damageTypeImage = new Image();
      damageTypeImage.src = DAMAGE_TYPE_IMAGE_SRCS[item.damageType];
      damageTypeImage.onload = () => {
        setImageCache((prev) => ({
          ...prev,
          [DAMAGE_TYPE_IMAGE_SRCS[item.damageType]]: damageTypeImage,
        }));
        ctx.drawImage(damageTypeImage, PX, PY + 178, 86, 86);
      };
    }

    // description
    ctx.fillStyle = RARITY_COLORS[item.rarity].desc;
    ctx.font = `2.2rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";

    let line = "";
    let y = PY + 332;

    const words = item.description.split(" ");
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > canvas.width - PX * 2 && i > 0) {
        ctx.fillText(line, PX, y);
        line = words[i] + " ";
        y += 44;

        if (y > canvas.height - PY * 2) {
          break;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, PX, y);
  }, [item, imageCache]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;

      const ready = async () => {
        const font = new FontFace(
          FONT_FAMILY,
          "url(https://cdn.jsdelivr.net/gh/orioncactus/pretendard/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2) format('woff2-variations')",
          {
            style: "normal",
            weight: "45 920",
            display: "swap",
          }
        );

        await font.load();

        document.fonts.add(font);
      };

      ready().then(draw);
    } else {
      draw();
    }
  }, [draw]);

  return (
    <>
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
              downloadImage(`${item.name}.png`, canvasRef.current?.toDataURL());
            }
          }}
          disabled={!canvasRef.current}
        >
          {canvasRef.current ? "다운로드" : "준비 중..."}
        </button>
      </div>
    </>
  );
};
