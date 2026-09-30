import assert from "node:assert/strict";
import test from "node:test";
import { HOIST_MASS, HOIST_WEIGHT, T_ACCEL, T_TOL, hoistAccel, integrateHoist, netForce } from "../src/game/hoist.ts";

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
