import assert from "node:assert/strict";
import test from "node:test";
import {
  kineticEnergy,
  mechanicallyConserved,
  mechanicalEnergy,
  potentialEnergy,
  stepCart,
  stepFall,
  workEnergyDelta,
  workFromResultant,
  workOf,
} from "../src/game/energy.ts";

test("trabalho positivo: 100 N, 5 m, 0°", () => {
  assert.ok(Math.abs(workOf(100, 5, 0) - 500) < 1e-9);
});

test("trabalho negativo: 100 N, 5 m, 180°", () => {
  assert.ok(Math.abs(workOf(100, 5, 180) + 500) < 1e-9);
});

test("trabalho nulo: força perpendicular ou sem deslocamento", () => {
  assert.equal(workOf(100, 5, 90), 0);
  assert.equal(workOf(80, 0, 0), 0);
  assert.equal(workOf(0, 4, 0), 0);
});

test("ângulo reduz o trabalho: 0° máximo, 90° nulo, 180° mínimo", () => {
  const full = workOf(100, 5, 0);
  assert.ok(workOf(100, 5, 30) < full);
  assert.ok(workOf(100, 5, 60) < workOf(100, 5, 30));
  assert.equal(workOf(100, 5, 90), 0);
  assert.ok(workOf(100, 5, 120) < 0);
  assert.ok(workOf(100, 5, 180) < workOf(100, 5, 120));
});

test("energia cinética: 50 kg a 4 m/s são 400 J, e o dobro da velocidade quadruplica", () => {
  assert.ok(Math.abs(kineticEnergy(50, 4) - 400) < 1e-9);
  assert.ok(Math.abs(kineticEnergy(50, 2) - 100) < 1e-9);
  assert.ok(Math.abs(kineticEnergy(50, -4) - 400) < 1e-9);
});

test("energia potencial: 10 kg, 9,81 m/s², 5 m", () => {
  assert.ok(Math.abs(potentialEnergy(10, 9.81, 5) - 490.5) < 1e-6);
  assert.ok(potentialEnergy(10, 1.62, 5) < potentialEnergy(10, 9.81, 5));
  assert.equal(potentialEnergy(10, 9.81, 0), 0);
});

test("energia mecânica soma cinética e potencial", () => {
  assert.ok(Math.abs(mechanicalEnergy(400, 490.5) - 890.5) < 1e-9);
});

test("teorema trabalho-energia: 350 J menos 100 J", () => {
  assert.ok(Math.abs(workEnergyDelta(100, 350) - 250) < 1e-9);
});

test("conservação numérica aceita erro pequeno e rejeita dissipação clara", () => {
  assert.equal(mechanicallyConserved(490.5, 488, 0.02), true);
  assert.equal(mechanicallyConserved(490.5, 300, 0.08), false);
});

test("a resultante da etapa 2, vezes o deslocamento, é o trabalho líquido", () => {
  assert.ok(Math.abs(workFromResultant(100, 2.5) - 250) < 1e-9);
  assert.ok(workFromResultant(-40, 2) < 0);
  assert.equal(workFromResultant(80, 0), 0);
});

test("queda sem atrito conserva energia; com atrito, a mecânica cai e o calor sobe", () => {
  let h = 5;
  let v = 0;
  const em0 = potentialEnergy(10, 9.81, 5);
  for (let i = 0; i < 40 && h > 1; i++) {
    const step = stepFall(h, v, 10, 9.81, 0, 0.02);
    h = step.h;
    v = step.v;
  }
  assert.ok(h < 4);
  assert.ok(kineticEnergy(10, v) > 20);
  assert.equal(mechanicallyConserved(em0, kineticEnergy(10, v) + potentialEnergy(10, 9.81, h), 0.2), true);

  h = 5;
  v = 0;
  let heat = 0;
  for (let i = 0; i < 80 && h > 0.4; i++) {
    const step = stepFall(h, v, 10, 9.81, 0.35, 0.02);
    heat += step.heat;
    h = step.h;
    v = step.v;
  }
  const em = kineticEnergy(10, v) + potentialEnergy(10, 9.81, h);
  assert.ok(heat > 10);
  assert.ok(em < em0 - 10);
});

test("no trilho, o trabalho da força acompanha a variação da energia cinética", () => {
  let x = 0;
  let v = 0;
  for (let i = 0; i < 80; i++) {
    const step = stepCart(x, v, 80, 20, 0, 9.81, 0.02);
    x = step.x;
    v = step.v;
  }
  const w = workFromResultant(80, x);
  const dEc = workEnergyDelta(0, kineticEnergy(20, v));
  assert.ok(x > 1);
  assert.ok(Math.abs(w - dEc) < 0.12 * Math.max(w, dEc));
});

test("valores inválidos não produzem NaN nem Infinity", () => {
  for (const value of [workOf(NaN, Infinity, NaN), kineticEnergy(-5, NaN), potentialEnergy(-1, -9, -3), mechanicalEnergy(NaN, Infinity), workEnergyDelta(NaN, 10)]) {
    assert.equal(Number.isFinite(value), true);
  }
  const cart = stepCart(NaN, Infinity, NaN, 0, -1, -2, 99);
  assert.equal(Number.isFinite(cart.x) && Number.isFinite(cart.v), true);
  const fall = stepFall(NaN, NaN, -4, -1, -1, 3);
  assert.equal(Number.isFinite(fall.h) && Number.isFinite(fall.em), true);
});
