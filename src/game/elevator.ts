import { sfx } from "./audio";
import {
  ACCEL_SETTLE,
  ACCEL_STILL,
  ARRIVE_HI,
  ARRIVE_LO,
  arrivalAllowed,
  brakingGate,
  FORCE_COAST,
  FORCE_EQ,
  FORCE_REST,
  FORCE_SCAN,
  forcesOf,
  G_MOON,
  HOIST_G,
  HOIST_MASS,
  HOIST_V_MAX,
  HOIST_Y_MIN,
  integrateVariable,
  SPEED_MOVE,
  SPEED_REST,
  weightOf,
} from "./hoist";
import { gradeLesson, guardMet, labReady, lessonFor, liveLine, type LessonAsk } from "./lesson";
import { held, publishNow, sim, speak } from "./sim";
import { freshCrew, hazardHits, reachCheckpoint, stepAlien, takeDamage, tickCrew, type Crew } from "./survival";
import { freshStageAliens, STAGE2_POINTS } from "./stage2";

export const PANEL = { x: 2.55, z: -52.15 };
export const SHAFT = { x: 0, z: -58.2 };
export const GRAV = { x: 4.05, z: -56.4 };
export const LOADS = [
  { id: "a" as const, name: "Carga A", mass: 20, x: -3.55, z: -54.5 },
  { id: "b" as const, name: "Carga B", mass: 50, x: -3.55, z: -56.7 },
  { id: "c" as const, name: "Carga C", mass: 100, x: -3.55, z: -58.9 },
];

const Y_START = 2.55;
const TRANSIT = 6.4;
const T_MAX = 1800;

export type HoistGoal = "scan" | "compare" | "rise" | "balance" | "descent" | "lab" | "guardian" | "protocol" | "done";
export type LoadId = "maint" | "a" | "b" | "c" | "protocol";

type Line = { speaker: string; text: string; seconds: number };

export const elevator = {
  active: false,
  goal: "scan" as HoistGoal,
  tension: 300,
  mass: HOIST_MASS,
  g: HOIST_G,
  loadId: "maint" as LoadId,
  y: Y_START,
  v: 0,
  scanned: false,
  arrived: false,
  alarm: false,
  alarmT: 0,
  done: false,
  hint: "",
  note: "",
  balanceHold: 0,
  compareHold: 0,
  drop: 0,
  dropHold: 0,
  labUp: false,
  labDown: false,
  labBalance: false,
  labCoast: false,
  labHold: 0,
  coastHold: 0,
  proto: 0,
  protoHold: 0,
  braking: false,
  flight: freshFlight(),
  flinch: 0,
  warnAt: 0,
  samples: [] as { mass: number; Fr: number; a: number }[],
  cheer: 0,
  finale: 0,
  prevE: false,
  prevFr: 0,
  adjusting: false,
  motorT: 0,
  tries: 0,
  t0: 0,
  swaps: 0,
  saidG: false,
  saidWait: false,
  saidSame: false,
  saidCoast: false,
  saidPair: false,
  saidSurge: false,
  stuck: 0,
  mark: "",
  ask: null as LessonAsk | null,
  askNote: "",
  help: false,
  crew: freshCrew() as Crew,
  aliens: freshStageAliens(),
  lineQueue: [] as Line[],
  mastery: {
    peso: false,
    tracao: false,
    resultante: false,
    massa: false,
    aceleracao: false,
    newton: false,
    gravidade: false,
    uniforme: false,
    mesmaFr: false,
  },
};

function freshFlight() {
  return {
    vMax: 0,
    brakeY: 0,
    brakeV: 0,
    arriveV: 0,
    brakeA: 0,
    brakeDur: 0,
    collided: false,
    brakeValid: false,
    impacts: 0,
  };
}

function resetMotion(): void {
  elevator.goal = "scan";
  elevator.tension = 300;
  elevator.mass = HOIST_MASS;
  elevator.g = HOIST_G;
  elevator.loadId = "maint";
  elevator.y = Y_START;
  elevator.v = 0;
  elevator.scanned = false;
  elevator.arrived = false;
  elevator.alarm = false;
  elevator.alarmT = 0;
  elevator.done = false;
  elevator.hint = "";
  elevator.note = "";
  elevator.balanceHold = 0;
  elevator.compareHold = 0;
  elevator.drop = 0;
  elevator.dropHold = 0;
  elevator.labUp = false;
  elevator.labDown = false;
  elevator.labBalance = false;
  elevator.labCoast = false;
  elevator.labHold = 0;
  elevator.coastHold = 0;
  elevator.proto = 0;
  elevator.protoHold = 0;
  elevator.braking = false;
  elevator.flight = freshFlight();
  elevator.flinch = 0;
  elevator.warnAt = 0;
  elevator.samples = [];
  elevator.cheer = 0;
  elevator.finale = 0;
  elevator.prevE = false;
  elevator.prevFr = 0;
  elevator.adjusting = false;
  elevator.motorT = 0;
  elevator.tries = 0;
  elevator.swaps = 0;
  elevator.saidG = false;
  elevator.saidWait = false;
  elevator.saidSame = false;
  elevator.saidCoast = false;
  elevator.saidPair = false;
  elevator.saidSurge = false;
  elevator.stuck = 0;
  elevator.mark = "";
  elevator.ask = null;
  elevator.askNote = "";
  elevator.help = false;
  elevator.crew = freshCrew();
  elevator.aliens = freshStageAliens();
  elevator.lineQueue = [];
  elevator.mastery = {
    peso: false,
    tracao: false,
    resultante: false,
    massa: false,
    aceleracao: false,
    newton: false,
    gravidade: false,
    uniforme: false,
    mesmaFr: false,
  };
}

function queueAs(speaker: string, text: string, seconds: number): void {
  elevator.lineQueue.push({ speaker, text, seconds });
}

function queue(text: string, seconds: number): void {
  queueAs("NEWTON", text, seconds);
}

function pumpLines(): void {
  if (sim.line) return;
  const next = elevator.lineQueue.shift();
  if (!next) return;
  speak(next.speaker, next.text, next.seconds);
}

function comma(n: number, digits = 1): string {
  const v = Math.abs(n) < 5 * 10 ** -(digits + 1) ? 0 : n;
  return v.toFixed(digits).replace(".", ",");
}

function loadName(): string {
  if (elevator.loadId === "protocol") return "Protocolo Newton";
  const found = LOADS.find((item) => item.id === elevator.loadId);
  if (found) return found.name;
  return "Contêiner de manutenção";
}

export function hoistState() {
  const f = forcesOf(elevator.tension, elevator.mass, elevator.g);
  const state = Math.abs(f.Fr) < FORCE_SCAN ? "EQUILÍBRIO" : f.Fr > 0 ? "ACELERANDO ↑" : "ACELERANDO ↓";
  return {
    mass: f.mass,
    g: f.g,
    P: f.P,
    T: f.T,
    Fr: f.Fr,
    a: f.a,
    v: elevator.v,
    y: elevator.y,
    state,
    goal: elevator.goal,
    hint: elevator.hint,
    note: elevator.note,
    alarm: elevator.alarm,
    done: elevator.done,
    scanned: elevator.scanned,
    active: elevator.active,
    name: loadName(),
    finale: elevator.finale,
    tries: elevator.tries,
    elapsed: Math.max(0, sim.time - elevator.t0),
    mastery: elevator.mastery,
    moon: f.g < 5,
    flight: elevator.flight,
    lesson: lessonFor({
      goal: elevator.goal,
      drop: elevator.drop,
      proto: elevator.proto,
      arrived: elevator.arrived,
      touch: Math.abs(sim.touchX) + Math.abs(sim.touchY) > 0.05 || sim.touchSprint,
      stuck: elevator.stuck,
      lab: {
        up: elevator.labUp,
        down: elevator.labDown,
        balance: elevator.labBalance,
        coast: elevator.labCoast,
        masses: elevator.mastery.mesmaFr,
        gravity: elevator.mastery.gravidade,
      },
    }),
    ask: elevator.ask,
    askNote: elevator.askNote,
    help: elevator.help,
    lives: elevator.crew.lives,
    checkpoint: STAGE2_POINTS.find((item) => item.id === elevator.crew.checkpoint)?.name ?? "Entrada",
    guard: elevator.goal === "guardian" ? Math.max(0, 100 - elevator.proto * 20) : elevator.goal === "protocol" || elevator.goal === "done" ? 0 : 100,
    lab: {
      up: elevator.labUp,
      down: elevator.labDown,
      balance: elevator.labBalance,
      coast: elevator.labCoast,
      masses: elevator.mastery.mesmaFr,
      gravity: elevator.mastery.gravidade,
    },
  };
}

function near(x: number, z: number, r: number): boolean {
  return Math.hypot(sim.x - x, sim.z - z) < r;
}

function nearPanel(): boolean {
  return near(PANEL.x, PANEL.z, 2.15);
}

function nearHoist(): boolean {
  return nearPanel() || near(SHAFT.x, SHAFT.z, 6.8);
}

function nearLoad() {
  let best: (typeof LOADS)[number] | null = null;
  let bestD = 1.45;
  for (const load of LOADS) {
    const d = Math.hypot(sim.x - load.x, sim.z - load.z);
    if (d < bestD) {
      bestD = d;
      best = load;
    }
  }
  return best;
}

function clampTension(value: number): number {
  if (!Number.isFinite(value)) return elevator.tension;
  return Math.max(0, Math.min(T_MAX, Math.round(value * 10) / 10));
}

function physicsNote(P: number, T: number, Fr: number, a: number, v: number): string {
  return liveLine(P, T, Fr, a, v);
}

function bumpTension(dir: number, amount: number): void {
  elevator.tension = clampTension(elevator.tension + dir * amount);
  elevator.mastery.tracao = true;
}

function applyLoad(load: (typeof LOADS)[number]): void {
  const prevM = elevator.mass;
  const prevA = forcesOf(elevator.tension, prevM, elevator.g).a;
  const nextA = forcesOf(elevator.tension, load.mass, elevator.g).a;
  elevator.mass = load.mass;
  elevator.loadId = load.id;
  elevator.mastery.massa = true;
  elevator.swaps += 1;
  sfx.ui();
  if (Math.abs(prevM - load.mass) > 0.5) {
    queue(
      `${load.name}, ${load.mass} kg. A tração ficou em ${comma(elevator.tension, 0)} N. A aceleração foi de ${comma(prevA, 2)} para ${comma(nextA, 2)} m/s².`,
      5.6,
    );
  }
  if (elevator.swaps >= 2 && !elevator.saidSame) {
    elevator.saidSame = true;
    queue("Mesma tração não significa mesma resultante: o peso muda com a massa. E, para a mesma resultante, a massa maior acelera menos. a = Fr / m.", 6.4);
  }
}

function toggleGravity(): void {
  const moon = elevator.g < 5;
  const mass = elevator.mass;
  elevator.g = moon ? HOIST_G : G_MOON;
  elevator.mastery.gravidade = true;
  sfx.ui();
  const where = elevator.g < 5 ? "Lua" : "estação";
  queue(`Simulador em gravidade da ${where}. A massa continua ${comma(mass, 0)} kg. O peso passou a ${comma(weightOf(mass, elevator.g), 1)} N.`, 5.2);
  if (!elevator.saidG) {
    elevator.saidG = true;
    queueAs("TIGRÃO", "Minha massa continua a mesma.", 2.8);
    queue("Exatamente. O que mudou foi a força gravitacional. Peso é força. Massa, não.", 4.6);
    elevator.ask = "moon";
    elevator.askNote = "";
  }
}

function enterDescent(): void {
  elevator.goal = "descent";
  elevator.drop = 0;
  elevator.dropHold = 0;
  elevator.mastery.resultante = true;
  if (elevator.y < 4.3) elevator.y = 4.9;
  elevator.v = 0;
  const P = weightOf(elevator.mass, elevator.g);
  elevator.tension = clampTension(P - 110);
  elevator.alarm = true;
  elevator.alarmT = 2.4;
  sim.shake = Math.max(sim.shake, 0.16);
  sfx.cable();
  queue("A tração caiu abaixo do peso. A carga acelera para baixo. Isso é a força resultante, não um defeito do cabo.", 5.4);
}

function enterLab(): void {
  elevator.goal = "lab";
  elevator.g = HOIST_G;
  elevator.labUp = false;
  elevator.labDown = false;
  elevator.labBalance = false;
  elevator.labCoast = false;
  elevator.labHold = 0;
  elevator.coastHold = 0;
  elevator.samples = [];
  elevator.alarm = false;
  queue("Laboratório de forças. Escolha 20, 50 ou 100 kg. Suba, equilibre parado, desça — e também siga em movimento com a resultante zero.", 6.6);
  queue("O simulador à direita troca a gravidade entre a estação e a Lua. A massa não muda. O peso, sim.", 5.4);
}

function enterGuardian(): void {
  elevator.goal = "guardian";
  elevator.proto = 0;
  elevator.protoHold = 0;
  markCheckpoint(3);
  sfx.cable();
  queue("O guardião bloqueia o núcleo. Ele não cai com um tiro.", 3.6);
  queue("Cada fase pede uma relação entre tração e peso. Errou? Ajuste e repita.", 4.2);
}

function markCheckpoint(id: 1 | 2 | 3 | 4): void {
  const next = reachCheckpoint(elevator.crew, id);
  elevator.crew = next;
  if (!next.fresh) return;
  const spot = STAGE2_POINTS.find((item) => item.id === id);
  queue(`Checkpoint ativado · ${spot?.name ?? "setor"}.`, 2.4);
  sfx.ui();
}

function enterProtocol(): void {
  elevator.goal = "protocol";
  elevator.g = HOIST_G;
  elevator.mass = 120;
  elevator.loadId = "protocol";
  elevator.y = HOIST_Y_MIN + 0.15;
  elevator.v = 0;
  elevator.tension = clampTension(weightOf(120, HOIST_G));
  elevator.proto = 0;
  elevator.protoHold = 0;
  elevator.braking = false;
  elevator.flight = freshFlight();
  elevator.flinch = 0;
  elevator.warnAt = 0;
  elevator.saidSurge = false;
  elevator.mastery.newton = true;
  markCheckpoint(4);
  sfx.ui();
  queue("Protocolo Newton. Cento e vinte quilogramas. Você já sabe o suficiente. Controle o elevador.", 4.8);
  queue("Mantenha parada, suba acelerando, siga com velocidade constante e desacelere antes da plataforma.", 5.6);
}

function finish(): void {
  if (elevator.done) return;
  elevator.flight.arriveV = elevator.v;
  elevator.flight.collided = false;
  elevator.done = true;
  elevator.goal = "done";
  elevator.alarm = false;
  elevator.v = 0;
  elevator.tension = clampTension(weightOf(elevator.mass, HOIST_G));
  elevator.g = HOIST_G;
  elevator.finale = 7.2;
  elevator.cheer = 7.2;
  sim.animLock = "celebrate";
  sim.shake = Math.max(sim.shake, 0.12);
  sim.objective = "Etapa 2 concluída";
  sfx.success();
  queue("Você descobriu algo importante.", 2.8);
  queue("Uma força isolada não determina o movimento.", 3.4);
  queue("O que importa é a força resultante.", 3.2);
  queue("Quando você entende as forças, começa a entender o movimento.", 4.2);
  queueAs("TIGRÃO", "A estação voltou ao nosso controle.", 2.8);
  queue("Os invasores foram contidos. O módulo de energia, não. Ele ficou instável.", 4.4);
}

export function beginStage2(): void {
  if (sim.stage === 2 && elevator.active) return;
  resetMotion();
  elevator.active = true;
  elevator.t0 = sim.time;
  elevator.hint = "Caminhe até o painel. A carga está pronta e mesmo assim não sobe.";
  sim.stage = 2;
  sim.phase = "play";
  sim.paused = false;
  sim.mapOpen = false;
  sim.freeplay = false;
  sim.scanner = false;
  sim.animLock = null;
  sim.transit = TRANSIT;
  sim.x = -3.1;
  sim.y = 0;
  sim.z = -50.35;
  sim.yaw = Math.PI;
  sim.vx = 0;
  sim.vy = 0;
  sim.vz = 0;
  sim.speed = 0;
  sim.objective = "Investigue o elevador e descubra por que ele não sobe.";
  elevator.lineQueue = [
    { speaker: "NEWTON", text: "Alerta de invasão. Intrusos no setor de carga. O elevador principal está offline.", seconds: 4.4 },
    { speaker: "TIGRÃO", text: "E os invasores?", seconds: 2.2 },
    { speaker: "NEWTON", text: "Primeiro as forças. Sem controlar peso e tração, a carga não se move.", seconds: 4.2 },
    { speaker: "NEWTON", text: "Chegue ao painel. Evite o contato. O invasor não é o exercício.", seconds: 3.8 },
  ];
  const first = elevator.lineQueue.shift();
  if (first) speak(first.speaker, first.text, first.seconds);
  else sfx.ui();
  elevator.alarm = true;
  elevator.alarmT = 2.8;
  markCheckpoint(1);
}

function readForces() {
  const f = forcesOf(elevator.tension, elevator.mass, elevator.g);
  return { P: f.P, T: f.T, Fr: f.Fr, a: f.a };
}

function tickStage2Threats(hdt: number): void {
  const goal = elevator.goal;
  const chase = goal === "descent" || goal === "guardian";
  const pastRise = goal === "rise" || goal === "balance" || goal === "descent" || goal === "lab" || goal === "guardian" || goal === "protocol" || goal === "done";
  elevator.aliens = elevator.aliens.map((alien) => {
    const wake = alien.id === "drone" ? goal === "scan" || goal === "compare" || chase : alien.id === "field" ? pastRise && goal !== "protocol" : goal === "guardian";
    const next = stepAlien({ ...alien, disabled: !wake }, sim.x, sim.z, hdt, false);
    if (next.kind === "patrol") {
      const dx = next.x - next.homeX;
      const dz = next.z - next.homeZ;
      const dist = Math.hypot(dx, dz);
      if (dist > 2.2) {
        next.x = next.homeX + (dx / dist) * 2.2;
        next.z = next.homeZ + (dz / dist) * 2.2;
        next.mode = "return";
      }
    }
    return next;
  });
  elevator.crew = tickCrew(elevator.crew, hdt);
  if (elevator.crew.over || sim.transit > 0) return;
  const hit = hazardHits(elevator.aliens, sim.x, sim.z, sim.time, false);
  if (!hit) return;
  const next = takeDamage(elevator.crew, hit.source);
  elevator.crew = next;
  if (!next.applied) return;
  const len = Math.hypot(sim.x - hit.ox, sim.z - hit.oz) || 1;
  sim.vx += ((sim.x - hit.ox) / len) * 3.2;
  sim.vz += ((sim.z - hit.oz) / len) * 3.2;
  sim.shake = Math.max(sim.shake, 0.26);
  sfx.hit();
  if (next.over) {
    sim.downed = true;
    sfx.fail();
    queue("Sistema crítico. O elevador continua no último checkpoint.", 3.2);
  }
  publishNow();
}

export function resumeStage2(): void {
  const spot = STAGE2_POINTS.find((item) => item.id === elevator.crew.checkpoint) ?? STAGE2_POINTS[0];
  sim.x = spot?.x ?? -3.1;
  sim.z = spot?.z ?? -51.6;
  sim.vx = 0;
  sim.vz = 0;
  sim.vy = 0;
  elevator.crew = { ...elevator.crew, lives: 3, invuln: 1.8, over: false, flash: 0 };
  sim.downed = false;
  publishNow();
}

export function restartStage2(): void {
  elevator.active = false;
  beginStage2();
}

export function tickElevator(dt: number): void {
  if (sim.stage !== 2) {
    elevator.active = false;
    elevator.alarm = false;
    elevator.adjusting = false;
    return;
  }
  const tap = sim.actEdge;
  sim.actEdge = false;
  const hdt = Math.min(0.05, Math.max(0, Number.isFinite(dt) ? dt : 0));
  if (!(elevator.mass >= 0.5) || !Number.isFinite(elevator.mass)) elevator.mass = HOIST_MASS;
  if (!(elevator.g >= 0) || !Number.isFinite(elevator.g)) elevator.g = HOIST_G;
  if (!Number.isFinite(elevator.tension)) elevator.tension = clampTension(weightOf(elevator.mass, elevator.g));
  if (!Number.isFinite(elevator.y)) elevator.y = Y_START;
  if (!Number.isFinite(elevator.v)) elevator.v = 0;

  if (!elevator.active) return;

  if (sim.transit > 0) {
    sim.transit = Math.max(0, sim.transit - hdt);
    const u = 1 - sim.transit / TRANSIT;
    const s = u * u * (3 - 2 * u);
    sim.x = -3.1;
    sim.y = 0;
    sim.z = -50.35 + (-53.15 - -50.35) * Math.min(1, s);
    sim.yaw = Math.PI;
    sim.vx = 0;
    sim.vz = 0;
    sim.speed = 0;
    sim.objective = "Investigue o elevador e descubra por que ele não sobe.";
    pumpLines();
    return;
  }

  if (elevator.finale > 0) {
    elevator.finale = Math.max(0, elevator.finale - hdt);
    sim.x = 0.2;
    sim.y = 0;
    sim.z = -54.6;
    sim.yaw = 0;
    sim.vx = 0;
    sim.vy = 0;
    sim.vz = 0;
    sim.speed = 0;
    sim.animLock = elevator.finale > 0 ? "celebrate" : null;
    sim.objective = "Etapa 2 concluída";
    pumpLines();
    return;
  }

  if (elevator.alarmT > 0) {
    elevator.alarmT = Math.max(0, elevator.alarmT - hdt);
    elevator.alarm = elevator.alarmT > 0;
  }

  if (sim.phase !== "play" || sim.paused || sim.mapOpen) {
    elevator.adjusting = false;
    pumpLines();
    return;
  }

  tickStage2Threats(hdt);
  if (elevator.crew.over) {
    sim.downed = true;
    pumpLines();
    return;
  }
  sim.downed = false;

  const e = held.has("KeyE");
  const shift = held.has("ShiftLeft") || held.has("ShiftRight") || sim.touchSprint;
  const atPanel = nearPanel();
  const load = nearLoad();
  const atGrav = near(GRAV.x, GRAV.z, 1.55);
  elevator.adjusting = Boolean(atPanel && e && elevator.goal !== "scan" && elevator.goal !== "done");

  if (tap && load && elevator.goal === "lab") applyLoad(load);
  else if (tap && atGrav && elevator.goal === "lab") toggleGravity();
  else if (tap && load && elevator.goal !== "lab") queue("As cargas do laboratório entram depois que você controlar a descida.", 3.6);
  else if (tap && atGrav && elevator.goal !== "lab") queue("O simulador de gravidade abre no laboratório de forças.", 3.4);
  else if (elevator.goal === "scan" && tap && atPanel && !elevator.saidWait) {
    elevator.saidWait = true;
    queue("Antes de alterar qualquer coisa, observe. Abra o scanner na carga.", 3.8);
  } else if (atPanel && elevator.goal !== "scan" && elevator.goal !== "done") {
    const dir = shift ? -1 : 1;
    const gap = Math.abs(elevator.tension - weightOf(elevator.mass, elevator.g));
    const rate = gap > 80 ? Math.max(36, Math.min(120, elevator.mass * 0.9)) : gap > 25 ? 22 : 9;
    const tapStep = gap > 60 ? Math.max(10, elevator.mass * 0.22) : 2;
    if (e) {
      if (!elevator.prevE) bumpTension(dir, Math.min(8, tapStep));
      else bumpTension(dir, rate * hdt);
    } else if (tap) bumpTension(dir, tapStep);
  }
  elevator.prevE = e;

  const locked = elevator.goal === "scan" || elevator.goal === "done";
  const prevV = elevator.v;
  const step = integrateVariable(elevator.y, elevator.v, elevator.tension, elevator.mass, elevator.g, hdt, locked);
  elevator.y = step.y;
  elevator.v = step.v;

  if (step.hitFloor && prevV < -1.2 && !locked) {
    elevator.tries += 1;
    elevator.alarmT = Math.max(elevator.alarmT, 1.3);
    elevator.y = Math.max(elevator.y, 3.5);
    elevator.v = -0.15;
    sfx.fail();
    queue("Impacto no piso. A velocidade estava grande. Aumente a tração antes do fim da descida.", 4.4);
  }
  let crashed = false;
  if (step.hitTop && elevator.goal === "protocol" && prevV > 0.05) {
    crashed = true;
    elevator.tries += 1;
    elevator.flight.impacts += 1;
    elevator.flight.collided = true;
    elevator.flight.brakeValid = false;
    elevator.braking = false;
    elevator.flinch += 1;
    elevator.y = 7.05;
    elevator.v = 0.4;
    elevator.alarmT = Math.max(elevator.alarmT, 1.2);
    sim.shake = Math.max(sim.shake, 0.22);
    sfx.fail();
    queue("Impacto! Você chegou rápido demais. É necessário iniciar a frenagem antes do topo.", 4.2);
  }

  const { P, T, Fr, a } = readForces();
  elevator.note = physicsNote(P, T, Fr, a, elevator.v);
  if (elevator.prevFr * Fr < -1 && Math.abs(Fr) > 4 && Math.abs(elevator.prevFr) > 4) sfx.cable();
  elevator.prevFr = Fr;
  if (Math.abs(Fr) < FORCE_EQ) elevator.mastery.resultante = true;

  if (Math.abs(elevator.v) > 0.22) {
    elevator.motorT += hdt;
    if (elevator.motorT > 0.48) {
      elevator.motorT = 0;
      sfx.motor();
    }
  }

  if (elevator.goal === "scan") {
    sim.objective = elevator.arrived ? "2 · Ative o scanner" : "1 · Investigue o elevador";
    if (!elevator.arrived && atPanel) {
      elevator.arrived = true;
      markCheckpoint(2);
      queue("Elevador danificado. Escaneie antes de mudar a tração. Peso para baixo, tração para cima.", 4.4);
    }
    elevator.hint = elevator.arrived
      ? "Q liga o scanner. Peso para baixo, tração para cima."
      : "Caminhe até o painel do guincho. A carga não sobe.";
    if (sim.scanner && nearHoist()) {
      elevator.scanned = true;
      elevator.mastery.peso = true;
      elevator.goal = "compare";
      elevator.compareHold = 0;
      queue("Peso é m·g, para baixo. Tração é o cabo, para cima. As duas existem ao mesmo tempo.", 5);
      queue("E aumenta a tração. Shift+E diminui. No toque, Agir faz o mesmo passo — Correr inverte.", 4.6);
    }
  } else if (elevator.goal === "compare") {
    sim.objective = "3 · Compare o peso e a tração";
    elevator.hint =
      T > P + 12
        ? "A tração já supera o peso. A resultante aponta para cima."
        : T < P - 12
          ? `Peso ${comma(P, 1)} N, tração ${comma(T, 1)} N. A resultante ainda aponta para baixo.`
          : "Quase iguais. Resultante perto de zero não é ausência de forças.";
    if (elevator.mastery.tracao) elevator.compareHold += hdt;
    if (elevator.compareHold > 0.9 || (elevator.y > Y_START + 0.55 && elevator.v > 0.12 && Fr > 0)) {
      elevator.goal = "rise";
      queue("A diferença entre elas é a força resultante. Fr = T − P. E Fr = m·a.", 4.8);
      queue("Faça a carga subir. A tração precisa ser maior que o peso.", 3.8);
      queue("Há um invasor no fundo do setor. Ele não altera a carga. Evite o contato se for até lá.", 3.6);
    }
  } else if (elevator.goal === "rise") {
    sim.objective = "4 · Faça a carga subir";
    elevator.hint =
      Fr > 8
        ? "Tração maior que o peso. A resultante aponta para cima."
        : Math.abs(Fr) <= FORCE_EQ
          ? "Forças equilibradas. Se a carga estava parada, ela continua parada."
          : "A tração ainda não supera o peso.";
    if (elevator.y > Y_START + 0.55 && elevator.v > 0.14 && Fr > 0) {
      elevator.mastery.aceleracao = true;
      elevator.goal = "balance";
      elevator.balanceHold = 0;
      elevator.ask = "coast";
      elevator.askNote = "";
      queue("Agora pare a aceleração. Iguale a tração ao peso. Se ela ainda sobe, a velocidade não zera na hora.", 5.8);
    }
  } else if (elevator.goal === "balance") {
    sim.objective = "5 · Pare a aceleração";
    if (Math.abs(Fr) <= FORCE_EQ) {
      elevator.balanceHold += hdt;
      elevator.hint =
        Math.abs(elevator.v) > 0.35
          ? "Resultante quase zero: a velocidade se conserva. Reduza a tração para frear, depois volte ao peso."
          : "Tração e peso continuam. A resultante é zero. A aceleração também.";
    } else {
      elevator.balanceHold = 0;
      elevator.hint = Fr > 0 ? "Ainda há resultante para cima. A tração está maior que o peso." : "Ainda há resultante para baixo.";
    }
    if (elevator.balanceHold > 1.05 && Math.abs(elevator.v) < 0.35) {
      elevator.v = 0;
      enterDescent();
    }
  } else if (elevator.goal === "descent") {
    sim.objective = "6 · Controle a descida";
    if (elevator.drop === 0) {
      elevator.hint = a < -0.12 ? "Aceleração para baixo. Deixe a velocidade crescer um pouco." : "Reduza a tração abaixo do peso.";
      if (a < -0.12 && elevator.v < -0.18) elevator.drop = 1;
    } else if (elevator.drop === 1) {
      elevator.hint = "Iguale a tração ao peso sem parar a carga. Resultante zero não apaga a velocidade.";
      if (Math.abs(Fr) <= FORCE_EQ && elevator.v < -0.12) elevator.dropHold += hdt;
      else elevator.dropHold = 0;
      if (elevator.dropHold > 0.75) {
        elevator.drop = 2;
        elevator.mastery.resultante = true;
        elevator.ask = "brake";
        elevator.askNote = "";
        queue("Observe: a velocidade não é zero, e a força resultante é. Velocidade e aceleração não são a mesma coisa.", 5.6);
      }
    } else {
      elevator.hint = "Freie antes do piso. Para frear na descida, a aceleração precisa apontar para cima, contra o movimento.";
      const heldSafe =
        elevator.y > 1.7 &&
        elevator.y < 8.2 &&
        Math.abs(elevator.v) < 0.28 &&
        Math.abs(a) <= ACCEL_SETTLE &&
        a > -ACCEL_STILL;
      if (heldSafe) enterLab();
    }
  } else if (elevator.goal === "lab") {
    sim.objective = "Laboratório · subida, equilíbrio e descida";
    const picked = elevator.loadId === "a" || elevator.loadId === "b" || elevator.loadId === "c";
    if (!picked) {
      elevator.hint = "E numa carga à esquerda: 20, 50 ou 100 kg. Depois ajuste a tração no painel.";
    } else {
      if (a > 0.3 && elevator.v > 0.1) elevator.labUp = true;
      if (a < -0.3 && elevator.v < -0.1) elevator.labDown = true;
      if (Math.abs(Fr) <= FORCE_EQ && Math.abs(elevator.v) < 0.2) elevator.labHold += hdt;
      else elevator.labHold = 0;
      if (elevator.labHold > 0.65) elevator.labBalance = true;
      if (Math.abs(Fr) <= FORCE_EQ && elevator.v > SPEED_MOVE) elevator.coastHold += hdt;
      else elevator.coastHold = 0;
      if (elevator.coastHold > 0.7) {
        elevator.labCoast = true;
        elevator.mastery.uniforme = true;
        elevator.mastery.resultante = true;
        if (!elevator.saidCoast) {
          elevator.saidCoast = true;
          queueAs("TIGRÃO", "Então força resultante zero não significa necessariamente objeto parado?", 3.6);
          queue("Exatamente. Resultante zero significa aceleração zero. Observe: a força resultante é zero, mas a carga continua em movimento.", 6.2);
        }
      }
      if (Math.abs(a) > ACCEL_SETTLE && Math.abs(Fr) > 30) {
        const known = elevator.samples.find((item) => item.mass === elevator.mass);
        if (known) {
          known.Fr = Fr;
          known.a = a;
        } else elevator.samples.push({ mass: elevator.mass, Fr, a });
        if (!elevator.saidPair && elevator.samples.length >= 2) {
          const [first, second] = elevator.samples;
          if (first && second && Math.abs(first.Fr - second.Fr) < 25 && Math.abs(first.mass - second.mass) > 10) {
            elevator.saidPair = true;
            elevator.mastery.mesmaFr = true;
            const heavy = first.mass > second.mass ? first : second;
            const light = first.mass > second.mass ? second : first;
            queue(
              `Resultante parecida, perto de ${comma(light.Fr, 0)} N. ${comma(light.mass, 0)} kg acelerou ${comma(light.a, 2)} m/s²; ${comma(heavy.mass, 0)} kg acelerou ${comma(heavy.a, 2)} m/s². A massa maior acelera menos.`,
              6.4,
            );
          }
        }
      }
      const missing = [
        elevator.labUp ? "" : "subida",
        elevator.labBalance ? "" : "equilíbrio",
        elevator.labDown ? "" : "descida",
        elevator.labCoast ? "" : "resultante zero em movimento",
      ].filter(Boolean);
      elevator.hint = missing.length
        ? `Com ${comma(elevator.mass, 0)} kg falta: ${missing.join(", ")}.`
        : "As quatro situações estão registradas. Troque a massa e repita uma resultante parecida.";
      if (elevator.labUp && labReady({
        up: elevator.labUp,
        down: elevator.labDown,
        balance: elevator.labBalance,
        coast: elevator.labCoast,
        masses: elevator.mastery.mesmaFr,
        gravity: elevator.mastery.gravidade,
      })) enterGuardian();
    }
  } else if (elevator.goal === "guardian") {
    sim.objective = "Guardião · forças";
    const phase = elevator.proto;
    const met = guardMet(phase, P, T, Fr, a, elevator.v);
    if (met) elevator.protoHold += hdt;
    else elevator.protoHold = 0;
    elevator.hint = met ? "Condição física válida. Segure mais um instante." : elevator.hint;
    if (elevator.protoHold > 0.7) {
      elevator.proto += 1;
      elevator.protoHold = 0;
      sfx.success();
      if (elevator.proto >= 5) {
        queue("Guardião desativado. O controle das forças voltou. Agora o Protocolo Newton.", 4.2);
        enterProtocol();
      } else queue("Fase aceita. A próxima pede outra relação entre T e P.", 2.8);
    }
  } else if (elevator.goal === "protocol") {
    const phase = elevator.proto === 0 ? "Repouso" : elevator.proto === 1 ? "Acelerando" : elevator.proto === 2 ? "Velocidade constante" : "Frenagem";
    sim.objective = `7 · ${phase}`;
    if (elevator.v > elevator.flight.vMax) elevator.flight.vMax = elevator.v;
    if (!elevator.saidSurge && elevator.v > HOIST_V_MAX - 0.05) {
      elevator.saidSurge = true;
      queue("Você aumentou demais a tração. Observe como isso aumentou a aceleração.", 3.6);
    }
    if (elevator.proto === 0) {
      elevator.hint = "Repouso: tração igual ao peso, resultante zero, velocidade zero.";
      if (Math.abs(Fr) < FORCE_REST && Math.abs(a) < ACCEL_STILL && Math.abs(elevator.v) < SPEED_REST && elevator.y < 2.2) elevator.protoHold += hdt;
      else elevator.protoHold = 0;
      if (elevator.protoHold > 0.85) {
        elevator.proto = 1;
        elevator.protoHold = 0;
        queue("Equilíbrio de forças: a resultante é aproximadamente zero.", 3.2);
        queue("Agora faça a carga subir. A tração precisa ser maior que o peso.", 3.4);
      }
    } else if (elevator.proto === 1) {
      elevator.hint = "Aceleração para cima: tração maior que o peso, velocidade crescendo.";
      if (elevator.y > 3.6 && a > 0.28 && elevator.v > 0.2) {
        elevator.proto = 2;
        elevator.protoHold = 0;
        queue("Agora iguale a tração ao peso sem parar a carga.", 3.4);
      }
    } else if (elevator.proto === 2) {
      elevator.hint =
        Math.abs(elevator.v) < 0.12
          ? "A velocidade zerou. Aumente um pouco a tração e, no meio da subida, iguale de novo."
          : "Resultante perto de zero e velocidade para cima. Segure assim por um instante.";
      if (Math.abs(Fr) <= FORCE_COAST && Math.abs(a) < ACCEL_STILL && elevator.v > SPEED_MOVE) elevator.protoHold += hdt;
      else elevator.protoHold = 0;
      if (elevator.protoHold > 0.8) {
        elevator.proto = 3;
        queue("Resultante zero não significa necessariamente repouso.", 3.2);
        queue("Como a aceleração é zero, a velocidade permanece constante.", 3.4);
        queueAs("TIGRÃO", "Então, se a resultante é zero, a carga pode continuar subindo?", 3.2);
        queue("Sim. Se a velocidade já for diferente de zero, ela continua constante. Agora freie antes do topo.", 4.2);
      }
    } else if (!crashed) {
      if (!elevator.flight.brakeValid && brakingGate(a, elevator.v, elevator.y)) {
        elevator.flight.brakeValid = true;
        elevator.flight.brakeY = elevator.y;
        elevator.flight.brakeV = elevator.v;
        elevator.flight.brakeA = a;
        elevator.flight.brakeDur = 0;
        elevator.braking = true;
      } else if (elevator.flight.brakeValid && elevator.v > elevator.flight.brakeV - 0.04 && a > -0.05) {
        elevator.flight.brakeValid = false;
        elevator.braking = false;
      }
      if (elevator.flight.brakeValid) {
        elevator.flight.brakeDur += hdt;
        if (a < elevator.flight.brakeA) elevator.flight.brakeA = a;
      }
      const inBand = elevator.y >= ARRIVE_LO && elevator.y <= ARRIVE_HI;
      if (elevator.flight.brakeValid && inBand && elevator.v >= 0.45 && sim.time > elevator.warnAt) {
        elevator.warnAt = sim.time + 6;
        queue("Frenagem insuficiente. A velocidade ainda era alta na chegada.", 3.2);
      }
      elevator.hint = elevator.flight.brakeValid
        ? "Frenagem válida. A velocidade precisa cair antes do limite — bater no topo não conta."
        : "Tração abaixo do peso, ainda subindo, para a velocidade cair antes do topo.";
      if (
        arrivalAllowed({
          phase: "brake",
          brakeValid: elevator.flight.brakeValid,
          brakeV: elevator.flight.brakeV,
          y: elevator.y,
          v: elevator.v,
          hitTop: step.hitTop,
          brakeDur: elevator.flight.brakeDur,
        })
      ) {
        finish();
      }
    }
  } else {
    sim.objective = "Etapa 2 concluída · força resultante";
    elevator.hint = "Tração e peso continuam. Quem decide a aceleração é a resultante.";
    elevator.alarm = false;
  }

  const mark = `${elevator.goal}:${elevator.arrived}:${elevator.drop}:${elevator.proto}`;
  if (mark !== elevator.mark) {
    elevator.mark = mark;
    elevator.stuck = 0;
  } else elevator.stuck = Math.min(40, elevator.stuck + hdt);
  const card = lessonFor({
    goal: elevator.goal,
    drop: elevator.drop,
    proto: elevator.proto,
    arrived: elevator.arrived,
    touch: Math.abs(sim.touchX) + Math.abs(sim.touchY) > 0.05 || sim.touchSprint,
    stuck: elevator.stuck,
    lab: {
      up: elevator.labUp,
      down: elevator.labDown,
      balance: elevator.labBalance,
      coast: elevator.labCoast,
      masses: elevator.mastery.mesmaFr,
      gravity: elevator.mastery.gravidade,
    },
  });
  elevator.hint = card.hints[Math.min(2, Math.floor(elevator.stuck / 8))] ?? card.hints[0];
  sim.objective = `${card.step}/${card.total} · ${card.title}`;

  if (Math.abs(elevator.v) > HOIST_V_MAX) elevator.v = Math.sign(elevator.v) * HOIST_V_MAX;
  pumpLines();
}

export function answerLesson(index: number): void {
  if (!elevator.ask || sim.stage !== 2) return;
  const graded = gradeLesson(elevator.ask, index);
  elevator.askNote = graded.text;
  if (graded.ok) {
    elevator.ask = null;
    sfx.success();
  } else sfx.fail();
}

export function dismissLesson(): void {
  elevator.ask = null;
}

export function toggleHelp(): void {
  elevator.help = !elevator.help;
  sfx.ui();
}

if (typeof window !== "undefined") {
  (window as unknown as { __elevatorTest?: unknown }).__elevatorTest = {
    begin: beginStage2,
    get: hoistState,
    setTension: (n: number) => {
      elevator.tension = clampTension(n);
    },
    setMass: (n: number) => {
      elevator.mass = n;
    },
    setGravity: (n: number) => {
      elevator.g = n;
    },
    skipTransit: () => {
      sim.transit = 0;
      sim.x = -3.1;
      sim.z = -53.15;
      sim.yaw = Math.PI;
    },
  };
}
