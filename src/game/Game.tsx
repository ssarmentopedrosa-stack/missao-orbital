import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Dressing } from "./dressing";
import { focusGame, installControls } from "./input";
import { Overlay } from "./overlay";
import { CINE_LEN } from "./layout";
import { CameraRig, Crates, FogTune, Lights, Puffs, Simulator, StudioEnv, Vectors } from "./runtime";
import {
  held,
  queueInteract,
  queueJump,
  queueScan,
  sim,
  startMission,
  subscribe,
  toggleMap,
  togglePause,
} from "./sim";
import { Tigrao } from "./Tigrao";
import { World } from "./World";

export function Game() {
  const cineOnce = useRef(false);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (cineOnce.current) return;
      if (sim.phase !== "title") {
        cineOnce.current = true;
        return;
      }
      if (sim.shotTime >= CINE_LEN) {
        cineOnce.current = true;
        startMission();
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    sim.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = stage.current;
    let phase = sim.phase;
    let looking = false;
    const removeKeys = installControls({
      held,
      root,
      getPhase: () => sim.phase,
      start: () => {
        startMission();
        focusGame(root);
      },
      jump: queueJump,
      interact: queueInteract,
      scan: queueScan,
      map: toggleMap,
      pause: togglePause,
    });
    const removeSub = subscribe(() => {
      if (sim.phase === "play" && phase !== "play") focusGame(root);
      phase = sim.phase;
    });

    const onDown = (event: PointerEvent) => {
      focusGame(root);
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-ui]")) return;
      if (!(target instanceof HTMLCanvasElement)) return;
      looking = true;
      const lock = target.requestPointerLock?.();
      if (lock && typeof lock.catch === "function") void lock.catch(() => {});
    };
    const onUp = () => {
      looking = false;
    };
    const onMove = (event: PointerEvent) => {
      if (!document.pointerLockElement && !looking) return;
      sim.lookDX += event.movementX;
      sim.lookDY += event.movementY;
    };

    focusGame(root);
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("pointermove", onMove);
    return () => {
      removeKeys();
      removeSub();
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="stage" ref={stage} tabIndex={0}>
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ fov: 46, position: [8, 205, 12], near: 0.08, far: 240 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#071018");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <fog attach="fog" args={["#071018", 9, 40]} />
        <Simulator />
        <StudioEnv />
        <FogTune />
        <Lights />
        <World />
        <Dressing />
        <Crates />
        <Vectors />
        <Puffs />
        <Tigrao />
        <CameraRig />
      </Canvas>
      <Overlay />
    </div>
  );
}
