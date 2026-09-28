import assert from "node:assert/strict";
import test from "node:test";
import { noteDown, noteUp, releaseAll, resolveCode } from "../src/game/input.ts";

test("resolveCode prefere event.code e cai para event.key", () => {
  assert.equal(resolveCode("KeyW", "w"), "KeyW");
  assert.equal(resolveCode("", "w"), "KeyW");
  assert.equal(resolveCode("Unidentified", "A"), "KeyA");
  assert.equal(resolveCode("", " "), "Space");
  assert.equal(resolveCode("", "Shift"), "ShiftLeft");
  assert.equal(resolveCode("ArrowDown", "ArrowDown"), "ArrowDown");
  assert.equal(resolveCode("", "q"), "KeyQ");
  assert.equal(resolveCode("", "Escape"), "Escape");
  assert.equal(resolveCode("", "não-mapeada"), "");
});

test("keydown mantém a tecla; keyup solta só ela", () => {
  const held = new Set();
  assert.equal(noteDown(held, "KeyW"), true);
  assert.equal(noteDown(held, "KeyW"), false);
  assert.deepEqual([...held], ["KeyW"]);
  noteDown(held, "KeyA");
  noteDown(held, "ShiftLeft");
  noteUp(held, "KeyW");
  assert.equal(held.has("KeyW"), false);
  assert.equal(held.has("KeyA"), true);
  assert.equal(held.has("ShiftLeft"), true);
  noteUp(held, "ShiftLeft");
  assert.equal(held.has("ShiftLeft"), false);
});

test("perder o foco limpa teclas presas", () => {
  const held = new Set(["KeyW", "KeyS", "ShiftRight"]);
  releaseAll(held);
  assert.equal(held.size, 0);
});
