/** Vertical hoist math. g matches layout.ts. Stages 3 and 4 are not simulated here. */
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
