// NOTE From docs - https://github.com/pmndrs/react-three-fiber

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Color } from "three";
import packageJson from '../package.json';

const Box = () => {
  const meshRef = useRef(null);
  const { scene } = useThree();

  useEffect(() => {
    if (!scene) {
      return;
    }

    scene.background = new Color(0x880088);
  }, [scene]);

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotateX(0.01);
    meshRef.current.rotateY(0.01);
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 8, Math.PI / 4, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

export const R3fPreview = () => {
  return (
    <div className="r3f-canvas-wrapper">
      <div className="label">
        react-three-fiber {packageJson.devDependencies['@react-three/fiber']}
      </div>
      <Canvas>
        <hemisphereLight
          color={0xffffbb}
          groundColor={0x080820}
          intensity={0.5}
        />
        <Box />
      </Canvas>
    </div>
  );
};
