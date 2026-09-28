import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { Overlay } from "./overlay";
import { CameraRig, Crates, FogTune, Lights, Puffs, Simulator, StudioEnv, Vectors } from "./runtime";
import {
  held,
  queueInteract,
  queueJump,
  queueScan,
  sim,
  startMission,
  toggleMap,
  togglePause,
} from "./sim";
import { Tigrao } from "./Tigrao";
import { World } from "./World";

export function Game() {
  useEffect(() => {
    sim.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let looking = false;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Tab") {
        event.preventDefault();
        toggleMap();
        return;
      }
      if (event.code === "Escape") {
        event.preventDefault();
        if (document.pointerLockElement) document.exitPointerLock();
        togglePause();
        return;
      }
      if (event.code === "KeyE") {
        if (!event.repeat) queueInteract();
        return;
      }
      if (event.code === "KeyQ") {
        if (!event.repeat) queueScan();
        return;
      }
      if (event.code === "Space" || event.code === "Enter") {
        if (sim.phase === "title") {
          event.preventDefault();
          if (!event.repeat) startMission();
          return;
        }
        if (event.code === "Space") {
          event.preventDefault();
          if (!event.repeat) queueJump();
        }
        return;
      }
      held.add(event.code);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      held.delete(event.code);
    };
    const onBlur = () => {
      held.clear();
      looking = false;
    };
    const onDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-ui]")) return;
      if (!(target instanceof HTMLCanvasElement)) return;
      looking = true;
      target.requestPointerLock?.();
    };
    const onUp = () => {
      looking = false;
    };
    const onMove = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-ui]")) return;
      if (!document.pointerLockElement && !looking) return;
      sim.lookDX += event.movementX;
      sim.lookDY += event.movementY;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("pointermove", onMove);
      held.clear();
    };
  }, []);

  return (
    <div className="stage">
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
