import { Html } from "@react-three/drei";

export function Loading() {
  return (
    <Html fullscreen wrapperClass="globe-loading-html" pointerEvents="none">
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-black text-neutral-200">
        <div
          className="h-15 w-15 animate-spin rounded-full border-2 border-white/25 border-t-white"
          aria-hidden
        />
        <p className="text-xl font-bold text-sky-600 text-shadow-2xs text-shadow-sky-100 tracking-wide">Cargando.....</p>
      </div>
    </Html>
  );
}
