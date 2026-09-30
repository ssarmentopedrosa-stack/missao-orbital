export type Block = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  h: number;
  kind: "wall" | "prop" | "hidden";
};

const t = 0.42;

export const SPAWN = { x: 0, z: 7.2, yaw: 0 };
export const DOCK = { x: 0, z: -25, r: 1.2 };
export const NEWTON = { x: -5.3, z: 5.15 };
export const FICHA = { x: 8, z: -11.35 };

export const G = 9.81;
export const PLAYER_MASS = 80;
export const WALK_F = 180;
export const SPRINT_F = 340;
export const SHOVE_J = 80;

export type CrateKind = "light" | "module" | "heavy";

export type CrateSpec = {
  id: string;
  name: string;
  kind: CrateKind;
  x: number;
  z: number;
  mass: number;
  hx: number;
  hz: number;
  h: number;
};

export const CRATE_SPECS: CrateSpec[] = [
  { id: "light", name: "Caixa leve", kind: "light", x: -5.2, z: -15.2, mass: 6, hx: 0.34, hz: 0.34, h: 0.46 },
  { id: "module", name: "Módulo N-1", kind: "module", x: 0, z: -15.2, mass: 20, hx: 0.5, hz: 0.42, h: 0.64 },
  { id: "heavy", name: "Bateria", kind: "heavy", x: 5.2, z: -15.2, mass: 40, hx: 0.62, hz: 0.5, h: 0.8 },
];

export function surfaceAt(x: number, z: number): { name: string; mu: number; muS: number } {
  if (z < -12.6 && z > -28.2) {
    if (x > -7.6 && x < -3.05) return { name: "Gelo", mu: 0.05, muS: 0.07 };
    if (x > 3.05 && x < 7.6) return { name: "Borracha", mu: 0.62, muS: 0.78 };
    if (x > -2.5 && x < 2.5) return { name: "Metal", mu: 0.3, muS: 0.4 };
  }
  return { name: "Compósito", mu: 0.42, muS: 0.52 };
}

export const BLOCKS: Block[] = [
  { minX: -7.6 - t, maxX: -7.6, minZ: -1.7, maxZ: 11.65, h: 3.5, kind: "wall" },
  { minX: 7.6, maxX: 7.6 + t, minZ: -1.7, maxZ: 11.65, h: 3.5, kind: "hidden" },
  { minX: -8.05, maxX: 8.05, minZ: 11.2, maxZ: 11.2 + t, h: 3.5, kind: "wall" },
  { minX: -8.05, maxX: -1.55, minZ: -1.2 - t, maxZ: -1.2, h: 3.5, kind: "wall" },
  { minX: 1.55, maxX: 8.05, minZ: -1.2 - t, maxZ: -1.2, h: 3.5, kind: "wall" },
  { minX: -1.7 - t, maxX: -1.7, minZ: -9.6, maxZ: -1.15, h: 3.05, kind: "wall" },
  { minX: 1.7, maxX: 1.7 + t, minZ: -9.6, maxZ: -1.15, h: 3.05, kind: "wall" },
  { minX: -9.45, maxX: -1.55, minZ: -9.62, maxZ: -9.2, h: 4.1, kind: "wall" },
  { minX: 1.55, maxX: 9.45, minZ: -9.62, maxZ: -9.2, h: 4.1, kind: "wall" },
  { minX: -9 - t, maxX: -9, minZ: -30.85, maxZ: -9.15, h: 4.1, kind: "wall" },
  { minX: 9, maxX: 9 + t, minZ: -30.85, maxZ: -9.15, h: 4.1, kind: "wall" },
  { minX: -9.45, maxX: 9.45, minZ: -30.4 - t, maxZ: -30.4, h: 4.1, kind: "hidden" },
  { minX: 2.35, maxX: 4.75, minZ: 2.9, maxZ: 5.05, h: 0.92, kind: "prop" },
  { minX: -6.15, maxX: -4.45, minZ: 4.15, maxZ: 6.15, h: 1.12, kind: "prop" },
  { minX: -6.2, maxX: -3.85, minZ: -0.35, maxZ: 1.45, h: 0.55, kind: "prop" },
  { minX: 4.45, maxX: 6.7, minZ: -0.55, maxZ: 1.55, h: 0.88, kind: "prop" },
  { minX: 7.15, maxX: 8.85, minZ: -12.4, maxZ: -10.3, h: 1.05, kind: "prop" },
  { minX: -5.75, maxX: -5.3, minZ: -63.1, maxZ: -48.7, h: 4.4, kind: "hidden" },
  { minX: 5.3, maxX: 5.75, minZ: -63.1, maxZ: -48.7, h: 4.4, kind: "hidden" },
  { minX: -5.75, maxX: 5.75, minZ: -63.1, maxZ: -62.65, h: 4.4, kind: "hidden" },
  { minX: -5.75, maxX: 5.75, minZ: -49.15, maxZ: -48.7, h: 4.4, kind: "hidden" },
  { minX: -4.05, maxX: -3.1, minZ: -54.95, maxZ: -54.05, h: 0.95, kind: "hidden" },
  { minX: -4.05, maxX: -3.1, minZ: -57.15, maxZ: -56.25, h: 0.95, kind: "hidden" },
  { minX: -4.05, maxX: -3.1, minZ: -59.35, maxZ: -58.45, h: 0.95, kind: "hidden" },
  { minX: 2.85, maxX: 3.8, minZ: -52.6, maxZ: -51.85, h: 1.2, kind: "hidden" },
  { minX: 3.7, maxX: 4.45, minZ: -56.7, maxZ: -56.1, h: 1.05, kind: "hidden" },
  { minX: 12.15, maxX: 12.55, minZ: -64.2, maxZ: -57.4, h: 4.2, kind: "hidden" },
  { minX: 12.15, maxX: 12.55, minZ: -54.6, maxZ: -47.8, h: 4.2, kind: "hidden" },
  { minX: 12.15, maxX: 28.1, minZ: -64.2, maxZ: -63.75, h: 4.2, kind: "hidden" },
  { minX: 12.15, maxX: 28.1, minZ: -48.25, maxZ: -47.8, h: 4.2, kind: "hidden" },
  { minX: 27.7, maxX: 28.1, minZ: -64.2, maxZ: -47.8, h: 4.2, kind: "hidden" },
];

export const CINE_LEN = 64;

/** Campaign slots. Stage 3 continues the same station: work and energy. */
export const CAMPAIGN = [
  { stage: 1, id: "inercia", title: "Fundamentos e inércia" },
  { stage: 2, id: "elevador", title: "A força invisível" },
  { stage: 3, id: "energia", title: "O módulo de energia" },
  { stage: 4, id: "tres-leis", title: "Aplicações das três leis" },
] as const;

/** Title beats. 0–1 are exterior; 2–8 move inside the station. */
export function shotIndex(shotTime: number): number {
  const u = shotTime % CINE_LEN;
  if (u < 9) return 0;
  if (u < 16) return 1;
  if (u < 23) return 2;
  if (u < 29) return 3;
  if (u < 37) return 4;
  if (u < 45) return 5;
  if (u < 52) return 6;
  if (u < 58) return 7;
  return 8;
}

export function exteriorShot(shot: number): boolean {
  return shot <= 1;
}
