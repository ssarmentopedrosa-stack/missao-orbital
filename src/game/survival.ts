import { dissipatedEnergy, kineticEnergy, mechanicalEnergy, potentialEnergy, workOf } from "./energy.ts";

export const MAX_LIVES = 3;
export const INVULN_TIME = 1.8;
export const CORE_GOAL = 5;

export type CheckpointId = 1 | 2 | 3 | 4;
export type AlienMode = "patrol" | "alert" | "chase" | "attack" | "return" | "sleep";
export type ChallengeId = "work" | "kinetic" | "potential" | "guard-work" | "guard-energy" | "guard-heat";

export type Crew = {
  lives: number;
  invuln: number;
  score: number;
  cores: number;
  checkpoint: CheckpointId;
  over: boolean;
  flash: number;
  source: string;
  tries: number;
  solved: Record<string, boolean>;
  picked: Record<string, boolean>;
};

export type Alien = {
  id: string;
  kind: "patrol" | "energy" | "guardian";
  x: number;
  z: number;
  homeX: number;
  homeZ: number;
  span: number;
  mode: AlienMode;
  t: number;
  disabled: boolean;
};

export const CHECKPOINTS: { id: CheckpointId; x: number; z: number; name: string }[] = [
  { id: 1, x: 14.2, z: -56, name: "Entrada do módulo" },
  { id: 2, x: 17.2, z: -56.8, name: "Laboratório de energia" },
  { id: 3, x: 22.4, z: -54.2, name: "Câmara das rampas" },
  { id: 4, x: 24.4, z: -56, name: "Núcleo de energia" },
];

export const PICKUPS = [
  { id: "core-a", kind: "core" as const, x: 18.6, z: -54.4 },
  { id: "core-b", kind: "core" as const, x: 23.5, z: -55.4 },
  { id: "core-c", kind: "core" as const, x: 21.4, z: -61.1 },
  { id: "cell", kind: "cell" as const, x: 14.9, z: -53.4 },
  { id: "full", kind: "full" as const, x: 26.4, z: -53.1 },
];

export function freshCrew(): Crew {
  return {
    lives: MAX_LIVES,
    invuln: 0,
    score: 0,
    cores: 0,
    checkpoint: 1,
    over: false,
    flash: 0,
    source: "",
    tries: 0,
    solved: {},
    picked: {},
  };
}

export function freshAliens(): Alien[] {
  return [
    { id: "drone", kind: "patrol", x: 19.2, z: -62.2, homeX: 19.2, homeZ: -62.2, span: 2.4, mode: "patrol", t: 0, disabled: false },
    { id: "field", kind: "energy", x: 19.4, z: -61.2, homeX: 19.4, homeZ: -61.2, span: 0, mode: "patrol", t: 0, disabled: false },
    { id: "guardian", kind: "guardian", x: 25.2, z: -56.8, homeX: 25.2, homeZ: -56.8, span: 0, mode: "patrol", t: 0, disabled: false },
  ];
}

export function takeDamage(crew: Crew, source: string): Crew & { applied: boolean } {
  if (crew.over || crew.invuln > 0 || crew.lives <= 0) return { ...crew, applied: false };
  const lives = Math.max(0, crew.lives - 1);
  return {
    ...crew,
    lives,
    invuln: INVULN_TIME,
    over: lives <= 0,
    score: Math.max(0, crew.score - 25),
    flash: 0.45,
    source,
    applied: true,
  };
}

export function tickCrew(crew: Crew, dt: number): Crew {
  const step = Math.min(0.05, Math.max(0, Number.isFinite(dt) ? dt : 0));
  return {
    ...crew,
    lives: Math.max(0, Math.min(MAX_LIVES, crew.lives)),
    invuln: Math.max(0, crew.invuln - step),
    flash: Math.max(0, crew.flash - step),
    score: Math.max(0, crew.score),
    cores: Math.max(0, Math.min(CORE_GOAL, crew.cores)),
  };
}

export function heal(crew: Crew, amount: number): Crew & { gained: boolean } {
  if (crew.lives >= MAX_LIVES || amount <= 0) return { ...crew, lives: Math.min(MAX_LIVES, crew.lives), gained: false };
  return { ...crew, lives: Math.min(MAX_LIVES, crew.lives + amount), gained: true };
}

export function addCore(crew: Crew): Crew & { gained: boolean } {
  if (crew.cores >= CORE_GOAL) return { ...crew, gained: false };
  return { ...crew, cores: crew.cores + 1, score: crew.score + 150, gained: true };
}

export function addScore(crew: Crew, amount: number): Crew {
  const next = crew.score + (Number.isFinite(amount) ? amount : 0);
  return { ...crew, score: Math.max(0, Math.min(99999, next)) };
}

export function reachCheckpoint(crew: Crew, id: CheckpointId): Crew & { fresh: boolean } {
  if (id <= crew.checkpoint) return { ...crew, fresh: false };
  return { ...crew, checkpoint: id, score: crew.score + 100, fresh: true };
}

export type ChallengeSpec = {
  id: ChallengeId;
  title: string;
  prompt: string;
  facts: string;
  options: number[];
  answer: number;
  explain: string;
  hint: string;
};

export function challengeOf(id: ChallengeId): ChallengeSpec {
  if (id === "work") {
    const answer = workOf(50, 6, 0);
    return {
      id,
      title: "Trabalho",
      prompt: "Um alien de energia trava a plataforma. A força de 50 N acompanha 6 m de deslocamento.",
      facts: "F = 50 N · d = 6 m · θ = 0°",
      options: [50, 100, answer, 600],
      answer,
      explain: "A força está no mesmo sentido do deslocamento. W = 50 × 6 × cos 0° = 300 J.",
      hint: "Observe o ângulo. Se θ = 0°, cos θ = 1 e W = F·d.",
    };
  }
  if (id === "kinetic") {
    const answer = kineticEnergy(10, 6);
    return {
      id,
      title: "Energia cinética",
      prompt: "O mecanismo pede a energia de uma carga de 10 kg a 6 m/s.",
      facts: "m = 10 kg · v = 6 m/s · Ec = ½mv²",
      options: [60, answer, 360, 90],
      answer,
      explain: "Ec = ½ × 10 × 6² = 180 J. A velocidade entra ao quadrado.",
      hint: "Eleve a velocidade ao quadrado antes de multiplicar pela metade da massa.",
    };
  }
  if (id === "potential") {
    const answer = potentialEnergy(20, 9.8, 5);
    return {
      id,
      title: "Energia potencial",
      prompt: "A plataforma pede a energia para erguer 20 kg por 5 m.",
      facts: "m = 20 kg · g = 9,8 m/s² · h = 5 m",
      options: [100, 490, answer, 1960],
      answer,
      explain: "Epg = mgh = 20 × 9,8 × 5 = 980 J. Mais alto, mais energia armazenada.",
      hint: "Multiplique massa, gravidade e altura. Nenhum desses três pode faltar.",
    };
  }
  if (id === "guard-work") {
    const answer = workOf(100, 5, 0);
    return {
      id,
      title: "Guardião · trabalho",
      prompt: "O núcleo exige 500 J. Uma força de 100 N age por 5 m, no mesmo sentido.",
      facts: "F = 100 N · d = 5 m · θ = 0°",
      options: [20, 105, answer, 250],
      answer,
      explain: "W = 100 × 5 = 500 J. Esse trabalho é a energia que o núcleo aceita.",
      hint: "Mesma direção e mesmo sentido: o cosseno vale 1.",
    };
  }
  if (id === "guard-energy") {
    const answer = mechanicalEnergy(0, potentialEnergy(2, 9.81, 10));
    return {
      id,
      title: "Guardião · conservação",
      prompt: "Uma carga de 2 kg parte do repouso a 10 m. Qual é a energia mecânica?",
      facts: "v = 0 · h = 10 m · Em = Ec + Epg",
      options: [98.1, answer, 392.4, 20],
      answer,
      explain: "No alto, Ec = 0 e Epg = 2 × 9,81 × 10 = 196,2 J. Em é essa soma.",
      hint: "Se a velocidade é zero, a cinética é zero. Resta o mgh.",
    };
  }
  const lost = dissipatedEnergy(490.5, 320);
  return {
    id,
    title: "Guardião · dissipação",
    prompt: "A mecânica caiu de 490,5 J para 320 J. Quanto virou calor?",
    facts: "Em não desaparece. A diferença foi dissipada.",
    options: [120, lost, 490.5, 810.5],
    answer: lost,
    explain: "490,5 − 320 = 170,5 J deixaram de ser energia mecânica. Viraram calor no atrito.",
    hint: "Subtraia a energia mecânica final da inicial. O que saiu não sumiu.",
  };
}

export function gradeChallenge(id: ChallengeId, picked: number): { ok: boolean; spec: ChallengeSpec } {
  const spec = challengeOf(id);
  return { ok: Number.isFinite(picked) && Math.abs(picked - spec.answer) < 0.05, spec };
}

export function stepAlien(alien: Alien, px: number, pz: number, dt: number, asleep: boolean): Alien {
  const step = Math.min(0.05, Math.max(0, Number.isFinite(dt) ? dt : 0));
  const next = { ...alien, t: alien.t + step };
  if (asleep || next.disabled) {
    next.disabled = true;
    next.mode = "sleep";
    next.x += (next.homeX - next.x) * Math.min(1, step * 2);
    next.z += (next.homeZ + 1.2 - next.z) * Math.min(1, step * 2);
    return next;
  }
  const dist = Math.hypot(px - next.x, pz - next.z);
  if (next.kind === "energy") {
    next.mode = dist < 3.4 ? "alert" : "patrol";
    return next;
  }
  if (next.kind === "guardian") {
    next.mode = dist < 1.7 ? "attack" : "patrol";
    return next;
  }
  if (dist < 0.85) next.mode = "attack";
  else if (dist < 3.1) next.mode = "chase";
  else if (next.mode === "chase" || next.mode === "attack" || next.mode === "alert") next.mode = "return";
  else next.mode = dist < 4.2 ? "alert" : "patrol";
  if (next.mode === "chase" || next.mode === "attack") {
    const len = Math.max(0.001, dist);
    const speed = 1.55;
    next.x += ((px - next.x) / len) * speed * step;
    next.z += ((pz - next.z) / len) * speed * step;
  } else if (next.mode === "return") {
    next.x += (next.homeX - next.x) * Math.min(1, step * 1.4);
    next.z += (next.homeZ - next.z) * Math.min(1, step * 1.4);
    if (Math.hypot(next.homeX - next.x, next.homeZ - next.z) < 0.3) next.mode = "patrol";
  } else {
    next.x = next.homeX + Math.sin(next.t * 0.8) * next.span;
    next.z = next.homeZ;
    next.mode = "patrol";
  }
  return next;
}

export function crateZ(time: number): number {
  return -52.6 + Math.sin(time * 0.9) * 1.1;
}

export type HazardHit = { source: string; ox: number; oz: number };

export function hazardHits(aliens: Alien[], px: number, pz: number, time: number, shield: boolean): HazardHit | null {
  if (shield) return null;
  for (const alien of aliens) {
    if (alien.disabled || alien.mode === "sleep") continue;
    const dist = Math.hypot(px - alien.x, pz - alien.z);
    if (alien.kind === "patrol" && alien.mode === "attack" && dist < 0.85) return { source: "drone de patrulha", ox: alien.x, oz: alien.z };
    if (alien.kind === "energy" && dist < 1.35) return { source: "campo do alien de energia", ox: alien.x, oz: alien.z };
    if (alien.kind === "guardian" && alien.mode === "attack" && dist < 1.15) return { source: "guardião do núcleo", ox: alien.x, oz: alien.z };
  }
  const cz = crateZ(time);
  if (Math.hypot(px - 18.5, pz - cz) < 0.55) return { source: "caixa em movimento", ox: 18.5, oz: cz };
  return null;
}
