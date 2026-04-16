"use client";
import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { EARTH_RADIUS } from "./constants";
import * as THREE from "three";


export function Earth(props) {
  const [colorMap, normalMap, specularMap] = useTexture([
    "/textures/color_map.jpg", 
    "/textures/normal_map.png", 
    "/textures/specular_map.png"
  ]);

  const [preparedColorMap, preparedNormalMap, preparedSpecularMap] = useMemo(() => {
    const nextColorMap = colorMap.clone();
    const nextNormalMap = normalMap.clone();
    const nextSpecularMap = specularMap.clone();

    nextColorMap.colorSpace = THREE.SRGBColorSpace;
    nextNormalMap.colorSpace = THREE.NoColorSpace;
    nextSpecularMap.colorSpace = THREE.NoColorSpace;

    nextColorMap.needsUpdate = true;
    nextNormalMap.needsUpdate = true;
    nextSpecularMap.needsUpdate = true;

    return [nextColorMap, nextNormalMap, nextSpecularMap];
  }, [colorMap, normalMap, specularMap]);

  return (
    <group>
      <mesh {...props}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={preparedColorMap}
          normalMap={preparedNormalMap}
          roughnessMap={preparedSpecularMap}
          metalness={0}
          roughness={1}
        />
      </mesh>

    </group>
  );
}
