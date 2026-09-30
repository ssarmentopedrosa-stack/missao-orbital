import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { DirectionalLight, Group, Mesh, MeshBasicMaterial } from "three";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { HoloLabel } from "./bits";
import { labelSprite } from "./draw";
import { pump } from "./audio";
import { elevator, hoistState, SHAFT, tickElevator } from "./elevator";
import { vectorLength } from "./hoist";
import { BLOCKS, CINE_LEN, CRATE_SPECS, DOCK, G, exteriorShot, shotIndex } from "./layout";
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
    tickElevator(dt);
    pump(sim.phase);
    M.alarm.emissiveIntensity = elevator.alarm
      ? 0.55 + (Math.sin(sim.time * 12) * 0.5 + 0.5) * 2.1
      : sim.phase === "title"
        ? 0.35 + (Math.sin(sim.time * 6) * 0.5 + 0.5) * 1.3
        : 0.2;
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
    const ext = sim.phase === "title" && exteriorShot(shotIndex(sim.shotTime));
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
    const ext = sim.phase === "title" && exteriorShot(shotIndex(sim.shotTime));
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
      <hemisphereLight args={["#d5e4ef", "#241c18", 0.46]} />
      <ambientLight intensity={0.1} />
      <Sun />
      <directionalLight position={[-8, 6, -6]} intensity={0.42} color="#7eb8cc" />
      <pointLight position={[0, 2.5, 5]} color="#e7eef6" distance={12} decay={2} intensity={1.35} />
      <pointLight ref={dock} position={[DOCK.x, 2.4, DOCK.z]} color="#7eb8cc" distance={9} decay={2} intensity={2.2} />
      <pointLight position={[0, 2.5, 7.2]} color="#e0a23a" distance={7} decay={2} intensity={0.55} />
      <pointLight position={[0, 2.6, -18]} color="#9fd0e4" distance={14} decay={2} intensity={0.85} />
      <pointLight position={[-5.2, 2.2, 5]} color="#9fd4e6" distance={6} decay={2} intensity={0.45} />
    </>
  );
}

function scripted(dt: number, camera: THREE.PerspectiveCamera): boolean {
  if (sim.stage === 2 && elevator.finale > 0) {
    const u = 1 - Math.min(1, elevator.finale / 7.2);
    desired.set(1.35, 2.4 + u * 5.1, -53.4);
    look.set(SHAFT.x, Math.min(8.4, elevator.y + 0.3), SHAFT.z);
    return true;
  }
  if (sim.stage === 2 && sim.transit > 0) {
    const u = 1 - sim.transit / 6.4;
    desired.set(-1.2 + u * 0.4, 2.15 + u * 1.4, sim.z + 3.1);
    look.set(SHAFT.x, 2.2 + u * 1.6, SHAFT.z);
    return true;
  }
  if (sim.phase === "title") {
    const shot = shotIndex(sim.shotTime);
    const u = sim.shotTime % CINE_LEN;
    if (shot === 0) {
      const a = u * 0.07;
      desired.set(Math.sin(a) * 16, 205.4, Math.cos(a) * 16);
      look.set(0.4, 201.15, 0);
    } else if (shot === 1) {
      const a = 0.65 + (u - 9) * 0.05;
      desired.set(Math.sin(a) * 8.2, 202.35, Math.cos(a) * 8.2);
      look.set(0.15, 200.7, 0.3);
    } else if (shot === 2) {
      const t = (u - 16) / 7;
      desired.set(6.1 - t * 1.4, 2.5, 10.3);
      look.set(0.1, 1.25, 3.4);
    } else if (shot === 3) {
      desired.set(0.15, 2.05, -2.6);
      look.set(0, 1.35, -8.2);
    } else if (shot === 4) {
      const t = (u - 29) / 8;
      desired.set(3.2 - t * 0.5, 1.85, -11.4);
      look.set(0, 0.55, -15.3);
    } else if (shot === 5) {
      desired.set(1.2, 1.82, 9.35);
      look.set(0, 1.28, 7.15);
    } else if (shot === 6) {
      desired.set(0.85, 1.68, 6.35);
      look.set(0, 0.85, -4);
    } else if (shot === 7) {
      desired.set(2.35, 1.42, -13.05);
      look.set(0, 0.48, -15.25);
    } else {
      const t = Math.min(1, (u - 58) / 5);
      desired.set(0.12, 1.52, 5.65 + t * 0.25);
      look.set(0, 1.42, 7.18);
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
      const pushing = sim.pushing;
      const scanning = sim.scanner && sim.speed < 0.45;
      const talking = Boolean(sim.line);
      const cruise = 5.25 + Math.min(sim.speed / 4.2, 1) * 0.45;
      const dist = pushing ? 4.45 : talking ? 4.4 : scanning ? 4.5 : sim.sprinting && sim.speed > 4 ? 6.2 : cruise;
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
      look.set(sim.x + sim.vx * 0.16, sim.y + 1.22, sim.z + sim.vz * 0.16);
      if (sim.scanner) {
        let best: (typeof sim.crates)[number] | null = null;
        let bestD = 6.5;
        for (const crate of sim.crates) {
          const d = Math.hypot(crate.x - sim.x, crate.z - sim.z);
          if (d < bestD) {
            bestD = d;
            best = crate;
          }
        }
        if (best) {
          look.x += (best.x - look.x) * 0.18;
          look.y += (best.h * 0.55 - look.y) * 0.08;
          look.z += (best.z - look.z) * 0.18;
        }
      }
      if (sim.stage === 2 && elevator.active && elevator.goal !== "done" && Math.hypot(sim.x - SHAFT.x, sim.z - SHAFT.z) < 12) {
        const aimY = Math.min(6.8, 1.15 + elevator.y * 0.42);
        look.y += (aimY - look.y) * 0.16;
        look.x += (SHAFT.x - look.x) * 0.08;
        look.z += (SHAFT.z - look.z) * 0.08;
      }
    }
    const jump = smooth.distanceTo(desired) > 24;
    const follow = sim.sprinting && sim.speed > 3 ? 7.4 : sim.pushing ? 6.2 : 4.5;
    const k = sim.reduce || jump ? 1 : 1 - Math.exp(-follow * capped);
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
        <mesh position={[0, 0.02, hz + 0.02]} material={M.suitBlue} dispose={null}>
          <boxGeometry args={[hx * 1.5, h * 0.28, 0.04]} />
        </mesh>
        <mesh position={[0, h * 0.2, hz + 0.05]} material={M.gold} dispose={null}>
          <sphereGeometry args={[0.055, 10, 8]} />
        </mesh>
        <mesh position={[0, h * 0.55, 0]} material={M.hull} dispose={null}>
          <cylinderGeometry args={[0.04, 0.04, 0.16, 8]} />
        </mesh>
        <mesh position={[0, h * 0.55 + 0.1, 0]} rotation={[Math.PI / 2, 0, 0]} material={M.suitBlue} dispose={null}>
          <torusGeometry args={[0.09, 0.015, 6, 12]} />
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
    for (let i = 0; i < 16; i++) {
      const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 0.4, 0xffffff, 0.16, 0.08);
      arrow.visible = false;
      group.add(arrow);
      arrows.push(arrow);
    }
    const labels = ["F", "v", "a", "f", "P", "N", "TRAÇÃO", "PESO", "RESULTANTE"];
    const tagColors = ["#f4f7fb", "#7eb8cc", "#c7c3ef", "#e0a23a", "#8aa0b5", "#d5e4ef", "#e0a23a", "#9fb0c0", "#f4f7fb"];
    const tags = labels.map((text, i) => {
      const color = tagColors[i] ?? "#fff";
      const { tex, w } = labelSprite(text, color);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
      sprite.visible = false;
      sprite.scale.set(i >= 6 ? Math.min(1.25, w) : 0.42, i >= 6 ? 0.18 : 0.16, 1);
      group.add(sprite);
      return sprite;
    });
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.45, 0.52, 28),
      new THREE.MeshBasicMaterial({ color: "#7eb8cc", transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.visible = false;
    group.add(ring);
    return { group, arrows, tags, ring };
  }, []);

  useFrame(() => {
    let n = 0;
    const show = (
      x: number,
      y: number,
      z: number,
      dx: number,
      dy: number,
      dz: number,
      len: number,
      color: number,
      label?: number,
    ) => {
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
      if (label != null && pack.tags[label]) {
        const sprite = pack.tags[label];
        sprite.visible = true;
        sprite.position.set(x + dir.x * (L + 0.18), y + dir.y * (L + 0.18) + 0.08, z + dir.z * (L + 0.18));
      }
    };
    pack.arrows.forEach((arrow) => {
      arrow.visible = false;
    });
    pack.tags.forEach((sprite) => {
      sprite.visible = false;
    });
    pack.ring.visible = false;
    if (sim.stage === 2 && elevator.active && sim.scanner && sim.phase === "play") {
      const h = hoistState();
      const y = h.y + 0.55;
      const span = Math.max(h.P, h.T, Math.abs(h.Fr), 80);
      const weight = vectorLength(h.P, span);
      const tension = vectorLength(h.T, span);
      const resultant = vectorLength(h.Fr, span);
      if (weight > 0) show(SHAFT.x - 0.22, y, SHAFT.z, 0, -1, 0, weight, 0x8aa0b5, 7);
      if (tension > 0) show(SHAFT.x + 0.22, y, SHAFT.z, 0, 1, 0, tension, 0xe0a23a, 6);
      if (resultant > 0) show(SHAFT.x + 0.62, y, SHAFT.z, 0, Math.sign(h.Fr) || 1, 0, resultant, 0xf4f7fb, 8);
      pack.ring.visible = true;
      pack.ring.position.set(SHAFT.x, 0.06, SHAFT.z);
      const pulse = 1 + Math.sin(sim.time * 4) * 0.05;
      pack.ring.scale.set(1.7 * pulse, 1.7 * pulse, 1);
      return;
    }
    const cineScan = sim.phase === "title" && (shotIndex(sim.shotTime) === 6 || shotIndex(sim.shotTime) === 7);
    if (cineScan) {
      const crate = sim.crates.find((item) => item.kind === "module");
      if (crate) {
        show(crate.x + crate.hx + 0.15, crate.h * 0.7, crate.z, 0, -1, 0, 0.55, 0x8aa0b5, 4);
        show(crate.x + crate.hx + 0.15, 0.15, crate.z, 0, 1, 0, 0.55, 0xd5e4ef, 5);
        pack.ring.visible = true;
        pack.ring.position.set(crate.x, 0.05, crate.z);
        pack.ring.scale.set(crate.hx * 2.6, crate.hx * 2.6, 1);
      }
      return;
    }
    if (!sim.scanner || sim.phase !== "play") return;
    let focus = -1;
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
      const accel =
        crate.blocked || crate.force < 1
          ? crate.speed > 0.08
            ? (-crate.mu * G) / 4
            : 0
          : (crate.force - crate.mu * crate.mass * G) / crate.mass;
      if (crate.speed > 0.15) {
        show(crate.x, y, crate.z, crate.vx, 0, crate.vz, crate.speed * 0.55, 0x7eb8cc, index === focus ? 1 : undefined);
        const f = (crate.mu * crate.mass * G) / 150;
        show(crate.x, y + 0.02, crate.z, -crate.vx, 0, -crate.vz, f, 0xe0a23a, index === focus ? 3 : undefined);
      } else if (crate.blocked && crate.force > 10) {
        show(crate.x, y, crate.z, -crate.dirX, 0, -crate.dirZ, (crate.muS * crate.mass * G) / 160, 0xe0a23a, index === focus ? 3 : undefined);
      }
      if (crate.force > 20) show(crate.x, y + 0.05, crate.z, crate.dirX, 0, crate.dirZ, crate.force / 170, 0xf4f7fb, index === focus ? 0 : undefined);
      if (Math.abs(accel) > 0.15 && crate.speed > 0.05) {
        const sign = accel >= 0 ? 1 : -1;
        const ax = crate.speed > 0.12 ? crate.vx * sign : crate.dirX;
        const az = crate.speed > 0.12 ? crate.vz * sign : crate.dirZ;
        show(crate.x, y + 0.12, crate.z, ax, 0, az, Math.min(1.4, Math.abs(accel) * 0.18), 0xc7c3ef, index === focus ? 2 : undefined);
      }
      if (index === focus) {
        show(crate.x + crate.hx + 0.15, crate.h * 0.7, crate.z, 0, -1, 0, 0.55, 0x8aa0b5, 4);
        show(crate.x + crate.hx + 0.15, 0.15, crate.z, 0, 1, 0, 0.55, 0xd5e4ef, 5);
        pack.ring.visible = true;
        pack.ring.position.set(crate.x, 0.05, crate.z);
        const pulse = 1 + Math.sin(sim.time * 4) * 0.06;
        pack.ring.scale.set(Math.max(crate.hx, crate.hz) * 2.4 * pulse, Math.max(crate.hx, crate.hz) * 2.4 * pulse, 1);
      }
    });
  });

  return <primitive object={pack.group} />;
}

export function Puffs() {
  const refs = useRef<(Mesh | null)[]>([]);
  const celebrated = useRef(false);
  useFrame((_, dt) => {
    if (sim.solved && !celebrated.current) {
      celebrated.current = true;
      sim.shake = Math.max(sim.shake, 0.1);
      sim.puffs.forEach((puff, i) => {
        const ang = (i / sim.puffs.length) * Math.PI * 2;
        puff.x = sim.x + Math.cos(ang) * 0.45;
        puff.z = sim.z + Math.sin(ang) * 0.45;
        puff.life = 1;
      });
    }
    if (!sim.solved) celebrated.current = false;
    if (sim.phase === "play") {
      for (const crate of sim.crates) {
        if (crate.speed < 1.4) continue;
        if (Math.random() > dt * 5) continue;
        const slot = sim.puffs.find((item) => item.life <= 0);
        if (!slot) break;
        slot.x = crate.x;
        slot.z = crate.z;
        slot.life = 0.55;
      }
    }
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
