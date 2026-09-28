import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import * as THREE from "three";
import { HoloLabel, Solid } from "./bits";
import { cloudTexture, earthTexture, paintScreen, panelTexture, starTexture } from "./draw";
import { BLOCKS, DOCK } from "./layout";
import { M } from "./materials";
import { sim } from "./sim";

function Monitor({
  position,
  rotation,
  title,
  formula,
  w = 1.8,
  h = 1.02,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  formula: string;
  w?: number;
  h?: number;
}) {
  const setup = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 288;
    const g = c.getContext("2d");
    if (g) paintScreen(g, 512, 288, title, formula, 0);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return { c, tex };
  }, [title, formula]);
  const last = useRef(0);
  useFrame(() => {
    if (sim.time - last.current < 0.12) return;
    last.current = sim.time;
    const g = setup.c.getContext("2d");
    if (!g) return;
    paintScreen(g, 512, 288, title, formula, sim.time);
    setup.tex.needsUpdate = true;
  });
  return (
    <mesh position={position} rotation={rotation} dispose={null}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={setup.tex} toneMapped={false} />
    </mesh>
  );
}

function Backdrop({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const earth = useMemo(() => earthTexture(), []);
  const stars = useMemo(() => starTexture(), []);
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.4]}>
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial map={stars} toneMapped={false} />
      </mesh>
      <mesh>
        <circleGeometry args={[3.1, 48]} />
        <meshBasicMaterial map={earth} toneMapped={false} />
      </mesh>
      <mesh>
        <ringGeometry args={[3.15, 3.7, 48]} />
        <meshBasicMaterial color="#7eb8cc" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Atom() {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.7;
  });
  return (
    <group ref={ref} position={[3.55, 1.28, 3.95]}>
      <mesh>
        <sphereGeometry args={[0.1, 18, 14]} />
        <meshBasicMaterial color="#e0a23a" toneMapped={false} />
      </mesh>
      {[0, 1.15, 2.3].map((r) => (
        <mesh key={r} rotation={[Math.PI / 2.3, r, 0.2]}>
          <torusGeometry args={[0.36, 0.008, 8, 40]} />
          <meshBasicMaterial color="#7eb8cc" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function NewtonCore() {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.5;
  });
  return (
    <group position={[-5.3, 1.55, 5.15]}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[0.28, 0.015, 8, 32]} />
          <meshBasicMaterial color="#7eb8cc" toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.01, 8, 28]} />
          <meshBasicMaterial color="#d5e4ef" toneMapped={false} />
        </mesh>
      </group>
      <HoloLabel text="IA NEWTON" position={[0, 0.48, 0]} />
    </group>
  );
}

function DockPad() {
  const mat = useRef<MeshStandardMaterial>(null);
  const beam = useRef<Mesh>(null);
  useFrame(() => {
    if (mat.current) {
      mat.current.emissiveIntensity = sim.solved ? 1.3 : 0.35 + Math.sin(sim.time * 3) * 0.18;
      mat.current.emissive.set(sim.solved ? "#9ee0c8" : "#1e4d96");
      mat.current.color.set(sim.solved ? "#9ee0c8" : "#1e4d96");
    }
    if (beam.current) beam.current.visible = !sim.solved;
    if (beam.current && !Array.isArray(beam.current.material)) {
      const m = beam.current.material;
      if ("opacity" in m) m.opacity = 0.08 + Math.sin(sim.time * 4) * 0.04;
    }
  });
  return (
    <group position={[DOCK.x, 0.05, DOCK.z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[0.72, 1.18, 40]} />
        <meshStandardMaterial ref={mat} color="#1e4d96" emissive="#1e4d96" emissiveIntensity={0.4} roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh ref={beam} position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.45, 0.7, 2.2, 16, 1, true]} />
        <meshBasicMaterial color="#7eb8cc" transparent opacity={0.1} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <HoloLabel text="PLATAFORMA DE ACOPLAMENTO" position={[0, 1.7, 0]} />
    </group>
  );
}

function Lanes() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5.32, 0.025, -20.4]} receiveShadow material={M.ice} dispose={null}>
        <planeGeometry args={[4.4, 15.2]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, -20.6]} receiveShadow material={M.lane} dispose={null}>
        <planeGeometry args={[4.8, 16]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5.32, 0.025, -20.4]} receiveShadow material={M.rubber} dispose={null}>
        <planeGeometry args={[4.4, 15.2]} />
      </mesh>
      <HoloLabel text="GELO   μ 0,05" position={[-5.32, 1.4, -13.1]} color="#d5eef6" />
      <HoloLabel text="METAL   μ 0,30" position={[0, 1.4, -13.1]} />
      <HoloLabel text="BORRACHA   μ 0,62" position={[5.32, 1.4, -13.1]} color="#e7c27a" />
    </group>
  );
}

function Portrait() {
  const map = useMemo(() => {
    const tex = new THREE.TextureLoader().load("/tigrao.png");
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
  return (
    <group position={[-7.32, 1.75, 7.6]} rotation={[0, Math.PI / 2, 0]}>
      <Solid position={[0, 0, -0.04]} args={[1.35, 0.95, 0.06]} material={M.hullDark} />
      <mesh position={[0, 0, 0]} dispose={null}>
        <planeGeometry args={[1.22, 0.72]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      <HoloLabel text="CADETE TIGRÃO" position={[0, -0.62, 0.05]} />
    </group>
  );
}

function Rover() {
  return (
    <group position={[-5.02, 0.78, 0.55]}>
      <mesh material={M.suitDark} castShadow dispose={null}>
        <boxGeometry args={[0.72, 0.26, 0.42]} />
      </mesh>
      {[
        [-0.24, 0.16],
        [0.24, 0.16],
        [-0.24, -0.16],
        [0.24, -0.16],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x ?? 0, -0.16, z ?? 0]} rotation={[0, 0, Math.PI / 2]} material={M.dark} dispose={null}>
          <cylinderGeometry args={[0.1, 0.1, 0.08, 12]} />
        </mesh>
      ))}
      <mesh position={[0.1, 0.18, 0]} material={M.hull} dispose={null}>
        <boxGeometry args={[0.16, 0.1, 0.16]} />
      </mesh>
    </group>
  );
}

function Rocket() {
  return (
    <group position={[5.55, 1.15, 0.45]}>
      <mesh position={[0, 0.22, 0]} material={M.suit} dispose={null} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.4, 12]} />
      </mesh>
      <mesh position={[0, 0.48, 0]} material={M.suitBlue} dispose={null}>
        <coneGeometry args={[0.08, 0.16, 12]} />
      </mesh>
      {[0, 2.1, 4.2].map((r) => (
        <mesh key={r} position={[0, 0.05, 0]} rotation={[0, r, 0]} material={M.stripe} dispose={null}>
          <boxGeometry args={[0.22, 0.05, 0.06]} />
        </mesh>
      ))}
    </group>
  );
}

function Station() {
  const earth = useMemo(() => earthTexture(), []);
  const clouds = useMemo(() => cloudTexture(), []);
  const spin = useRef<Group>(null);
  useFrame((_, dt) => {
    if (spin.current && sim.phase === "title") spin.current.rotation.y += dt * 0.08;
  });
  return (
    <group ref={spin} position={[0, 200, 0]}>
      <mesh material={M.suit} castShadow dispose={null}>
        <cylinderGeometry args={[1.5, 1.5, 3.6, 18]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={M.hull} dispose={null}>
        <torusGeometry args={[3.1, 0.16, 10, 36]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.4, 0]} material={M.hullDark} dispose={null}>
        <torusGeometry args={[4.4, 0.05, 8, 40]} />
      </mesh>
      <mesh position={[4.1, 0.2, 0]} material={M.hull} dispose={null}>
        <boxGeometry args={[2.1, 1.1, 1.3]} />
      </mesh>
      <mesh position={[-3.6, -0.2, 1.2]} material={M.suitBlue} dispose={null}>
        <boxGeometry args={[1.4, 0.9, 1.6]} />
      </mesh>
      <mesh position={[0, 0.1, 3.5]} material={M.suitBlue} dispose={null}>
        <boxGeometry args={[5.2, 0.06, 1.35]} />
      </mesh>
      <mesh position={[0, 0.1, -3.5]} material={M.suitBlue} dispose={null}>
        <boxGeometry args={[5.2, 0.06, 1.35]} />
      </mesh>
      <mesh position={[1.55, 1.7, 0]} material={M.visorLight} dispose={null}>
        <sphereGeometry args={[0.08, 8, 8]} />
      </mesh>
      <mesh position={[-1.2, 1.85, 0.4]} material={M.alarm} dispose={null}>
        <sphereGeometry args={[0.06, 8, 8]} />
      </mesh>
      <mesh position={[-11, 1.2, -7]}>
        <sphereGeometry args={[6.4, 48, 32]} />
        <meshBasicMaterial map={earth} toneMapped={false} />
      </mesh>
      <mesh position={[-11, 1.2, -7]}>
        <sphereGeometry args={[6.62, 32, 24]} />
        <meshBasicMaterial map={clouds} transparent opacity={0.55} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[-11, 1.2, -7]}>
        <sphereGeometry args={[6.85, 28, 18]} />
        <meshBasicMaterial color="#9fd4e6" transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Starfield() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 500;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 28 + ((i * 17) % 50);
      const th = (i * 2.399) % (Math.PI * 2);
      const ph = Math.acos(((i * 0.37) % 2) - 1);
      a[i * 3] = r * Math.sin(ph) * Math.cos(th);
      a[i * 3 + 1] = 200 + r * Math.sin(ph) * Math.sin(th) * 0.45;
      a[i * 3 + 2] = r * Math.cos(ph);
    }
    g.setAttribute("position", new THREE.BufferAttribute(a, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial color="#d5e4ef" size={0.14} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function World() {
  const floorMap = useMemo(() => panelTexture(), []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 5]} receiveShadow dispose={null}>
        <planeGeometry args={[15.2, 12.4]} />
        <meshStandardMaterial map={floorMap} color="#5e6c7c" metalness={0.55} roughness={0.38} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, -5.2]} receiveShadow material={M.floor} dispose={null}>
        <planeGeometry args={[3.4, 8]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, -19.8]} receiveShadow material={M.floor} dispose={null}>
        <planeGeometry args={[18, 21.2]} />
      </mesh>

      <Solid position={[0, 3.44, 5]} args={[15.2, 0.12, 12.4]} material={M.hullDark} />
      <Solid position={[0, 2.98, -5.2]} args={[3.4, 0.1, 8]} material={M.hullDark} />
      <Solid position={[0, 4.02, -19.8]} args={[18, 0.12, 21.2]} material={M.hullDark} />

      <mesh position={[0, 3.32, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 0.5]} />
        <meshBasicMaterial color="#d5e4ef" />
      </mesh>
      <mesh position={[-3.2, 3.32, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 0.4]} />
        <meshBasicMaterial color="#c5d4e4" />
      </mesh>
      <mesh position={[0, 2.88, -5.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 6.2]} />
        <meshBasicMaterial color="#d5e4ef" />
      </mesh>
      <mesh position={[0, 3.9, -16]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 0.45]} />
        <meshBasicMaterial color="#d5e4ef" />
      </mesh>
      <mesh position={[0, 3.9, -24]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 0.4]} />
        <meshBasicMaterial color="#c5d4e4" />
      </mesh>

      {BLOCKS.filter((b) => b.kind !== "hidden").map((b, i) => {
        const cx = (b.minX + b.maxX) / 2;
        const cz = (b.minZ + b.maxZ) / 2;
        return (
          <mesh
            key={i}
            position={[cx, b.h / 2, cz]}
            material={b.kind === "prop" ? M.hullDark : M.hull}
            castShadow
            receiveShadow
            dispose={null}
          >
            <boxGeometry args={[b.maxX - b.minX, b.h, b.maxZ - b.minZ]} />
          </mesh>
        );
      })}

      <Solid position={[7.81, 1.75, -0.1]} args={[0.42, 3.5, 1.6]} material={M.hull} cast receive />
      <Solid position={[7.81, 1.75, 9.55]} args={[0.42, 3.5, 4.15]} material={M.hull} cast receive />
      <Solid position={[7.81, 0.42, 4.5]} args={[0.42, 0.85, 6]} material={M.hull} />
      <Solid position={[7.81, 3.02, 4.5]} args={[0.42, 0.95, 6]} material={M.hull} />
      <mesh position={[7.58, 1.7, 4.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5.6, 1.6]} />
        <meshStandardMaterial color="#9fd0e0" transparent opacity={0.12} roughness={0.05} metalness={0.1} depthWrite={false} />
      </mesh>
      <Backdrop position={[8.7, 1.7, 4.5]} rotation={[0, -Math.PI / 2, 0]} />

      <Solid position={[-6.6, 2.05, -30.61]} args={[4.8, 4.1, 0.42]} material={M.hull} cast />
      <Solid position={[6.6, 2.05, -30.61]} args={[4.8, 4.1, 0.42]} material={M.hull} cast />
      <Solid position={[0, 0.45, -30.61]} args={[8.4, 0.9, 0.42]} material={M.hull} />
      <Solid position={[0, 3.45, -30.61]} args={[8.4, 1.3, 0.42]} material={M.hull} />
      <mesh position={[0, 1.85, -30.35]}>
        <planeGeometry args={[7.8, 1.8]} />
        <meshStandardMaterial color="#9fd0e0" transparent opacity={0.1} roughness={0.05} depthWrite={false} />
      </mesh>
      <Backdrop position={[0, 1.9, -31.7]} rotation={[0, 0, 0]} />

      <mesh position={[-2, 2.2, 10.9]} material={M.alarm} dispose={null}>
        <boxGeometry args={[0.4, 0.08, 0.08]} />
      </mesh>
      <mesh position={[2, 2.2, 10.9]} material={M.alarm} dispose={null}>
        <boxGeometry args={[0.4, 0.08, 0.08]} />
      </mesh>
      <Solid position={[-1.62, 1.7, -1.28]} args={[0.14, 3.35, 0.18]} material={M.suitDark} />
      <Solid position={[1.62, 1.7, -1.28]} args={[0.14, 3.35, 0.18]} material={M.suitDark} />
      <Solid position={[0, 3.32, -1.28]} args={[3.4, 0.14, 0.18]} material={M.suitDark} />
      <mesh position={[0, 0.03, -5.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.9, 7.4]} />
        <meshBasicMaterial color="#7eb8cc" transparent opacity={0.28} toneMapped={false} />
      </mesh>

      <Monitor position={[-1.6, 2.15, 11.05]} rotation={[0, Math.PI, 0]} title="ÓRBITA NEWTON-1" formula="E = mc²" />
      <Monitor position={[1.7, 2.15, 11.05]} rotation={[0, Math.PI, 0]} title="DINÂMICA" formula="F = m·a" w={1.7} />
      <Monitor position={[-8.55, 2.3, -18]} rotation={[0, Math.PI / 2, 0]} title="INÉRCIA" formula="ΣF = 0" w={1.5} h={0.9} />

      <HoloLabel text="LABORATÓRIO DE INÉRCIA" position={[0, 2.45, -0.9]} />
      <HoloLabel text="SETOR DE DINÂMICA" position={[0, 2.35, -8.7]} />

      {[-0.2, 2.2, 4.4].map((z) => (
        <mesh key={z} position={[0, 0.12, z]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.14, 0.36, 3]} />
          <meshBasicMaterial color="#7eb8cc" transparent opacity={0.85} toneMapped={false} />
        </mesh>
      ))}

      <Atom />
      <NewtonCore />
      <Portrait />
      <Rover />
      <Rocket />
      <Lanes />
      <DockPad />
      <Station />
      <Starfield />
    </group>
  );
}
