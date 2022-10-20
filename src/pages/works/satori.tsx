// api.jsx
import { useEffect, useState } from "react";
import satori from "satori";
import Layout from "~/components/layout";

const Svg = async (name: string, desc: string) => {
  const font = await fetch("/noto-serif-kr-v20-latin_korean-regular.woff").then(
    (res) => res.arrayBuffer()
  );

  const s = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#222",
        color: "#fff",
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 36,
          height: 40,
        }}
      >
        {name}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          width: "100%",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              height: 140,
              width: 140,
              backgroundColor: "lightgreen",
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            wordBreak: "break-word",
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 8,
            fontSize: 16,
            lineHeight: 1.4,
            width: "100%",
            whiteSpace: "pre",
          }}
        >
          {desc}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              position: "absolute",
              paddingLeft: 8,
            }}
          >
            <div
              style={{
                borderBottomColor: "#666",
                borderBottomWidth: 1,
                width: "106%",
                top: 24,
              }}
            />
            <div
              style={{
                borderBottomColor: "#666",
                borderBottomWidth: 1,
                width: "106%",
                top: 44,
              }}
            />
            <div
              style={{
                borderBottomColor: "#666",
                borderBottomWidth: 1,
                width: "106%",
                top: 64,
              }}
            />
            <div
              style={{
                borderBottomColor: "#666",
                borderBottomWidth: 1,
                width: "106%",
                top: 84,
              }}
            />
            <div
              style={{
                borderBottomColor: "#666",
                borderBottomWidth: 1,
                width: "106%",
                top: 104,
              }}
            />
            <div
              style={{
                borderBottomColor: "#666",
                borderBottomWidth: 1,
                width: "106%",
                top: 124,
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    {
      // debug: true,
      width: 400,
      height: 200,
      fonts: [
        {
          name: "NanumSquareNeo",
          // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
          data: font,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  return s;
};

const SatoriPage = () => {
  const [svg, setSvg] = useState<string>("");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    Svg(name, desc).then(setSvg);

    // return () => {
    //   setSvg("");
    // };
  }, [name, desc]);

  return (
    <Layout title="Satori" description="Satori">
      <section className="flex flex-row justify-center gap-4 p-8">
        <div dangerouslySetInnerHTML={{ __html: svg }} />

        <form className="flex flex-col">
          <label className="flex flex-col">
            <span>이름</span>
            <input
              className="border px-2 py-1"
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
              placeholder="아이템 이름"
            />
          </label>
          <label className="flex flex-col">
            <span>설명</span>
            <textarea
              className="h-28 border px-2 py-1"
              onChange={(e) => setDesc(e.currentTarget.value)}
              value={desc}
              placeholder="아이템 설명"
            />
          </label>
        </form>
      </section>
    </Layout>
  );
};

export default SatoriPage;
