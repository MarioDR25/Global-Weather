import { Earth } from "./Earth";
import { Marker } from "./Marker";
import { MARKER_SURFACE_RADIUS } from "./constants";

export function Globe() {
  return (
    <group>
      <Earth />
      <Marker lat={7.11} lon={-73.12} radius={MARKER_SURFACE_RADIUS} color="#EF4444" />
    </group>
  );
}