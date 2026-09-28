import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { badgeTexture, flagTexture } from "./draw";
import { M } from "./materials";
import { sim } from "./sim";

export function Tigrao() {
  const root = useRef<Group>(null);
  const hips = useRef<Group>(null);
  const torso = useRef<Group>(null);
  const head = useRef<Group>(null);
  const armL = useRef<Group>(null);
  const armR = useRef<Group>(null);
  const legL = useRef<Group>(null);
  const legR = useRef<Group>(null);
  const kneeL = useRef<Group>(null);
  const kneeR = useRef<Group>(null);
  const tail = useRef<Group>(null);
  const earL = useRef<Group>(null);
  const earR = useRef<Group>(null);
  const lidL = useRef<Mesh>(null);
  const lidR = useRef<Mesh>(null);
  const tongue = useRef<Mesh>(null);
  const wrist = useRef<Mesh>(null);
  const badge = useMemo(() => badgeTexture(), []);
  const flag = useMemo(() => flagTexture(), []);

  useFrame(() => {
    const g = root.current;
    if (!g) return;
    g.position.set(sim.x, sim.y, sim.z);
    g.rotation.y = sim.yaw;
    const t = sim.time;
    const run = sim.anim === "run";
    const moving = sim.anim === "walk" || run;
    const freq = run ? 12.2 : 7.2;
    const amp = moving ? (run ? 0.78 : 0.55) : 0.04;
    const swing = Math.sin(t * freq) * amp;
    const breathe = Math.sin(t * 1.7);

    if (hips.current) hips.current.position.y = 0.8 + (moving ? Math.abs(Math.sin(t * freq)) * (run ? 0.05 : 0.03) : 0);
    if (torso.current) {
      torso.current.position.y = 0.28 + breathe * 0.012;
      torso.current.rotation.x = breathe * 0.02;
      torso.current.rotation.z = moving ? Math.sin(t * freq) * 0.04 : 0;
    }
    if (legL.current) legL.current.rotation.x = swing;
    if (legR.current) legR.current.rotation.x = -swing;
    if (armL.current) armL.current.rotation.x = -swing * 0.8;
    if (armR.current) armR.current.rotation.x = swing * 0.8;
    if (kneeL.current) kneeL.current.rotation.x = Math.max(0, -swing) * 0.9;
    if (kneeR.current) kneeR.current.rotation.x = Math.max(0, swing) * 0.9;
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.6) * 0.12;
      head.current.rotation.x = Math.sin(t * 0.45) * 0.05;
      head.current.rotation.z = moving ? -Math.sin(t * freq) * 0.04 : 0;
    }
    if (earL.current) earL.current.rotation.z = 0.35 + Math.sin(t * 2.2) * 0.05;
    if (earR.current) earR.current.rotation.z = -0.35 - Math.sin(t * 2.2) * 0.05;
    if (tail.current) {
      tail.current.rotation.y = Math.sin(t * (sim.anim === "celebrate" ? 9 : 2.6)) * (sim.anim === "celebrate" ? 0.7 : 0.32);
      tail.current.rotation.x = 0.55;
    }
    const blink = Math.pow(Math.max(0, Math.sin(t * 1.35)), 42);
    if (lidL.current) lidL.current.scale.y = 0.35 + blink * 5;
    if (lidR.current) lidR.current.scale.y = 0.35 + blink * 5;
    if (tongue.current) tongue.current.scale.y = sim.anim === "celebrate" ? 1.4 : 0.7 + Math.sin(t * 2) * 0.08;
    if (wrist.current) {
      const mat = wrist.current.material;
      if (!Array.isArray(mat)) (mat as MeshStandardMaterial).emissiveIntensity = sim.scanner ? 1.6 + Math.sin(t * 8) * 0.4 : 0.05;
    }

    if (sim.anim === "push") {
      if (torso.current) torso.current.rotation.x = 0.42;
      if (armL.current) armL.current.rotation.x = -1.25;
      if (armR.current) armR.current.rotation.x = -1.25;
      if (legL.current) legL.current.rotation.x = -0.25;
      if (legR.current) legR.current.rotation.x = 0.4;
      if (head.current) head.current.rotation.x = 0.2;
    } else if (sim.anim === "scan") {
      if (armL.current) {
        armL.current.rotation.x = -1.35;
        armL.current.rotation.z = 0.45;
      }
    } else if (sim.anim === "jump") {
      const up = sim.vy > 0;
      if (legL.current) legL.current.rotation.x = up ? -0.55 : 0.35;
      if (legR.current) legR.current.rotation.x = up ? -0.4 : 0.45;
      if (armL.current) armL.current.rotation.x = -0.9;
      if (armR.current) armR.current.rotation.x = -0.7;
    } else if (sim.anim === "celebrate") {
      const hop = Math.abs(Math.sin(t * 8)) * 0.08;
      if (hips.current) hips.current.position.y = 0.8 + hop;
      if (armL.current) {
        armL.current.rotation.x = -2.5;
        armL.current.rotation.z = 0.25;
      }
      if (armR.current) {
        armR.current.rotation.x = -2.5;
        armR.current.rotation.z = -0.25;
      }
      if (head.current) head.current.rotation.x = -0.15;
    } else if (armL.current && armR.current) {
      armL.current.rotation.z = 0.08;
      armR.current.rotation.z = -0.08;
    }
  });

  return (
    <group ref={root}>
      <group ref={hips} position={[0, 0.8, 0]}>
        <group ref={tail} position={[0, 0.02, 0.16]}>
          <mesh position={[0, 0, 0.1]} material={M.fur} dispose={null} castShadow>
            <sphereGeometry args={[0.07, 12, 10]} />
          </mesh>
          <mesh position={[0.02, -0.02, 0.2]} material={M.furDark} dispose={null}>
            <sphereGeometry args={[0.055, 10, 8]} />
          </mesh>
          <mesh position={[0.03, -0.04, 0.28]} material={M.fur} dispose={null}>
            <sphereGeometry args={[0.04, 10, 8]} />
          </mesh>
        </group>

        <group ref={legL} position={[-0.13, 0, 0]}>
          <mesh position={[0, -0.2, 0]} material={M.suit} dispose={null} castShadow>
            <capsuleGeometry args={[0.075, 0.18, 4, 8]} />
          </mesh>
          <mesh position={[0, -0.28, 0.06]} material={M.suitBlue} dispose={null}>
            <boxGeometry args={[0.14, 0.12, 0.12]} />
          </mesh>
          <group ref={kneeL} position={[0, -0.38, 0]}>
            <mesh position={[0, -0.16, 0]} material={M.suit} dispose={null} castShadow>
              <capsuleGeometry args={[0.065, 0.14, 3, 8]} />
            </mesh>
            <mesh position={[0, -0.32, 0.03]} material={M.boot} dispose={null} castShadow>
              <boxGeometry args={[0.14, 0.1, 0.22]} />
            </mesh>
          </group>
        </group>
        <group ref={legR} position={[0.13, 0, 0]}>
          <mesh position={[0, -0.2, 0]} material={M.suit} dispose={null} castShadow>
            <capsuleGeometry args={[0.075, 0.18, 4, 8]} />
          </mesh>
          <mesh position={[0, -0.28, 0.06]} material={M.suitBlue} dispose={null}>
            <boxGeometry args={[0.14, 0.12, 0.12]} />
          </mesh>
          <group ref={kneeR} position={[0, -0.38, 0]}>
            <mesh position={[0, -0.16, 0]} material={M.suit} dispose={null} castShadow>
              <capsuleGeometry args={[0.065, 0.14, 3, 8]} />
            </mesh>
            <mesh position={[0, -0.32, 0.03]} material={M.boot} dispose={null} castShadow>
              <boxGeometry args={[0.14, 0.1, 0.22]} />
            </mesh>
          </group>
        </group>

        <group ref={torso} position={[0, 0.28, 0]}>
          <mesh position={[0, 0.12, 0]} material={M.suit} dispose={null} castShadow>
            <boxGeometry args={[0.48, 0.46, 0.3]} />
          </mesh>
          <mesh position={[0, 0.28, 0]} material={M.suitDark} dispose={null}>
            <boxGeometry args={[0.5, 0.12, 0.32]} />
          </mesh>
          <mesh position={[-0.22, 0.22, 0]} material={M.suitBlue} dispose={null}>
            <boxGeometry args={[0.12, 0.16, 0.28]} />
          </mesh>
          <mesh position={[0.22, 0.22, 0]} material={M.suitBlue} dispose={null}>
            <boxGeometry args={[0.12, 0.16, 0.28]} />
          </mesh>
          <mesh position={[0, -0.02, -0.16]} material={M.suitBlue} dispose={null}>
            <boxGeometry args={[0.28, 0.08, 0.04]} />
          </mesh>
          <mesh position={[0, 0.1, -0.175]} rotation={[0, Math.PI, 0]} dispose={null}>
            <planeGeometry args={[0.38, 0.2]} />
            <meshBasicMaterial map={badge} transparent toneMapped={false} />
          </mesh>
          <mesh position={[0.08, -0.02, -0.17]} material={M.gold} dispose={null}>
            <sphereGeometry args={[0.035, 10, 8]} />
          </mesh>
          <mesh position={[0, -0.14, 0]} material={M.hullDark} dispose={null}>
            <boxGeometry args={[0.4, 0.08, 0.26]} />
          </mesh>
          <mesh position={[-0.12, -0.14, -0.12]} material={M.suitDark} dispose={null}>
            <boxGeometry args={[0.08, 0.08, 0.06]} />
          </mesh>
          <mesh position={[0.12, -0.14, -0.12]} material={M.suitDark} dispose={null}>
            <boxGeometry args={[0.08, 0.08, 0.06]} />
          </mesh>

          <mesh position={[0, 0.16, 0.2]} material={M.suit} dispose={null} castShadow>
            <boxGeometry args={[0.32, 0.4, 0.16]} />
          </mesh>
          <mesh position={[0, 0.16, 0.29]} material={M.suitBlue} dispose={null}>
            <boxGeometry args={[0.18, 0.22, 0.04]} />
          </mesh>
          <mesh position={[0.1, 0.38, 0.2]} material={M.visorLight} dispose={null}>
            <sphereGeometry args={[0.03, 8, 8]} />
          </mesh>

          <mesh position={[0.3, 0.26, -0.02]} rotation={[0, Math.PI / 2, 0]} dispose={null}>
            <planeGeometry args={[0.12, 0.08]} />
            <meshBasicMaterial map={flag} toneMapped={false} />
          </mesh>

          <group ref={armL} position={[-0.32, 0.24, 0]}>
            <mesh position={[0, -0.16, 0]} material={M.suit} dispose={null} castShadow>
              <capsuleGeometry args={[0.055, 0.14, 3, 8]} />
            </mesh>
            <mesh position={[0, -0.18, 0]} material={M.suitBlue} dispose={null}>
              <boxGeometry args={[0.1, 0.06, 0.1]} />
            </mesh>
            <mesh position={[0, -0.34, 0]} material={M.suitDark} dispose={null} castShadow>
              <capsuleGeometry args={[0.048, 0.14, 3, 8]} />
            </mesh>
            <mesh position={[0, -0.48, -0.02]} material={M.glove} dispose={null} castShadow>
              <sphereGeometry args={[0.07, 12, 10]} />
            </mesh>
            <mesh ref={wrist} position={[0, -0.4, -0.06]} dispose={null}>
              <sphereGeometry args={[0.028, 8, 8]} />
              <meshStandardMaterial color="#7eb8cc" emissive="#7eb8cc" emissiveIntensity={0.05} />
            </mesh>
          </group>
          <group ref={armR} position={[0.32, 0.24, 0]}>
            <mesh position={[0, -0.16, 0]} material={M.suit} dispose={null} castShadow>
              <capsuleGeometry args={[0.055, 0.14, 3, 8]} />
            </mesh>
            <mesh position={[0, -0.18, 0]} material={M.suitBlue} dispose={null}>
              <boxGeometry args={[0.1, 0.06, 0.1]} />
            </mesh>
            <mesh position={[0, -0.34, 0]} material={M.suitDark} dispose={null} castShadow>
              <capsuleGeometry args={[0.048, 0.14, 3, 8]} />
            </mesh>
            <mesh position={[0, -0.48, -0.02]} material={M.glove} dispose={null} castShadow>
              <sphereGeometry args={[0.07, 12, 10]} />
            </mesh>
          </group>

          <group ref={head} position={[0, 0.58, -0.02]}>
            <mesh material={M.fur} dispose={null} castShadow>
              <sphereGeometry args={[0.2, 22, 18]} />
            </mesh>
            <mesh position={[0, 0.08, -0.08]} scale={[0.28, 0.55, 0.2]} material={M.muzzle} dispose={null}>
              <sphereGeometry args={[0.2, 14, 12]} />
            </mesh>
            <mesh position={[0, -0.04, -0.16]} scale={[0.72, 0.55, 0.85]} material={M.muzzle} dispose={null} castShadow>
              <sphereGeometry args={[0.13, 16, 12]} />
            </mesh>
            <mesh position={[0, -0.02, -0.26]} material={M.nose} dispose={null}>
              <sphereGeometry args={[0.045, 12, 10]} />
            </mesh>
            <mesh position={[0, -0.08, -0.2]} material={M.furDark} dispose={null}>
              <sphereGeometry args={[0.03, 8, 8]} />
            </mesh>
            <mesh ref={tongue} position={[0, -0.1, -0.22]} material={M.tongue} dispose={null}>
              <sphereGeometry args={[0.028, 8, 8]} />
            </mesh>
            <Eye x={-0.075} lid={lidL} />
            <Eye x={0.075} lid={lidR} />
            <group ref={earL} position={[-0.15, 0.16, -0.04]}>
              <mesh rotation={[0.55, 0.15, 1.05]} scale={[0.5, 1.25, 0.28]} material={M.fur} dispose={null}>
                <sphereGeometry args={[0.12, 12, 10]} />
              </mesh>
            </group>
            <group ref={earR} position={[0.15, 0.16, -0.04]}>
              <mesh rotation={[0.55, -0.15, -1.05]} scale={[0.5, 1.25, 0.28]} material={M.fur} dispose={null}>
                <sphereGeometry args={[0.12, 12, 10]} />
              </mesh>
            </group>
            <mesh position={[0, 0.02, -0.05]} material={M.glass} dispose={null} renderOrder={3}>
              <sphereGeometry args={[0.255, 28, 20]} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={M.suit} dispose={null} castShadow>
              <torusGeometry args={[0.25, 0.045, 10, 24]} />
            </mesh>
            <mesh position={[-0.24, 0.02, 0]} material={M.suit} dispose={null}>
              <boxGeometry args={[0.08, 0.12, 0.1]} />
            </mesh>
            <mesh position={[0.24, 0.02, 0]} material={M.suit} dispose={null}>
              <boxGeometry args={[0.08, 0.12, 0.1]} />
            </mesh>
            <mesh position={[-0.29, 0.02, 0]} material={M.visorLight} dispose={null}>
              <sphereGeometry args={[0.03, 8, 8]} />
            </mesh>
            <mesh position={[0.29, 0.02, 0]} material={M.visorLight} dispose={null}>
              <sphereGeometry args={[0.03, 8, 8]} />
            </mesh>
            <mesh position={[0, -0.02, 0.16]} material={M.suit} dispose={null}>
              <sphereGeometry args={[0.22, 16, 12]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Eye({ x, lid }: { x: number; lid: RefObject<Mesh | null> }) {
  return (
    <group position={[x, 0.03, -0.16]}>
      <mesh material={M.eye} dispose={null}>
        <sphereGeometry args={[0.055, 14, 12]} />
      </mesh>
      <mesh position={[0, 0, -0.028]} material={M.iris} dispose={null}>
        <sphereGeometry args={[0.034, 12, 10]} />
      </mesh>
      <mesh position={[0, 0, -0.046]} material={M.pupil} dispose={null}>
        <sphereGeometry args={[0.016, 8, 8]} />
      </mesh>
      <mesh position={[0.01, 0.01, -0.048]} dispose={null}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshBasicMaterial color="#f7fbff" />
      </mesh>
      <mesh ref={lid} position={[0, 0.03, -0.03]} material={M.fur} dispose={null}>
        <boxGeometry args={[0.07, 0.012, 0.03]} />
      </mesh>
    </group>
  );
}
