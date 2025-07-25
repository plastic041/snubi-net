import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

export function ThreePage() {
  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <Canvas
        shadows
        camera={{
          position: [0, 0, 5],
          fov: 60,
        }}
      >
        <ThreeScene />

        <OrbitControls />
      </Canvas>
    </div>
  );
}

const holographicVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const holographicFragmentShader = `
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

function ThreeScene() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const texture = useLoader(THREE.TextureLoader, "/images/hero-kami.jpeg");

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uOpacity: { value: 1.0 },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

    const mouseX = (pointer.x + 1) / 2; // Convert from -1,1 to 0,1
    const mouseY = (pointer.y + 1) / 2;

    materialRef.current.uniforms.uMouse.value.set(mouseX, mouseY);
  });

  return (
    <group>
      <mesh>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      <mesh position={[0, 0, 0.01]} rotation={[0, 0, 0]}>
        <planeGeometry args={[3, 4]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={holographicVertexShader}
          fragmentShader={holographicFragmentShader}
          uniforms={uniforms}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false} // Added for best practice
        />
      </mesh>
    </group>
  );
}
