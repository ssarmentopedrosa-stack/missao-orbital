import assert from "node:assert/strict";
import test from "node:test";
import { HOIST_MASS, HOIST_WEIGHT, T_ACCEL, T_TOL, accelOf, arrivalAllowed, brakingGate, hoistAccel, integrateHoist, integrateVariable, netForce, netForceOf, weightOf, G_MOON } from "../src/game/hoist.ts";

test("peso do contêiner é m·g", () => {
  assert.equal(HOIST_MASS, 40);
  assert.ok(Math.abs(HOIST_WEIGHT - 392.4) < 1e-9);
});

test("tração menor que o peso acelera para baixo", () => {
  const Fr = netForce(300);
  assert.ok(Math.abs(Fr - (300 - 392.4)) < 1e-9);
  assert.ok(hoistAccel(300) < 0);
  const step = integrateHoist(4, 0, 300, 0.5, false);
  assert.ok(step.y < 4);
  assert.ok(step.v < 0);
});

test("tração igual ao peso tem resultante e aceleração nulas", () => {
  assert.ok(Math.abs(netForce(HOIST_WEIGHT)) < 1e-9);
  assert.ok(Math.abs(hoistAccel(HOIST_WEIGHT)) < 1e-9);
  const step = integrateHoist(4, 0, HOIST_WEIGHT, 0.5, false);
  assert.equal(step.y, 4);
  assert.equal(step.v, 0);
});

test("500 N sobe com a ≈ 2,69 m/s²", () => {
  const a = hoistAccel(500);
  assert.ok(Math.abs(a - 107.6 / 40) < 1e-9);
  const step = integrateHoist(3, 0, 500, 0.2, false);
  assert.ok(step.y > 3);
  assert.ok(step.a > 0);
});

test("alvo de 2 m/s² é peso mais 80 N, com margem de 5 N", () => {
  assert.ok(Math.abs(T_ACCEL - 472.4) < 1e-9);
  assert.equal(T_TOL, 5);
  assert.ok(Math.abs(hoistAccel(T_ACCEL) - 2) < 1e-9);
  assert.ok(Math.abs(hoistAccel(470) - 2) < 0.15);
});

test("o freio do scanner não integra o movimento", () => {
  const step = integrateHoist(2.55, 1, 100, 0.5, true);
  assert.equal(step.y, 2.55);
  assert.equal(step.v, 0);
});

test("massa variável: T > P sobe, T = P equilibra, T < P desce", () => {
  const mass = 100;
  const P = weightOf(mass);
  assert.ok(Math.abs(P - 981) < 1e-9);
  assert.ok(Math.abs(netForceOf(1300, mass) - 319) < 1e-9);
  assert.ok(Math.abs(accelOf(1300, mass) - 3.19) < 1e-9);
  assert.ok(Math.abs(netForceOf(P, mass)) < 1e-9);
  assert.ok(Math.abs(accelOf(P, mass)) < 1e-9);
  assert.ok(accelOf(700, mass) < 0);
  assert.ok(Math.abs(accelOf(700, mass) - (700 - P) / mass) < 1e-9);
  const up = integrateVariable(2, 0, 1300, mass, 9.81, 0.2, false);
  assert.ok(up.y > 2 && up.v > 0 && up.a > 0);
  const hold = integrateVariable(4, 1.2, P, mass, 9.81, 0.3, false);
  assert.ok(Math.abs(hold.a) < 1e-9);
  assert.ok(Math.abs(hold.v - 1.2) < 1e-9);
  const down = integrateVariable(4, 0, 700, mass, 9.81, 0.2, false);
  assert.ok(down.y < 4 && down.v < 0 && down.a < 0);
});

test("a mesma resultante acelera menos a massa maior", () => {
  const Fr = 80;
  const t20 = weightOf(20) + Fr;
  const t100 = weightOf(100) + Fr;
  assert.ok(Math.abs(netForceOf(t20, 20) - Fr) < 1e-6);
  assert.ok(Math.abs(netForceOf(t100, 100) - Fr) < 1e-6);
  assert.ok(Math.abs(accelOf(t20, 20) - 4) < 1e-9);
  assert.ok(Math.abs(accelOf(t100, 100) - 0.8) < 1e-9);
});

test("a mesma tração não produz a mesma aceleração em massas diferentes", () => {
  const T = 1200;
  const a20 = accelOf(T, 20);
  const a100 = accelOf(T, 100);
  assert.ok(a20 > a100);
  assert.ok(a20 > 0 && a100 > 0);
});

test("mesma massa, gravidades diferentes, pesos diferentes", () => {
  const earth = weightOf(80, 9.81);
  const moon = weightOf(80, G_MOON);
  assert.ok(earth !== moon);
  assert.ok(Math.abs(moon - 80 * 1.62) < 1e-9);
  assert.ok(earth > moon * 5);
  assert.ok(Math.abs(accelOf(moon, 80, G_MOON)) < 1e-9);
});

test("integração variável limita velocidade e não produz NaN", () => {
  const step = integrateVariable(2, 0, 5000, 20, 9.81, 1, false);
  assert.ok(Number.isFinite(step.y) && Number.isFinite(step.v) && Number.isFinite(step.a));
  assert.ok(Math.abs(step.v) <= 5.6 + 1e-9);
  const locked = integrateVariable(3, 2, 10, 50, 9.81, 0.5, true);
  assert.equal(locked.y, 3);
  assert.equal(locked.v, 0);
  const floor = integrateVariable(1.1, -4, 0, 40, 9.81, 0.5, false);
  assert.equal(floor.hitFloor, true);
  assert.equal(floor.y, 1.05);
  const bad = integrateVariable(Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN, Number.NaN, false);
  assert.ok(Number.isFinite(bad.y) && Number.isFinite(bad.v) && Number.isFinite(bad.a));
  assert.equal(bad.hitTop, false);
});

test("repouso: T = P mantém a carga parada", () => {
  const P = weightOf(40);
  const step = integrateVariable(1.2, 0, P, 40, 9.81, 0.5, false);
  assert.ok(Math.abs(step.a) < 1e-9);
  assert.equal(step.v, 0);
  assert.equal(step.y, 1.2);
});

test("movimento uniforme: T = P conserva velocidade positiva", () => {
  const P = weightOf(40);
  const step = integrateVariable(5, 1.4, P, 40, 9.81, 0.25, false);
  assert.ok(Math.abs(step.a) < 1e-9);
  assert.ok(step.v > 1);
  assert.ok(Math.abs(step.v - 1.4) < 1e-9);
  assert.ok(step.y > 5);
});

test("frenagem: T < P com v > 0 reduz a velocidade", () => {
  const P = weightOf(40);
  const T = P - 80;
  assert.ok(accelOf(T, 40) < 0);
  const step = integrateVariable(6, 2, T, 40, 9.81, 0.05, false);
  assert.ok(step.a < 0);
  assert.ok(step.v < 2);
  assert.ok(step.v > 0);
});

test("colisão no topo não é chegada válida", () => {
  const hit = integrateVariable(9.05, 2.4, weightOf(40) + 400, 40, 9.81, 0.05, false);
  assert.equal(hit.hitTop, true);
  assert.equal(hit.v, 0);
  assert.equal(
    arrivalAllowed({ phase: "brake", brakeValid: true, brakeV: 2.4, y: hit.y, v: hit.v, hitTop: true }),
    false,
  );
  assert.equal(
    arrivalAllowed({ phase: "brake", brakeValid: true, brakeV: 2.4, y: 9.15, v: 0, hitTop: false }),
    false,
  );
});

test("protocolo incompleto não conclui", () => {
  const near = { brakeValid: true, brakeV: 2, y: 8.7, v: 0.2, hitTop: false };
  assert.equal(arrivalAllowed({ phase: "rest", ...near }), false);
  assert.equal(arrivalAllowed({ phase: "accel", ...near }), false);
  assert.equal(arrivalAllowed({ phase: "coast", ...near }), false);
  assert.equal(arrivalAllowed({ phase: "brake", ...near, brakeValid: false }), false);
  assert.equal(brakingGate(0.4, 1.5, 6), false);
  assert.equal(brakingGate(-0.4, 0.05, 6), false);
});

test("protocolo completo pode concluir sem encostar no teto", () => {
  assert.equal(brakingGate(-0.4, 1.8, 7.4), true);
  assert.equal(brakingGate(-0.4, 1.8, 9.1), false);
  assert.equal(
    arrivalAllowed({ phase: "brake", brakeValid: true, brakeV: 2.31, y: 8.72, v: 0.28, hitTop: false }),
    true,
  );
  assert.equal(
    arrivalAllowed({ phase: "brake", brakeValid: true, brakeV: Number.NaN, y: 8.72, v: 0.28, hitTop: false }),
    false,
  );
});

test("mesma resultante de 100 N acelera 5 m/s² e 1 m/s²", () => {
  const light = weightOf(20) + 100;
  const heavy = weightOf(100) + 100;
  assert.ok(Math.abs(netForceOf(light, 20) - 100) < 1e-6);
  assert.ok(Math.abs(netForceOf(heavy, 100) - 100) < 1e-6);
  assert.ok(Math.abs(accelOf(light, 20) - 5) < 1e-9);
  assert.ok(Math.abs(accelOf(heavy, 100) - 1) < 1e-9);
  assert.ok(accelOf(light, 20) > accelOf(heavy, 100));
});


