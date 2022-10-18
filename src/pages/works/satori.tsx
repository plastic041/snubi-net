// api.jsx
import { useEffect, useState } from "react";
import satori from "satori";
import Layout from "~/components/layout";

const Svg = async () => {
  const font = await fetch(
    "https://cdn.jsdelivr.net/gh/eunchurn/NanumSquareNeo@0.0.2/ttf/NanumSquareNeo-bRg.ttf"
  ).then((res) => res.arrayBuffer());

  const s = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 200,
        height: 400,
        backgroundColor: "lightgreen",
      }}
    >
      <div
        style={{
          backgroundColor: "red",
          display: "flex",
          flexWrap: "wrap",
          width: 200,
        }}
      >
        hhellohellohellohellohellohellohellohellohellohelloellohellohellohellohello
      </div>
      <div style={{ backgroundColor: "salmon" }}>world</div>
    </div>,
    {
      width: 200,
      height: 400,
      fonts: [
        {
          name: "Inter",
          // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
          data: font,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  console.log(s);

  return s;
};

const SatoriPage = () => {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    Svg().then(setSvg);

    return () => {
      setSvg("");
    };
  }, []);

  return (
    <Layout title="Satori" description="Satori">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </Layout>
  );
};

export default SatoriPage;
