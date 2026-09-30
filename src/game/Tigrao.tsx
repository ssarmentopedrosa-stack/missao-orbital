import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh, MeshStandardMaterial, PointLight } from "three";
import { sfx } from "./audio";
import { badgeTexture, plateTexture } from "./draw";
import { elevator, SHAFT } from "./elevator";
import { vault } from "./vault";
import { shotIndex, FICHA, NEWTON } from "./layout";
import { M } from "./materials";
import { sim } from "./sim";

type Mood = "normal" | "curious" | "alert" | "effort" | "surprise" | "confused" | "success" | "fail";

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

function clamp(v: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, v));
}

function lookYaw(x: number, z: number): number {
  const face = Math.atan2(-(x - sim.x), -(z - sim.z));
  return Math.atan2(Math.sin(face - sim.yaw), Math.cos(face - sim.yaw));
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
  const tailMid = useRef<Group>(null);
  const earL = useRef<Group>(null);
  const earR = useRef<Group>(null);
  const eyeL = useRef<Group>(null);
  const eyeR = useRef<Group>(null);
  const lidL = useRef<Mesh>(null);
  const lidR = useRef<Mesh>(null);
  const tongue = useRef<Mesh>(null);
  const brow = useRef<Group>(null);
  const wrist = useRef<Mesh>(null);
  const beam = useRef<Mesh>(null);
  const lamp = useRef<PointLight>(null);
  const wasAir = useRef(false);
  const airT = useRef(0);
  const land = useRef(0);
  const react = useRef(0);
  const confuse = useRef(0);
  const seenBlocked = useRef(sim.blocked);
  const seenHoist = useRef(0);
  const prevYaw = useRef(sim.yaw);
  const prevSpeed = useRef(0);
  const turn = useRef(0);
  const settle = useRef(0);
  const scanAt = useRef(0);
  const badge = useMemo(() => badgeTexture(), []);
  const nexus = useMemo(() => plateTexture("NEXUS"), []);
  const newton = useMemo(() => plateTexture("NEWTON-1"), []);

  useFrame((_, raw) => {
    const g = root.current;
    if (!g) return;
    const dt = Math.min(raw, 0.05);
    g.position.set(sim.x, sim.y, sim.z);
    g.rotation.y = sim.yaw;
    const t = sim.time;
    const run = sim.anim === "run";
    const moving = sim.anim === "walk" || run;
    const freq = moving ? (run ? 9.6 : 7.2) * (0.82 + 0.22 * Math.min(1, sim.speed / (run ? 6.4 : 4))) : 1.1;
    const amp = moving ? Math.min(0.62, 0.16 + sim.speed * 0.07) * (run ? 1.12 : 1) : 0.025;
    const swing = Math.sin(t * freq) * amp;
    const breathe = Math.sin(t * 1.55);
    const yawDelta = Math.atan2(Math.sin(sim.yaw - prevYaw.current), Math.cos(sim.yaw - prevYaw.current));
    prevYaw.current = sim.yaw;
    turn.current = approach(turn.current, clamp(-yawDelta * 9, -0.32, 0.32), dt, 8);
    if (sim.grounded && prevSpeed.current > 1.5 && sim.speed < 0.4) settle.current = 0.24;
    prevSpeed.current = sim.speed;

    if (!sim.grounded) {
      if (!wasAir.current) airT.current = 0;
      wasAir.current = true;
      airT.current += dt;
    } else if (wasAir.current) {
      wasAir.current = false;
      land.current = 0.2;
      airT.current = 0;
      if (sim.phase === "play") {
        sfx.land();
        sim.shake = Math.max(sim.shake, 0.07);
      }
    } else airT.current = 0;
    if (land.current > 0) land.current = Math.max(0, land.current - dt);
    if (sim.blocked !== seenBlocked.current) {
      seenBlocked.current = sim.blocked;
      if (sim.phase === "play") {
        react.current = 0.38;
        confuse.current = 1.1;
        sim.shake = Math.max(sim.shake, 0.05);
        sfx.fail();
      }
    }
    if (react.current > 0) react.current = Math.max(0, react.current - dt);
    if (confuse.current > 0) confuse.current = Math.max(0, confuse.current - dt);
    if (settle.current > 0) settle.current = Math.max(0, settle.current - dt);

    let near: { x: number; z: number; d: number } | null = null;
    for (const crate of sim.crates) {
      const d = Math.hypot(crate.x - sim.x, crate.z - sim.z);
      if (!near || d < near.d) near = { x: crate.x, z: crate.z, d };
    }

    const shot = sim.phase === "title" ? shotIndex(sim.shotTime) : -1;
    let mood: Mood = "normal";
    if (sim.anim === "celebrate" || (sim.solved && sim.phase !== "play")) mood = "success";
    else if (react.current > 0.16) mood = "surprise";
    else if (react.current > 0) mood = "fail";
    else if (confuse.current > 0.15 && sim.anim === "idle") mood = "confused";
    else if (sim.anim === "push") mood = "effort";
    else if (sim.anim === "scan" || (sim.scanner && sim.speed < 0.45) || shot === 6) mood = "curious";
    else if (shot === 3 || shot >= 8) mood = "alert";
    else if (shot === 4 || shot === 5 || shot === 7) mood = "curious";
    else if (near && near.d < 2.6 && sim.anim === "idle") mood = "curious";
    else if (!sim.grounded && sim.vy < 0) mood = "alert";
    if (sim.stage === 2 && elevator.active && sim.phase === "play") {
      if (elevator.flinch !== seenHoist.current) {
        seenHoist.current = elevator.flinch;
        react.current = 0.42;
      }
      if (elevator.done) mood = "success";
      else if (react.current > 0.16) mood = "surprise";
      else if (elevator.braking && !sim.scanner) mood = "effort";
      else if (sim.scanner && sim.speed < 0.45) mood = "curious";
    }
    if (sim.stage === 3 && vault.active && vault.goal === "done") mood = "success";

    const stride = moving ? Math.abs(Math.sin(t * freq)) : 0;
    let hipY = 0.7 + (moving ? stride * (run ? 0.045 : 0.028) - Math.abs(swing) * 0.04 : breathe * 0.01);
    if (mood === "success") hipY = 0.7 + Math.abs(Math.sin(t * 7.5)) * 0.055;

    let torsoX = breathe * 0.02 + (run ? -0.18 : moving ? -0.05 : 0);
    let torsoY = 0;
    const torsoZ = (moving ? Math.sin(t * freq) * (run ? 0.055 : 0.032) : Math.sin(t * 0.55) * 0.02) + turn.current;
    let lLeg = swing;
    let rLeg = -swing;
    let lArm = -swing * (run ? 1.05 : 0.78);
    let rArm = swing * (run ? 1.05 : 0.78);
    let lZ = 0.16;
    let rZ = -0.16;
    let lKnee = Math.max(0, -swing) * (run ? 1.15 : 0.95);
    let rKnee = Math.max(0, swing) * (run ? 1.15 : 0.95);
    let headX = moving ? -0.02 : Math.sin(t * 0.37) * 0.06;
    let headY = moving ? -Math.sin(t * freq) * 0.035 : Math.sin(t * 0.31) * 0.18;
    const headZ = moving ? -Math.sin(t * freq) * 0.025 : Math.sin(t * 0.47) * 0.03;
    let tailX = moving ? -0.15 : -0.42;
    let tailY = Math.sin(t * (run ? 8.2 : moving ? 4.6 : 1.55) + Math.sin(t * 0.4)) * (mood === "success" ? 0.7 : run ? 0.48 : moving ? 0.3 : 0.2);
    tailY += Math.sin(t * 0.63) * 0.07;

    if (sim.anim === "push") {
      torsoX = -0.58;
      lArm = 1.22;
      rArm = 1.22;
      lZ = 0.04;
      rZ = -0.04;
      lLeg = -0.28;
      rLeg = 0.42;
      lKnee = 0.55;
      rKnee = 0.22;
      headX = -0.16;
      tailX = 0.15;
      tailY *= 0.3;
    } else if (mood === "curious" && (sim.anim === "scan" || sim.scanner || shot === 6)) {
      lArm = 1.05;
      lZ = 0.34;
      rArm = 0.15;
      headX = 0.08;
    } else if (sim.anim === "jump") {
      const launch = airT.current < 0.09 && sim.vy > 0;
      const up = sim.vy > 0.2;
      if (launch) {
        lKnee = 0.9;
        rKnee = 0.85;
        lLeg = 0.32;
        rLeg = 0.28;
        torsoX = -0.22;
        lArm = -0.45;
        rArm = -0.4;
        hipY -= 0.04;
      } else if (up) {
        lLeg = -0.35;
        rLeg = -0.28;
        lArm = 2.15;
        rArm = 2.05;
        lKnee = 0.15;
        rKnee = 0.12;
        torsoX = 0.1;
        headX = 0.14;
      } else {
        lLeg = 0.18;
        rLeg = 0.12;
        lArm = -0.25;
        rArm = 0.35;
        lZ = 0.42;
        rZ = -0.42;
        lKnee = 0.25;
        rKnee = 0.2;
        torsoX = -0.08;
        headX = 0.12;
      }
    } else if (mood === "success") {
      lArm = 2.45;
      rArm = 2.45;
      lZ = 0.28;
      rZ = -0.28;
      headX = 0.22;
      tailX = -0.7;
    }

    if (sim.stage === 2 && elevator.active && (sim.anim === "idle" || sim.anim === "scan" || sim.scanner || elevator.alarm)) {
      headY = clamp(lookYaw(SHAFT.x, SHAFT.z), -0.7, 0.7);
      headX = elevator.alarm ? 0.22 : elevator.y > 5 ? 0.16 : -0.08;
    } else if (near && near.d < 4.2 && (sim.anim === "idle" || sim.anim === "push" || sim.anim === "scan" || sim.scanner)) {
      const aim = lookYaw(near.x, near.z);
      if (Math.abs(aim) < 1.45) {
        headY = clamp(aim, -0.7, 0.7);
        torsoY = clamp(headY * 0.28, -0.22, 0.22);
      }
      if (sim.anim === "push") headX = -0.12;
    }

    if (sim.line && sim.phase === "play" && sim.anim !== "push" && sim.anim !== "jump") {
      const spk = sim.line.speaker;
      const aim =
        spk === "NEWTON" ? lookYaw(NEWTON.x, NEWTON.z) : spk === "NEXUS" ? 0 : lookYaw(FICHA.x, FICHA.z);
      if (spk === "NEXUS") headX = -0.12;
      else if (Math.abs(aim) < 1.45) headY = clamp(aim, -0.6, 0.6);
      if (sim.anim === "idle") {
        rArm = 0.72;
        rZ = -0.22;
      }
    }

    if (sim.stage === 2 && elevator.adjusting && sim.anim === "idle" && !sim.line) {
      rArm = 1.12;
      rZ = -0.08;
      torsoX = -0.16;
      headX = -0.04;
    }

    if (shot === 3) {
      headY = Math.sin(t * 1.4) * 0.42;
      headX = -0.05;
    } else if (shot === 4 || shot === 7) {
      headX = -0.22;
      headY = 0.04;
    } else if (shot === 5) {
      headX = 0.08;
      headY = Math.sin(t * 0.8) * 0.28;
    } else if (shot === 6) {
      lArm = 1.02;
      lZ = 0.32;
      headX = 0.12;
      headY = 0.08;
    } else if (shot >= 8) {
      torsoX = -0.18;
      lArm = 0.55;
      rArm = 0.42;
      headX = 0.06;
      headY = 0;
    }

    if (react.current > 0) {
      const hit = react.current / 0.38;
      headX = react.current > 0.16 ? 0.32 : -0.06;
      headY = Math.sin(t * 18) * react.current * 0.45;
      torsoX = 0.16 * hit;
      torsoY = Math.sin(t * 14) * 0.08;
      tailX = 0.25;
      lZ = 0.36;
      rZ = -0.36;
      lArm = -0.5;
      rArm = -0.35;
    }

    if (land.current > 0 && sim.anim !== "jump") {
      const k = land.current / 0.2;
      lKnee += 0.6 * k;
      rKnee += 0.6 * k;
      lLeg += 0.18 * k;
      rLeg += 0.18 * k;
      torsoX -= 0.12 * k;
      hipY -= 0.025 * k;
    }
    if (settle.current > 0 && sim.anim === "idle") {
      const k = settle.current / 0.24;
      lKnee += 0.35 * k;
      rKnee += 0.35 * k;
      torsoX -= 0.08 * k;
      hipY -= 0.02 * k;
    }

    let earLZ = 1.15;
    let earRZ = -1.15;
    let earLX = 0.42;
    if (mood === "alert") {
      earLZ = 0.42;
      earRZ = -0.42;
      earLX = 0.05;
    } else if (mood === "curious") {
      earLZ = 0.55;
      earRZ = -1.2;
      earLX = 0.12;
    } else if (mood === "surprise") {
      earLZ = 0.18 + Math.sin(t * 22) * 0.14;
      earRZ = -0.18 - Math.sin(t * 22) * 0.14;
      earLX = -0.08;
    } else if (mood === "fail" || mood === "confused") {
      earLZ = 1.45;
      earRZ = -1.38;
      earLX = 0.62;
    } else if (mood === "effort") {
      earLZ = 1.32;
      earRZ = -1.32;
      earLX = 0.55;
    } else if (mood === "success") {
      earLZ = 0.95;
      earRZ = -0.9;
      earLX = 0.22;
    }
    const twitch = Math.sin(t * 2.7) * Math.max(0, Math.sin(t * 0.55));
    earLZ += twitch * 0.07;
    earRZ -= Math.sin(t * 1.6) * 0.035;

    if (hips.current) hips.current.position.y = approach(hips.current.position.y, hipY, dt, 10);
    setX(torso.current, torsoX, dt, sim.anim === "push" ? 8 : run ? 9 : 6);
    setY(torso.current, torsoY, dt, 7);
    setZ(torso.current, torsoZ, dt, 8);
    setX(legL.current, lLeg, dt, 16);
    setX(legR.current, rLeg, dt, 16);
    setX(kneeL.current, lKnee, dt, 16);
    setX(kneeR.current, rKnee, dt, 16);
    setX(armL.current, lArm, dt, 12);
    setX(armR.current, rArm, dt, 12);
    setZ(armL.current, lZ, dt, 12);
    setZ(armR.current, rZ, dt, 12);
    setX(head.current, headX, dt, 9);
    setY(head.current, headY, dt, 9);
    setZ(head.current, headZ, dt, 8);
    if (earL.current) {
      earL.current.rotation.z = approach(earL.current.rotation.z, earLZ, dt, mood === "surprise" ? 16 : 6);
      earL.current.rotation.x = approach(earL.current.rotation.x, earLX, dt, 6);
    }
    if (earR.current) {
      earR.current.rotation.z = approach(earR.current.rotation.z, earRZ, dt, mood === "surprise" ? 16 : 6);
      earR.current.rotation.x = approach(earR.current.rotation.x, earLX, dt, 6);
    }
    setX(tail.current, tailX, dt, 5);
    setY(tail.current, tailY, dt, 7);
    if (tailMid.current) {
      tailMid.current.rotation.y = approach(tailMid.current.rotation.y, Math.sin(t * (run ? 9 : 2.8) + 0.8) * (mood === "success" ? 0.55 : 0.28), dt, 8);
      tailMid.current.rotation.x = approach(tailMid.current.rotation.x, Math.sin(t * 1.3) * 0.12, dt, 6);
    }
    if (brow.current) {
      const furrow = mood === "effort" || mood === "confused" ? 0.35 : mood === "alert" ? 0.15 : 0;
      brow.current.rotation.x = approach(brow.current.rotation.x, furrow, dt, 8);
    }

    const gaze = clamp(-headY, -0.7, 0.7) * 0.02;
    const gazeY = clamp(-headX, -0.4, 0.4) * 0.012;
    if (eyeL.current) {
      eyeL.current.position.x = approach(eyeL.current.position.x, -0.07 + gaze, dt, 12);
      eyeL.current.position.y = approach(eyeL.current.position.y, 0.045 + gazeY, dt, 12);
    }
    if (eyeR.current) {
      eyeR.current.position.x = approach(eyeR.current.position.x, 0.07 + gaze, dt, 12);
      eyeR.current.position.y = approach(eyeR.current.position.y, 0.045 + gazeY, dt, 12);
    }

    const blink = Math.pow(Math.max(0, Math.sin(t * 1.15 + (mood === "alert" ? 1 : 0))), 46);
    if (lidL.current) lidL.current.scale.y = 0.28 + blink * 7;
    if (lidR.current) lidR.current.scale.y = 0.28 + blink * 7;
    if (tongue.current) {
      const out = mood === "success" ? 1.15 : mood === "effort" ? 0.45 : 0.12 + Math.sin(t * 1.6) * 0.05;
      tongue.current.scale.z = approach(tongue.current.scale.z, 0.85 + out, dt, 8);
      tongue.current.position.z = approach(tongue.current.position.z, -0.2 - out * 0.035, dt, 8);
    }
    if (wrist.current) {
      const mat = wrist.current.material;
      if (!Array.isArray(mat)) {
        (mat as MeshStandardMaterial).emissiveIntensity = sim.scanner || shot === 6 ? 1.9 + Math.sin(t * 8) * 0.4 : 0.08;
      }
    }
    const cineScan = shot === 6;
    const beamOn = cineScan || (sim.scanner && sim.phase === "play");
    if (beam.current) beam.current.visible = beamOn;
    if (lamp.current) lamp.current.intensity = beamOn ? 1.8 : 0;
    if (beamOn && t > scanAt.current) {
      scanAt.current = t + 0.85;
      sfx.scanTick();
    }
    if (root.current) {
      const blink = sim.stage === 3 && vault.active && vault.crew.invuln > 0 && Math.sin(sim.time * 22) > 0;
      root.current.visible = !blink;
    }
  });

  return (
    <group ref={root}>
      <group ref={hips} position={[0, 0.7, 0]}>
        <mesh material={M.suit} dispose={null} castShadow>
          <sphereGeometry args={[0.16, 16, 12]} />
        </mesh>
        <group ref={tail} position={[0, 0.02, 0.14]}>
          <mesh position={[0, 0.02, 0.07]} material={M.fur} dispose={null} castShadow>
            <sphereGeometry args={[0.055, 12, 10]} />
          </mesh>
          <group ref={tailMid} position={[0, 0.03, 0.12]}>
            <mesh position={[0, 0.02, 0.07]} material={M.muzzle} dispose={null}>
              <sphereGeometry args={[0.042, 10, 8]} />
            </mesh>
            <mesh position={[0.01, 0.05, 0.14]} material={M.fur} dispose={null}>
              <sphereGeometry args={[0.032, 10, 8]} />
            </mesh>
            <mesh position={[0.015, 0.07, 0.2]} material={M.muzzle} dispose={null}>
              <sphereGeometry args={[0.022, 8, 8]} />
            </mesh>
          </group>
        </group>

        <Leg side={-1} leg={legL} knee={kneeL} />
        <Leg side={1} leg={legR} knee={kneeR} />

        <group ref={torso} position={[0, 0.2, 0]}>
          <mesh position={[0, 0.16, 0]} scale={[1, 1.05, 0.82]} material={M.suit} dispose={null} castShadow>
            <sphereGeometry args={[0.24, 22, 16]} />
          </mesh>
          <mesh position={[0, 0.02, 0.02]} scale={[0.9, 0.7, 0.75]} material={M.suitDark} dispose={null}>
            <sphereGeometry args={[0.18, 16, 12]} />
          </mesh>
          <mesh position={[-0.2, 0.22, 0]} material={M.suitBlue} dispose={null}>
            <sphereGeometry args={[0.09, 12, 10]} />
          </mesh>
          <mesh position={[0.2, 0.22, 0]} material={M.suitBlue} dispose={null}>
            <sphereGeometry args={[0.09, 12, 10]} />
          </mesh>
          <mesh position={[0, 0.12, -0.16]} scale={[1.15, 0.85, 0.35]} material={M.suitBlue} dispose={null}>
            <sphereGeometry args={[0.12, 14, 10]} />
          </mesh>
          <mesh position={[0, 0.12, -0.22]} rotation={[0, Math.PI, 0]} dispose={null}>
            <planeGeometry args={[0.22, 0.12]} />
            <meshBasicMaterial map={badge} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0.32, -0.02]} material={M.muzzle} dispose={null}>
            <sphereGeometry args={[0.075, 12, 10]} />
          </mesh>
          <mesh position={[0, 0.36, 0.02]} material={M.fur} dispose={null}>
            <capsuleGeometry args={[0.055, 0.05, 4, 8]} />
          </mesh>
          <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]} material={M.hull} dispose={null}>
            <torusGeometry args={[0.09, 0.016, 6, 12]} />
          </mesh>
          <mesh position={[-0.11, -0.02, -0.08]} material={M.gold} dispose={null}>
            <boxGeometry args={[0.05, 0.05, 0.04]} />
          </mesh>
          <mesh position={[0.11, -0.02, -0.08]} material={M.gold} dispose={null}>
            <boxGeometry args={[0.05, 0.05, 0.04]} />
          </mesh>

          <mesh position={[0, 0.16, 0.2]} scale={[0.85, 1.05, 0.55]} material={M.suit} dispose={null} castShadow>
            <sphereGeometry args={[0.16, 16, 12]} />
          </mesh>
          <mesh position={[-0.06, 0.18, 0.28]} rotation={[0.15, 0, 0.1]} material={M.hull} dispose={null}>
            <cylinderGeometry args={[0.035, 0.035, 0.26, 8]} />
          </mesh>
          <mesh position={[0.06, 0.18, 0.28]} rotation={[0.15, 0, -0.1]} material={M.hull} dispose={null}>
            <cylinderGeometry args={[0.035, 0.035, 0.26, 8]} />
          </mesh>
          <mesh position={[-0.14, 0.34, 0.1]} rotation={[1.05, 0, 0.55]} material={M.pipe} dispose={null}>
            <cylinderGeometry args={[0.011, 0.011, 0.28, 6]} />
          </mesh>
          <mesh position={[0, 0.02, 0.28]} dispose={null}>
            <planeGeometry args={[0.16, 0.05]} />
            <meshBasicMaterial map={nexus} toneMapped={false} />
          </mesh>
          <mesh position={[0.08, 0.3, 0.18]} material={M.emit} dispose={null}>
            <sphereGeometry args={[0.02, 8, 8]} />
          </mesh>

          <mesh position={[0.26, 0.18, -0.02]} rotation={[0, Math.PI / 2, 0]} dispose={null}>
            <planeGeometry args={[0.1, 0.04]} />
            <meshBasicMaterial map={newton} toneMapped={false} />
          </mesh>

          <Arm side={-1} arm={armL} wrist={wrist} beam={beam} lamp={lamp} />
          <Arm side={1} arm={armR} />

          <group ref={head} position={[0, 0.52, -0.03]}>
            <mesh material={M.fur} dispose={null} castShadow>
              <sphereGeometry args={[0.2, 24, 18]} />
            </mesh>
            <mesh position={[0, -0.02, -0.13]} scale={[1.08, 0.78, 1.45]} material={M.muzzle} dispose={null} castShadow>
              <sphereGeometry args={[0.115, 18, 14]} />
            </mesh>
            <mesh position={[0, 0.04, -0.185]} scale={[0.7, 0.45, 0.22]} material={M.muzzle} dispose={null}>
              <sphereGeometry args={[0.07, 10, 8]} />
            </mesh>
            <mesh position={[-0.075, 0.035, -0.15]} scale={[1.15, 0.72, 0.45]} material={M.furDark} dispose={null}>
              <sphereGeometry args={[0.055, 10, 8]} />
            </mesh>
            <mesh position={[0.075, 0.035, -0.15]} scale={[1.15, 0.72, 0.45]} material={M.furDark} dispose={null}>
              <sphereGeometry args={[0.055, 10, 8]} />
            </mesh>
            <mesh position={[0, 0.012, -0.28]} material={M.nose} dispose={null}>
              <sphereGeometry args={[0.038, 12, 10]} />
            </mesh>
            <mesh position={[0, -0.05, -0.22]} rotation={[0.35, 0, 0]} material={M.furDark} dispose={null}>
              <boxGeometry args={[0.075, 0.01, 0.02]} />
            </mesh>
            <mesh ref={tongue} position={[0, -0.072, -0.2]} scale={[1, 0.62, 1]} material={M.tongue} dispose={null}>
              <sphereGeometry args={[0.026, 8, 8]} />
            </mesh>
            <group ref={brow} position={[0, 0.09, -0.17]}>
              <mesh position={[-0.055, 0, 0]} rotation={[0, 0, 0.35]} material={M.furDark} dispose={null}>
                <boxGeometry args={[0.055, 0.012, 0.016]} />
              </mesh>
              <mesh position={[0.055, 0, 0]} rotation={[0, 0, -0.35]} material={M.furDark} dispose={null}>
                <boxGeometry args={[0.055, 0.012, 0.016]} />
              </mesh>
            </group>
            <Eye x={-0.072} lid={lidL} look={eyeL} />
            <Eye x={0.072} lid={lidR} look={eyeR} />
            <group ref={earL} position={[-0.18, 0.12, 0.02]}>
              <mesh rotation={[0.35, 0.2, 0]} scale={[0.38, 1.7, 0.18]} material={M.fur} dispose={null} castShadow>
                <sphereGeometry args={[0.11, 12, 10]} />
              </mesh>
              <mesh position={[0.012, -0.02, -0.012]} rotation={[0.35, 0.2, 0]} scale={[0.2, 1.05, 0.1]} material={M.furDark} dispose={null}>
                <sphereGeometry args={[0.1, 10, 8]} />
              </mesh>
            </group>
            <group ref={earR} position={[0.18, 0.12, 0.02]}>
              <mesh rotation={[0.35, -0.2, 0]} scale={[0.38, 1.7, 0.18]} material={M.fur} dispose={null} castShadow>
                <sphereGeometry args={[0.11, 12, 10]} />
              </mesh>
              <mesh position={[-0.012, -0.02, -0.012]} rotation={[0.35, -0.2, 0]} scale={[0.2, 1.05, 0.1]} material={M.furDark} dispose={null}>
                <sphereGeometry args={[0.1, 10, 8]} />
              </mesh>
            </group>
            <mesh position={[0, 0.05, 0.11]} scale={[1.08, 1.0, 0.68]} material={M.suit} dispose={null} castShadow>
              <sphereGeometry args={[0.22, 20, 16]} />
            </mesh>
            <mesh position={[0, 0.07, -0.175]} scale={[1.45, 0.38, 0.32]} material={M.glass} dispose={null} renderOrder={3}>
              <sphereGeometry args={[0.1, 14, 10]} />
            </mesh>
            <mesh position={[0, -0.02, 0.08]} rotation={[1.2, 0, 0]} material={M.suitDark} dispose={null}>
              <torusGeometry args={[0.2, 0.018, 6, 16]} />
            </mesh>
            <mesh position={[-0.2, 0.0, 0.08]} material={M.suitBlue} dispose={null}>
              <sphereGeometry args={[0.038, 8, 8]} />
            </mesh>
            <mesh position={[0.2, 0.0, 0.08]} material={M.suitBlue} dispose={null}>
              <sphereGeometry args={[0.038, 8, 8]} />
            </mesh>
            <mesh position={[-0.22, 0.06, 0.04]} material={M.emit} dispose={null}>
              <sphereGeometry args={[0.015, 8, 8]} />
            </mesh>
            <mesh position={[0.22, 0.06, 0.04]} material={M.emit} dispose={null}>
              <sphereGeometry args={[0.015, 8, 8]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Leg({ side, leg, knee }: { side: number; leg: RefObject<Group | null>; knee: RefObject<Group | null> }) {
  return (
    <group ref={leg} position={[side * 0.12, -0.02, 0]}>
      <mesh position={[0, -0.16, 0]} material={M.suit} dispose={null} castShadow>
        <capsuleGeometry args={[0.07, 0.14, 4, 8]} />
      </mesh>
      <mesh position={[0, -0.22, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={M.suitBlue} dispose={null}>
        <torusGeometry args={[0.075, 0.016, 6, 10]} />
      </mesh>
      <group ref={knee} position={[0, -0.32, 0]}>
        <mesh position={[0, -0.14, 0]} material={M.suit} dispose={null} castShadow>
          <capsuleGeometry args={[0.055, 0.12, 3, 8]} />
        </mesh>
        <mesh position={[0, -0.28, 0.02]} material={M.boot} dispose={null} castShadow>
          <sphereGeometry args={[0.08, 12, 10]} />
        </mesh>
        <mesh position={[0, -0.3, -0.05]} scale={[1, 0.45, 1.15]} material={M.glove} dispose={null}>
          <sphereGeometry args={[0.055, 10, 8]} />
        </mesh>
        <mesh position={[0, -0.312, -0.09]} material={M.dark} dispose={null}>
          <sphereGeometry args={[0.016, 6, 6]} />
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
    <group ref={arm} position={[side * 0.28, 0.24, 0]}>
      <mesh position={[0, -0.14, 0]} material={M.suit} dispose={null} castShadow>
        <capsuleGeometry args={[0.05, 0.12, 3, 8]} />
      </mesh>
      <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]} material={M.hull} dispose={null}>
        <torusGeometry args={[0.055, 0.012, 6, 10]} />
      </mesh>
      <mesh position={[0, -0.32, 0]} material={M.suitDark} dispose={null} castShadow>
        <capsuleGeometry args={[0.042, 0.12, 3, 8]} />
      </mesh>
      <mesh position={[0, -0.46, -0.02]} material={M.glove} dispose={null} castShadow>
        <sphereGeometry args={[0.06, 12, 10]} />
      </mesh>
      <mesh position={[side * 0.015, -0.49, -0.065]} material={M.dark} dispose={null}>
        <sphereGeometry args={[0.014, 6, 6]} />
      </mesh>
      {side < 0 && wrist && beam && lamp ? (
        <>
          <mesh ref={wrist} position={[0, -0.4, -0.08]} dispose={null}>
            <boxGeometry args={[0.045, 0.03, 0.06]} />
            <meshStandardMaterial color="#7eb8cc" emissive="#7eb8cc" emissiveIntensity={0.08} roughness={0.35} metalness={0.4} />
          </mesh>
          <mesh ref={beam} position={[0, -0.5, -0.34]} rotation={[-1.05, 0, 0]} visible={false}>
            <cylinderGeometry args={[0.01, 0.055, 0.55, 8, 1, true]} />
            <meshBasicMaterial color="#9fd8ea" transparent opacity={0.32} depthWrite={false} />
          </mesh>
          <pointLight ref={lamp} position={[0, -0.46, -0.2]} color="#9fd4e6" distance={4.2} decay={2} intensity={0} />
        </>
      ) : null}
    </group>
  );
}

function Eye({ x, lid, look }: { x: number; lid: RefObject<Mesh | null>; look: RefObject<Group | null> }) {
  return (
    <group ref={look} position={[x, 0.045, -0.2]}>
      <mesh material={M.eye} dispose={null}>
        <sphereGeometry args={[0.046, 14, 12]} />
      </mesh>
      <mesh position={[0, 0, -0.022]} material={M.iris} dispose={null}>
        <sphereGeometry args={[0.028, 12, 10]} />
      </mesh>
      <mesh position={[0, 0, -0.038]} material={M.pupil} dispose={null}>
        <sphereGeometry args={[0.013, 8, 8]} />
      </mesh>
      <mesh position={[0.012, 0.012, -0.044]} dispose={null}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={lid} position={[0, 0.03, -0.02]} material={M.fur} dispose={null}>
        <boxGeometry args={[0.07, 0.01, 0.025]} />
      </mesh>
    </group>
  );
}
