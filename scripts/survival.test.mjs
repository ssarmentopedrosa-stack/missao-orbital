import assert from "node:assert/strict";
import test from "node:test";
import { dissipatedEnergy } from "../src/game/energy.ts";
import {
  addCore,
  freshAliens,
  freshCrew,
  gradeChallenge,
  heal,
  MAX_LIVES,
  reachCheckpoint,
  stepAlien,
  takeDamage,
} from "../src/game/survival.ts";

test("três vidas caem uma a uma até o game over", () => {
  let crew = freshCrew();
  crew = takeDamage(crew, "drone");
  assert.equal(crew.lives, 2);
  assert.equal(crew.over, false);
  crew = { ...crew, invuln: 0 };
  crew = takeDamage(crew, "drone");
  assert.equal(crew.lives, 1);
  crew = { ...crew, invuln: 0 };
  crew = takeDamage(crew, "drone");
  assert.equal(crew.lives, 0);
  assert.equal(crew.over, true);
  const again = takeDamage(crew, "drone");
  assert.equal(again.lives, 0);
});

test("o segundo dano imediato não atravessa a invulnerabilidade", () => {
  const first = takeDamage(freshCrew(), "campo");
  assert.equal(first.lives, 2);
  assert.equal(first.applied, true);
  const second = takeDamage(first, "campo");
  assert.equal(second.applied, false);
  assert.equal(second.lives, 2);
});

test("célula de energia não passa de 3 e recupera quando falta uma", () => {
  const full = heal(freshCrew(), 1);
  assert.equal(full.gained, false);
  assert.equal(full.lives, MAX_LIVES);
  const hurt = takeDamage(freshCrew(), "caixa");
  const back = heal({ ...hurt, invuln: 0 }, 1);
  assert.equal(back.gained, true);
  assert.equal(back.lives, 3);
});

test("game over guarda o checkpoint e o retorno usa esse índice", () => {
  let crew = reachCheckpoint(freshCrew(), 3);
  assert.equal(crew.fresh, true);
  assert.equal(crew.checkpoint, 3);
  crew = { ...takeDamage({ ...crew, invuln: 0 }, "a"), invuln: 0 };
  crew = { ...takeDamage(crew, "b"), invuln: 0 };
  crew = takeDamage(crew, "c");
  assert.equal(crew.over, true);
  assert.equal(crew.checkpoint, 3);
  const again = reachCheckpoint(crew, 2);
  assert.equal(again.fresh, false);
  assert.equal(again.checkpoint, 3);
});

test("os desafios usam a mesma física do módulo de energia", () => {
  assert.equal(gradeChallenge("work", 300).ok, true);
  assert.equal(gradeChallenge("work", 50).ok, false);
  assert.equal(gradeChallenge("kinetic", 180).ok, true);
  assert.equal(gradeChallenge("potential", 980).ok, true);
  assert.equal(gradeChallenge("guard-work", 500).ok, true);
  assert.equal(gradeChallenge("guard-energy", 196.2).ok, true);
  assert.equal(gradeChallenge("guard-heat", 170.5).ok, true);
  assert.ok(Math.abs(dissipatedEnergy(490.5, 320) - 170.5) < 1e-9);
  assert.equal(dissipatedEnergy(10, 12), 0);
});

test("núcleo extra não passa de 5 e o drone só persegue de perto", () => {
  let crew = freshCrew();
  for (let i = 0; i < 6; i++) crew = addCore(crew);
  assert.equal(crew.cores, 5);
  const drone = freshAliens()[0];
  assert.ok(drone);
  const far = stepAlien(drone, 0, 0, 0.05, false);
  assert.equal(far.mode, "patrol");
  const near = stepAlien(drone, drone.x + 0.4, drone.z, 0.05, false);
  assert.equal(near.mode, "attack");
  const asleep = stepAlien(drone, drone.x, drone.z, 0.05, true);
  assert.equal(asleep.mode, "sleep");
});

test("vidas e pontuação não ficam negativas nem infinitas", () => {
  const crew = takeDamage({ ...freshCrew(), lives: 0, score: 10 }, "x");
  assert.equal(crew.lives, 0);
  assert.ok(Number.isFinite(crew.score));
  const scored = addCore({ ...freshCrew(), cores: 5, score: 10 });
  assert.equal(scored.cores, 5);
});
