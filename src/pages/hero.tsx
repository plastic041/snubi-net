import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WIDTH = 351;
const HEIGHT = 468;

const spring = {
  type: "spring",
  stiffness: 1000,
  damping: 30,
} as const;

const IDLE_DISTANCE = 6;

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isIdle, setIsIdle] = useState(true);
  const idleDegree = useMotionValue(0);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glarePositionTemplate = useMotionTemplate`radial-gradient(farthest-corner circle at ${pointerX}px ${pointerY}px, hsla(0, 0%, 100%, 0.8) 10%, hsla(0, 0%, 100%, 0.65) 20%, hsla(0, 0%, 0%, 0.5) 90%)`;

  const rotateXSpring = useSpring(0, spring);
  const rotateYSpring = useSpring(0, spring);

  useAnimationFrame((_time, delta) => {
    if (ref.current === null || !isIdle) {
      return;
    }

    const _rotateX = Math.sin(idleDegree.get()) * IDLE_DISTANCE;
    const _rotateY = Math.cos(idleDegree.get()) * IDLE_DISTANCE;

    idleDegree.set(idleDegree.get() + delta / 2000);
    rotateXSpring.set(_rotateX);
    rotateYSpring.set(_rotateY);

    // ref.current.style.transform = `rotateX(${}deg) rotateY(${_rotateY}deg)`;
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

      setIsIdle(false);
      pointerX.set(mouseX);
      pointerY.set(mouseY);
      rotateXSpring.set(_rotateX);
      rotateYSpring.set(_rotateY);
    };

    const handleMouseEnd = () => {
      rotateXSpring.set(0);
      rotateYSpring.set(0);
      setTimeout(() => {
        setIsIdle(true);
      }, 1000);
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
        ref={ref}
        whileHover={{ scale: 1.1 }}
        transition={spring}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          display: "grid",
        }}
      >
        <img
          src="/images/hero-kami.jpeg"
          width={WIDTH}
          height={HEIGHT}
          alt="메롱하는 귀여운 턱시도 고양이, 유화"
          className="rounded-md"
          style={{
            gridArea: "1 / 1",
          }}
        />
        <motion.div
          id="glare"
          whileHover={{ opacity: 1 }} //Change the opacity of glare when hovering
          animate={{
            "--pointer-x": pointerX.get(),
            "--pointer-y": pointerY.get(),
          }}
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
