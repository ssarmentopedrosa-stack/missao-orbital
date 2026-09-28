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
  const [c, g] = canvas(1024, 512);
  const ocean = g.createLinearGradient(0, 0, 0, 512);
  ocean.addColorStop(0, "#1c4f8a");
  ocean.addColorStop(0.45, "#0f315c");
  ocean.addColorStop(1, "#1a4a82");
  g.fillStyle = ocean;
  g.fillRect(0, 0, 1024, 512);
  g.fillStyle = "#e8eef3";
  g.fillRect(0, 0, 1024, 28);
  g.fillRect(0, 484, 1024, 28);
  g.fillStyle = "#2d7a48";
  g.beginPath();
  g.moveTo(250, 230);
  g.bezierCurveTo(300, 170, 360, 190, 372, 250);
  g.bezierCurveTo(390, 320, 360, 390, 320, 430);
  g.bezierCurveTo(280, 455, 255, 400, 248, 340);
  g.bezierCurveTo(230, 280, 220, 250, 250, 230);
  g.fill();
  g.fillStyle = "#3c8f52";
  g.beginPath();
  g.moveTo(500, 150);
  g.bezierCurveTo(560, 130, 590, 180, 575, 240);
  g.bezierCurveTo(610, 280, 590, 360, 540, 400);
  g.bezierCurveTo(500, 370, 490, 300, 500, 240);
  g.bezierCurveTo(470, 190, 470, 160, 500, 150);
  g.fill();
  g.fillStyle = "#d8c48a";
  g.beginPath();
  g.ellipse(430, 210, 50, 22, 0.4, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "rgba(255,255,255,0.16)";
  for (let i = 0; i < 14; i++) {
    g.beginPath();
    g.ellipse(80 + ((i * 137) % 900), 70 + ((i * 61) % 360), 70 + (i % 4) * 18, 16 + (i % 3) * 6, i * 0.3, 0, Math.PI * 2);
    g.fill();
  }
  const night = g.createLinearGradient(760, 0, 1024, 0);
  night.addColorStop(0, "rgba(0,0,0,0)");
  night.addColorStop(1, "rgba(0,8,18,0.5)");
  g.fillStyle = night;
  g.fillRect(760, 0, 264, 512);
  return texOf(c);
}

export function cloudTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(1024, 512);
  g.clearRect(0, 0, 1024, 512);
  for (let i = 0; i < 22; i++) {
    g.fillStyle = `rgba(255,255,255,${0.25 + (i % 5) * 0.08})`;
    g.beginPath();
    g.ellipse((i * 97) % 1000, 40 + ((i * 53) % 420), 90 + (i % 6) * 16, 18 + (i % 4) * 5, i * 0.2, 0, Math.PI * 2);
    g.fill();
  }
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
  g.fillStyle = "#14386e";
  g.fillRect(0, 0, 512, 256);
  g.fillStyle = "#f4f7fb";
  g.font = "700 92px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("ECIT", 256, 88);
  g.font = "700 64px sans-serif";
  g.fillText("BAYEUX", 256, 176);
  return texOf(c);
}

export function plateTexture(label: string): THREE.CanvasTexture {
  const [c, g] = canvas(512, 128);
  g.fillStyle = "#102033";
  g.fillRect(0, 0, 512, 128);
  g.strokeStyle = "#7eb8cc";
  g.lineWidth = 6;
  g.strokeRect(8, 8, 496, 112);
  g.fillStyle = "#d5eef6";
  g.font = "700 64px sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(label, 256, 68);
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
