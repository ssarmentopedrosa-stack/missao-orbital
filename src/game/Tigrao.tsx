import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh, MeshStandardMaterial, PointLight } from "three";
import { sfx } from "./audio";
import { badgeTexture, flagTexture, plateTexture } from "./draw";
import { M } from "./materials";
import { sim } from "./sim";

function approach(current: number, target: number, dt: number, rate = 11): number {
  return current + (target - current) * (1 - Math.exp(-rate * dt));
}

function setX(group: Group | null, target: number, dt: number, rate = 11): void {
  if (!group) return;
  group.rotation.x = approach(group.rotation.x, target, dt, rate);
}

function setY(group: Group | null, target: number, dt: number, rate = 11): void {
  if (!group) return;
  group.rotation.y = approach(group.rotation.y, target, dt, rate);
}

function setZ(group: Group | null, target: number, dt: number, rate = 11): void {
  if (!group) return;
  group.rotation.z = approach(group.rotation.z, target, dt, rate);
}

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
  const beam = useRef<Mesh>(null);
  const lamp = useRef<PointLight>(null);
  const wasAir = useRef(false);
  const land = useRef(0);
  const prevYaw = useRef(sim.yaw);
  const turn = useRef(0);
  const badge = useMemo(() => badgeTexture(), []);
  const flag = useMemo(() => flagTexture(), []);
  const nexus = useMemo(() => plateTexture("NEXUS"), []);

  useFrame((_, raw) => {
    const g = root.current;
    if (!g) return;
    const dt = Math.min(raw, 0.05);
    g.position.set(sim.x, sim.y, sim.z);
    g.rotation.y = sim.yaw;
    const t = sim.time;
    const run = sim.anim === "run";
    const moving = sim.anim === "walk" || run;
    const freq = run ? 11.4 : 7.1;
    const amp = moving ? (run ? 0.72 : 0.52) : 0.035;
    const swing = Math.sin(t * freq) * amp;
    const breathe = Math.sin(t * 1.7);
    const yawDelta = Math.atan2(Math.sin(sim.yaw - prevYaw.current), Math.cos(sim.yaw - prevYaw.current));
    prevYaw.current = sim.yaw;
    turn.current = approach(turn.current, Math.max(-0.28, Math.min(0.28, -yawDelta * 8)), dt, 8);

    if (!sim.grounded) wasAir.current = true;
    else if (wasAir.current) {
      wasAir.current = false;
      land.current = 0.18;
      if (sim.phase === "play") sfx.land();
    }
    if (land.current > 0) land.current = Math.max(0, land.current - dt);

    let hipY = 0.8 + (moving ? Math.abs(Math.sin(t * freq)) * (run ? 0.045 : 0.028) : 0);
    if (land.current > 0) hipY -= land.current * 0.22;
    if (sim.anim === "celebrate") hipY = 0.8 + Math.abs(Math.sin(t * 8)) * 0.07;

    let torsoX = breathe * 0.018;
    const torsoZ = (moving ? Math.sin(t * freq) * 0.035 : 0) + turn.current;
    let lLeg = swing;
    let rLeg = -swing;
    let lArm = -swing * 0.75;
    let rArm = swing * 0.75;
    let lZ = 0.1;
    let rZ = -0.1;
    let lKnee = Math.max(0, -swing) * 0.85;
    let rKnee = Math.max(0, swing) * 0.85;
    let headX = Math.sin(t * 0.45) * 0.04;
    let headY = Math.sin(t * 0.6) * 0.1;
    const headZ = moving ? -Math.sin(t * freq) * 0.035 : 0;
    let tailX = 0.62;
    let tailY = Math.sin(t * 2.4) * 0.28;

    if (sim.anim === "push") {
      torsoX = 0.48;
      lArm = -1.2;
      rArm = -1.2;
      lZ = 0.18;
      rZ = -0.18;
      lLeg = -0.28;
      rLeg = 0.42;
      lKnee = 0.35;
      rKnee = 0.15;
      headX = 0.22;
      headY = 0;
      tailX = 0.3;
    } else if (sim.anim === "scan" || (sim.scanner && sim.speed < 0.4)) {
      lArm = -1.25;
      lZ = 0.42;
      headX = 0.12;
      let bestX = sim.x;
      let bestZ = sim.z - 1;
      let bestD = 6.5;
      for (const crate of sim.crates) {
        const d = Math.hypot(crate.x - sim.x, crate.z - sim.z);
        if (d < bestD) {
          bestD = d;
          bestX = crate.x;
          bestZ = crate.z;
        }
      }
      const face = Math.atan2(-(bestX - sim.x), -(bestZ - sim.z));
      const rel = Math.atan2(Math.sin(face - sim.yaw), Math.cos(face - sim.yaw));
      headY = Math.max(-0.7, Math.min(0.7, rel));
    } else if (sim.anim === "jump") {
      const up = sim.vy > 0.2;
      lLeg = up ? -0.5 : 0.32;
      rLeg = up ? -0.38 : 0.4;
      lArm = -0.85;
      rArm = -0.7;
      lKnee = up ? 0.2 : 0.45;
      rKnee = up ? 0.15 : 0.4;
      torsoX = up ? -0.08 : 0.12;
    } else if (sim.anim === "celebrate") {
      lArm = -2.4;
      rArm = -2.4;
      lZ = 0.28;
      rZ = -0.28;
      headX = -0.18;
      tailY = Math.sin(t * 9) * 0.7;
      tailX = 0.4;
    }

    if (hips.current) hips.current.position.y = approach(hips.current.position.y, hipY, dt, 10);
    setX(torso.current, torsoX, dt, sim.anim === "push" ? 8 : 6);
    setZ(torso.current, torsoZ, dt, 8);
    if (torso.current) torso.current.position.y = approach(torso.current.position.y, 0.28 + breathe * 0.01, dt, 6);
    setX(legL.current, lLeg, dt, 14);
    setX(legR.current, rLeg, dt, 14);
    setX(kneeL.current, lKnee, dt, 14);
    setX(kneeR.current, rKnee, dt, 14);
    setX(armL.current, lArm, dt, 12);
    setX(armR.current, rArm, dt, 12);
    setZ(armL.current, lZ, dt, 12);
    setZ(armR.current, rZ, dt, 12);
    setX(head.current, headX, dt, 8);
    setY(head.current, headY, dt, 8);
    setZ(head.current, headZ, dt, 8);
    if (earL.current) earL.current.rotation.z = approach(earL.current.rotation.z, 1.15 + Math.sin(t * 2.1) * 0.06, dt, 6);
    if (earR.current) earR.current.rotation.z = approach(earR.current.rotation.z, -1.15 - Math.sin(t * 2.1) * 0.06, dt, 6);
    setX(tail.current, tailX, dt, 6);
    setY(tail.current, tailY, dt, 8);

    const blink = Math.pow(Math.max(0, Math.sin(t * 1.2)), 48);
    if (lidL.current) lidL.current.scale.y = 0.35 + blink * 6;
    if (lidR.current) lidR.current.scale.y = 0.35 + blink * 6;
    if (tongue.current) {
      const out = sim.anim === "celebrate" ? 1.5 : 0.65 + Math.sin(t * 2) * 0.08;
      tongue.current.scale.y = approach(tongue.current.scale.y, out, dt, 8);
    }
    if (wrist.current) {
      const mat = wrist.current.material;
      if (!Array.isArray(mat)) {
        (mat as MeshStandardMaterial).emissiveIntensity = sim.scanner ? 1.8 + Math.sin(t * 8) * 0.45 : 0.08;
      }
    }
    if (beam.current) beam.current.visible = sim.scanner && sim.phase === "play";
    if (lamp.current) lamp.current.intensity = sim.scanner && sim.phase === "play" ? 1.8 : 0;
  });

  return (
    <group ref={root}>
      <group ref={hips} position={[0, 0.8, 0]}>
        <group ref={tail} position={[0, 0.04, 0.18]}>
          <mesh position={[0, 0.02, 0.1]} material={M.fur} dispose={null} castShadow>
            <sphereGeometry args={[0.07, 12, 10]} />
          </mesh>
          <mesh position={[0.015, 0.05, 0.2]} material={M.muzzle} dispose={null}>
            <sphereGeometry args={[0.055, 10, 8]} />
          </mesh>
          <mesh position={[0.02, 0.08, 0.3]} material={M.fur} dispose={null}>
            <sphereGeometry args={[0.042, 10, 8]} />
          </mesh>
        </group>

        <Leg side={-1} leg={legL} knee={kneeL} />
        <Leg side={1} leg={legR} knee={kneeR} />

        <group ref={torso} position={[0, 0.28, 0]}>
          <mesh position={[0, 0.12, 0]} material={M.suit} dispose={null} castShadow>
            <boxGeometry args={[0.46, 0.44, 0.28]} />
          </mesh>
          <mesh position={[0, 0.3, 0]} material={M.suitDark} dispose={null}>
            <boxGeometry args={[0.48, 0.1, 0.3]} />
          </mesh>
          <mesh position={[-0.2, 0.22, 0]} material={M.suitBlue} dispose={null}>
            <boxGeometry args={[0.12, 0.18, 0.26]} />
          </mesh>
          <mesh position={[0.2, 0.22, 0]} material={M.suitBlue} dispose={null}>
            <boxGeometry args={[0.12, 0.18, 0.26]} />
          </mesh>
          <mesh position={[0, 0.08, -0.15]} material={M.suitBlue} dispose={null}>
            <boxGeometry args={[0.3, 0.22, 0.03]} />
          </mesh>
          <mesh position={[0, 0.08, -0.175]} rotation={[0, Math.PI, 0]} dispose={null}>
            <planeGeometry args={[0.28, 0.16]} />
            <meshBasicMaterial map={badge} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.12, 0]} material={M.hullDark} dispose={null}>
            <boxGeometry args={[0.4, 0.07, 0.24]} />
          </mesh>
          <mesh position={[-0.12, -0.12, -0.1]} material={M.gold} dispose={null}>
            <boxGeometry args={[0.07, 0.07, 0.05]} />
          </mesh>
          <mesh position={[0.12, -0.12, -0.1]} material={M.gold} dispose={null}>
            <boxGeometry args={[0.07, 0.07, 0.05]} />
          </mesh>

          <mesh position={[0, 0.14, 0.22]} material={M.suit} dispose={null} castShadow>
            <boxGeometry args={[0.3, 0.36, 0.14]} />
          </mesh>
          <mesh position={[-0.08, 0.16, 0.3]} rotation={[0.1, 0, 0]} material={M.hull} dispose={null}>
            <cylinderGeometry args={[0.05, 0.05, 0.28, 10]} />
          </mesh>
          <mesh position={[0.08, 0.16, 0.3]} rotation={[0.1, 0, 0]} material={M.hull} dispose={null}>
            <cylinderGeometry args={[0.05, 0.05, 0.28, 10]} />
          </mesh>
          <mesh position={[0, 0.02, 0.3]} dispose={null}>
            <planeGeometry args={[0.2, 0.06]} />
            <meshBasicMaterial map={nexus} toneMapped={false} />
          </mesh>
          <mesh position={[0.1, 0.34, 0.22]} material={M.visorLight} dispose={null}>
            <sphereGeometry args={[0.028, 8, 8]} />
          </mesh>

          <mesh position={[0.28, 0.22, 0]} rotation={[0, Math.PI / 2, 0]} dispose={null}>
            <planeGeometry args={[0.11, 0.07]} />
            <meshBasicMaterial map={flag} toneMapped={false} />
          </mesh>

          <Arm side={-1} arm={armL} wrist={wrist} beam={beam} lamp={lamp} />
          <Arm side={1} arm={armR} />

          <group ref={head} position={[0, 0.52, -0.04]}>
            <mesh material={M.fur} dispose={null} castShadow>
              <sphereGeometry args={[0.19, 22, 18]} />
            </mesh>
            <mesh position={[0, -0.02, -0.14]} scale={[0.95, 0.62, 1.15]} material={M.muzzle} dispose={null} castShadow>
              <sphereGeometry args={[0.12, 16, 12]} />
            </mesh>
            <mesh position={[0, -0.01, -0.28]} material={M.nose} dispose={null}>
              <sphereGeometry args={[0.038, 12, 10]} />
            </mesh>
            <mesh position={[0, -0.055, -0.2]} material={M.furDark} dispose={null}>
              <boxGeometry args={[0.06, 0.012, 0.04]} />
            </mesh>
            <mesh ref={tongue} position={[0, -0.075, -0.2]} material={M.tongue} dispose={null}>
              <sphereGeometry args={[0.026, 8, 8]} />
            </mesh>
            <Eye x={-0.07} lid={lidL} />
            <Eye x={0.07} lid={lidR} />
            <group ref={earL} position={[-0.16, 0.12, -0.02]} rotation={[0.4, 0.2, 1.15]}>
              <mesh scale={[0.45, 1.35, 0.28]} material={M.fur} dispose={null}>
                <sphereGeometry args={[0.11, 12, 10]} />
              </mesh>
              <mesh position={[0.01, -0.02, -0.02]} scale={[0.28, 0.8, 0.16]} material={M.furDark} dispose={null}>
                <sphereGeometry args={[0.11, 10, 8]} />
              </mesh>
            </group>
            <group ref={earR} position={[0.16, 0.12, -0.02]} rotation={[0.4, -0.2, -1.15]}>
              <mesh scale={[0.45, 1.35, 0.28]} material={M.fur} dispose={null}>
                <sphereGeometry args={[0.11, 12, 10]} />
              </mesh>
              <mesh position={[-0.01, -0.02, -0.02]} scale={[0.28, 0.8, 0.16]} material={M.furDark} dispose={null}>
                <sphereGeometry args={[0.11, 10, 8]} />
              </mesh>
            </group>
            <mesh position={[0, 0.02, -0.06]} material={M.glass} dispose={null} renderOrder={3}>
              <sphereGeometry args={[0.24, 28, 20]} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={M.suit} dispose={null} castShadow>
              <torusGeometry args={[0.23, 0.038, 10, 24]} />
            </mesh>
            <mesh position={[-0.22, 0.01, 0]} material={M.suit} dispose={null}>
              <boxGeometry args={[0.07, 0.1, 0.09]} />
            </mesh>
            <mesh position={[0.22, 0.01, 0]} material={M.suit} dispose={null}>
              <boxGeometry args={[0.07, 0.1, 0.09]} />
            </mesh>
            <mesh position={[-0.26, 0.02, -0.02]} material={M.emit} dispose={null}>
              <sphereGeometry args={[0.026, 8, 8]} />
            </mesh>
            <mesh position={[0.26, 0.02, -0.02]} material={M.emit} dispose={null}>
              <sphereGeometry args={[0.026, 8, 8]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Leg({
  side,
  leg,
  knee,
}: {
  side: number;
  leg: RefObject<Group | null>;
  knee: RefObject<Group | null>;
}) {
  return (
    <group ref={leg} position={[side * 0.13, 0, 0]}>
      <mesh position={[0, -0.2, 0]} material={M.suit} dispose={null} castShadow>
        <capsuleGeometry args={[0.072, 0.18, 4, 8]} />
      </mesh>
      <mesh position={[0, -0.28, 0.04]} material={M.suitBlue} dispose={null}>
        <boxGeometry args={[0.13, 0.1, 0.12]} />
      </mesh>
      <group ref={knee} position={[0, -0.38, 0]}>
        <mesh position={[0, -0.16, 0]} material={M.suit} dispose={null} castShadow>
          <capsuleGeometry args={[0.06, 0.14, 3, 8]} />
        </mesh>
        <mesh position={[0, -0.32, 0.03]} material={M.boot} dispose={null} castShadow>
          <boxGeometry args={[0.13, 0.09, 0.2]} />
        </mesh>
        <mesh position={[0, -0.34, -0.06]} material={M.glove} dispose={null}>
          <boxGeometry args={[0.1, 0.04, 0.06]} />
        </mesh>
      </group>
    </group>
  );
}

function Arm({
  side,
  arm,
  wrist,
  beam,
  lamp,
}: {
  side: number;
  arm: RefObject<Group | null>;
  wrist?: RefObject<Mesh | null>;
  beam?: RefObject<Mesh | null>;
  lamp?: RefObject<PointLight | null>;
}) {
  return (
    <group ref={arm} position={[side * 0.3, 0.22, 0]}>
      <mesh position={[0, -0.16, 0]} material={M.suit} dispose={null} castShadow>
        <capsuleGeometry args={[0.052, 0.14, 3, 8]} />
      </mesh>
      <mesh position={[0, -0.18, 0]} material={M.suitBlue} dispose={null}>
        <boxGeometry args={[0.09, 0.05, 0.09]} />
      </mesh>
      <mesh position={[0, -0.34, 0]} material={M.suitDark} dispose={null} castShadow>
        <capsuleGeometry args={[0.046, 0.14, 3, 8]} />
      </mesh>
      <mesh position={[0, -0.48, -0.02]} material={M.glove} dispose={null} castShadow>
        <sphereGeometry args={[0.065, 12, 10]} />
      </mesh>
      {side < 0 && wrist && beam && lamp ? (
        <>
          <mesh ref={wrist} position={[0, -0.4, -0.06]} dispose={null}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#7eb8cc" emissive="#7eb8cc" emissiveIntensity={0.08} />
          </mesh>
          <mesh ref={beam} position={[0, -0.55, -0.55]} rotation={[Math.PI / 2.4, 0, 0]} visible={false}>
            <cylinderGeometry args={[0.01, 0.08, 0.7, 8, 1, true]} />
            <meshBasicMaterial color="#9fd8ea" transparent opacity={0.28} depthWrite={false} />
          </mesh>
          <pointLight ref={lamp} position={[0, -0.45, -0.2]} color="#9fd4e6" distance={4.5} decay={2} intensity={0} />
        </>
      ) : null}
    </group>
  );
}

function Eye({ x, lid }: { x: number; lid: RefObject<Mesh | null> }) {
  return (
    <group position={[x, 0.045, -0.2]}>
      <mesh material={M.eye} dispose={null}>
        <sphereGeometry args={[0.048, 14, 12]} />
      </mesh>
      <mesh position={[0, 0, -0.024]} material={M.iris} dispose={null}>
        <sphereGeometry args={[0.03, 12, 10]} />
      </mesh>
      <mesh position={[0, 0, -0.04]} material={M.pupil} dispose={null}>
        <sphereGeometry args={[0.014, 8, 8]} />
      </mesh>
      <mesh position={[0.01, 0.012, -0.046]} dispose={null}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshBasicMaterial color="#f7fbff" />
      </mesh>
      <mesh ref={lid} position={[0, 0.028, -0.02]} material={M.fur} dispose={null}>
        <boxGeometry args={[0.07, 0.012, 0.03]} />
      </mesh>
    </group>
  );
}
