import assert from "node:assert/strict";
import test from "node:test";
import { gradeLesson, hintLevel, labReady, lessonFor, liveLine } from "../src/game/lesson.ts";

const lab = { up: false, down: false, balance: false, coast: false, masses: false, gravity: false };

test("a orientação muda com o objetivo e não entrega o valor da tração", () => {
  const rise = lessonFor({ goal: "rise", drop: 0, proto: 0, arrived: true, touch: false, stuck: 0, lab });
  assert.equal(rise.title, "Faça a carga subir");
  assert.match(rise.task, /tração/);
  assert.equal(rise.hints[0].includes("540"), false);
  const late = lessonFor({ ...{ goal: "rise", drop: 0, proto: 0, arrived: true, touch: false, lab }, stuck: 20 });
  assert.match(late.hints[hintLevel(20)], /E/);
  assert.equal(hintLevel(0), 0);
  assert.equal(hintLevel(8), 1);
  assert.equal(hintLevel(18), 2);
});

test("Fr nula com velocidade não é descrita como repouso", () => {
  assert.match(liveLine(490, 490, 0, 0, 1.2), /continua em movimento/);
  assert.match(liveLine(490, 490, 0, 0, 0), /repouso/);
  assert.match(liveLine(400, 500, 100, 2, 0.4), /cima/);
  assert.match(liveLine(500, 400, -100, -2, -0.4), /baixo/);
  assert.match(liveLine(500, 600, 100, 2, -0.8), /frenagem/i);
});

test("o laboratório só fecha com as seis marcas", () => {
  assert.equal(labReady({ ...lab, up: true, down: true, balance: true, coast: true }), false);
  assert.equal(labReady({ up: true, down: true, balance: true, coast: true, masses: true, gravity: true }), true);
});

test("as perguntas rápidas têm uma resposta e explicam o erro", () => {
  assert.equal(gradeLesson("coast", 2).ok, true);
  assert.equal(gradeLesson("coast", 0).ok, false);
  assert.equal(gradeLesson("brake", 0).ok, true);
  assert.equal(gradeLesson("brake", 1).ok, false);
  assert.equal(gradeLesson("moon", 1).ok, true);
  assert.match(gradeLesson("moon", 0).text, /massa/i);
});

test("o protocolo tem quatro falas diferentes e o toque não cita Shift", () => {
  const titles = [0, 1, 2, 3].map((proto) => lessonFor({ goal: "protocol", drop: 0, proto, arrived: true, touch: true, stuck: 0, lab }).title);
  assert.deepEqual(titles, ["Protocolo · repouso", "Protocolo · aceleração", "Protocolo · velocidade constante", "Protocolo · frenagem"]);
  const touch = lessonFor({ goal: "rise", drop: 0, proto: 0, arrived: true, touch: true, stuck: 0, lab });
  assert.match(touch.control, /Agir/);
  assert.equal(touch.control.includes("Shift"), false);
});
