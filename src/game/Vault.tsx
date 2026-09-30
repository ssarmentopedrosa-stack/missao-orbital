import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { HoloLabel, Solid } from "./bits";
import { M } from "./materials";
import { sim } from "./sim";
import { CORE, DIAL, HATCH, HOIST, TRACK, vault } from "./vault";

export function Vault() {
  const hoist = useRef<Group>(null);
  const arm = useRef<Group>(null);
  const cart = useRef<Mesh>(null);
  const core = useRef<MeshStandardMaterial>(null);
  const drop = useRef<Mesh>(null);
  const screen = useMemo(() => M.emit.clone(), []);

  useFrame(() => {
    if (hoist.current) hoist.current.position.y = vault.active ? vault.y : 1.2;
    if (arm.current) arm.current.rotation.z = ((vault.angle || 0) * Math.PI) / 180;
    if (cart.current) cart.current.position.x = TRACK.x - 1.2 + Math.min(2.4, vault.cartX * 0.4);
    if (drop.current) drop.current.position.y = 0.35 + (vault.goal === "fall" || vault.goal === "friction" ? vault.h * 0.55 : 2.4);
    if (core.current) {
      const live = sim.stage === 3 && vault.active;
      core.current.emissiveIntensity = live ? 0.25 + vault.modules * 0.22 : 0.05;
    }
    screen.emissive.set(vault.goal === "done" ? "#8fd0a8" : "#e0a23a");
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[20, 0, -56]} receiveShadow material={M.floor} dispose={null}>
        <planeGeometry args={[16, 16]} />
      </mesh>
      <Solid position={[20, 2.1, -63.9]} args={[16, 4.2, 0.28]} material={M.hull} />
      <Solid position={[20, 2.1, -48.1]} args={[16, 4.2, 0.28]} material={M.hullDark} />
      <Solid position={[12.35, 2.1, -60.6]} args={[0.28, 4.2, 6.4]} material={M.hull} />
      <Solid position={[12.35, 2.1, -51.2]} args={[0.28, 4.2, 6.2]} material={M.hull} />
      <Solid position={[27.85, 2.1, -56]} args={[0.28, 4.2, 15.6]} material={M.hull} />
      <Solid position={[HATCH.x, 1.15, HATCH.z]} args={[0.35, 2.1, 1.3]} material={M.stripe} />
      <HoloLabel text="ESCOTILHA TRAVADA" position={[HATCH.x, 2.45, HATCH.z]} />
      <group position={[HOIST.x, 0, HOIST.z]}>
        <Solid position={[0, 4.2, 0]} args={[0.12, 7.2, 0.12]} material={M.hull} />
        <group ref={hoist}>
          <mesh material={M.suitBlue} dispose={null} castShadow>
            <boxGeometry args={[0.9, 0.7, 0.9]} />
          </mesh>
        </group>
      </group>
      <HoloLabel text="GUINCHO" position={[HOIST.x, 3.3, HOIST.z + 0.8]} />
      <group position={[DIAL.x, 1.15, DIAL.z]}>
        <mesh material={M.dark} dispose={null}>
          <cylinderGeometry args={[0.55, 0.55, 0.08, 20]} />
        </mesh>
        <group ref={arm} position={[0, 0.08, 0]}>
          <mesh position={[0.38, 0, 0]} material={M.emit} dispose={null}>
            <boxGeometry args={[0.7, 0.06, 0.06]} />
          </mesh>
        </group>
      </group>
      <HoloLabel text="ÂNGULO θ" position={[DIAL.x, 2.1, DIAL.z]} />
      <group position={[TRACK.x, 0.35, TRACK.z]}>
        <mesh material={M.hull} dispose={null}>
          <boxGeometry args={[3.2, 0.08, 0.35]} />
        </mesh>
        <mesh ref={cart} position={[-1.2, 0.28, 0]} material={M.suit} dispose={null} castShadow>
          <boxGeometry args={[0.45, 0.35, 0.4]} />
        </mesh>
      </group>
      <HoloLabel text="TRILHO" position={[TRACK.x, 1.5, TRACK.z]} />
      <mesh ref={drop} position={[24.1, 2.4, -56]} material={M.stripe} dispose={null}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
      </mesh>
      <mesh position={[CORE.x, 1.15, CORE.z]} dispose={null}>
        <cylinderGeometry args={[0.55, 0.7, 1.5, 16]} />
        <meshStandardMaterial ref={core} color="#123044" emissive="#7eb8cc" emissiveIntensity={0.08} roughness={0.35} metalness={0.45} />
      </mesh>
      <mesh position={[CORE.x, 1.7, CORE.z + 0.72]} material={screen} dispose={null}>
        <planeGeometry args={[0.7, 0.28]} />
      </mesh>
      <HoloLabel text="NÚCLEO" position={[CORE.x, 2.35, CORE.z]} />
      <pointLight position={[20, 3.2, -56]} color="#9fd4e6" intensity={0.7} distance={16} decay={2} />
    </group>
  );
}
