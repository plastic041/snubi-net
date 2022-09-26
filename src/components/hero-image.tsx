import type { StaticImageData } from "next/future/image";
import Image from "next/future/image";

type HeroImageProps = {
  src: string | StaticImageData;
  alt: string;
};
const HeroImage = ({ src, alt }: HeroImageProps) => {
  return (
    <div className="flex overflow-hidden rounded shadow-lg">
      <Image
        className="scale-105 transform overflow-hidden"
        src={src}
        width={400}
        height={400}
        alt={alt}
      />
    </div>
  );
};

export default HeroImage;
