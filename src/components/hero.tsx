import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const WIDTH = 300;
const HEIGHT = 400;
const MAX_FOLLOW_DISTANCE = 0.15;

type HeroProps = {
  imageSrc: string;
};

export function Hero({ imageSrc }: HeroProps) {
  return <HeroCardThree imageSrc={imageSrc} />;
}

function HeroCard3D({ imageSrc }: HeroProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const targetScale = useRef(1);

  const texture = useLoader(THREE.TextureLoader, imageSrc);

  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Corrected Fragment Shader
  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uOpacity;
    varying vec2 vUv;
    
    void main() {
      vec2 center = uMouse;
      float dist = distance(vUv, center);
      
      // Radial gradient for glare effect
      float glare = 1.0 - smoothstep(0.0, 0.8, dist);
      glare = pow(glare, 2.0);
      
      // Holographic rainbow effect
      float angle = atan(vUv.y - center.y, vUv.x - center.x);
      float rainbow = sin(angle * 3.0 + uTime * 2.0) * 0.5 + 0.5;
      
      // Create holographic colors
      vec3 holo1 = vec3(1.0, 0.2, 0.8); // Pink
      vec3 holo2 = vec3(0.2, 0.8, 1.0); // Cyan
      vec3 holo3 = vec3(0.8, 1.0, 0.2); // Yellow-green
      
      vec3 holoColor = mix(holo1, holo2, rainbow);
      holoColor = mix(holoColor, holo3, sin(rainbow * 2.0) * 0.5 + 0.5);
      
      // Add shimmer waves
      float shimmer = sin(uTime * 3.0 + vUv.x * 15.0 + vUv.y * 10.0) * 0.3 + 0.7;
      
      // Combine effects - Apply uOpacity to the color
      vec3 finalColor = holoColor * shimmer * glare * uOpacity;
      float alpha = glare * uOpacity;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const materialUniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uOpacity: { value: 1.0 },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current || !materialRef.current) return;

    const time = clock.getElapsedTime();

    // Subtle rotation animation
    targetRotation.current.z = Math.sin(time * 0.7) * 0.02;

    // Mouse interaction
    if (isHovered) {
      const mouseX = (pointer.x + 1) / 2; // Convert from -1,1 to 0,1
      const mouseY = (pointer.y + 1) / 2;

      targetRotation.current.y = (mouseX - 0.5) * -0.5;
      targetRotation.current.x = (mouseY - 0.5) * 0.5;

      targetPosition.current.x = (mouseX - 0.5) * MAX_FOLLOW_DISTANCE;
      targetPosition.current.y = (mouseY - 0.5) * MAX_FOLLOW_DISTANCE;

      materialRef.current.uniforms.uMouse.value.set(mouseX, mouseY);
      materialRef.current.uniforms.uOpacity.value = 0.8;
    } else {
      targetRotation.current.x = 0;
      targetRotation.current.y = 0;
      targetPosition.current.x = 0;
      targetPosition.current.y = 0;

      materialRef.current.uniforms.uOpacity.value = 0;
    }

    if (isHovered || isPressed) {
      targetScale.current = 1.1;
    } else {
      targetScale.current = 1;
    }

    // Smooth interpolation (Lerp)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.1
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      0.1
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotation.current.z,
      0.1
    );

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetPosition.current.x,
      0.1
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetPosition.current.y,
      0.1
    );

    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale.current, 0.1)
    );

    // Update shader uniforms
    materialRef.current.uniforms.uTime.value = time;
  });

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  const handlePointerDown = () => {
    setIsPressed(true);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  return (
    <group
      ref={groupRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Image texture layer */}
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Holographic overlay */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3, 4]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          uniforms={materialUniforms}
        />
      </mesh>
    </group>
  );
}

function HeroCardThree({ imageSrc }: HeroProps) {
  return (
    <div style={{ width: WIDTH, height: HEIGHT, position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <HeroCard3D imageSrc={imageSrc} />
      </Canvas>
    </div>
  );
}
