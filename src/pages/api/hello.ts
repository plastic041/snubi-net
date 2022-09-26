import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

const IMAGE_SIZE = 64;
const TILE_SIZE = 8;
const PALETTE = ["#2b2d42", "#8d99ae", "#edf2f4", "#ef233c", "#d90429"];
const getRandColor = (): string =>
  PALETTE[Math.floor(Math.random() * PALETTE.length)];

type MakeImageOptions = {
  imageSize?: number;
  tileSize?: number;
};
const makeImage = async ({
  imageSize = IMAGE_SIZE,
  tileSize = TILE_SIZE,
}: MakeImageOptions) => {
  const gridSize = imageSize / tileSize;

  const compositeImages = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const image: sharp.OverlayOptions = {
        input: {
          create: {
            width: tileSize,
            height: tileSize,
            channels: 3,
            background: getRandColor(),
          },
        },
        top: y * tileSize,
        left: x * tileSize,
      };
      compositeImages.push(image);
    }
  }

  // make a checkerboard image
  const image = await sharp({
    create: {
      width: imageSize,
      height: imageSize,
      channels: 3,
      background: "#ffffffff",
    },
  })
    .composite(compositeImages)
    // resize image
    .png()
    .toBuffer()
    .then((d) =>
      sharp(d)
        .resize({
          width: 256,
          height: 256,
          kernel: sharp.kernel.nearest,
        })
        .toBuffer()
    );

  return image;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer | { error: string }>
) {
  const { imageSize, tileSize } = req.query;

  const imageBuffer = await makeImage({
    imageSize: imageSize ? parseInt(imageSize as string) : undefined,
    tileSize: tileSize ? parseInt(tileSize as string) : undefined,
  });

  res.setHeader("Content-Type", "image/png");
  res.status(200).send(imageBuffer);
}
