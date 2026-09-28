const KEY_FROM_CHAR: Record<string, string> = {
  w: "KeyW",
  W: "KeyW",
  a: "KeyA",
  A: "KeyA",
  s: "KeyS",
  S: "KeyS",
  d: "KeyD",
  D: "KeyD",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  " ": "Space",
  Spacebar: "Space",
  Shift: "ShiftLeft",
  e: "KeyE",
  E: "KeyE",
  q: "KeyQ",
  Q: "KeyQ",
  Tab: "Tab",
  Escape: "Escape",
  Esc: "Escape",
  Enter: "Enter",
};

const HANDLED = new Set([
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ShiftLeft",
  "ShiftRight",
  "Space",
  "Enter",
  "KeyE",
  "KeyQ",
  "Tab",
  "Escape",
]);

export function resolveCode(code: string, key: string): string {
  if (code && code !== "Unidentified") return code;
  return KEY_FROM_CHAR[key] ?? "";
}

/** Returns true only on the transition to pressed, so auto-repeat does not retrigger. */
export function noteDown(held: Set<string>, code: string): boolean {
  if (held.has(code)) return false;
  held.add(code);
  return true;
}

export function noteUp(held: Set<string>, code: string): void {
  held.delete(code);
}

export function releaseAll(held: Set<string>): void {
  held.clear();
}

export function focusGame(root: HTMLElement | null): void {
  window.focus();
  if (root && document.activeElement !== root) root.focus({ preventScroll: true });
}

type Hooks = {
  held: Set<string>;
  root: HTMLElement | null;
  getPhase: () => string;
  start: () => void;
  jump: () => void;
  interact: () => void;
  scan: () => void;
  map: () => void;
  pause: () => void;
};

export function installControls(hooks: Hooks): () => void {
  let locked = false;
  let exitRequested = false;

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
      return;
    }
    const code = resolveCode(event.code, event.key);
    if (!code || !HANDLED.has(code)) return;
    event.preventDefault();
    const fresh = noteDown(hooks.held, code);
    focusGame(hooks.root);
    if (!fresh) return;
    if (code === "Tab") {
      hooks.map();
      return;
    }
    if (code === "Escape") {
      if (document.pointerLockElement) {
        exitRequested = true;
        document.exitPointerLock();
      }
      hooks.pause();
      return;
    }
    if (code === "KeyE") {
      hooks.interact();
      return;
    }
    if (code === "KeyQ") {
      hooks.scan();
      return;
    }
    if (code === "Space" || code === "Enter") {
      if (hooks.getPhase() === "title") hooks.start();
      else if (code === "Space") hooks.jump();
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    const code = resolveCode(event.code, event.key);
    if (!code) return;
    noteUp(hooks.held, code);
  };

  const dropIfAway = () => {
    if (document.pointerLockElement) {
      focusGame(hooks.root);
      return;
    }
    if (document.hidden || !document.hasFocus()) releaseAll(hooks.held);
  };

  const onVisibility = () => {
    if (document.hidden) releaseAll(hooks.held);
  };

  const onLock = () => {
    const now = document.pointerLockElement != null;
    if (locked && !now && !exitRequested) hooks.pause();
    exitRequested = false;
    locked = now;
    if (now) focusGame(hooks.root);
  };

  window.addEventListener("keydown", onKeyDown, true);
  window.addEventListener("keyup", onKeyUp, true);
  window.addEventListener("blur", dropIfAway);
  document.addEventListener("visibilitychange", onVisibility);
  document.addEventListener("pointerlockchange", onLock);

  return () => {
    window.removeEventListener("keydown", onKeyDown, true);
    window.removeEventListener("keyup", onKeyUp, true);
    window.removeEventListener("blur", dropIfAway);
    document.removeEventListener("visibilitychange", onVisibility);
    document.removeEventListener("pointerlockchange", onLock);
    releaseAll(hooks.held);
  };
}
