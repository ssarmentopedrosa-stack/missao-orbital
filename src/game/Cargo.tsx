import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh, PointLight } from "three";
import { HoloLabel, Solid } from "./bits";
import { plateTexture } from "./draw";
import { elevator, GRAV, LOADS, SHAFT } from "./elevator";
import { M } from "./materials";
import { sim } from "./sim";

export function Cargo() {
  const car = useRef<Group>(null);
  const cable = useRef<Mesh>(null);
  const alarmL = useRef<PointLight>(null);
  const alarmR = useRef<PointLight>(null);
  const drum = useRef<Mesh>(null);
  const pick = useRef<Mesh>(null);
  const plate = useMemo(() => plateTexture("NEWTON-1"), []);
  const mission = useMemo(() => plateTexture("DINÂMICA"), []);
  const screen = useMemo(() => M.emit.clone(), []);

  useFrame((_, dt) => {
    const y = elevator.active ? elevator.y : 2.55;
    if (car.current) car.current.position.y = y;
    if (cable.current) {
      const top = 10.6;
      const hook = y + 0.72;
      const len = Math.max(0.3, top - hook);
      cable.current.scale.y = len;
      cable.current.position.y = hook + len / 2;
      const tension = 0.02 + Math.min(0.03, elevator.tension / 60000);
      cable.current.scale.x = tension / 0.025;
      cable.current.scale.z = tension / 0.025;
    }
    if (drum.current) drum.current.rotation.x += elevator.v * dt * 1.6;
    if (pick.current) {
      const load = LOADS.find((item) => item.id === elevator.loadId);
      pick.current.visible = Boolean(load);
      if (load) pick.current.position.set(load.x, 0.05, load.z);
    }
    screen.emissive.set(elevator.alarm ? "#e07a4a" : elevator.v > 0.2 ? "#8fd0a8" : elevator.v < -0.2 ? "#e0a23a" : "#7eb8cc");
    const flash = elevator.alarm ? 1.2 + Math.sin(sim.time * 14) * 1.6 : 0.12;
    if (alarmL.current) alarmL.current.intensity = flash;
    if (alarmR.current) alarmR.current.intensity = flash;
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -56]} receiveShadow material={M.floor} dispose={null}>
        <planeGeometry args={[11.2, 14.6]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -58.2]} material={M.lane} dispose={null}>
        <ringGeometry args={[1.15, 1.45, 28]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 4.35, -56]} material={M.hullDark} dispose={null}>
        <planeGeometry args={[11, 14.4]} />
      </mesh>

      <Solid position={[-5.52, 2.15, -56]} args={[0.28, 4.3, 14.2]} material={M.hull} />
      <Solid position={[5.52, 2.15, -56]} args={[0.28, 4.3, 14.2]} material={M.hull} />
      <Solid position={[0, 2.15, -62.85]} args={[11, 4.3, 0.28]} material={M.hull} />
      <Solid position={[0, 2.15, -48.95]} args={[11, 4.3, 0.28]} material={M.hullDark} />
      <Solid position={[0, 1.2, -48.78]} args={[2.2, 2.4, 0.08]} material={M.suitBlue} />

      {[-4.2, -1.4, 1.4, 4.2].map((x) => (
        <mesh key={x} position={[x, 2.2, -62.6]} material={M.hullDark} dispose={null}>
          <boxGeometry args={[0.12, 4, 0.12]} />
        </mesh>
      ))}
      <mesh position={[-5.2, 3.55, -56]} rotation={[Math.PI / 2, 0, 0]} material={M.pipe} dispose={null}>
        <cylinderGeometry args={[0.06, 0.06, 13.5, 8]} />
      </mesh>
      <mesh position={[5.2, 3.15, -57]} rotation={[Math.PI / 2, 0, 0]} material={M.pipe} dispose={null}>
        <cylinderGeometry args={[0.05, 0.05, 12, 8]} />
      </mesh>
      <mesh position={[0, 0.04, -55]} rotation={[-Math.PI / 2, 0, 0]} material={M.stripe} dispose={null}>
        <planeGeometry args={[0.16, 8]} />
      </mesh>

      <Solid position={[-1.15, 5.4, -58.2]} args={[0.18, 9.2, 0.18]} material={M.hull} />
      <Solid position={[1.15, 5.4, -58.2]} args={[0.18, 9.2, 0.18]} material={M.hull} />
      <Solid position={[0, 10.15, -58.2]} args={[2.8, 0.28, 1.4]} material={M.suitBlue} />
      <mesh position={[0, 9.7, -58.2]} rotation={[Math.PI / 2, 0, 0]} material={M.gold} dispose={null}>
        <torusGeometry args={[0.28, 0.05, 8, 16]} />
      </mesh>
      <mesh ref={drum} position={[0, 10.05, -58.2]} rotation={[0, 0, Math.PI / 2]} material={M.hullDark} dispose={null}>
        <cylinderGeometry args={[0.16, 0.16, 0.72, 12]} />
      </mesh>
      <mesh ref={cable} position={[0, 8, -58.2]} material={M.hullDark} dispose={null}>
        <cylinderGeometry args={[0.025, 0.025, 1, 6]} />
      </mesh>

      <group ref={car} position={[SHAFT.x, 2.55, SHAFT.z]}>
        <mesh material={M.suit} castShadow dispose={null}>
          <boxGeometry args={[1.35, 1.05, 1.15]} />
        </mesh>
        <mesh position={[0, 0, 0.59]} material={M.suitBlue} dispose={null}>
          <boxGeometry args={[1.05, 0.28, 0.04]} />
        </mesh>
        <mesh position={[0, 0.62, 0]} material={M.gold} dispose={null}>
          <boxGeometry args={[0.28, 0.12, 0.28]} />
        </mesh>
        <mesh position={[0, 0.18, 0.62]} rotation={[0, 0, 0]} dispose={null}>
          <planeGeometry args={[0.7, 0.22]} />
          <meshBasicMaterial map={plate} toneMapped={false} />
        </mesh>
      </group>

      <group position={[3.15, 0, -52.2]}>
        <Solid position={[0, 0.55, 0]} args={[1.15, 1.1, 0.7]} material={M.hullDark} />
        <mesh position={[0, 1.28, 0.28]} material={M.dark} dispose={null}>
          <boxGeometry args={[0.7, 0.42, 0.06]} />
        </mesh>
        <mesh position={[0, 1.28, 0.32]} material={screen} dispose={null}>
          <planeGeometry args={[0.58, 0.3]} />
        </mesh>
        <mesh position={[0.28, 0.7, 0.38]} material={M.stripe} dispose={null}>
          <boxGeometry args={[0.08, 0.2, 0.08]} />
        </mesh>
        <mesh position={[-0.28, 0.7, 0.38]} material={M.suitBlue} dispose={null}>
          <cylinderGeometry args={[0.06, 0.06, 0.22, 8]} />
        </mesh>
      </group>

      <mesh position={[0, 2.4, -62.55]} dispose={null}>
        <planeGeometry args={[2.4, 0.42]} />
        <meshBasicMaterial map={mission} toneMapped={false} />
      </mesh>
      <HoloLabel text="SETOR DE CARGA" position={[0, 3.3, -62.4]} />
      <HoloLabel text="P = m · g" position={[-3.3, 3.15, -62.45]} />
      <HoloLabel text="FR = T − P" position={[0, 2.55, -62.45]} />
      <HoloLabel text="a = FR / m" position={[3.3, 3.15, -62.45]} />
      <HoloLabel text="GUINCHO" position={[3.15, 1.85, -52.2]} />
      <HoloLabel text="PLATAFORMA" position={[2.3, 8.95, -57.1]} />

      {LOADS.map((load) => (
        <group key={load.id} position={[load.x, 0.36, load.z]}>
          <mesh material={load.mass > 80 ? M.dark : load.mass > 30 ? M.hull : M.suit} castShadow dispose={null}>
            <boxGeometry args={[0.72, 0.58, 0.72]} />
          </mesh>
          <mesh position={[0, 0.08, 0.37]} material={M.stripe} dispose={null}>
            <boxGeometry args={[0.46, 0.06, 0.03]} />
          </mesh>
          <HoloLabel text={`${load.name}  ${load.mass} kg`} position={[0, 0.62, 0]} />
        </group>
      ))}
      <mesh ref={pick} visible={false} rotation={[-Math.PI / 2, 0, 0]} material={M.lane} dispose={null}>
        <ringGeometry args={[0.55, 0.68, 24]} />
      </mesh>

      <group position={[GRAV.x, 0, GRAV.z]}>
        <Solid position={[0, 0.48, 0]} args={[0.62, 0.96, 0.42]} material={M.hullDark} />
        <mesh position={[0, 0.92, 0.22]} material={M.emit} dispose={null}>
          <planeGeometry args={[0.36, 0.18]} />
        </mesh>
      </group>
      <HoloLabel text="g  ESTAÇÃO / LUA" position={[GRAV.x, 1.55, GRAV.z]} />

      <mesh position={[-1.7, 8.62, -57.15]} material={M.hull} dispose={null}>
        <boxGeometry args={[1.5, 0.12, 0.42]} />
      </mesh>
      <mesh position={[1.7, 8.62, -57.15]} material={M.hull} dispose={null}>
        <boxGeometry args={[1.5, 0.12, 0.42]} />
      </mesh>
      <mesh position={[0, 8.62, -59.15]} material={M.hullDark} dispose={null}>
        <boxGeometry args={[3.6, 0.1, 0.28]} />
      </mesh>
      <mesh position={[-2.15, 6.4, -58.2]} material={M.pipe} dispose={null}>
        <cylinderGeometry args={[0.04, 0.04, 7.2, 8]} />
      </mesh>
      <mesh position={[2.15, 6.4, -58.2]} material={M.pipe} dispose={null}>
        <cylinderGeometry args={[0.04, 0.04, 7.2, 8]} />
      </mesh>

      <mesh position={[-4.6, 1.3, -54]} material={M.alarm} dispose={null}>
        <boxGeometry args={[0.12, 0.12, 0.5]} />
      </mesh>
      <mesh position={[4.6, 1.3, -60]} material={M.alarm} dispose={null}>
        <boxGeometry args={[0.12, 0.12, 0.5]} />
      </mesh>
      <pointLight ref={alarmL} position={[-4.2, 2.4, -54]} color="#e0a23a" distance={8} decay={2} intensity={0.15} />
      <pointLight ref={alarmR} position={[4.2, 2.4, -60]} color="#e0a23a" distance={8} decay={2} intensity={0.15} />
      <pointLight position={[0, 3.2, -58.2]} color="#9fd4e6" distance={10} decay={2} intensity={1.15} />
      <pointLight position={[-2, 2.6, -51]} color="#d5e4ef" distance={8} decay={2} intensity={0.55} />
    </group>
  );
}
