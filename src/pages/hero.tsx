// https://poke-holo.simey.me/
import {
  easeOut,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const WIDTH = 351;
const HEIGHT = 468;

const spring = {
  type: "spring",
  stiffness: 1000,
  damping: 30,
} as const;

type HeroProps = {
  children: ReactNode;
};
export function Hero({ children }: HeroProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const mousePercentX = useMotionValue(0);
  const mousePercentY = useMotionValue(0);
  const translateX = useSpring(0, spring);
  const translateY = useSpring(0, spring);

  const overlayTemplate = useMotionTemplate`
radial-gradient(
  circle 300px at ${mousePercentX}% ${mousePercentY}%,
  #d8d8d8, #9d9d9d, #666666, #343434, #000000
),
url("/images/gradient.jpg")
`;
  const glareTemplate = useMotionTemplate`radial-gradient(
  circle 600px at ${mousePercentX}% ${mousePercentY}%,
  #fff 0%, 46%, #ccc 69% 69%
)`;
  const overlayPositionTemplate = useMotionTemplate`center, ${mousePercentX}% -${mousePercentY}%`;

  const overlayOpacity = useSpring(0);

  const rotateXSpring = useSpring(0, spring);
  const rotateYSpring = useSpring(0, spring);
  const rotateZ = useMotionValue(0);

  useAnimationFrame((time, _delta) => {
    if (ref.current === null) {
      return;
    }

    const _rotateZ = Math.sin(time * 0.0012);

    rotateZ.set(_rotateZ);
  });

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const element = ref.current;
      if (!element) {
        return;
      }

      const { clientX, clientY } = event;
      const { left, top, width, height } = element.getBoundingClientRect();
      const mouseX = clientX - left;
      const mouseY = clientY - top;

      const percentX = mouseX / width;
      const percentY = mouseY / height;

      const _rotateY = (percentX - 0.5) * -30;
      const _rotateX = (percentY - 0.5) * 30;

      const _mousePercentX = percentX * 100;
      const _mousePercentY = percentY * 100;

      rotateXSpring.set(_rotateX);
      rotateYSpring.set(_rotateY);

      mousePercentX.set(_mousePercentX);
      mousePercentY.set(_mousePercentY);

      const MAX = 30;

      translateX.set(easeOut(percentX) * MAX);
      translateY.set(easeOut(percentY) * MAX);

      overlayOpacity.set(0.8);
    };

    const handleMouseEnd = () => {
      rotateXSpring.set(0);
      rotateYSpring.set(0);
      overlayOpacity.set(0);
      translateX.set(0);
      translateY.set(0);
    };

    const element = ref.current;
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseEnd);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseEnd);
    };
  });

  return (
    <div
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        width: WIDTH,
        height: HEIGHT,
      }}
    >
      <motion.div
        className="rounded-md overflow-hidden"
        ref={ref}
        whileHover={{
          scale: 1.1,
          boxShadow: `0px 0.9px 2.2px rgba(0, 0, 0, 0.062),
0px 2.1px 5.3px rgba(0, 0, 0, 0.089),
0px 4px 10px rgba(0, 0, 0, 0.11),
0px 7.1px 17.9px rgba(0, 0, 0, 0.131),
0px 13.4px 33.4px rgba(0, 0, 0, 0.158),
0px 32px 80px rgba(0, 0, 0, 0.22)`,
        }}
        transition={spring}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          rotateZ: rotateZ,
          x: translateX,
          y: translateY,
          display: "grid",
        }}
      >
        {children}
        <motion.div
          id="glare"
          style={{
            backgroundImage: glareTemplate,
            width: "100%",
            height: "100%",
            gridArea: "1 / 1",
            objectFit: "cover",
            backgroundBlendMode: "multiply",
            mixBlendMode: "multiply",
            opacity: overlayOpacity,
          }}
        />
        <motion.div
          id="foil"
          style={{
            backgroundImage: overlayTemplate,
            width: "100%",
            height: "100%",
            gridArea: "1 / 1",
            backgroundSize: "100%, 200%",
            backgroundBlendMode: "multiply, screen",
            mixBlendMode: "color-dodge",
            backgroundPosition: overlayPositionTemplate,
            opacity: overlayOpacity,
          }}
        />
      </motion.div>
    </div>
  );
}
