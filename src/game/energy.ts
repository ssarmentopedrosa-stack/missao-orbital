/** Work and energy. Every HUD number in stage 3 comes from these functions. */

function finite(n: number, fallback = 0): number {
  return Number.isFinite(n) ? n : fallback;
}

/** W = F·d·cos(θ). θ in degrees. A right angle is exactly zero, not a float leftover. */
export function workOf(force: number, distance: number, thetaDeg = 0): number {
  const F = finite(force);
  const d = finite(distance);
  const theta = finite(thetaDeg);
  const wrapped = ((theta % 360) + 360) % 360;
  const right = Math.abs(wrapped - 90) < 1e-6 || Math.abs(wrapped - 270) < 1e-6;
  const c = right ? 0 : Math.cos((theta * Math.PI) / 180);
  const w = F * d * c;
  return Number.isFinite(w) ? w : 0;
}

/** Net work along a displacement. Same source as workOf, θ = 0 when Fr and d share a sign. */
export function workFromResultant(resultant: number, signedDistance: number): number {
  const Fr = finite(resultant);
  const d = finite(signedDistance);
  if (d === 0 || Fr === 0) return 0;
  return workOf(Math.abs(Fr), Math.abs(d), Math.sign(Fr) === Math.sign(d) ? 0 : 180);
}

/** Ec = ½mv². Speed is squared, so the sign of velocity does not create negative energy. */
export function kineticEnergy(mass: number, speed: number): number {
  const m = Math.max(0, finite(mass));
  const v = finite(speed);
  const e = 0.5 * m * v * v;
  return Number.isFinite(e) ? e : 0;
}

/** Epg = mgh. Negative mass, gravity or height do not produce a negative well. */
export function potentialEnergy(mass: number, g: number, height: number): number {
  const m = Math.max(0, finite(mass));
  const grav = Math.max(0, finite(g));
  const h = Math.max(0, finite(height));
  const e = m * grav * h;
  return Number.isFinite(e) ? e : 0;
}

/** Em = Ec + Epg. */
export function mechanicalEnergy(kinetic: number, potential: number): number {
  const e = finite(kinetic) + finite(potential);
  return Number.isFinite(e) ? e : 0;
}

/** Energy that left the mechanical account. Never negative: a gain is not dissipation. */
export function dissipatedEnergy(initialMechanical: number, finalMechanical: number): number {
  const lost = finite(initialMechanical) - finite(finalMechanical);
  return lost > 0 && Number.isFinite(lost) ? lost : 0;
}

/** W_resultante = Ec_final − Ec_inicial. */
export function workEnergyDelta(initialKinetic: number, finalKinetic: number): number {
  const w = finite(finalKinetic) - finite(initialKinetic);
  return Number.isFinite(w) ? w : 0;
}

/** True when mechanical energy is unchanged within a relative tolerance. */
export function mechanicallyConserved(initial: number, final: number, tol = 0.08): boolean {
  const a = finite(initial);
  const b = finite(final);
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return Math.abs(a - b) <= Math.abs(tol) * scale;
}

/**
 * Horizontal cart. Weight is perpendicular to the rail, so its work is zero.
 * W = F·d should track ΔEc. Friction removes mechanical energy as heat.
 */
export function stepCart(
  x: number,
  v: number,
  force: number,
  mass: number,
  mu: number,
  g: number,
  dt: number,
): { x: number; v: number; a: number; heat: number } {
  const m = Math.max(0.5, finite(mass, 1));
  const step = Math.min(0.05, Math.max(0, finite(dt)));
  const F = finite(force);
  const frictionMax = Math.max(0, finite(mu)) * m * Math.max(0, finite(g));
  const speed = finite(v);
  let friction = 0;
  if (Math.abs(speed) > 0.02) friction = -Math.sign(speed) * frictionMax;
  else if (Math.abs(F) <= frictionMax) friction = -F;
  else friction = -Math.sign(F || 1) * frictionMax;
  const a = (F + friction) / m;
  let vy = speed + a * step;
  if (Math.abs(speed) > 0.02 && Math.sign(vy) !== Math.sign(speed) && frictionMax > 0) vy = 0;
  const x0 = finite(x);
  const x1 = x0 + vy * step;
  const heat = frictionMax * Math.abs(x1 - x0);
  if (!Number.isFinite(x1) || !Number.isFinite(vy)) return { x: x0, v: 0, a: 0, heat: 0 };
  return { x: x1, v: vy, a, heat: Number.isFinite(heat) ? heat : 0 };
}

/** Vertical drop. Up is positive. Without friction, Em stays nearly constant. */
export function stepFall(h: number, v: number, mass: number, g: number, mu: number, dt: number) {
  const m = Math.max(0, finite(mass));
  const grav = Math.max(0, finite(g));
  const step = Math.min(0.05, Math.max(0, finite(dt)));
  const h0 = Math.max(0, finite(h));
  if (m <= 0) {
    return { h: h0, v: 0, a: 0, heat: 0, ec: 0, epg: potentialEnergy(0, grav, h0), em: 0 };
  }
  const friction = Math.max(0, finite(mu)) * m * grav;
  const speed = finite(v);
  let a = -grav;
  if (friction > 0 && Math.abs(speed) > 0.02) a += (-Math.sign(speed) * friction) / m;
  let vy = speed + a * step;
  let hy = h0 + vy * step;
  if (hy < 0) {
    hy = 0;
    vy = 0;
  }
  const heat = friction * Math.abs(hy - h0);
  const ec = kineticEnergy(m, vy);
  const epg = potentialEnergy(m, grav, hy);
  return { h: hy, v: vy, a, heat: Number.isFinite(heat) ? heat : 0, ec, epg, em: mechanicalEnergy(ec, epg) };
}
