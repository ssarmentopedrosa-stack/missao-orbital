import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { DirectionalLight, Group, Mesh, MeshBasicMaterial } from "three";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { HoloLabel } from "./bits";
import { pump } from "./audio";
import { BLOCKS, CRATE_SPECS, DOCK, G, shotIndex } from "./layout";
import { M } from "./materials";
import { installProbe, sim, step } from "./sim";

const desired = new THREE.Vector3();
const look = new THREE.Vector3();
const smooth = new THREE.Vector3(8, 205, 12);
const smoothLook = new THREE.Vector3(0, 201, 0);
const head = new THREE.Vector3();
const origin = new THREE.Vector3();
const dir = new THREE.Vector3();

function blocked(x: number, z: number): boolean {
  const r = 0.22;
  for (const block of BLOCKS) {
    if (x > block.minX - r && x < block.maxX + r && z > block.minZ - r && z < block.maxZ + r) return true;
  }
  return false;
}

export function Simulator() {
  useEffect(() => installProbe(), []);
  useFrame((_, raw) => {
    const dt = Math.min(raw, 0.05);
    let acc = dt;
    let guard = 0;
    while (acc > 0 && guard < 3) {
      const h = Math.min(acc, 1 / 60);
      step(h);
      acc -= h;
      guard += 1;
    }
    pump(sim.phase);
    M.alarm.emissiveIntensity = sim.phase === "title" ? 0.35 + (Math.sin(sim.time * 6) * 0.5 + 0.5) * 1.3 : 0.2;
    for (const puff of sim.puffs) {
      if (puff.life > 0) puff.life -= dt * 1.4;
    }
  });
  return null;
}

export function StudioEnv() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envScene = new RoomEnvironment();
    const tex = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = tex;
    scene.environmentIntensity = 0.42;
    return () => {
      tex.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

export function FogTune() {
  const scene = useThree((s) => s.scene);
  useFrame(() => {
    const fog = scene.fog;
    if (!(fog instanceof THREE.Fog)) return;
    const ext = sim.phase === "title" && shotIndex(sim.shotTime) === 0;
    fog.near = ext ? 18 : 9;
    fog.far = ext ? 80 : 40;
  });
  return null;
}

function Sun() {
  const light = useRef<DirectionalLight>(null);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const l = light.current;
    if (!l) return;
    scene.add(l.target);
    return () => {
      scene.remove(l.target);
    };
  }, [scene]);
  useFrame(() => {
    const l = light.current;
    if (!l) return;
    const ext = sim.phase === "title" && shotIndex(sim.shotTime) === 0;
    const x = ext ? 0 : sim.x;
    const y = ext ? 200 : 0;
    const z = ext ? 0 : sim.z;
    l.position.set(x + 8, y + 16, z + 6);
    l.target.position.set(x, y + 1, z);
    l.target.updateMatrixWorld();
  });
  return (
    <directionalLight
      ref={light}
      castShadow
      intensity={2.55}
      color="#f4f7fb"
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.00035}
      shadow-normalBias={0.04}
      shadow-camera-near={0.5}
      shadow-camera-far={34}
      shadow-camera-left={-8}
      shadow-camera-right={8}
      shadow-camera-top={8}
      shadow-camera-bottom={-8}
    />
  );
}

export function Lights() {
  const dock = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (dock.current) dock.current.intensity = sim.solved ? 7 : 2.4 + Math.sin(sim.time * 3) * 0.5;
  });
  return (
    <>
      <hemisphereLight args={["#d5e4ef", "#2a211c", 0.58]} />
      <ambientLight intensity={0.14} />
      <Sun />
      <pointLight position={[0, 2.5, 5]} color="#e7eef6" distance={11} decay={2} intensity={1.1} />
      <pointLight ref={dock} position={[DOCK.x, 2.4, DOCK.z]} color="#7eb8cc" distance={9} decay={2} intensity={2.2} />
      <pointLight position={[0, 2.5, 7.2]} color="#e0a23a" distance={6} decay={2} intensity={0.35} />
      <pointLight position={[0, 2.6, -18]} color="#9fd0e4" distance={12} decay={2} intensity={0.7} />
    </>
  );
}

function scripted(dt: number, camera: THREE.PerspectiveCamera): boolean {
  if (sim.phase === "title") {
    const shot = shotIndex(sim.shotTime);
    if (shot === 0) {
      const a = sim.shotTime * 0.13;
      desired.set(Math.sin(a) * 13.5, 204.2, Math.cos(a) * 13.5);
      look.set(0.6, 201.1, 0);
    } else if (shot === 1) {
      const u = (sim.shotTime % 21) - 8;
      desired.set(5.4 - u * 0.08, 2.35, 10.2);
      look.set(0.2, 1.25, 3.2);
    } else {
      const u = Math.min(1, ((sim.shotTime % 21) - 14) / 6);
      desired.set(0.12, 1.58, 5.85 + u * 0.42);
      look.set(0, 1.55, 7.15);
    }
    return true;
  }
  if (sim.phase === "cinema") {
    const a = 0.4 + sim.cinemaT * 0.32;
    desired.set(DOCK.x + Math.sin(a) * 6.4, 2.35 + sim.cinemaT * 0.12, DOCK.z + Math.cos(a) * 6.4);
    look.set(DOCK.x, 1.15, DOCK.z);
    return true;
  }
  if (sim.phase === "complete") {
    desired.set(sim.x + 2.4, 2.5, sim.z + 4.6);
    look.set(sim.x, 1.3, sim.z);
    return true;
  }
  void dt;
  void camera;
  return false;
}

export function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  useFrame((_, dt) => {
    const capped = Math.min(dt, 0.05);
    const script = scripted(capped, camera);
    if (!script) {
      const dist = sim.sprinting && sim.speed > 4 ? 5.85 : 5.45;
      const pitch = sim.camPitch;
      const yaw = sim.camYaw;
      const horiz = Math.cos(pitch) * dist;
      desired.set(sim.x + Math.sin(yaw) * horiz, sim.y + 1.02 + Math.sin(pitch) * dist * 0.62, sim.z + Math.cos(yaw) * horiz);
      head.set(sim.x, sim.y + 1.45, sim.z);
      let sx = head.x;
      let sy = head.y;
      let sz = head.z;
      for (let i = 1; i <= 10; i++) {
        const t = i / 10;
        const x = head.x + (desired.x - head.x) * t;
        const y = head.y + (desired.y - head.y) * t;
        const z = head.z + (desired.z - head.z) * t;
        if (y > 2.65 || blocked(x, z)) break;
        sx = x;
        sy = y;
        sz = z;
      }
      desired.set(sx, Math.max(0.45, sy), sz);
      look.set(sim.x + sim.vx * 0.1, sim.y + 1.28, sim.z + sim.vz * 0.1);
    }
    const jump = smooth.distanceTo(desired) > 24;
    const k = sim.reduce || jump ? 1 : 1 - Math.exp(-6.2 * capped);
    smooth.lerp(desired, k);
    smoothLook.lerp(look, k);
    camera.position.copy(smooth);
    if (!sim.reduce && sim.shake > 0.001) {
      camera.position.x += (Math.random() - 0.5) * sim.shake;
      camera.position.y += (Math.random() - 0.5) * sim.shake * 0.5;
      sim.shake *= Math.exp(-2.8 * capped);
    }
    camera.lookAt(smoothLook);
    const fov = sim.sprinting && sim.speed > 4.2 && sim.phase === "play" ? 50 : 46;
    if (Math.abs(camera.fov - fov) > 0.05) {
      camera.fov += (fov - camera.fov) * (1 - Math.exp(-5 * capped));
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

function CrateBody({ kind, hx, hz, h }: { kind: string; hx: number; hz: number; h: number }) {
  if (kind === "module") {
    return (
      <group>
        <mesh material={M.suit} castShadow dispose={null}>
          <boxGeometry args={[hx * 2, h, hz * 2]} />
        </mesh>
        <mesh position={[0, 0, hz + 0.01]} material={M.suitBlue} dispose={null}>
          <boxGeometry args={[hx * 1.4, h * 0.45, 0.04]} />
        </mesh>
        <mesh position={[0, h * 0.18, hz + 0.04]} material={M.gold} dispose={null}>
          <sphereGeometry args={[0.06, 10, 8]} />
        </mesh>
      </group>
    );
  }
  if (kind === "heavy") {
    return (
      <group>
        <mesh material={M.dark} castShadow dispose={null}>
          <boxGeometry args={[hx * 2, h, hz * 2]} />
        </mesh>
        <mesh position={[0, 0.05, hz + 0.01]} material={M.stripe} dispose={null}>
          <boxGeometry args={[hx * 1.7, 0.08, 0.04]} />
        </mesh>
        <mesh position={[0, -0.16, hz + 0.01]} material={M.stripe} dispose={null}>
          <boxGeometry args={[hx * 1.7, 0.08, 0.04]} />
        </mesh>
      </group>
    );
  }
  return (
    <mesh material={M.hull} castShadow dispose={null}>
      <boxGeometry args={[hx * 2, h, hz * 2]} />
    </mesh>
  );
}

function CrateView({ index }: { index: number }) {
  const ref = useRef<Group>(null);
  const spec = CRATE_SPECS[index];
  useFrame(() => {
    const crate = sim.crates[index];
    if (!crate || !ref.current || !spec) return;
    ref.current.position.set(crate.x, spec.h / 2 + 0.04, crate.z);
  });
  if (!spec) return null;
  return (
    <group ref={ref}>
      <CrateBody kind={spec.kind} hx={spec.hx} hz={spec.hz} h={spec.h} />
      <HoloLabel text={`${spec.name}  ${spec.mass} kg`} position={[0, spec.h / 2 + 0.28, 0]} />
    </group>
  );
}

export function Crates() {
  return (
    <group>
      {CRATE_SPECS.map((spec, index) => (
        <CrateView key={spec.id} index={index} />
      ))}
    </group>
  );
}

export function Vectors() {
  const pack = useMemo(() => {
    const group = new THREE.Group();
    const arrows: THREE.ArrowHelper[] = [];
    for (let i = 0; i < 12; i++) {
      const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 0.4, 0xffffff, 0.16, 0.08);
      arrow.visible = false;
      group.add(arrow);
      arrows.push(arrow);
    }
    return { group, arrows };
  }, []);

  useFrame(() => {
    let n = 0;
    const show = (x: number, y: number, z: number, dx: number, dy: number, dz: number, len: number, color: number) => {
      const arrow = pack.arrows[n];
      if (!arrow || len < 0.12) return;
      n += 1;
      origin.set(x, y, z);
      dir.set(dx, dy, dz);
      if (dir.lengthSq() < 1e-6) return;
      dir.normalize();
      arrow.visible = true;
      arrow.position.copy(origin);
      arrow.setColor(color);
      arrow.setDirection(dir);
      const L = Math.min(len, 2.2);
      arrow.setLength(L, Math.min(0.2, L * 0.32), Math.min(0.1, L * 0.16));
    };
    pack.arrows.forEach((arrow) => {
      arrow.visible = false;
    });
    if (!sim.scanner || sim.phase === "title") return;
    let focus = 99;
    let focusD = 6.5;
    sim.crates.forEach((crate, index) => {
      const d = Math.hypot(crate.x - sim.x, crate.z - sim.z);
      if (d < focusD) {
        focusD = d;
        focus = index;
      }
    });
    sim.crates.forEach((crate, index) => {
      const y = crate.h + 0.2;
      if (crate.speed > 0.15) {
        show(crate.x, y, crate.z, crate.vx, 0, crate.vz, crate.speed * 0.55, 0x7eb8cc);
        const f = (crate.mu * crate.mass * G) / 150;
        show(crate.x, y + 0.02, crate.z, -crate.vx, 0, -crate.vz, f, 0xe0a23a);
      } else if (crate.blocked && crate.force > 10) {
        show(crate.x, y, crate.z, -crate.dirX, 0, -crate.dirZ, (crate.muS * crate.mass * G) / 160, 0xe0a23a);
      }
      if (crate.force > 20) show(crate.x, y + 0.05, crate.z, crate.dirX, 0, crate.dirZ, crate.force / 170, 0xf4f7fb);
      if (index === focus) {
        show(crate.x + crate.hx + 0.15, crate.h * 0.7, crate.z, 0, -1, 0, 0.55, 0x8aa0b5);
        show(crate.x + crate.hx + 0.15, 0.15, crate.z, 0, 1, 0, 0.55, 0xd5e4ef);
      }
    });
  });

  return <primitive object={pack.group} />;
}

export function Puffs() {
  const refs = useRef<(Mesh | null)[]>([]);
  useFrame(() => {
    sim.puffs.forEach((puff, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      mesh.visible = puff.life > 0;
      if (puff.life <= 0) return;
      mesh.position.set(puff.x, 0.06, puff.z);
      const s = 0.4 + (1 - puff.life) * 1.3;
      mesh.scale.setScalar(s);
      const mat = mesh.material as MeshBasicMaterial;
      mat.opacity = Math.max(0, puff.life) * 0.7;
    });
  });
  return (
    <group>
      {sim.puffs.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          rotation={[-Math.PI / 2, 0, 0]}
          visible={false}
        >
          <ringGeometry args={[0.2, 0.28, 18]} />
          <meshBasicMaterial color="#d5e4ef" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
