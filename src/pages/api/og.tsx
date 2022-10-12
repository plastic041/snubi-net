import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const og = async () => {
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
          fontWeight: "50",
        }}
      >
        아무 말 대잔치
      </div>
    )
  );
};

export default og;
