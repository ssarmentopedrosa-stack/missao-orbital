import { sfx, unlockAudio } from "./audio";
import {
  BLOCKS,
  CRATE_SPECS,
  DOCK,
  FICHA,
  G,
  NEWTON,
  PLAYER_MASS,
  SHOVE_J,
  SPAWN,
  SPRINT_F,
  WALK_F,
  surfaceAt,
  type CrateKind,
} from "./layout";

export type Anim = "idle" | "walk" | "run" | "jump" | "push" | "scan" | "celebrate";
export type Phase = "title" | "play" | "cinema" | "complete";

export type Crate = {
  id: string;
  name: string;
  kind: CrateKind;
  x: number;
  z: number;
  vx: number;
  vz: number;
  mass: number;
  hx: number;
  hz: number;
  h: number;
  force: number;
  blocked: boolean;
  wasBlocked: boolean;
  wasPush: boolean;
  dirX: number;
  dirZ: number;
  docked: boolean;
  mu: number;
  muS: number;
  surface: string;
  speed: number;
};

export type Puff = { x: number; z: number; life: number };

export type Readout = {
  name: string;
  mass: number;
  mu: number;
  muS: number;
  surface: string;
  speed: number;
  force: number;
  accel: number;
  friction: number;
  staticFriction: number;
  blocked: boolean;
};

export type Result = { time: number; pushes: number; scans: number; blocked: number };

export type Snap = {
  phase: Phase;
  paused: boolean;
  mapOpen: boolean;
  scanner: boolean;
  objective: string;
  prompt: string | null;
  line: { speaker: string; text: string } | null;
  integrity: number;
  cell: number;
  pushes: number;
  scans: number;
  blocked: number;
  elapsed: number;
  readout: Readout | null;
  result: Result | null;
  best: number | null;
  freeplay: boolean;
  solved: boolean;
};

const KEY = "missao-newton-3d-v1";

export const held = new Set<string>();

function loadBest(): number | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { best?: unknown };
    return typeof parsed.best === "number" ? parsed.best : null;
  } catch {
    return null;
  }
}

function freshCrates(): Crate[] {
  return CRATE_SPECS.map((spec) => {
    const surf = surfaceAt(spec.x, spec.z);
    return {
      ...spec,
      vx: 0,
      vz: 0,
      force: 0,
      blocked: false,
      wasBlocked: false,
      wasPush: false,
      dirX: 0,
      dirZ: -1,
      docked: false,
      mu: surf.mu,
      muS: surf.muS,
      surface: surf.name,
      speed: 0,
    };
  });
}

export const sim = {
  phase: "title" as Phase,
  paused: false,
  mapOpen: false,
  scanner: false,
  freeplay: false,
  solved: false,
  x: SPAWN.x,
  y: 0,
  z: SPAWN.z,
  yaw: SPAWN.yaw,
  vx: 0,
  vy: 0,
  vz: 0,
  speed: 0,
  grounded: true,
  sprinting: false,
  pushing: false,
  anim: "idle" as Anim,
  animLock: null as Anim | null,
  camYaw: 0,
  camPitch: 0.38,
  lookDX: 0,
  lookDY: 0,
  time: 0,
  shotTime: 0,
  cinemaT: 0,
  t0: 0,
  shake: 0,
  integrity: 100,
  cell: 100,
  pushes: 0,
  scans: 0,
  blocked: 0,
  objective: "Entre no laboratório de inércia",
  line: null as { speaker: string; text: string; until: number } | null,
  result: null as Result | null,
  best: loadBest(),
  crates: freshCrates(),
  puffs: Array.from({ length: 6 }, () => ({ x: 0, z: 0, life: 0 })),
  touchX: 0,
  touchY: 0,
  touchSprint: false,
  padX: 0,
  padY: 0,
  padSprint: false,
  jumpEdge: false,
  interactEdge: false,
  scanEdge: false,
  pauseEdge: false,
  nextFoot: 0,
  nextHit: 0,
  sawHall: false,
  sawBay: false,
  sawScan: false,
  sawHeavy: false,
  sawWrong: false,
  reduce: false,
  _padA: false,
  _padX: false,
  _padY: false,
  _padStart: false,
};

const listeners = new Set<() => void>();
let snap: Snap = buildSnap();
let uiAcc = 0;
let lastPrompt: string | null = null;

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnap(): Snap {
  return snap;
}

function publishNow(): void {
  lastPrompt = computePrompt();
  snap = buildSnap();
  listeners.forEach((listener) => listener());
}

function buildSnap(): Snap {
  const line = sim.line && sim.time < sim.line.until ? { speaker: sim.line.speaker, text: sim.line.text } : null;
  return {
    phase: sim.phase,
    paused: sim.paused,
    mapOpen: sim.mapOpen,
    scanner: sim.scanner,
    objective: sim.objective,
    prompt: computePrompt(),
    line,
    integrity: sim.integrity,
    cell: sim.cell,
    pushes: sim.pushes,
    scans: sim.scans,
    blocked: sim.blocked,
    elapsed: Math.max(0, sim.time - sim.t0),
    readout: sim.scanner ? readout() : null,
    result: sim.result,
    best: sim.best,
    freeplay: sim.freeplay,
    solved: sim.solved,
  };
}

function dist(x: number, z: number): number {
  return Math.hypot(sim.x - x, sim.z - z);
}

function computePrompt(): string | null {
  if (sim.phase !== "play" || sim.paused || sim.mapOpen) return null;
  if (dist(NEWTON.x, NEWTON.z) < 2.1) return "E  ·  Falar com NEWTON";
  if (nearestCrate(1.8)) return "E  ·  Impulso    ·    caminhe para aplicar força";
  if (dist(FICHA.x, FICHA.z) < 2.1) return "E  ·  Ler a ficha de inércia";
  return null;
}

function focused(): Crate | null {
  return nearestCrate(6.5);
}

function nearestCrate(max: number): Crate | null {
  let best: Crate | null = null;
  let bestD = max;
  for (const crate of sim.crates) {
    const d = Math.hypot(crate.x - sim.x, crate.z - sim.z);
    if (d < bestD) {
      bestD = d;
      best = crate;
    }
  }
  return best;
}

function readout(): Readout | null {
  const crate = focused();
  if (!crate) return null;
  const n = crate.mass * G;
  const friction = crate.mu * n;
  const accel = crate.blocked
    ? 0
    : crate.force > 1
      ? (crate.force - friction) / crate.mass
      : crate.speed > 0.05
        ? -friction / crate.mass
        : 0;
  return {
    name: crate.name,
    mass: crate.mass,
    mu: crate.mu,
    muS: crate.muS,
    surface: crate.surface,
    speed: crate.speed,
    force: crate.force,
    accel,
    friction,
    staticFriction: crate.muS * n,
    blocked: crate.blocked,
  };
}

function say(speaker: string, text: string, seconds: number): void {
  sim.line = { speaker, text, until: sim.time + seconds };
  sfx.radio();
  publishNow();
}

function puff(x: number, z: number): void {
  const slot = sim.puffs.find((item) => item.life <= 0) ?? sim.puffs[0];
  if (!slot) return;
  slot.x = x;
  slot.z = z;
  slot.life = 1;
}

function saveResult(result: Result): void {
  const best = sim.best == null ? result.time : Math.min(sim.best, result.time);
  sim.best = best;
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: 1, best, last: result, clears: 1 }));
  } catch {
    /* ignore quota */
  }
}

export function startMission(): void {
  if (sim.phase !== "title") return;
  unlockAudio();
  sfx.ui();
  unlockPlay();
  say(
    "NEWTON",
    "Cadete Tigrão. O módulo de navegação está solto no laboratório de inércia. Leve-o à plataforma e observe o que a massa faz com o movimento.",
    7.2,
  );
}

function unlockPlay(): void {
  sim.phase = "play";
  sim.t0 = sim.time;
  sim.paused = false;
  sim.mapOpen = false;
  sim.objective = "Atravesse o corredor até o laboratório de inércia";
}

export function toggleMap(): void {
  if (sim.phase !== "play") return;
  sim.mapOpen = !sim.mapOpen;
  sim.paused = false;
  sfx.ui();
  publishNow();
}

export function togglePause(): void {
  if (sim.phase === "cinema") {
    sim.phase = "complete";
    publishNow();
    return;
  }
  if (sim.phase !== "play") return;
  if (sim.mapOpen) sim.mapOpen = false;
  else sim.paused = !sim.paused;
  sfx.ui();
  publishNow();
}

export function toggleScanner(): void {
  if (sim.phase !== "play" || sim.paused) return;
  if (!sim.scanner && sim.cell < 4) {
    say("NEXUS", "Célula do scanner ainda recarregando.", 2.4);
    return;
  }
  sim.scanner = !sim.scanner;
  if (sim.scanner) {
    sim.scans += 1;
    sfx.scan();
    if (!sim.sawScan) {
      sim.sawScan = true;
      say(
        "NEXUS",
        "Scanner ativo. Ciano é velocidade, âmbar é atrito, branco é a sua força. Se ela não vence o atrito estático, o corpo não sai do lugar.",
        6.5,
      );
      return;
    }
  }
  publishNow();
}

export function queueJump(): void {
  sim.jumpEdge = true;
}
export function queueInteract(): void {
  sim.interactEdge = true;
}
export function queueScan(): void {
  sim.scanEdge = true;
}
export function setStick(x: number, y: number): void {
  sim.touchX = x;
  sim.touchY = y;
}
export function setTouchSprint(on: boolean): void {
  sim.touchSprint = on;
}

export function continueLab(): void {
  sim.phase = "play";
  sim.freeplay = true;
  sim.paused = false;
  sim.mapOpen = false;
  sim.animLock = null;
  sim.objective = "Laboratório livre: compare massa, força e atrito";
  publishNow();
}

export function restart(toTitle: boolean): void {
  sim.crates = freshCrates();
  sim.x = SPAWN.x;
  sim.y = 0;
  sim.z = SPAWN.z;
  sim.yaw = SPAWN.yaw;
  sim.vx = 0;
  sim.vy = 0;
  sim.vz = 0;
  sim.speed = 0;
  sim.grounded = true;
  sim.camYaw = 0;
  sim.camPitch = 0.38;
  sim.paused = false;
  sim.mapOpen = false;
  sim.scanner = false;
  sim.freeplay = false;
  sim.solved = false;
  sim.integrity = 100;
  sim.cell = 100;
  sim.pushes = 0;
  sim.scans = 0;
  sim.blocked = 0;
  sim.result = null;
  sim.animLock = null;
  sim.anim = "idle";
  sim.shake = 0;
  sim.cinemaT = 0;
  sim.sawHall = false;
  sim.sawBay = false;
  sim.sawScan = false;
  sim.sawHeavy = false;
  sim.sawWrong = false;
  sim.line = null;
  sim.shotTime = 0;
  if (toTitle) {
    sim.phase = "title";
    sim.objective = "Entre no laboratório de inércia";
  } else {
    sim.phase = "play";
    sim.t0 = sim.time;
    sim.objective = "Atravesse o corredor até o laboratório de inércia";
  }
  sfx.ui();
  publishNow();
}

function resolveCircle(x: number, z: number, radius: number): { x: number; z: number } {
  for (const block of BLOCKS) {
    const cx = Math.max(block.minX, Math.min(x, block.maxX));
    const cz = Math.max(block.minZ, Math.min(z, block.maxZ));
    let dx = x - cx;
    let dz = z - cz;
    const d2 = dx * dx + dz * dz;
    if (d2 >= radius * radius) continue;
    if (d2 < 1e-8) {
      const left = x - block.minX;
      const right = block.maxX - x;
      const back = z - block.minZ;
      const fwd = block.maxZ - z;
      const m = Math.min(left, right, back, fwd);
      if (m === left) x = block.minX - radius;
      else if (m === right) x = block.maxX + radius;
      else if (m === back) z = block.minZ - radius;
      else z = block.maxZ + radius;
      continue;
    }
    const d = Math.sqrt(d2);
    const push = (radius - d) / d;
    x += dx * push;
    z += dz * push;
  }
  return { x, z };
}

function resolveCrateBlock(crate: Crate, block: (typeof BLOCKS)[number]): void {
  const overlapX = Math.min(crate.x + crate.hx, block.maxX) - Math.max(crate.x - crate.hx, block.minX);
  const overlapZ = Math.min(crate.z + crate.hz, block.maxZ) - Math.max(crate.z - crate.hz, block.minZ);
  if (overlapX <= 0 || overlapZ <= 0) return;
  if (overlapX < overlapZ) {
    crate.x += crate.x > (block.minX + block.maxX) / 2 ? overlapX : -overlapX;
    crate.vx *= -0.08;
  } else {
    crate.z += crate.z > (block.minZ + block.maxZ) / 2 ? overlapZ : -overlapZ;
    crate.vz *= -0.08;
  }
}

function shove(): boolean {
  const fx = -Math.sin(sim.yaw);
  const fz = -Math.cos(sim.yaw);
  let best: Crate | null = null;
  let bestD = 1.7;
  for (const crate of sim.crates) {
    if (crate.docked) continue;
    const dx = crate.x - sim.x;
    const dz = crate.z - sim.z;
    const d = Math.hypot(dx, dz) || 1;
    const dot = (dx * fx + dz * fz) / d;
    if (d < bestD && dot > 0.2) {
      best = crate;
      bestD = d;
    }
  }
  if (!best) return false;
  const surf = surfaceAt(best.x, best.z);
  const vAdd = SHOVE_J / best.mass;
  best.vx += fx * vAdd;
  best.vz += fz * vAdd;
  best.dirX = fx;
  best.dirZ = fz;
  best.force = SHOVE_J / 0.18;
  sim.vx -= fx * (SHOVE_J / PLAYER_MASS) * 0.45;
  sim.vz -= fz * (SHOVE_J / PLAYER_MASS) * 0.45;
  sim.pushes += 1;
  sim.pushing = true;
  puff(best.x, best.z);
  sfx.shove();
  best.surface = surf.name;
  return true;
}

function tryInteract(): void {
  if (dist(NEWTON.x, NEWTON.z) < 2.15) {
    say(
      "NEWTON",
      "Sem força resultante, o movimento não muda. A sua força entra no F de F = m · a. Massa maior, mesma força, menos aceleração.",
      6.4,
    );
    return;
  }
  if (shove()) return;
  if (dist(FICHA.x, FICHA.z) < 2.15) {
    say(
      "FICHA 01",
      "Inércia: velocidade constante se a força resultante é zero. Atrito estático impede o início; o cinético freia. Suas botas são magnéticas — o piso age nos módulos, não em você.",
      7,
    );
    return;
  }
}

function pollPad(): void {
  const pads = navigator.getGamepads?.();
  const pad = pads?.[0];
  if (!pad) {
    sim.padX = 0;
    sim.padY = 0;
    sim.padSprint = false;
    return;
  }
  const dead = 0.18;
  const lx = pad.axes[0] ?? 0;
  const ly = pad.axes[1] ?? 0;
  const rx = pad.axes[2] ?? 0;
  const ry = pad.axes[3] ?? 0;
  sim.padX = Math.abs(lx) > dead ? lx : 0;
  sim.padY = Math.abs(ly) > dead ? -ly : 0;
  sim.padSprint = Boolean(pad.buttons[7]?.pressed || pad.buttons[5]?.pressed);
  if (Math.abs(rx) > dead) sim.lookDX += rx * 14;
  if (Math.abs(ry) > dead) sim.lookDY += ry * 10;
  const a = Boolean(pad.buttons[0]?.pressed);
  const x = Boolean(pad.buttons[2]?.pressed);
  const y = Boolean(pad.buttons[3]?.pressed);
  const start = Boolean(pad.buttons[9]?.pressed);
  if (a && !sim._padA) {
    if (sim.phase === "title") startMission();
    else sim.jumpEdge = true;
  }
  if (x && !sim._padX) sim.interactEdge = true;
  if (y && !sim._padY) sim.scanEdge = true;
  if (start && !sim._padStart) sim.pauseEdge = true;
  sim._padA = a;
  sim._padX = x;
  sim._padY = y;
  sim._padStart = start;
}

function tickCells(dt: number): void {
  if (sim.scanner) {
    sim.cell = Math.max(0, sim.cell - dt * 5);
    if (sim.cell <= 0) {
      sim.scanner = false;
      say("NEXUS", "Célula esgotada. O scanner recarrega sozinho.", 2.6);
    }
  } else {
    sim.cell = Math.min(100, sim.cell + dt * 10);
  }
}

function solve(module: Crate): void {
  module.docked = true;
  module.x = DOCK.x;
  module.z = DOCK.z;
  module.vx = 0;
  module.vz = 0;
  sim.solved = true;
  sim.phase = "cinema";
  sim.cinemaT = 0;
  sim.shake = 0.2;
  sim.animLock = "celebrate";
  sim.result = {
    time: Math.max(0, sim.time - sim.t0),
    pushes: sim.pushes,
    scans: sim.scans,
    blocked: sim.blocked,
  };
  saveResult(sim.result);
  sfx.success();
  say("NEWTON", "Módulo acoplado. Você usou a inércia — não apenas repetiu uma fórmula. A Newton-1 registra o cadete.", 6.5);
}

export function step(dt: number): void {
  sim.time += dt;
  if (sim.phase === "play" || sim.phase === "title") {
    try {
      pollPad();
    } catch {
      /* gamepad unsupported */
    }
  }

  if (sim.phase === "title") {
    sim.shotTime += dt;
    sim.anim = "idle";
    sim.lookDX = 0;
    sim.lookDY = 0;
    sim.speed = 0;
    return;
  }

  if (sim.phase === "cinema") {
    sim.cinemaT += dt;
    sim.anim = "celebrate";
    const module = sim.crates.find((crate) => crate.kind === "module");
    if (module) {
      module.x = DOCK.x;
      module.z = DOCK.z;
      module.vx = 0;
      module.vz = 0;
    }
    if (sim.cinemaT > 3.5) {
      sim.phase = "complete";
      publishNow();
    }
    return;
  }

  if (sim.phase === "complete") {
    sim.anim = "celebrate";
    sim.lookDX = 0;
    sim.lookDY = 0;
    return;
  }

  if (sim.pauseEdge) {
    sim.pauseEdge = false;
    togglePause();
  }
  if (sim.scanEdge) {
    sim.scanEdge = false;
    toggleScanner();
  }

  if (sim.paused || sim.mapOpen) {
    sim.vx = 0;
    sim.vz = 0;
    sim.speed = 0;
    sim.anim = "idle";
    sim.lookDX = 0;
    sim.lookDY = 0;
    uiAcc += dt;
    if (uiAcc > 0.25) {
      uiAcc = 0;
      publishNow();
    }
    return;
  }

  sim.camYaw -= sim.lookDX * 0.0042;
  sim.camPitch = Math.max(0.22, Math.min(0.78, sim.camPitch - sim.lookDY * 0.0032));
  sim.lookDX = 0;
  sim.lookDY = 0;

  let ix = sim.touchX + sim.padX;
  let iz = sim.touchY + sim.padY;
  if (held.has("KeyA") || held.has("ArrowLeft")) ix -= 1;
  if (held.has("KeyD") || held.has("ArrowRight")) ix += 1;
  if (held.has("KeyW") || held.has("ArrowUp")) iz += 1;
  if (held.has("KeyS") || held.has("ArrowDown")) iz -= 1;
  const mag = Math.hypot(ix, iz);
  if (mag > 1) {
    ix /= mag;
    iz /= mag;
  }
  const sprint = held.has("ShiftLeft") || held.has("ShiftRight") || sim.padSprint || sim.touchSprint;
  sim.sprinting = sprint && mag > 0.08;

  const fx = -Math.sin(sim.camYaw);
  const fz = -Math.cos(sim.camYaw);
  const rx = Math.cos(sim.camYaw);
  const rz = -Math.sin(sim.camYaw);
  let wnx = 0;
  let wnz = 0;
  const wish = Math.min(1, mag);
  if (wish > 0.01) {
    const wx = fx * iz + rx * ix;
    const wz = fz * iz + rz * ix;
    const wl = Math.hypot(wx, wz) || 1;
    wnx = wx / wl;
    wnz = wz / wl;
    const target = Math.atan2(-wnx, -wnz);
    const delta = Math.atan2(Math.sin(target - sim.yaw), Math.cos(target - sim.yaw));
    sim.yaw += delta * Math.min(1, 12 * dt);
  }

  const max = sim.sprinting ? 6.6 : 4.25;
  const tvx = wnx * max * wish;
  const tvz = wnz * max * wish;
  const rate = sim.grounded ? 16 : 3.2;
  const blend = 1 - Math.exp(-rate * dt);
  sim.vx += (tvx - sim.vx) * blend;
  sim.vz += (tvz - sim.vz) * blend;

  if (sim.jumpEdge && sim.grounded) {
    sim.vy = 5.45;
    sim.grounded = false;
    sfx.jump();
  }
  sim.jumpEdge = false;

  sim.vy += -18 * dt;
  sim.y += sim.vy * dt;
  if (sim.y <= 0) {
    sim.y = 0;
    sim.vy = 0;
    sim.grounded = true;
  }

  sim.x += sim.vx * dt;
  sim.z += sim.vz * dt;
  const resolved = resolveCircle(sim.x, sim.z, 0.34);
  sim.x = resolved.x;
  sim.z = resolved.z;
  sim.speed = Math.hypot(sim.vx, sim.vz);

  if (sim.grounded && sim.speed > 0.8 && sim.time > sim.nextFoot) {
    sim.nextFoot = sim.time + (sim.sprinting ? 0.28 : 0.42);
    sfx.foot();
  }

  if (sim.interactEdge) {
    sim.interactEdge = false;
    tryInteract();
  }

  sim.pushing = false;
  tickCells(dt);

  for (const crate of sim.crates) {
    crate.force = Math.max(0, crate.force - dt * 90);
    crate.blocked = false;
    if (crate.docked) {
      crate.x = DOCK.x;
      crate.z = DOCK.z;
      crate.vx = 0;
      crate.vz = 0;
      crate.speed = 0;
      continue;
    }

    const surf = surfaceAt(crate.x, crate.z);
    crate.mu = surf.mu;
    crate.muS = surf.muS;
    crate.surface = surf.name;

    const closestX = Math.max(crate.x - crate.hx, Math.min(sim.x, crate.x + crate.hx));
    const closestZ = Math.max(crate.z - crate.hz, Math.min(sim.z, crate.z + crate.hz));
    let dx = sim.x - closestX;
    let dz = sim.z - closestZ;
    let d = Math.hypot(dx, dz);
    const radius = 0.36;
    if (d < radius) {
      if (d < 1e-4) {
        dx = sim.x - crate.x || 1;
        dz = sim.z - crate.z;
        d = Math.hypot(dx, dz) || 1;
      }
      const nx = dx / d;
      const nz = dz / d;
      const into = -(sim.vx * nx + sim.vz * nz);
      const pushF = sim.sprinting ? SPRINT_F : WALK_F;
      const speedNow = Math.hypot(crate.vx, crate.vz);
      const blocked = speedNow < 0.12 && into > 0.2 && pushF < surf.muS * crate.mass * G;
      const pen = radius - d;
      if (blocked || into <= 0.12) {
        sim.x += nx * pen;
        sim.z += nz * pen;
      } else {
        const wa = 1 / PLAYER_MASS;
        const wb = 1 / crate.mass;
        const share = wa + wb;
        sim.x += nx * pen * (wa / share);
        sim.z += nz * pen * (wa / share);
        crate.x -= nx * pen * (wb / share);
        crate.z -= nz * pen * (wb / share);
      }
      if (into > 0.2) {
        crate.dirX = -nx;
        crate.dirZ = -nz;
        crate.force = pushF;
        if (blocked) {
          crate.blocked = true;
          if (!crate.wasBlocked) sim.blocked += 1;
          const vin = -(sim.vx * nx + sim.vz * nz);
          if (vin > 0) {
            sim.vx += nx * vin;
            sim.vz += nz * vin;
          }
          if (crate.kind === "heavy" && !sim.sawHeavy) {
            sim.sawHeavy = true;
            say("NEWTON", "A bateria não se move. Abra o scanner e compare a sua força com o atrito estático.", 5.5);
          }
        } else {
          const scale = Math.min(1, into / 2.2);
          crate.vx -= nx * (pushF / crate.mass) * scale * dt;
          crate.vz -= nz * (pushF / crate.mass) * scale * dt;
          sim.vx += nx * (pushF / PLAYER_MASS) * 0.55 * scale * dt;
          sim.vz += nz * (pushF / PLAYER_MASS) * 0.55 * scale * dt;
          sim.pushing = true;
          if (!crate.wasPush) {
            sim.pushes += 1;
            puff(crate.x, crate.z);
            sfx.shove();
          }
        }
      }
    }
    crate.wasBlocked = crate.blocked;
    crate.wasPush = crate.force > 40 && !crate.blocked;

    const v0 = Math.hypot(crate.vx, crate.vz);
    const drop = Math.min(surf.mu * G * dt, v0);
    if (v0 > 0.001 && drop > 0) {
      crate.vx -= (crate.vx / v0) * drop;
      crate.vz -= (crate.vz / v0) * drop;
    }
    if (Math.hypot(crate.vx, crate.vz) < 0.06 && crate.force < 30) {
      crate.vx = 0;
      crate.vz = 0;
    }
    const sp = Math.hypot(crate.vx, crate.vz);
    if (sp > 6) {
      crate.vx = (crate.vx / sp) * 6;
      crate.vz = (crate.vz / sp) * 6;
    }
    crate.x += crate.vx * dt;
    crate.z += crate.vz * dt;
    crate.speed = Math.hypot(crate.vx, crate.vz);

    if (crate.kind === "module") {
      const dx = DOCK.x - crate.x;
      const dz = DOCK.z - crate.z;
      const dd = Math.hypot(dx, dz);
      if (dd < 1.75 && dd > 0.001) {
        const pull = 2.4 * (1.75 - dd);
        crate.vx += (dx / dd) * pull * dt;
        crate.vz += (dz / dd) * pull * dt;
        crate.vx *= 1 - Math.min(0.5, 1.6 * dt);
        crate.vz *= 1 - Math.min(0.5, 1.6 * dt);
      }
      if (dd < 0.62 && crate.speed < 0.9) solve(crate);
    } else if (!sim.sawWrong && crate.speed < 0.4) {
      const dd = Math.hypot(DOCK.x - crate.x, DOCK.z - crate.z);
      if (dd < 0.85) {
        sim.sawWrong = true;
        say("NEWTON", "A plataforma só trava o módulo de navegação. Massa certa, corpo certo.", 4.2);
      }
    }
  }

  const settled = resolveCircle(sim.x, sim.z, 0.34);
  sim.x = settled.x;
  sim.z = settled.z;
  sim.speed = Math.hypot(sim.vx, sim.vz);

  for (const crate of sim.crates) {
    if (crate.docked) continue;
    for (const block of BLOCKS) resolveCrateBlock(crate, block);
  }
  for (let i = 0; i < sim.crates.length; i++) {
    for (let j = i + 1; j < sim.crates.length; j++) {
      const a = sim.crates[i];
      const b = sim.crates[j];
      if (!a || !b || a.docked || b.docked) continue;
      const overlapX = a.hx + b.hx - Math.abs(b.x - a.x);
      const overlapZ = a.hz + b.hz - Math.abs(b.z - a.z);
      if (overlapX <= 0 || overlapZ <= 0) continue;
      const wa = 1 / a.mass;
      const wb = 1 / b.mass;
      if (overlapX < overlapZ) {
        const sign = b.x >= a.x ? 1 : -1;
        a.x -= sign * overlapX * (wa / (wa + wb));
        b.x += sign * overlapX * (wb / (wa + wb));
      } else {
        const sign = b.z >= a.z ? 1 : -1;
        a.z -= sign * overlapZ * (wa / (wa + wb));
        b.z += sign * overlapZ * (wb / (wa + wb));
      }
    }
  }

  for (const crate of sim.crates) {
    if (crate.docked || crate.speed < 3.5 || sim.time < sim.nextHit) continue;
    const closestX = Math.max(crate.x - crate.hx, Math.min(sim.x, crate.x + crate.hx));
    const closestZ = Math.max(crate.z - crate.hz, Math.min(sim.z, crate.z + crate.hz));
    if (Math.hypot(sim.x - closestX, sim.z - closestZ) < 0.42) {
      sim.integrity = Math.max(0, sim.integrity - Math.min(22, crate.speed * 3));
      sim.nextHit = sim.time + 0.9;
      sim.shake = 0.16;
      sfx.hit();
      if (sim.integrity <= 0) {
        sim.integrity = 58;
        say("NEWTON", "Impacto no traje. Saia da linha do movimento — inércia não desvia sozinha.", 4);
      }
    }
  }

  if (!sim.sawHall && sim.z < -1.6) {
    sim.sawHall = true;
    say(
      "NEWTON",
      "Três pistas à frente: gelo, metal e borracha. A força que você aplica é a mesma. A aceleração, não.",
      6,
    );
  }
  if (!sim.sawBay && sim.z < -10.2) {
    sim.sawBay = true;
    sim.objective = sim.solved ? sim.objective : "Acople o módulo de 20 kg na plataforma azul";
    say(
      "NEWTON",
      "Empurre o módulo de 20 kg até a plataforma. Quando soltar, ele continua — até o atrito agir.",
      6.2,
    );
  }

  if (sim.animLock) sim.anim = sim.animLock;
  else if (!sim.grounded) sim.anim = "jump";
  else if (sim.pushing) sim.anim = "push";
  else if (sim.scanner && sim.speed < 0.35) sim.anim = "scan";
  else if (sim.speed > 5.1) sim.anim = "run";
  else if (sim.speed > 0.28) sim.anim = "walk";
  else sim.anim = "idle";

  uiAcc += dt;
  const prompt = computePrompt();
  if (sim.line && sim.time >= sim.line.until) {
    sim.line = null;
    publishNow();
    uiAcc = 0;
  } else if (uiAcc > 0.2 || prompt !== lastPrompt) {
    uiAcc = 0;
    publishNow();
  }
}

export function installProbe(): void {
  window.__controlsTest = {
    getYaw: () => sim.yaw,
    getSpeed: () => Math.hypot(sim.vx, sim.vz),
    getHeld: () => [...held],
    getState: () => ({
      phase: sim.phase,
      x: sim.x,
      y: sim.y,
      z: sim.z,
      yaw: sim.yaw,
      vy: sim.vy,
      speed: Math.hypot(sim.vx, sim.vz),
      paused: sim.paused,
      mapOpen: sim.mapOpen,
      scanner: sim.scanner,
      pushes: sim.pushes,
    }),
    setKeys: (codes: string[]) => {
      held.clear();
      for (const code of codes) held.add(code);
    },
    advanceTitle: (t: number) => {
      sim.shotTime = t;
    },
  };
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      getHeld?: () => string[];
      getState?: () => {
        phase: string;
        x: number;
        y: number;
        z: number;
        yaw: number;
        vy: number;
        speed: number;
        paused: boolean;
        mapOpen: boolean;
        scanner: boolean;
        pushes: number;
      };
      setKeys?: (codes: string[]) => void;
      advanceTitle?: (t: number) => void;
    };
  }
}
