import * as THREE from "three";

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) throw new Error("canvas");
  return [c, g];
}

function texOf(c: HTMLCanvasElement, repeat = false): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  if (repeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
  }
  return tex;
}

export function earthTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(512, 256);
  g.fillStyle = "#163e78";
  g.fillRect(0, 0, 512, 256);
  g.fillStyle = "#1f6b45";
  for (let i = 0; i < 18; i++) {
    g.beginPath();
    g.ellipse(40 + ((i * 97) % 460), 30 + ((i * 53) % 190), 30 + (i % 5) * 14, 16 + (i % 4) * 8, i, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = "#8d7a45";
  for (let i = 0; i < 8; i++) {
    g.beginPath();
    g.ellipse(80 + i * 50, 140, 22, 10, 0.4, 0, Math.PI * 2);
    g.fill();
  }
  g.strokeStyle = "rgba(255,255,255,0.35)";
  g.lineWidth = 6;
  for (let i = 0; i < 7; i++) {
    g.beginPath();
    g.moveTo(0, 20 + i * 34);
    g.bezierCurveTo(120, 10 + i * 30, 280, 50 + i * 20, 512, 16 + i * 28);
    g.stroke();
  }
  g.fillStyle = "rgba(0,0,0,0.18)";
  g.fillRect(360, 0, 152, 256);
  return texOf(c);
}

export function starTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(256, 256);
  g.fillStyle = "#070d16";
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 80; i++) {
    g.fillStyle = i % 7 === 0 ? "#e0a23a" : "#d5e4ef";
    g.globalAlpha = 0.4 + (i % 5) * 0.12;
    g.fillRect((i * 47) % 256, (i * 91) % 256, i % 9 === 0 ? 2 : 1, i % 9 === 0 ? 2 : 1);
  }
  g.globalAlpha = 1;
  return texOf(c);
}

export function panelTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(256, 256);
  g.fillStyle = "#1a2432";
  g.fillRect(0, 0, 256, 256);
  g.strokeStyle = "#0d141e";
  g.lineWidth = 8;
  for (let i = 0; i <= 256; i += 64) {
    g.beginPath();
    g.moveTo(i, 0);
    g.lineTo(i, 256);
    g.stroke();
    g.beginPath();
    g.moveTo(0, i);
    g.lineTo(256, i);
    g.stroke();
  }
  g.strokeStyle = "#31465c";
  g.lineWidth = 2;
  for (let y = 0; y < 256; y += 64) {
    for (let x = 0; x < 256; x += 64) g.strokeRect(x + 8, y + 8, 48, 48);
  }
  const tex = texOf(c, true);
  tex.repeat.set(4, 4);
  return tex;
}

export function paintScreen(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  title: string,
  formula: string,
  time: number,
): void {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#07141f";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(126,184,204,0.25)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.strokeStyle = "#7eb8cc";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 64; i++) {
    const u = i / 64;
    const x = 24 + u * (w - 48);
    const y = h * 0.62 + Math.sin(u * 8 + time * 1.6) * 36 + Math.sin(u * 3 + time) * 12;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = "#d5e4ef";
  ctx.font = "600 28px sans-serif";
  ctx.fillText(title, 20, 40);
  ctx.fillStyle = "#e0a23a";
  ctx.font = "600 42px sans-serif";
  ctx.fillText(formula, 20, h - 28);
}

export function badgeTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(512, 256);
  g.clearRect(0, 0, 512, 256);
  g.fillStyle = "#1e4d96";
  g.font = "700 86px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("ECIT", 256, 88);
  g.fillText("BAYEUX", 256, 176);
  return texOf(c);
}

export function flagTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(96, 64);
  g.fillStyle = "#1f8a3b";
  g.fillRect(0, 0, 96, 64);
  g.fillStyle = "#f2c230";
  g.beginPath();
  g.moveTo(48, 6);
  g.lineTo(88, 32);
  g.lineTo(48, 58);
  g.lineTo(8, 32);
  g.fill();
  g.fillStyle = "#23408e";
  g.beginPath();
  g.arc(48, 32, 12, 0, Math.PI * 2);
  g.fill();
  return texOf(c);
}

const labels = new Map<string, { tex: THREE.CanvasTexture; w: number; h: number }>();

export function labelSprite(text: string, color: string): { tex: THREE.CanvasTexture; w: number; h: number } {
  const key = `${color}|${text}`;
  const hit = labels.get(key);
  if (hit) return hit;
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) throw new Error("canvas");
  probe.font = "600 64px sans-serif";
  const width = Math.ceil(probe.measureText(text).width + 36);
  const [c, g] = canvas(Math.max(64, width), 84);
  g.font = "600 64px sans-serif";
  g.fillStyle = color;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, c.width / 2, c.height / 2);
  const tex = texOf(c);
  const h = 0.16;
  const w = h * (c.width / c.height);
  const value = { tex, w, h };
  labels.set(key, value);
  return value;
}
