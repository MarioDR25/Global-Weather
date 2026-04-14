"use client"
import { Canvas } from "@react-three/fiber";
import { Globe } from "@/components/globe/Globe";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import {Loading } from "@/components/globe/Loading"

export default function Home() {
 
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas camera={{ position: [6, -2, 15], fov: 50 }}>
        <Suspense fallback={<Loading />}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 3, 5]} intensity={1.35} />
          <directionalLight position={[-4, -1, -5]} intensity={0.45} />
          <hemisphereLight args={["#b8c4ff", "#080820", 0.35]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <Globe/>
          <OrbitControls
              enablePan={false}
              rotateSpeed={0.2}
              zoomSpeed={0.6}
              minDistance={8}
              maxDistance={28}
              enableDamping={true}
            />
        </Suspense>
      </Canvas>
    </div>
  );
}

