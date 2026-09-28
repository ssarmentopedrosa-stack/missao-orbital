import * as THREE from "three";

function std(color: string, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.08, ...extra });
}

export const M = {
  suit: std("#e7eef6", { roughness: 0.4, metalness: 0.32 }),
  suitBlue: std("#1e4d96", { roughness: 0.38, metalness: 0.4 }),
  suitDark: std("#c5d0dc", { roughness: 0.48, metalness: 0.22 }),
  glove: std("#3c4654", { roughness: 0.72, metalness: 0.18 }),
  boot: std("#dfe6ee", { roughness: 0.42, metalness: 0.34 }),
  fur: std("#a56a3a", { roughness: 0.82, metalness: 0 }),
  furDark: std("#6b4126", { roughness: 0.84, metalness: 0 }),
  muzzle: std("#f4e7da", { roughness: 0.7, metalness: 0 }),
  nose: std("#140e0c", { roughness: 0.22, metalness: 0.2 }),
  tongue: std("#d46a6a", { roughness: 0.42, metalness: 0 }),
  eye: std("#f7f1e8", { roughness: 0.35, metalness: 0 }),
  iris: std("#c47a2c", { roughness: 0.3, metalness: 0.05, emissive: "#c47a2c", emissiveIntensity: 0.18 }),
  pupil: std("#120d0a", { roughness: 0.4 }),
  gold: std("#e0a23a", { roughness: 0.32, metalness: 0.62, emissive: "#e0a23a", emissiveIntensity: 0.18 }),
  glass: new THREE.MeshStandardMaterial({
    color: "#d5eef6",
    transparent: true,
    opacity: 0.1,
    roughness: 0.04,
    metalness: 0.02,
    envMapIntensity: 1.2,
    depthWrite: false,
  }),
  hull: std("#4c5a6a", { roughness: 0.42, metalness: 0.72 }),
  hullDark: std("#2a3442", { roughness: 0.48, metalness: 0.66 }),
  floor: std("#1a2432", { roughness: 0.52, metalness: 0.42 }),
  ice: std("#d5e7ee", { roughness: 0.07, metalness: 0.16, emissive: "#7eb8cc", emissiveIntensity: 0.05 }),
  rubber: std("#2a2623", { roughness: 0.96, metalness: 0.02 }),
  lane: std("#9aa6b4", { roughness: 0.28, metalness: 0.84 }),
  dark: std("#141b24", { roughness: 0.6, metalness: 0.4 }),
  stripe: std("#e0a23a", { roughness: 0.45, metalness: 0.3, emissive: "#e0a23a", emissiveIntensity: 0.25 }),
  alarm: new THREE.MeshStandardMaterial({
    color: "#e0a23a",
    emissive: "#e0a23a",
    emissiveIntensity: 0.4,
    roughness: 0.4,
    metalness: 0.2,
  }),
  visorLight: new THREE.MeshStandardMaterial({
    color: "#f4f7fb",
    emissive: "#d5e4ef",
    emissiveIntensity: 1.4,
    roughness: 0.3,
  }),
};
