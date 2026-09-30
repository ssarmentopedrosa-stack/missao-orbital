import { sfx } from "./audio";
import {
  ENERGY_TOL,
  kineticEnergy,
  mechanicallyConserved,
  potentialEnergy,
  stepCart,
  stepFall,
  workEnergyDelta,
  workFromResultant,
  workOf,
} from "./energy";
import { HOIST_G, integrateVariable } from "./hoist";
import { held, publishNow, sim, speak } from "./sim";
import {
  addCore,
  addScore,
  type ChallengeId,
  challengeOf,
  CHECKPOINTS,
  freshAliens,
  freshCrew,
  gradeChallenge,
  guardianAsleep,
  GUARD_STEPS,
  hazardHits,
  heal,
  PICKUPS,
  reachCheckpoint,
  stepAlien,
  takeDamage,
  tickCrew,
} from "./survival";

export const VAULT = { x: 20, z: -56 };
export const HATCH = { x: 15.4, z: -60.2 };
export const HOIST = { x: 16.8, z: -56 };
export const DIAL = { x: 21.2, z: -60.4 };
export const TRACK = { x: 22.6, z: -53.5 };
export const CORE = { x: 25.2, z: -56 };

const ANGLES = [0, 30, 45, 60, 90, 120, 180];
const TRANSIT = 5.2;

export type VaultGoal =
  | "arrive"
  | "null"
  | "positive"
  | "negative"
  | "angle"
  | "kinetic"
  | "theorem"
  | "potential"
  | "fall"
  | "friction"
  | "core"
  | "done";

type Line = { speaker: string; text: string; seconds: number };

export const vault = {
  active: false,
  goal: "arrive" as VaultGoal,
  hint: "",
  note: "",
  mass: 20,
  g: HOIST_G,
  tension: 20 * HOIST_G,
  workT: 0,
  y: 1.2,
  v: 0,
  yMark: 1.2,
  angle: 0,
  angleI: 0,
  benchF: 100,
  benchD: 0,
  cartX: 0,
  cartV: 0,
  cartF: 80,
  cartM: 20,
  h: 5,
  fallV: 0,
  mu: 0,
  thermal: 0,
  em0: 0,
  sawUp: false,
  kinSlow: false,
  kinFast: false,
  kinV: 2,
  ang0: false,
  ang90: false,
  ang180: false,
  hold: 0,
  finale: 0,
  t0: 0,
  lineQueue: [] as Line[],
  modules: 0,
  crew: freshCrew(),
  aliens: freshAliens(),
  quiz: null as ChallengeId | null,
  quizNote: "",
  banner: "",
  bannerT: 0,
  guardianSleep: false,
  bossIntro: -1,
};

function resetVault(): void {
  vault.active = false;
  vault.goal = "arrive";
  vault.hint = "";
  vault.note = "";
  vault.mass = 20;
  vault.g = HOIST_G;
  vault.tension = 20 * HOIST_G;
  vault.workT = 0;
  vault.y = 1.2;
  vault.v = 0;
  vault.yMark = 1.2;
  vault.angle = 0;
  vault.angleI = 0;
  vault.benchF = 100;
  vault.benchD = 0;
  vault.cartX = 0;
  vault.cartV = 0;
  vault.cartF = 80;
  vault.cartM = 20;
  vault.h = 5;
  vault.fallV = 0;
  vault.mu = 0;
  vault.thermal = 0;
  vault.em0 = potentialEnergy(10, HOIST_G, 5);
  vault.sawUp = false;
  vault.kinSlow = false;
  vault.kinFast = false;
  vault.kinV = 2;
  vault.ang0 = false;
  vault.ang90 = false;
  vault.ang180 = false;
  vault.hold = 0;
  vault.finale = 0;
  vault.lineQueue = [];
  vault.modules = 0;
  vault.crew = freshCrew();
  vault.aliens = freshAliens();
  vault.quiz = null;
  vault.quizNote = "";
  vault.banner = "";
  vault.bannerT = 0;
  vault.guardianSleep = false;
  vault.bossIntro = -1;
  sim.downed = false;
}

function queue(text: string, seconds = 3.6): void {
  vault.lineQueue.push({ speaker: "NEWTON", text, seconds });
}

function queueAs(speaker: string, text: string, seconds = 3.2): void {
  vault.lineQueue.push({ speaker, text, seconds });
}

function pumpLines(): void {
  if (sim.line) return;
  const next = vault.lineQueue.shift();
  if (next) speak(next.speaker, next.text, next.seconds);
}

function near(p: { x: number; z: number }, r = 1.85): boolean {
  return Math.hypot(sim.x - p.x, sim.z - p.z) < r;
}

function mark(goal: VaultGoal, modules: number): void {
  vault.goal = goal;
  vault.modules = modules;
  vault.hold = 0;
  sfx.ui();
}

export function vaultState() {
  const dy = vault.y - vault.yMark;
  const tensionWork = vault.workT;
  const weightWork = workOf(vault.mass * vault.g, Math.abs(dy), dy >= 0 ? 180 : 0);
  const ec = kineticEnergy(vault.mass, vault.v);
  const epg = potentialEnergy(vault.mass, vault.g, Math.max(0, vault.y - 1.05));
  const benchW = workOf(vault.benchF, vault.benchD, vault.angle);
  const cartEc = kineticEnergy(vault.cartM, vault.cartV);
  const cartW = workFromResultant(vault.cartF, vault.cartX);
  const fallEc = kineticEnergy(10, vault.fallV);
  const fallEpg = potentialEnergy(10, vault.g, vault.h);
  const fallEm = fallEc + fallEpg;
  return {
    goal: vault.goal,
    hint: vault.hint,
    note: vault.note,
    active: vault.active,
    done: vault.goal === "done",
    finale: vault.finale,
    modules: vault.modules,
    mass: vault.mass,
    g: vault.g,
    tension: vault.tension,
    y: vault.y,
    v: vault.v,
    h: Math.max(0, vault.y - 1.05),
    dy,
    tensionWork,
    weightWork,
    netWork: tensionWork + weightWork,
    ec,
    epg,
    em: ec + epg,
    angle: vault.angle,
    benchF: vault.benchF,
    benchD: vault.benchD,
    benchW,
    kinV: vault.kinV,
    kinEc: kineticEnergy(50, vault.kinV),
    cartX: vault.cartX,
    cartV: vault.cartV,
    cartW,
    cartEc,
    cartDelta: workEnergyDelta(0, cartEc),
    fallH: vault.h,
    fallV: vault.fallV,
    fallEc,
    fallEpg,
    fallEm,
    thermal: vault.thermal,
    em0: vault.em0,
    mu: vault.mu,
  };
}

export function beginStage3(): void {
  if (sim.stage === 3 && vault.active) return;
  resetVault();
  vault.active = true;
  vault.t0 = sim.time;
  sim.stage = 3;
  sim.phase = "play";
  sim.paused = false;
  sim.mapOpen = false;
  sim.freeplay = false;
  sim.scanner = false;
  sim.solved = false;
  sim.animLock = null;
  sim.transit = TRANSIT;
  sim.x = 14.1;
  sim.y = 0;
  sim.z = -56;
  sim.yaw = Math.PI / 2;
  sim.vx = 0;
  sim.vy = 0;
  sim.vz = 0;
  sim.speed = 0;
  sim.objective = "1 · O que é trabalho?";
  vault.hint = "Caminhe até a escotilha travada.";
  queue("Tigrão, conseguimos controlar as forças. Agora precisamos descobrir para onde vai a energia.", 4.4);
  queue("Na missão anterior, a resultante produzia aceleração. Aqui a força encontra um deslocamento.", 4.6);
  queueAs("TIGRÃO", "Então força sozinha não basta?", 2.6);
  queue("Exatamente. Sem deslocamento, o trabalho mecânico é zero.", 3.4);
  const first = vault.lineQueue.shift();
  if (first) speak(first.speaker, first.text, first.seconds);
}

function finish(): void {
  if (vault.goal === "done") return;
  vault.goal = "done";
  vault.modules = 8;
  vault.finale = 7;
  vault.hint = "O núcleo aceitou a energia. Trabalho e energia contam a mesma história.";
  sim.objective = "Etapa 3 concluída";
  sim.animLock = "celebrate";
  sfx.success();
  queue("O núcleo estável não recebeu força mágica.", 3.2);
  queue("Recebeu trabalho, transformação e o que o atrito tinha espalhado em calor.", 4.2);
  queueAs("TIGRÃO", "A energia não sumiu. Só mudou de endereço.", 3.2);
}

function banner(text: string): void {
  vault.banner = text;
  vault.bannerT = 1.6;
}

function tickThreats(hdt: number): void {
  vault.bannerT = Math.max(0, vault.bannerT - hdt);
  if (vault.bannerT <= 0) vault.banner = "";
  const asleepField = Boolean(vault.crew.solved.work);
  const asleepGuard = vault.guardianSleep;
  const before = vault.aliens.map((alien) => alien.mode);
  vault.aliens = vault.aliens.map((alien) =>
    stepAlien(
      alien,
      sim.x,
      sim.z,
      hdt,
      (alien.kind === "energy" && asleepField) || (alien.kind === "guardian" && asleepGuard),
    ),
  );
  if (vault.aliens.some((alien, index) => alien.mode === "alert" && before[index] !== "alert")) sfx.alert();
  vault.crew = tickCrew(vault.crew, hdt);
  if (!vault.quiz && vault.goal !== "done") {
    const hit = hazardHits(vault.aliens, sim.x, sim.z, sim.time, false);
    if (hit) {
      const next = takeDamage(vault.crew, hit.source);
      vault.crew = next;
      if (next.applied) {
        const len = Math.hypot(sim.x - hit.ox, sim.z - hit.oz) || 1;
        sim.vx += ((sim.x - hit.ox) / len) * 3.4;
        sim.vz += ((sim.z - hit.oz) / len) * 3.4;
        sim.shake = Math.max(sim.shake, 0.28);
        sfx.hit();
        if (next.over) {
          sim.downed = true;
          sfx.fail();
        }
        publishNow();
      }
    }
  }
  for (const point of CHECKPOINTS) {
    if (Math.hypot(sim.x - point.x, sim.z - point.z) > 1.35) continue;
    const next = reachCheckpoint(vault.crew, point.id);
    vault.crew = next;
    if (next.fresh) {
      banner(`Checkpoint ativado · ${point.name}`);
      sfx.ui();
    }
  }
  for (const item of PICKUPS) {
    if (vault.crew.picked[item.id]) continue;
    if (item.kind !== "core" && vault.crew.lives >= 3) continue;
    if (Math.hypot(sim.x - item.x, sim.z - item.z) > 0.8) continue;
    vault.crew = { ...vault.crew, picked: { ...vault.crew.picked, [item.id]: true } };
    if (item.kind === "core") {
      const next = addCore(vault.crew);
      vault.crew = next;
      if (next.gained) {
        banner("Núcleo de energia +1");
        sfx.success();
      }
    } else if (item.kind === "cell") {
      const next = heal(vault.crew, 1);
      vault.crew = next;
      banner(next.gained ? "Célula de energia · +1 vida" : "Vidas já estão no máximo");
      sfx.ui();
    } else {
      const next = heal(vault.crew, 3);
      vault.crew = next;
      banner(next.gained ? "Recuperação completa" : "Vidas já estão no máximo");
      sfx.success();
    }
  }
}

export function answerChallenge(index: number): void {
  if (!vault.quiz || sim.stage !== 3 || vault.crew.over) return;
  if (vault.crew.solved[vault.quiz]) return;
  const spec = challengeOf(vault.quiz);
  const picked = spec.options[index];
  if (picked == null) return;
  const graded = gradeChallenge(vault.quiz, picked);
  if (!graded.ok) {
    vault.crew = { ...vault.crew, tries: vault.crew.tries + 1 };
    vault.quizNote = spec.hint;
    sfx.fail();
    publishNow();
    return;
  }
  const first = vault.crew.tries === 0;
  const id = vault.quiz;
  vault.crew = addScore({ ...vault.crew, tries: 0, solved: { ...vault.crew.solved, [id]: true } }, first ? 150 : 100);
  vault.quizNote = spec.explain;
  sfx.success();
  if (id === "work") {
    vault.crew = addCore(vault.crew);
    vault.quiz = null;
    banner("Campo desligado · 300 J transferidos");
    publishNow();
    return;
  }
  const guardIndex = GUARD_STEPS.indexOf(id);
  if (guardIndex >= 0 && guardIndex < GUARD_STEPS.length - 1) {
    vault.quiz = GUARD_STEPS[guardIndex + 1] ?? null;
    publishNow();
    return;
  }
  if (id === "guard-heat") {
    vault.crew = addCore(vault.crew);
    vault.quiz = null;
    vault.guardianSleep = guardianAsleep(vault.crew.solved);
    banner("Guardião desativado");
    queue("O guardião não foi destruído. A energia que o sustentava acabou, e ele apenas dorme.", 4.2);
    publishNow();
    return;
  }
  vault.quiz = null;
  banner("Cálculo confirmado");
  publishNow();
}

export function openChallenge(id: ChallengeId): void {
  if (vault.crew.solved[id] || vault.crew.over) return;
  vault.quiz = id;
  vault.quizNote = "";
  vault.crew = { ...vault.crew, tries: 0 };
  sfx.ui();
}

export function resumeCheckpoint(): void {
  const spot = CHECKPOINTS.find((item) => item.id === vault.crew.checkpoint) ?? CHECKPOINTS[0];
  if (!spot) return;
  sim.downed = false;
  sim.paused = false;
  sim.x = spot.x;
  sim.y = 0;
  sim.z = spot.z;
  sim.vx = 0;
  sim.vy = 0;
  sim.vz = 0;
  sim.speed = 0;
  vault.crew = { ...vault.crew, lives: 3, invuln: 1.8, over: false, flash: 0 };
  vault.quiz = null;
  banner(`Retorno · ${spot.name}`);
  sfx.ui();
}

export function tickVault(dt: number): void {
  if (sim.stage !== 3) {
    if (vault.active && vault.goal !== "done") vault.active = false;
    return;
  }
  const tap = sim.actEdge;
  sim.actEdge = false;
  const hdt = Math.min(0.05, Math.max(0, Number.isFinite(dt) ? dt : 0));
  if (!vault.active) return;
  if (sim.transit > 0) {
    sim.transit = Math.max(0, sim.transit - hdt);
    pumpLines();
    return;
  }
  tickThreats(hdt);
  if (vault.bossIntro > 0) vault.bossIntro = Math.max(0, vault.bossIntro - hdt);
  if (vault.crew.over) {
    sim.downed = true;
    pumpLines();
    return;
  }
  if (vault.finale > 0) {
    vault.finale = Math.max(0, vault.finale - hdt);
    sim.x = CORE.x - 1.6;
    sim.z = CORE.z + 1.1;
    sim.yaw = Math.atan2(CORE.x - sim.x, CORE.z - sim.z);
  }

  const e = held.has("KeyE");
  const shift = held.has("ShiftLeft") || held.has("ShiftRight") || sim.touchSprint;
  const atHoist = near(HOIST);
  const P = vault.mass * vault.g;

  if (vault.goal === "positive" || vault.goal === "negative" || vault.goal === "potential") {
    if (atHoist && e) {
      const dir = shift ? -1 : 1;
      const stepN = tap ? 12 : 70 * hdt;
      vault.tension = Math.max(0, Math.min(1800, vault.tension + dir * stepN));
    } else if (atHoist && tap) vault.tension = Math.max(0, Math.min(1800, vault.tension + (shift ? -12 : 12)));
    const prevY = vault.y;
    const step = integrateVariable(vault.y, vault.v, vault.tension, vault.mass, vault.g, hdt, false, 1.05, 7.4);
    vault.y = step.y;
    vault.v = step.v;
    const moved = vault.y - prevY;
    if (moved >= 0) vault.workT += workOf(vault.tension, moved, 0);
    else vault.workT += workOf(vault.tension, -moved, 180);
    if (step.v > 0.12) vault.sawUp = true;
  }

  if (vault.goal === "angle") {
    vault.benchD = Math.min(4, vault.benchD + 0.55 * hdt);
    if (near(DIAL) && tap) {
      vault.angleI = (vault.angleI + 1) % ANGLES.length;
      vault.angle = ANGLES[vault.angleI] ?? 0;
      sfx.ui();
    }
    const w = workOf(vault.benchF, vault.benchD, vault.angle);
    if (vault.benchD > 1.4 && vault.angle === 0 && w > 50) vault.ang0 = true;
    if (vault.benchD > 1.4 && vault.angle === 90 && Math.abs(w) < 1) vault.ang90 = true;
    if (vault.benchD > 1.4 && vault.angle === 180 && w < -50) vault.ang180 = true;
  }

  if (vault.goal === "kinetic" && near(TRACK) && tap) {
    vault.kinV = vault.kinV < 3 ? 4 : 2;
    vault.hold = 0;
    sfx.ui();
  }
  if (vault.goal === "kinetic") {
    vault.hold += hdt;
    if (vault.kinV === 2 && vault.hold > 0.45) vault.kinSlow = true;
    if (vault.kinV === 4 && vault.hold > 0.45) vault.kinFast = true;
  }

  if (vault.goal === "theorem") {
    const step = stepCart(vault.cartX, vault.cartV, vault.cartF, vault.cartM, 0, vault.g, hdt);
    vault.cartX = Math.min(6, step.x);
    vault.cartV = step.v;
  }

  if (vault.goal === "fall" || vault.goal === "friction") {
    const step = stepFall(vault.h, vault.fallV, 10, vault.g, vault.mu, hdt);
    vault.thermal += step.heat;
    vault.h = step.h;
    vault.fallV = step.v;
  }

  const s = vaultState();
  if (vault.goal === "arrive") {
    sim.objective = "1 · O que é trabalho?";
    vault.hint = "A escotilha travada está à esquerda. Encoste nela e segure E.";
    vault.note = "Força sem deslocamento não transfere energia.";
    if (near(HATCH)) {
      mark("null", 0);
      queue("A escotilha não cede. Existe força. Não existe deslocamento.", 3.8);
    }
  } else if (vault.goal === "null") {
    sim.objective = "Neutralize o campo e entenda o trabalho nulo";
    vault.hint = near(HATCH) ? "Segure E. A força existe. O deslocamento continua zero." : "Volte à escotilha travada.";
    vault.note = "W = F·d·cosθ. Se d = 0, W = 0.";
    if (near(HATCH) && e) vault.hold += hdt;
    else vault.hold = 0;
    if (vault.hold > 1.15 && workOf(80, 0, 0) === 0) {
      mark("positive", 1);
      vault.mass = 20;
      vault.y = 1.2;
      vault.v = 0;
      vault.yMark = 1.2;
      vault.tension = 20 * HOIST_G;
      vault.workT = 0;
      vault.sawUp = false;
      queue("A força continua existindo, mas sem deslocamento não há trabalho mecânico.", 4);
      queue("Agora eleve a carga de 20 kg. Tração e deslocamento apontam para cima: o trabalho é positivo.", 4.4);
    }
  } else if (vault.goal === "positive") {
    sim.objective = "Eleve a carga · trabalho positivo";
    vault.hint = atHoist ? "E aumenta a tração. Shift+E diminui. A carga precisa subir." : "O guincho está no centro da sala.";
    vault.note = "θ = 0° · cos 0° = 1 · W = F·d";
    if (vault.sawUp && s.dy > 1.15 && s.tensionWork > 180) {
      mark("negative", 2);
      vault.y = 4.4;
      vault.v = 0;
      vault.yMark = 4.4;
      vault.tension = Math.max(0, P - 70);
      vault.workT = 0;
      queue("A força atuou no mesmo sentido do deslocamento. O trabalho foi positivo.", 3.8);
      queue("Agora a carga desce e a tração continua para cima. Isso é trabalho negativo — a frenagem da etapa anterior.", 4.6);
    }
  } else if (vault.goal === "negative") {
    sim.objective = "Freie a descida · trabalho negativo";
    vault.hint = "Deixe descer. Se quiser, Shift+E reduz ainda mais a tração. O trabalho da tração fica negativo.";
    vault.note = "θ = 180° · a força de sustentação aponta contra o deslocamento.";
    if (s.dy < -0.9 && s.tensionWork < -80 && vault.v < -0.05) {
      mark("angle", 3);
      vault.benchD = 0;
      vault.angle = 0;
      vault.angleI = 0;
      queue("A força de frenagem atua contra o deslocamento. Por isso, seu trabalho é negativo.", 4.2);
      queue("No trilho ao fundo, gire o ângulo com E. 0° transfere, 90° não, 180° retira.", 4.4);
    }
  } else if (vault.goal === "angle") {
    sim.objective = "Compare 0°, 90° e 180°";
    vault.hint = near(DIAL)
      ? `Ângulo ${vault.angle}°. E troca o ângulo. Falta: ${[vault.ang0 ? "" : "0°", vault.ang90 ? "" : "90°", vault.ang180 ? "" : "180°"].filter(Boolean).join(", ") || "nada"}.`
      : "O disco de ângulo está no fundo da sala.";
    vault.note = "θ = 90° · a força é perpendicular ao deslocamento · W = 0.";
    if (vault.ang0 && vault.ang90 && vault.ang180) {
      mark("kinetic", 4);
      vault.kinV = 2;
      vault.hold = 0;
      queue("Força perpendicular ao deslocamento não realiza trabalho. Força não é a mesma coisa que trabalho.", 4.6);
      queueAs("TIGRÃO", "E se a velocidade dobrar?", 2.4);
      queue("A energia cinética não dobra. Ela quadruplica. Ec = ½mv².", 3.8);
    }
  } else if (vault.goal === "kinetic") {
    sim.objective = "A velocidade ao quadrado muda a energia";
    vault.hint = near(TRACK) ? "E alterna 2 m/s e 4 m/s. A massa fica em 50 kg. Compare as duas energias." : "A bancada de velocidade está no trilho.";
    vault.note = "Ec = ½mv². Dobrar v multiplica a energia por quatro.";
    if (vault.kinSlow && vault.kinFast) {
      const slow = kineticEnergy(50, 2);
      const fast = kineticEnergy(50, 4);
      if (fast > slow * 3.9) {
        mark("theorem", 5);
        vault.cartX = 0;
        vault.cartV = 0;
        queue("50 kg a 4 m/s têm 400 J. A 2 m/s, 100 J. A velocidade pesa ao quadrado.", 4.2);
        queue("No trilho, o peso é perpendicular ao deslocamento: trabalho nulo. Quem muda a energia cinética é a força ao longo do trilho.", 5);
      }
    }
  } else if (vault.goal === "theorem") {
    sim.objective = "O trabalho da resultante vira energia cinética";
    const scale = Math.max(1, Math.abs(s.cartW), Math.abs(s.cartDelta));
    const close = Math.abs(s.cartW - s.cartDelta) < 0.08 * scale;
    vault.hint = "A força empurra o carrinho. Compare o trabalho com a variação da energia cinética.";
    vault.note = "W_resultante = ΔEc. O peso, perpendicular ao trilho, não entra nessa conta.";
    if (s.cartX > 1.6 && s.cartV > 0.4 && close) {
      mark("potential", 5);
      vault.mass = 10;
      vault.g = HOIST_G;
      vault.y = 1.12;
      vault.v = 0;
      vault.yMark = 1.12;
      vault.tension = 10 * HOIST_G;
      vault.workT = 0;
      vault.sawUp = false;
      queue("O trabalho da resultante apareceu como energia cinética. W = ΔEc.", 3.8);
      queue("Agora eleve 10 kg até cerca de 5 m. A energia potencial é mgh.", 4);
    }
  } else if (vault.goal === "potential") {
    sim.objective = "Erga 10 kg até 5 m";
    const h = Math.max(0, vault.y - 1.05);
    vault.hint = atHoist ? "E aumenta a tração. A altura de referência é o piso do guincho. Alvo: 5 m." : "Volte ao guincho. Carga de 10 kg.";
    vault.note = "Epg = mgh. Mais alto, mais energia armazenada no campo gravitacional.";
    const epg = potentialEnergy(10, HOIST_G, h);
    if (h > 4.85 && h < 6.4 && Math.abs(vault.v) < 0.55 && Math.abs(epg - 490.5) < 40) {
      mark("fall", 6);
      vault.h = 5;
      vault.fallV = 0;
      vault.mu = 0;
      vault.thermal = 0;
      vault.em0 = potentialEnergy(10, HOIST_G, 5);
      queue("10 kg, 9,81 m/s², 5 m. Epg fica em 490,5 J. A altura entrou na conta.", 4.2);
      queue("Solte a carga. A potencial deve virar cinética. A mecânica fica quase constante.", 4.2);
    }
  } else if (vault.goal === "fall") {
    sim.objective = "Observe a conservação na queda";
    vault.hint = "Observe a queda sem atrito. Uma barra desce, a outra sobe, a soma quase não muda.";
    vault.note = "Em = Ec + Epg. Sem dissipação, Em inicial ≈ Em final.";
    const dropped = vault.em0 - s.fallEpg > 80 && s.fallEc > 60;
    if (vault.h < 1.15 && vault.h > 0.2 && vault.fallV < -0.8 && dropped && mechanicallyConserved(vault.em0, s.fallEm, ENERGY_TOL)) {
      mark("friction", 7);
      vault.h = 5;
      vault.fallV = 0;
      vault.mu = 0.35;
      vault.thermal = 0;
      vault.em0 = potentialEnergy(10, HOIST_G, 5);
      queue("Durante a queda, a energia potencial foi transformada em energia cinética.", 4);
      queue("Observe o painel. A energia mecânica permaneceu praticamente constante.", 3.8);
      queue("Agora o trilho tem atrito. A mecânica diminui. A energia não desaparece.", 4.2);
    }
  } else if (vault.goal === "friction") {
    sim.objective = "Atrito transforma mecânica em calor";
    vault.hint = "A energia térmica sobe enquanto a mecânica desce. Nada some: muda de forma.";
    vault.note = "Em final < Em inicial. A diferença foi para energia térmica.";
    if (vault.h < 1.3 && vault.h > 0.15 && vault.thermal > 20 && s.fallEm < vault.em0 - 15) {
      mark("core", 7);
      queue("A energia mecânica diminuiu porque parte dela foi transformada em energia térmica pelo atrito.", 4.6);
      queueAs("TIGRÃO", "Então o núcleo pode receber o que a gente mediu?", 3);
      queue("Sim. Vá até o núcleo e confirme. Ele só abre depois dessa sequência real.", 3.8);
    }
  } else if (vault.goal === "core") {
    sim.objective = "Desative o guardião e restaure o núcleo";
    vault.hint = near(CORE) ? "Segure E só depois que a energia do guardião chegar a zero." : "O núcleo está no fim da sala, à direita.";
    vault.note = "Força → deslocamento → trabalho → energia → conservação.";
    if (vault.bossIntro < 0) {
      vault.bossIntro = 1.15;
      queue("O guardião está usando a energia armazenada. Não atire. Calcule.", 3.6);
      sfx.cable();
    }
    if (!vault.guardianSleep && !vault.quiz && !vault.crew.solved["guard-heat"]) openChallenge("guard-work");
    if (near(CORE) && e && vault.guardianSleep) vault.hold += hdt;
    else if (!vault.guardianSleep) vault.hold = 0;
    else vault.hold = 0;
    if (vault.hold > 1.4 && vault.modules >= 7 && vault.guardianSleep) finish();
  } else {
    sim.objective = "Etapa 3 concluída · trabalho e energia";
    vault.hint = "Tração e peso continuam. O deslocamento é que decide o trabalho.";
    vault.note = "W = Fd cosθ · Ec = ½mv² · Epg = mgh · Em = Ec + Epg";
  }

  pumpLines();
}

if (typeof window !== "undefined") {
  (window as unknown as { __vaultTest?: unknown }).__vaultTest = {
    begin: beginStage3,
    get: vaultState,
  };
}
