import { m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "~/components/layout";

const WIDTH = 400;
const HEIGHT = 600;
const PX = 20;
const PY = 20;
const FONT_FAMILY = "pretendard variable";

const COLORS = {
  common: "일반",
  uncommon: "고급",
  rare: "희귀",
  exotic: "#ceae35",
  legendary: "#522f65",
} as const;

const KR = {
  rarity: {
    common: "일반",
    uncommon: "고급",
    rare: "희귀",
    legendary: "전설",
    exotic: "경이",
  },
};

type Rarity = "common" | "uncommon" | "rare" | "legendary" | "exotic";

type Item = {
  name: string;
  level: number;
  type: string;
  rarity: Rarity;
  description: string;
};
const DestinyCardPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [item, setItem] = useState<Item>({
    name: "무기 이름",
    level: 100,
    type: "근접 무기",
    rarity: "legendary",
    description:
      "여왕의 하빈저가 남긴 자취가 아직도 토성의 위성들 사이를 떠도는군요.",
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    const { name, level, type, rarity, description } = item;

    const rarityKr = KR.rarity[rarity];

    // bg
    ctx.fillStyle = "#2a232b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // name, type, rarity bg
    ctx.fillStyle = COLORS[item.rarity];
    ctx.fillRect(0, 0, canvas.width, 86);

    // name
    ctx.fillStyle = "#fff";
    ctx.font = `bold 2rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(item.name, PX, 40);

    // type
    ctx.fillStyle = "#fffb";
    ctx.font = `1rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(item.type, PX, 70);

    // rarity
    ctx.fillStyle = "#fff4";
    ctx.font = `1rem ${FONT_FAMILY}`;
    ctx.textAlign = "right";
    ctx.fillText(rarityKr, canvas.width - PX, 70);

    // level
    ctx.fillStyle = "#a47cba";
    ctx.font = `900 3rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(String(item.level), PX, 140);

    // description
    ctx.fillStyle = "#fffc";
    ctx.font = `1rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";

    let line = "";
    let y = 170;

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

    // ctx.fillStyle = "#fffc";
    // ctx.font = `italic 1rem ${FONT_FAMILY}`;
    // ctx.textAlign = "left";
    // ctx.fillText(item.description, PX, 170);
  }, [item]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    draw();
  }, [draw]);

  return (
    <Layout title="Destiny Card | snubi" description="Destiny Card">
      <div>
        <canvas id="canvas" width={WIDTH} height={HEIGHT} ref={canvasRef} />
      </div>
    </Layout>
  );
};

export default DestinyCardPage;
