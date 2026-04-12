import { convertToXYZ } from "@/lib/geo";

export function Marker({ lat, lon, radius, color = "#00ff88" }) {
  
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || !Number.isFinite(radius)) {
    return null;
  }

  const posBase = convertToXYZ(lat, lon, radius);

  return (
    <group position={posBase} onUpdate={(self) => self.lookAt(0, 0, 0)}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.15, 15]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.85} />
      </mesh>
    </group>
  );
}