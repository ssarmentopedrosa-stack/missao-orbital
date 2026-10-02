import type { Alien } from "./survival.ts";

export const STAGE2_POINTS: { id: 1 | 2 | 3 | 4; x: number; z: number; name: string }[] = [
  { id: 1, x: -3.1, z: -51.6, name: "Entrada do setor" },
  { id: 2, x: 2.2, z: -52.3, name: "Painel do elevador" },
  { id: 3, x: -2.4, z: -56.4, name: "Laboratório" },
  { id: 4, x: 1.1, z: -55.2, name: "Protocolo Newton" },
];

export function freshStageAliens(): Alien[] {
  return [
    { id: "drone", kind: "patrol", x: -1.2, z: -50.7, homeX: -1.2, homeZ: -50.7, span: 1.15, mode: "patrol", t: 0, wind: 0, disabled: false },
    { id: "field", kind: "energy", x: 4.15, z: -60.4, homeX: 4.15, homeZ: -60.4, span: 0, mode: "patrol", t: 0, wind: 0, disabled: true },
    { id: "guardian", kind: "guardian", x: 2.35, z: -60.2, homeX: 2.35, homeZ: -60.2, span: 0, mode: "sleep", t: 0, wind: 0, disabled: true },
  ];
}
