import { useCallback, useEffect, useRef, useState } from "react";
import {
  WIDTH,
  HEIGHT,
  PX,
  PY,
  FONT_FAMILY,
  DESCRIPTION_COLOR,
  NAME_COLOR,
  BG_SRC,
} from "~/lib/constants/souls-card";
import { downloadImage } from "~/lib/download-image";

type Item = {
  name: string;
  description: string;
};

const BROKEN_STRAIGHT_SWORD: Item = {
  name: "부러진 직검",
  description: `날이 중간부터 부러져 없어진 직검

무기로서 눈여겨 볼 곳은 아무것도 없으며 제정신을 잃은 망자라도 되지 않은 이상에야 사용하는 이 따위는 없을 것이다.`,
};

export const SoulsCard = () => {
  const [name, setName] = useState(BROKEN_STRAIGHT_SWORD.name as Item["name"]);
  const [description, setDescription] = useState(
    BROKEN_STRAIGHT_SWORD.description as Item["description"]
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [bgImage, setBgImage] = useState<HTMLImageElement>();

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const draw = useCallback(async () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!(canvas && ctx)) {
      return;
    }

    ctx.textBaseline = "alphabetic";

    ctx.fillStyle = "#666";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // bg
    if (bgImage) {
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    } else {
      const img = new Image();
      img.src = BG_SRC;
      img.onload = () => {
        setBgImage(img);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }

    // name
    ctx.fillStyle = NAME_COLOR;
    ctx.font = `bold 2.6rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.fillText(name, PX, PY + 36);

    // description
    ctx.fillStyle = DESCRIPTION_COLOR;
    ctx.font = `2rem ${FONT_FAMILY}`;
    ctx.textAlign = "left";

    let y = PY + 180;

    const paragraphs = description.split("\n");
    for (let i = 0; i < paragraphs.length; i++) {
      const words = paragraphs[i].split(" ");
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const testLine = `${line}${words[i]} `;
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > canvas.width - PX * 2 && i > 0) {
          ctx.fillText(line, PX, y);
          line = `${words[i]} `;
          y += 50;

          if (y > canvas.height - PY * 2) {
            break;
          }
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, PX, y);
      y += 50;
    }
  }, [bgImage, description, name]);

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
    <div className="flex flex-col items-center justify-center gap-8 p-8 font-serif lg:flex-row lg:gap-12">
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">설명</label>
          <textarea
            className="h-40 border bg-white p-2"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
