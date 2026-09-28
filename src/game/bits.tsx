import { useMemo } from "react";
import type { Material } from "three";
import { labelSprite } from "./draw";

export function Solid({
  position,
  args,
  material,
  cast,
  receive,
  rotation,
}: {
  position: [number, number, number];
  args: [number, number, number];
  material: Material;
  cast?: boolean;
  receive?: boolean;
  rotation?: [number, number, number];
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      material={material}
      castShadow={cast}
      receiveShadow={receive}
      dispose={null}
    >
      <boxGeometry args={args} />
    </mesh>
  );
}

export function HoloLabel({
  text,
  position,
  color = "#c5e7f4",
}: {
  text: string;
  position: [number, number, number];
  color?: string;
}) {
  const sprite = useMemo(() => labelSprite(text, color), [text, color]);
  return (
    <sprite position={position} scale={[sprite.w, sprite.h, 1]} renderOrder={2}>
      <spriteMaterial map={sprite.tex} transparent depthWrite={false} toneMapped={false} />
    </sprite>
  );
}
