import Head from "next/head";
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

    ctx.textBaseline = "top";

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
    ctx.fillText(item.name, PX, PY);

    // slot
    ctx.fillStyle = RARITY_COLORS[item.rarity].type;
    ctx.font = `2.4rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(STRING_KR.slot[item.slot], PX, 110);

    // rarity
    ctx.fillStyle = RARITY_COLORS[item.rarity].rarity;
    ctx.font = `2.4rem ${FONT_FAMILY}`;
    ctx.textAlign = "right";
    ctx.fillText(rarityKr, canvas.width - PX, 110);

    // level
    ctx.fillStyle = DAMAGE_TYPE_COLORS[item.damageType];
    ctx.font = `900 7rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(String(item.level), PX + 96, 204);

    // damage type image
    const damageTypeImage = new Image();
    damageTypeImage.src = DAMAGE_TYPE_IMAGE_SRCS[item.damageType];
    damageTypeImage.onload = () => {
      ctx.drawImage(damageTypeImage, PX, 210, 86, 86);
    };

    // description
    ctx.fillStyle = RARITY_COLORS[item.rarity].desc;
    ctx.font = `2.2rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";

    let line = "";
    let y = 340;

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
  }, [item]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    draw();
  }, [draw]);

  return (
    <Layout title="Destiny Card | snubi" description="Destiny Card">
      <Head>
        <meta name="title" content="데스티니 무기 카드 생성기" />
        <meta
          name="description"
          content="데스티니 무기 카드를 생성하는 웹 도구입니다."
        />
        <meta name="copyright" content="snubi" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://snubi-net.vercel.app/works/destiny-card"
        />
        <meta property="og:title" content="데스티니 무기 카드 생성기" />
        <meta
          property="og:description"
          content="데스티니 무기 카드를 생성하는 웹 도구입니다."
        />
        <meta
          property="og:image"
          content="https://snubi-net.vercel.app/images/destiny-card/open-image.jpg"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://snubi-net.vercel.app/works/destiny-card"
        />
        <meta property="twitter:title" content="데스티니 무기 카드 생성기" />
        <meta
          property="twitter:description"
          content="데스티니 무기 카드를 생성하는 웹 도구입니다."
        />
        <meta
          property="twitter:image"
          content="https://snubi-net.vercel.app/images/destiny-card/open-image.jpg"
        />
      </Head>
      <div className="flex flex-col items-center justify-center gap-8 p-8 lg:flex-row lg:gap-12">
        <canvas
          id="canvas"
          width={WIDTH}
          height={HEIGHT}
          ref={canvasRef}
          className="h-[280px] w-[280px] shadow-lg dark:shadow-gray-900 md:h-[400px] md:w-[400px]"
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
