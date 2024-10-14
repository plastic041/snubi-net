import {
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

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // https://poke-holo.simey.me/
  const glarePositionTemplate = useMotionTemplate`radial-gradient(farthest-corner circle at ${pointerX}px ${pointerY}px, hsla(0, 0%, 100%, 0.8) 10%, hsla(0, 0%, 100%, 0.65) 20%, hsla(0, 0%, 0%, 0.5) 90%)`;

  const rotateXSpring = useSpring(0, spring);
  const rotateYSpring = useSpring(0, spring);

  const rotateZSpring = useMotionValue(0);

  useAnimationFrame((time, _delta) => {
    if (ref.current === null) {
      return;
    }

    const rotateZ = Math.sin(time * 0.0012);

    rotateZSpring.set(rotateZ);
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

      const _rotateY = (mouseX / width - 0.5) * -30;
      const _rotateX = (mouseY / height - 0.5) * 30;

      pointerX.set(mouseX);
      pointerY.set(mouseY);
      rotateXSpring.set(_rotateX);
      rotateYSpring.set(_rotateY);
    };

    const handleMouseEnd = () => {
      rotateXSpring.set(0);
      rotateYSpring.set(0);
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
          rotateZ: rotateZSpring,
          display: "grid",
        }}
      >
        {/* <img
          src="/images/hero-kami.jpeg"
          width={WIDTH}
          height={HEIGHT}
          alt="턱시도 고양이 까미"
          style={{
            gridArea: "1 / 1",
          }}
        /> */}
        {children}
        <motion.div
          id="glare"
          whileHover={{ opacity: 1 }}
          style={{
            gridArea: "1 / 1",
            backgroundImage: glarePositionTemplate,
            opacity: 0,
            mixBlendMode: "overlay",
            width: WIDTH,
            height: HEIGHT,
          }}
        />
      </motion.div>
    </div>
  );
}
