import * as THREE from "three";

function std(color: string, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.08, ...extra });
}

export const M = {
  suit: std("#e6eef6", { roughness: 0.68, metalness: 0.06 }),
  suitBlue: std("#184888", { roughness: 0.42, metalness: 0.38 }),
  suitDark: std("#c9d3de", { roughness: 0.55, metalness: 0.12 }),
  glove: std("#2a313b", { roughness: 0.92, metalness: 0.04 }),
  boot: std("#d5dee8", { roughness: 0.32, metalness: 0.62 }),
  fur: std("#b4743c", { roughness: 0.86, metalness: 0 }),
  furDark: std("#6a3e24", { roughness: 0.88, metalness: 0 }),
  muzzle: std("#f6ebe0", { roughness: 0.72, metalness: 0 }),
  nose: std("#140e0c", { roughness: 0.22, metalness: 0.15 }),
  tongue: std("#d46a6a", { roughness: 0.42, metalness: 0 }),
  eye: std("#f7f1e8", { roughness: 0.28, metalness: 0 }),
  iris: std("#c47a2c", { roughness: 0.28, metalness: 0.04, emissive: "#c47a2c", emissiveIntensity: 0.22 }),
  pupil: std("#120d0a", { roughness: 0.4 }),
  gold: std("#e0a23a", { roughness: 0.32, metalness: 0.62, emissive: "#e0a23a", emissiveIntensity: 0.18 }),
  glass: new THREE.MeshStandardMaterial({
    color: "#d7f1f8",
    transparent: true,
    opacity: 0.13,
    roughness: 0.03,
    metalness: 0.05,
    envMapIntensity: 1.8,
    depthWrite: false,
  }),
  hull: std("#3d4b5c", { roughness: 0.36, metalness: 0.84 }),
  hullDark: std("#232c38", { roughness: 0.5, metalness: 0.7 }),
  floor: std("#1a2432", { roughness: 0.48, metalness: 0.5 }),
  ice: std("#e7f4f8", { roughness: 0.04, metalness: 0.22, emissive: "#7eb8cc", emissiveIntensity: 0.08 }),
  rubber: std("#241f1c", { roughness: 1, metalness: 0 }),
  lane: std("#b7c2ce", { roughness: 0.22, metalness: 0.88 }),
  dark: std("#121820", { roughness: 0.55, metalness: 0.48 }),
  stripe: std("#e0a23a", { roughness: 0.45, metalness: 0.3, emissive: "#e0a23a", emissiveIntensity: 0.25 }),
  pipe: std("#6a7888", { roughness: 0.28, metalness: 0.86 }),
  emit: new THREE.MeshStandardMaterial({
    color: "#9fd4e6",
    emissive: "#7eb8cc",
    emissiveIntensity: 0.9,
    roughness: 0.35,
  }),
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
