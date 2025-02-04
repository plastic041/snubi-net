/* eslint-disable react/no-unknown-property */

import { Canvas, useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { useControls } from "leva";
import { SoftShadows } from "@react-three/drei";

export function ThreePage() {
  const spotCtl = useControls("Spot Light", {
    intensity: 1,
    position: {
      x: 0,
      y: 2,
      z: 3,
    },
    castShadow: true,
    angle: 0.1,
    penumbra: 0,
  });

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <Canvas
        shadows
        camera={{
          position: [0, 0, 5],
          fov: 60,
        }}
      >
        <mesh position={[0, 0, 0]} scale={[20, 20, 1]} receiveShadow>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <Card />
        <SoftShadows size={100} samples={50} />
        <ambientLight intensity={1} />
        <pointLight color="salmon" position={[-1, 1, 2]} intensity={15} />
        <directionalLight
          shadow-mapSize={[2048, 2048]}
          castShadow={spotCtl.castShadow}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          position={[
            spotCtl.position.x,
            spotCtl.position.y,
            spotCtl.position.z,
          ]}
          color="white"
          intensity={spotCtl.intensity}
        />
      </Canvas>
    </div>
  );
}

function Card() {
  const { width, height } = useThree((state) => state.size);

  const [springs, api] = useSpring(
    () => ({
      rotation: [0, 0],
      position: [0, 0, 0.3],
      config: (key) => {
        switch (key) {
          case "rotation":
            return {
              mass: 1,
              friction: 25,
              tension: 1000,
            };
          case "position":
            return {
              mass: 1,
              friction: 25,
              tension: 1000,

              // mass: 1,
              // friction: 1000,
              // tension: 25,
            };
          default:
            return {};
        }
      },
    }),
    []
  );

  return (
    <animated.mesh
      castShadow
      onPointerMove={(e) => {
        const ROT_MULT = 0.3;
        const POS_MULT = 0.1;
        const x = (e.offsetX / width) * -2 + 1;
        const y = (e.offsetY / height) * -2 + 1;

        api.start({
          rotation: [y * ROT_MULT, x * ROT_MULT],
          position: [-x * POS_MULT, y * POS_MULT, 1],
        });
      }}
      onPointerLeave={() => {
        api.start({
          rotation: [0, 0],
          position: [0, 0, 0.3],
        });
      }}
      // @ts-expect-error: Spring type is Vector3 Type (Typescript return error on position)
      rotation={springs.rotation.to((x, y) => [x, y, 0])}
      position={springs.position.to((x, y, z) => [x, y, z])}
    >
      <boxGeometry args={[2, 2, 0.02]} />
      <meshStandardMaterial color="lightblue" />
    </animated.mesh>
  );
}
