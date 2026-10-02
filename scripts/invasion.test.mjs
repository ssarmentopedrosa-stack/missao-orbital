import assert from "node:assert/strict";
import test from "node:test";
import { guardMet, lessonFor } from "../src/game/lesson.ts";
import { freshCrew, takeDamage } from "../src/game/survival.ts";
import { freshStageAliens, STAGE2_POINTS } from "../src/game/stage2.ts";

const lab = { up: false, down: false, balance: false, coast: false, masses: false, gravity: false };

test("o guardião da etapa 2 cobra forças, não energia, e não pula fase", () => {
  assert.equal(guardMet(0, 392, 392, 0, 0, 0), true);
  assert.equal(guardMet(0, 392, 500, 108, 2, 0.4), false);
  assert.equal(guardMet(1, 392, 500, 108, 2, 0.4), true);
  assert.equal(guardMet(1, 392, 392, 0, 0, 0.4), false);
  assert.equal(guardMet(3, 392, 392, 0, 0, 0.8), true);
  assert.equal(guardMet(4, 392, 500, 108, 1.2, -0.4), true);
  assert.equal(guardMet(4, 392, 300, -92, -1, -0.4), false);
  const card = lessonFor({ goal: "guardian", drop: 0, proto: 4, arrived: true, touch: false, stuck: 0, lab });
  assert.match(card.title, /Frenagem/);
  assert.equal(card.task.includes("½"), false);
});

test("a invasão reutiliza vidas e não cria aliens no módulo de energia", () => {
  const again = takeDamage({ ...freshCrew(), lives: 2, invuln: 0, over: false }, "drone");
  assert.equal(again.lives, 1);
  assert.equal(again.applied, true);
  const aliens = freshStageAliens();
  assert.deepEqual(aliens.map((item) => item.id), ["drone", "field", "guardian"]);
  assert.equal(STAGE2_POINTS.length, 4);
  assert.ok(aliens.every((item) => item.z > -63 && item.z < -49));
});
