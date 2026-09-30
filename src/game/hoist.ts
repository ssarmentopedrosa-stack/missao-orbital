/** Vertical hoist math. g matches layout.ts. The fixed-mass helpers stay for stage-1-era tests. */
export const HOIST_G = 9.81;
export const HOIST_MASS = 40;
export const HOIST_WEIGHT = HOIST_MASS * HOIST_G;
export const T_ACCEL = HOIST_WEIGHT + HOIST_MASS * 2;
export const T_TOL = 5;
const Y_MIN = 1.05;
const Y_MAX = 9.15;

export function netForce(tension: number): number {
  return tension - HOIST_WEIGHT;
}

export function hoistAccel(tension: number): number {
  return netForce(tension) / HOIST_MASS;
}

export function integrateHoist(y: number, v: number, tension: number, dt: number, locked: boolean): { y: number; v: number; a: number } {
  const a = hoistAccel(tension);
  if (locked) return { y, v: 0, a };
  let vy = v + a * dt;
  let py = y + vy * dt;
  if (py < Y_MIN) {
    py = Y_MIN;
    if (vy < 0) vy = 0;
  }
  if (py > Y_MAX) {
    py = Y_MAX;
    if (vy > 0) vy = 0;
  }
  return { y: py, v: vy, a };
}

export const G_MOON = 1.62;
export const HOIST_Y_MIN = Y_MIN;
export const HOIST_Y_MAX = Y_MAX;
export const HOIST_V_MAX = 5.6;

function finite(n: number, fallback: number): number {
  return Number.isFinite(n) ? n : fallback;
}

/** P = m·g. Defaults match the station gravity used by stage 1. */
export function weightOf(mass: number, g = HOIST_G): number {
  return finite(mass, HOIST_MASS) * finite(g, HOIST_G);
}

/** Positive upward: FR = T − P. */
export function netForceOf(tension: number, mass: number, g = HOIST_G): number {
  return finite(tension, 0) - weightOf(mass, g);
}

/** a = FR / m. The value the HUD shows is the value that is integrated. */
export function accelOf(tension: number, mass: number, g = HOIST_G): number {
  const m = Math.max(0.5, finite(mass, HOIST_MASS));
  const a = netForceOf(tension, m, g) / m;
  return Number.isFinite(a) ? a : 0;
}

export function integrateVariable(
  y: number,
  v: number,
  tension: number,
  mass: number,
  g: number,
  dt: number,
  locked: boolean,
  yMin = HOIST_Y_MIN,
  yMax = HOIST_Y_MAX,
): { y: number; v: number; a: number; hitTop: boolean; hitFloor: boolean } {
  const step = Math.min(0.05, Math.max(0, finite(dt, 0)));
  const a = accelOf(tension, mass, g);
  const y0 = finite(y, yMin);
  if (locked) return { y: y0, v: 0, a, hitTop: false, hitFloor: false };
  let vy = finite(v, 0) + a * step;
  if (vy > HOIST_V_MAX) vy = HOIST_V_MAX;
  if (vy < -HOIST_V_MAX) vy = -HOIST_V_MAX;
  let py = y0 + vy * step;
  let hitFloor = false;
  let hitTop = false;
  if (py < yMin) {
    hitFloor = true;
    py = yMin;
    if (vy < 0) vy = 0;
  } else if (py > yMax) {
    hitTop = true;
    py = yMax;
    if (vy > 0) vy = 0;
  }
  if (!Number.isFinite(py) || !Number.isFinite(vy)) return { y: y0, v: 0, a: 0, hitTop: false, hitFloor: false };
  return { y: py, v: vy, a, hitTop, hitFloor };
}

/** Arrival band sits strictly below the shaft cap, so a clamped impact cannot pass as a landing. */
export const ARRIVE_LO = 8.45;
export const ARRIVE_HI = 9.02;

export type ArrivalPhase = "rest" | "accel" | "coast" | "brake";

export type ArrivalInput = {
  phase: ArrivalPhase;
  brakeValid: boolean;
  brakeV: number;
  y: number;
  v: number;
  hitTop: boolean;
};

/** Braking may begin only while the load is still climbing, before the arrival ceiling. */
export function brakingGate(a: number, v: number, y: number): boolean {
  return a < -0.15 && v > 0.12 && y > 2 && y < ARRIVE_HI && Number.isFinite(a) && Number.isFinite(v) && Number.isFinite(y);
}

/**
 * Controlled arrival. A ceiling hit is never success, and rest/accel/coast cannot skip ahead.
 * Speed must have fallen since braking started, inside the band, still not a collision.
 */
export function arrivalAllowed(input: ArrivalInput): boolean {
  if (input.hitTop) return false;
  if (input.phase !== "brake" || !input.brakeValid) return false;
  if (!(input.brakeV > 0.12) || !Number.isFinite(input.brakeV)) return false;
  if (!Number.isFinite(input.y) || !Number.isFinite(input.v)) return false;
  if (!(input.v < input.brakeV - 0.08)) return false;
  if (input.y < ARRIVE_LO || input.y > ARRIVE_HI) return false;
  if (!(input.v >= -0.02 && input.v < 0.45)) return false;
  return true;
}

