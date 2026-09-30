import { sfx } from "./audio";
import { hoistAccel, HOIST_G, HOIST_MASS, HOIST_WEIGHT, integrateHoist, netForce, T_ACCEL, T_TOL } from "./hoist";
import { held, sim, speak } from "./sim";

export const PANEL = { x: 2.55, z: -52.15 };
export const SHAFT = { x: 0, z: -58.2 };
const Y_START = 2.55;
const Y_FLOOR = 1.05;
const TRANSIT = 6.4;

export type HoistGoal = "scan" | "rise" | "balance" | "accel" | "alarm" | "done";

type Line = { text: string; seconds: number };

export const elevator = {
  active: false,
  goal: "scan" as HoistGoal,
  tension: 300,
  y: Y_START,
  v: 0,
  scanned: false,
  alarm: false,
  done: false,
  hint: "",
  balanceHold: 0,
  accelHold: 0,
  cheer: 0,
  prevE: false,
  lineQueue: [] as Line[],
};

function resetMotion(): void {
  elevator.goal = "scan";
  elevator.tension = 300;
  elevator.y = Y_START;
  elevator.v = 0;
  elevator.scanned = false;
  elevator.alarm = false;
  elevator.done = false;
  elevator.hint = "";
  elevator.balanceHold = 0;
  elevator.accelHold = 0;
  elevator.cheer = 0;
  elevator.prevE = false;
  elevator.lineQueue = [];
}

function queue(text: string, seconds: number): void {
  elevator.lineQueue.push({ text, seconds });
}

function pumpLines(): void {
  if (sim.line) return;
  const next = elevator.lineQueue.shift();
  if (!next) return;
  speak("NEWTON", next.text, next.seconds);
}

export function beginStage2(): void {
  if (sim.stage === 2 && elevator.active) return;
  resetMotion();
  elevator.active = true;
  elevator.hint = "Abra o scanner (Q) no contêiner antes de mover a carga.";
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
  sim.objective = "REPOSICIONE O CONTÊINER DE MANUTENÇÃO";
  elevator.lineQueue = [
    { text: "Excelente trabalho. O módulo N-1 está seguro.", seconds: 3.6 },
    { text: "Mas ainda temos um problema.", seconds: 2.8 },
    { text: "O sistema de carga vertical está travado.", seconds: 3.5 },
    { text: "O contêiner precisa ser reposicionado.", seconds: 3.3 },
    { text: "Agora vamos observar o peso e a força de tração.", seconds: 4.2 },
    { text: "Antes de mover qualquer coisa, descubra quais forças estão atuando.", seconds: 4.6 },
  ];
  const first = elevator.lineQueue.shift();
  if (first) speak("NEWTON", first.text, first.seconds);
  else sfx.ui();
}

export function hoistState() {
  const T = elevator.tension;
  const P = HOIST_WEIGHT;
  const Fr = netForce(T);
  const a = hoistAccel(T);
  const state = Math.abs(Fr) < 0.8 ? "EQUILÍBRIO" : Fr > 0 ? "ACELERANDO ↑" : "ACELERANDO ↓";
  return {
    mass: HOIST_MASS,
    g: HOIST_G,
    P,
    T,
    Fr,
    a,
    v: elevator.v,
    y: elevator.y,
    state,
    goal: elevator.goal,
    hint: elevator.hint,
    alarm: elevator.alarm,
    done: elevator.done,
    scanned: elevator.scanned,
    active: elevator.active,
  };
}

function nearPanel(): boolean {
  return Math.hypot(sim.x - PANEL.x, sim.z - PANEL.z) < 2.2;
}

function nearHoist(): boolean {
  return nearPanel() || Math.hypot(sim.x - SHAFT.x, sim.z - SHAFT.z) < 6.8;
}

export function tickElevator(dt: number): void {
  if (sim.stage !== 2) {
    elevator.active = false;
    return;
  }
  if (!elevator.active) return;

  if (sim.transit > 0) {
    sim.transit = Math.max(0, sim.transit - dt);
    const u = 1 - sim.transit / TRANSIT;
    const s = u * u * (3 - 2 * u);
    sim.x = -3.1;
    sim.y = 0;
    sim.z = -50.35 + (-53.15 - -50.35) * Math.min(1, s);
    sim.yaw = Math.PI;
    sim.vx = 0;
    sim.vz = 0;
    sim.speed = 0;
    pumpLines();
    return;
  }

  if (elevator.cheer > 0) {
    elevator.cheer = Math.max(0, elevator.cheer - dt);
    if (elevator.cheer === 0) sim.animLock = null;
  }

  if (sim.phase !== "play" || sim.paused || sim.mapOpen) {
    pumpLines();
    return;
  }

  const e = held.has("KeyE");
  const shift = held.has("ShiftLeft") || held.has("ShiftRight");
  if (nearPanel() && e && elevator.goal !== "done") {
    const dir = shift ? -1 : 1;
    const rate = elevator.alarm ? 120 : 42;
    if (!elevator.prevE) elevator.tension += dir * 10;
    else elevator.tension += dir * rate * dt;
    elevator.tension = Math.max(0, Math.min(800, Math.round(elevator.tension * 10) / 10));
  }
  elevator.prevE = e;

  const locked = elevator.goal === "scan" || elevator.done;
  const step = integrateHoist(elevator.y, elevator.v, elevator.tension, dt, locked);
  const hitFloor = !locked && elevator.y + elevator.v * dt <= Y_FLOOR && elevator.v + hoistAccel(elevator.tension) * dt < 0;
  elevator.y = step.y;
  elevator.v = step.v;

  if (hitFloor && elevator.alarm && !elevator.done) {
    elevator.y = 3.4;
    elevator.v = -0.35;
    elevator.tension = Math.min(elevator.tension, 250);
    queue("A carga tocou o piso. A tração ainda perde para o peso, então a resultante aponta para baixo. Aumente a tração.", 5.6);
  }

  const Fr = netForce(elevator.tension);

  if (elevator.goal === "scan") {
    sim.objective = "1 · Escaneie o contêiner";
    elevator.hint = nearHoist()
      ? "Q liga o scanner. Peso para baixo, tração para cima. As duas existem ao mesmo tempo."
      : "Caminhe até o elevador e abra o scanner.";
    if (sim.scanner && nearHoist()) {
      elevator.scanned = true;
      elevator.goal = "rise";
      elevator.y = Y_START;
      elevator.v = 0;
      queue("Agora faça a carga começar a subir. A tração precisa superar o peso: 392,4 N.", 5.4);
    }
  } else if (elevator.goal === "rise") {
    sim.objective = "2 · Faça a carga subir";
    elevator.hint = Fr > 0
      ? "A tração supera o peso. A força resultante aponta para cima."
      : "A tração é menor que o peso. A força resultante aponta para baixo.";
    if (elevator.y > Y_START + 0.5 && elevator.v > 0.12) {
      elevator.goal = "balance";
      elevator.balanceHold = 0;
      queue("Agora mantenha a carga em equilíbrio. Iguale a tração ao peso. As forças continuam — quem zera é a resultante.", 6.2);
    }
  } else if (elevator.goal === "balance") {
    sim.objective = "3 · Equilibre tração e peso";
    if (Math.abs(Fr) <= T_TOL) {
      elevator.balanceHold += dt;
      elevator.hint = Math.abs(elevator.v) > 0.4
        ? "Resultante quase zero: a velocidade se conserva. Reduza a tração para parar, depois volte a 392,4 N."
        : "Tração e peso continuam. A resultante é zero. A aceleração também.";
    } else {
      elevator.balanceHold = 0;
      elevator.hint = Fr > 0 ? "Ainda sobe. A tração está maior que o peso." : "Ainda desce. A tração está menor que o peso.";
    }
    if (elevator.balanceHold > 1.05 && Math.abs(elevator.v) < 0.4) {
      elevator.v = 0;
      elevator.goal = "accel";
      elevator.accelHold = 0;
      if (elevator.y > 6.2) elevator.y = 4.2;
      queue("Perfeito. As forças continuam atuando. Mas suas resultantes se anulam.", 4.4);
      queue("Faça o contêiner subir com aceleração de aproximadamente 2,0 m/s². Use F resultante = m · a.", 6.2);
    }
  } else if (elevator.goal === "accel") {
    sim.objective = "4 · Suba com a ≈ 2,0 m/s²";
    const ok = Math.abs(elevator.tension - T_ACCEL) <= T_TOL;
    elevator.accelHold = ok ? elevator.accelHold + dt : 0;
    elevator.hint = ok
      ? "F resultante ≈ 80 N para cima. a = F / m ≈ 2 m/s²."
      : elevator.tension < T_ACCEL
        ? "Falta tração. T = peso + m·a = 392,4 + 80 = 472,4 N."
        : "Tração alta demais para 2 m/s². Reduza com Shift+E.";
    if (elevator.accelHold > 0.85) {
      elevator.goal = "alarm";
      elevator.alarm = true;
      elevator.tension = 210;
      elevator.v = Math.min(elevator.v, 0.2);
      sim.shake = Math.max(sim.shake, 0.2);
      queue("Excelente. A força resultante determina a aceleração.", 3.4);
      queue("ATENÇÃO! O sistema perdeu estabilidade! A carga está acelerando para baixo! Controle a força de tração!", 5.8);
    }
  } else if (elevator.goal === "alarm") {
    sim.objective = "5 · Segure a carga com a tração";
    elevator.hint = Fr > 20
      ? "Resultante para cima: a velocidade para baixo diminui. Perto de parar, aproxime a tração do peso."
      : Fr < -15
        ? "A tração ainda perde para o peso. A resultante aponta para baixo."
        : "Quase equilibrado. Deixe a velocidade perto de zero acima do piso.";
    const safe = elevator.y > 3.6 && elevator.y < 8.6 && Math.abs(elevator.v) < 0.32 && Math.abs(Fr) < 30;
    if (safe) {
      elevator.alarm = false;
      elevator.done = true;
      elevator.goal = "done";
      elevator.v = 0;
      elevator.cheer = 4.2;
      sim.animLock = "celebrate";
      sim.shake = Math.max(sim.shake, 0.12);
      sim.objective = "Contêiner reposicionado";
      sfx.success();
      queue("A carga está estável. A segunda lei: a resultante muda a velocidade. O peso sozinho não decide.", 6.4);
    }
  } else {
    sim.objective = "Etapa 2 concluída · contêiner estável";
    elevator.hint = "Tração e peso continuam presentes. A resultante é que decide a aceleração.";
    elevator.alarm = false;
  }

  pumpLines();
}

if (typeof window !== "undefined") {
  (window as unknown as { __elevatorTest?: unknown }).__elevatorTest = {
    begin: beginStage2,
    get: hoistState,
    setTension: (n: number) => {
      elevator.tension = n;
    },
    skipTransit: () => {
      sim.transit = 0;
      sim.x = -3.1;
      sim.z = -53.15;
      sim.yaw = Math.PI;
    },
  };
}
