/** Vertical hoist math. g matches layout.ts. The fixed-mass helpers stay for stage-1-era tests. */
export const HOIST_G = 9.81;
export const HOIST_MASS = 40;
export const HOIST_WEIGHT = HOIST_MASS * HOIST_G;
export const T_ACCEL = HOIST_WEIGHT + HOIST_MASS * 2;
export const T_TOL = 5;
const Y_MIN = 1.05;
const Y_MAX = 9.15;

export function netForce(tension: number): number {
  return netForceOf(tension, HOIST_MASS, HOIST_G);
}

export function hoistAccel(tension: number): number {
  return accelOf(tension, HOIST_MASS, HOIST_G);
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

/** Smallest mass the formula will divide by. Stops a bad load from producing Infinity. */
export const MASS_MIN = 0.5;

/**
 * Mission equilibrium band, in newtons.
 * Wider than a classroom rounding error because tension moves in coarse steps.
 */
export const FORCE_EQ = 8;
/** Scanner label only: "equilíbrio" when the two forces are visually the same. */
export const FORCE_SCAN = 0.8;
/** Protocol rest. Slightly wider than FORCE_EQ so a stepped tension can still hold still. */
export const FORCE_REST = 12;
/** Protocol coast, between the scan label and the rest band. */
export const FORCE_COAST = 10;

/** |a| that still counts as "not accelerating" while a hold timer runs. m/s². */
export const ACCEL_STILL = 0.08;
/** Downward acceleration that starts a real brake. A flicker below this does not count. m/s². */
export const ACCEL_BRAKE = 0.15;
/** Acceleration must be inside this band before the lab accepts the load as settled. m/s². */
export const ACCEL_SETTLE = 0.35;

/** Speed that still counts as rest. m/s. */
export const SPEED_REST = 0.18;
/** Speed that counts as real motion, so Fr = 0 is not confused with v = 0. m/s. */
export const SPEED_MOVE = 0.22;
/** Fastest arrival the platform accepts. m/s. */
export const SPEED_ARRIVE = 0.45;
/** Speed that must be lost after braking starts. One sample is not enough. m/s. */
export const SPEED_BRAKE_DROP = 0.08;
/** Braking must be held. A single frame of negative acceleration is not a brake. seconds. */
export const BRAKE_MIN_HOLD = 0.4;

/** The only place P, Fr and a are computed. HUD, vectors and the integrator all read this. */
export function forcesOf(tension: number, mass: number, g = HOIST_G) {
  const m = Math.max(MASS_MIN, finite(mass, HOIST_MASS));
  const grav = Math.max(0, finite(g, HOIST_G));
  const T = finite(tension, 0);
  const P = m * grav;
  const Fr = T - P;
  const a = Fr / m;
  return { mass: m, g: grav, T, P, Fr, a: Number.isFinite(a) ? a : 0 };
}

/** P = m·g. Defaults match the station gravity used by stage 1. */
export function weightOf(mass: number, g = HOIST_G): number {
  return forcesOf(0, mass, g).P;
}

/** Positive upward: Fr = T − P. */
export function netForceOf(tension: number, mass: number, g = HOIST_G): number {
  return forcesOf(tension, mass, g).Fr;
}

/** a = Fr / m. The value the HUD shows is the value that is integrated. */
export function accelOf(tension: number, mass: number, g = HOIST_G): number {
  return forcesOf(tension, mass, g).a;
}

export function stateIsFinite(sample: { mass: number; g: number; tension: number; y: number; v: number }): boolean {
  const f = forcesOf(sample.tension, sample.mass, sample.g);
  return [f.mass, f.g, f.T, f.P, f.Fr, f.a, sample.y, sample.v].every((n) => Number.isFinite(n));
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
  /** When present, a one-frame flick cannot count as a finished brake. */
  brakeDur?: number;
};

/** Braking may begin only while the load is still climbing, before the arrival ceiling. */
export function brakingGate(a: number, v: number, y: number): boolean {
  return a < -ACCEL_BRAKE && v > 0.12 && y > 2 && y < ARRIVE_HI && Number.isFinite(a) && Number.isFinite(v) && Number.isFinite(y);
}

/**
 * Controlled arrival. A ceiling hit is never success, and rest/accel/coast cannot skip ahead.
 * Speed must have fallen since braking started, inside the band, still not a collision.
 * brakeDur, when supplied by the mission, must show the brake was held.
 */
export function arrivalAllowed(input: ArrivalInput): boolean {
  if (input.hitTop) return false;
  if (input.phase !== "brake" || !input.brakeValid) return false;
  if (!(input.brakeV > 0.12) || !Number.isFinite(input.brakeV)) return false;
  if (!Number.isFinite(input.y) || !Number.isFinite(input.v)) return false;
  if (!(input.v < input.brakeV - SPEED_BRAKE_DROP)) return false;
  if (input.brakeDur != null && !(input.brakeDur >= BRAKE_MIN_HOLD)) return false;
  if (input.y < ARRIVE_LO || input.y > ARRIVE_HI) return false;
  if (!(input.v >= -0.02 && input.v < SPEED_ARRIVE)) return false;
  return true;
}

/**
 * Arrow length for the scanner only. Same reference for P, T and Fr, so a larger force is a longer arrow.
 * Clamped so an extreme tension cannot fill the bay. Never fed back into the integrator.
 */
export function vectorLength(magnitude: number, reference: number): number {
  const mag = Math.abs(finite(magnitude, 0));
  if (mag < 1) return 0;
  const span = Math.max(mag, Math.abs(finite(reference, 0)), 80);
  const raw = (mag / span) * 1.6;
  if (raw < 0.05) return 0;
  return Math.min(1.65, Math.max(0.34, raw));
}


