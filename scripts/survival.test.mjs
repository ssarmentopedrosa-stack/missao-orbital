import assert from "node:assert/strict";
import test from "node:test";
import { dissipatedEnergy } from "../src/game/energy.ts";
import {
  addCore,
  freshAliens,
  freshCrew,
  gradeChallenge,
  guardianEnergy,
  GUARD_STEPS,
  hazardHits,
  heal,
  MAX_LIVES,
  reachCheckpoint,
  stepAlien,
  striking,
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
  assert.equal(gradeChallenge("guard-kinetic", 50).ok, true);
  assert.equal(gradeChallenge("guard-potential", 196).ok, true);
  assert.equal(gradeChallenge("guard-save", 196.2).ok, true);
  assert.equal(gradeChallenge("guard-heat", 170.5).ok, true);
  assert.ok(Math.abs(dissipatedEnergy(490.5, 320) - 170.5) < 1e-9);
  assert.equal(dissipatedEnergy(10, 12), 0);
});

test("núcleo extra não passa de 5 e o drone avisa antes de atacar", () => {
  let crew = freshCrew();
  for (let i = 0; i < 6; i++) crew = addCore(crew);
  assert.equal(crew.cores, 5);
  const drone = freshAliens()[0];
  assert.ok(drone);
  const far = stepAlien(drone, 0, 0, 0.05, false);
  assert.equal(far.mode, "patrol");
  let near = stepAlien(drone, drone.x + 0.3, drone.z, 0.016, false);
  assert.equal(near.mode, "alert");
  assert.equal(striking(near), false);
  for (let i = 0; i < 50 && near.mode !== "attack"; i++) near = stepAlien(near, near.x + 0.15, near.z, 0.05, false);
  assert.equal(near.mode, "attack");
  assert.equal(striking(near), false);
  const asleep = stepAlien(drone, drone.x, drone.z, 0.05, true);
  assert.equal(asleep.mode, "sleep");
});

test("o golpe só acontece na janela curta, depois o drone descansa", () => {
  const drone = freshAliens()[0];
  assert.ok(drone);
  const windup = { ...drone, mode: "attack", wind: 0.3, x: 1, z: 1 };
  assert.equal(hazardHits([windup], 1.2, 1, 0, false), null);
  const hit = { ...windup, wind: 0.06 };
  assert.equal(striking(hit), true);
  assert.ok(hazardHits([hit], 1.2, 1, 0, false));
  const cooled = stepAlien({ ...hit, wind: 0.01 }, 1.2, 1, 0.05, false);
  assert.equal(cooled.mode, "cooldown");
});

test("a energia do guardião cai 20 pontos por fase e não volta", () => {
  const solved = {};
  assert.equal(guardianEnergy(solved), 100);
  for (let i = 0; i < GUARD_STEPS.length; i++) {
    solved[GUARD_STEPS[i]] = true;
    assert.equal(guardianEnergy(solved), 100 - (i + 1) * 20);
    assert.equal(guardianEnergy(solved), 100 - (i + 1) * 20);
  }
  assert.equal(guardianEnergy(solved), 0);
});

test("o campo de energia pulsa e não fere o tempo todo", () => {
  const field = freshAliens()[1];
  assert.ok(field);
  const quiet = { ...field, t: 0 };
  assert.equal(hazardHits([quiet], field.x, field.z, 0, false), null);
  const loud = { ...field, t: Math.PI / 6 };
  assert.ok(hazardHits([loud], field.x, field.z, 0, false));
});

test("vidas e pontuação não ficam negativas nem infinitas", () => {
  const crew = takeDamage({ ...freshCrew(), lives: 0, score: 10 }, "x");
  assert.equal(crew.lives, 0);
  assert.ok(Number.isFinite(crew.score));
  const scored = addCore({ ...freshCrew(), cores: 5, score: 10 });
  assert.equal(scored.cores, 5);
});
