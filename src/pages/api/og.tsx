import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(
  new URL("../../assets/Pretendard-Regular.otf", import.meta.url)
).then((res) => res.arrayBuffer());

const og = async () => {
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'pretendard'",
        }}
      >
        마작
      </div>
    ),
    {
      fonts: [
        {
          name: "Pretendard Variable",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
};

export default og;
