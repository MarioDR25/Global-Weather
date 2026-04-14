"use client";
import { useLayoutEffect } from "react";
import { useTexture } from "@react-three/drei";
import { EARTH_RADIUS } from "./constants";
import * as THREE from "three";


export function Earth(props) {
  const [colorMap, normalMap, specularMap] = useTexture([
    "/textures/color_map.jpg", 
    "/textures/normal_map.png", 
    "/textures/specular_map.png"
  ]);

  useLayoutEffect(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    normalMap.colorSpace = THREE.NoColorSpace;
    specularMap.colorSpace = THREE.NoColorSpace;
  }, [colorMap, normalMap, specularMap]);

  return (
    <group>
      <mesh {...props}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial map={colorMap} normalMap={normalMap} roughnessMap={specularMap} metalness={0} roughness={1} />
      </mesh>

    </group>
  );
}
