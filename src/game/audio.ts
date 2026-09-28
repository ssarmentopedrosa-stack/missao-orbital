let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let started = false;
let noise: AudioBuffer | null = null;
let nextNote = 0;
let stepI = 0;
let nextAlarm = 0;

const scale = [196, 247, 294, 330, 392, 330, 294, 247];

function ac(): AudioContext {
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
    noise = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return ctx;
}

export function unlockAudio(): void {
  const context = ac();
  if (context.state === "suspended") void context.resume();
  if (started) return;
  started = true;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void context.resume();
  });
  const o1 = context.createOscillator();
  const o2 = context.createOscillator();
  const g = context.createGain();
  o1.type = "sine";
  o2.type = "sine";
  o1.frequency.value = 55;
  o2.frequency.value = 82.5;
  g.gain.value = 0.03;
  o1.connect(g);
  o2.connect(g);
  g.connect(master!);
  o1.start();
  o2.start();
  const bed = context.createBufferSource();
  bed.buffer = noise;
  bed.loop = true;
  const bedFilter = context.createBiquadFilter();
  bedFilter.type = "lowpass";
  bedFilter.frequency.value = 240;
  const bedGain = context.createGain();
  bedGain.gain.value = 0.01;
  bed.connect(bedFilter);
  bedFilter.connect(bedGain);
  bedGain.connect(master!);
  bed.start();
  nextNote = context.currentTime + 0.4;
  nextAlarm = context.currentTime + 1;
}

export function pump(phase: string): void {
  if (!ctx || !started || !master) return;
  const t = ctx.currentTime;
  const gap = phase === "title" ? 0.95 : 0.78;
  const peak = phase === "play" ? 0.028 : 0.016;
  while (nextNote < t + 0.25) {
    tone(scale[stepI % scale.length] ?? 220, nextNote, peak, 1.5);
    if (stepI % 4 === 0) tone((scale[stepI % scale.length] ?? 220) * 2, nextNote, peak * 0.35, 1.2);
    stepI++;
    nextNote += gap;
  }
  if (phase === "title" && t > nextAlarm) {
    tone(740, t, 0.012, 0.18, "square");
    nextAlarm = t + 2.1;
  }
}

function tone(freq: number, when: number, peak: number, dur: number, type: OscillatorType = "sine"): void {
  if (!ctx || !master) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  const f = ctx.createBiquadFilter();
  o.type = type;
  o.frequency.setValueAtTime(freq, when);
  f.type = "lowpass";
  f.frequency.value = 1400;
  o.connect(f);
  f.connect(g);
  g.connect(master);
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), when + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  o.start(when);
  o.stop(when + dur + 0.02);
}

function burst(freq: number, dur: number, peak: number, filterFreq: number): void {
  if (!ctx || !master || !noise) return;
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const f = ctx.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = filterFreq;
  const g = ctx.createGain();
  src.connect(f);
  f.connect(g);
  g.connect(master);
  const t = ctx.currentTime;
  g.gain.setValueAtTime(peak, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.start(t);
  src.stop(t + dur);
  tone(freq, t, peak * 0.4, dur * 0.6);
}

export const sfx = {
  radio() {
    burst(520, 0.08, 0.03, 1800);
  },
  foot() {
    burst(90, 0.07, 0.04, 280);
  },
  shove() {
    burst(70, 0.16, 0.07, 220);
  },
  scan() {
    if (!ctx) return;
    tone(660, ctx.currentTime, 0.03, 0.12);
    tone(880, ctx.currentTime + 0.08, 0.025, 0.16);
  },
  scanTick() {
    if (!ctx) return;
    tone(820, ctx.currentTime, 0.01, 0.05);
  },
  jump() {
    if (!ctx) return;
    tone(220, ctx.currentTime, 0.02, 0.12);
  },
  land() {
    burst(64, 0.09, 0.05, 240);
  },
  fail() {
    if (!ctx) return;
    tone(196, ctx.currentTime, 0.028, 0.14, "triangle");
    tone(146, ctx.currentTime + 0.08, 0.02, 0.18, "triangle");
  },
  hit() {
    burst(50, 0.2, 0.08, 180);
  },
  success() {
    if (!ctx) return;
    const t = ctx.currentTime;
    [523, 659, 784, 1046].forEach((f, i) => tone(f, t + i * 0.11, 0.04, 0.45));
  },
  ui() {
    if (!ctx) return;
    tone(480, ctx.currentTime, 0.02, 0.08);
  },
};
