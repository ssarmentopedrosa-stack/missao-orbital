import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ScanLine } from "lucide-react";
import {
  continueLab,
  getSnap,
  queueInteract,
  queueJump,
  queueScan,
  restart,
  setStick,
  setTouchSprint,
  sim,
  startMission,
  subscribe,
  toggleMap,
  togglePause,
} from "./sim";
import { shotIndex } from "./layout";
import { beginStage2, elevator, hoistState } from "./elevator";

function clock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function n(value: number, digits = 1): string {
  return value.toFixed(digits);
}

export function Overlay() {
  const snap = useSyncExternalStore(subscribe, getSnap, getSnap);
  return (
    <div className="hud">
      <div className="vignette" />
      {snap.scanner && snap.phase === "play" ? <div className="scanner-tint" /> : null}
      {elevator.alarm ? <div className="alarm-tint" /> : null}
      {snap.phase === "play" && !snap.solved ? <Bearing /> : null}

      {snap.phase === "title" ? <Title best={snap.best} /> : null}
      {snap.phase === "play" || snap.phase === "cinema" ? <PlayHud snap={snap} /> : null}
      {snap.mapOpen ? <MapPanel /> : null}
      {snap.paused && !snap.mapOpen ? <PausePanel /> : null}
      {snap.phase === "complete" && snap.result ? <Complete result={snap.result} /> : null}
      {sim.stage === 2 && sim.transit > 0 ? <StageCard /> : null}
      {elevator.done && elevator.finale <= 0 && snap.phase === "play" ? <StageReport /> : null}
      {snap.phase === "play" && !snap.paused && !snap.mapOpen ? <Touch /> : null}
    </div>
  );
}

function StageCard() {
  return (
    <section className="panel title-card" data-ui>
      <p className="kicker">Missão Newton</p>
      <h1>
        ETAPA 2
        <span>A FORÇA INVISÍVEL</span>
      </h1>
      <p className="sub">Nem toda força pode ser vista. Mas seus efeitos podem ser medidos.</p>
    </section>
  );
}

function Title({ best }: { best: number | null }) {
  const beat = useBeat();
  const lines = [
    "Newton-1 em órbita.",
    "Aproximação da estação.",
    "Interior. O laboratório ainda responde.",
    "Luzes de emergência no corredor.",
    "O módulo N-1, 20 kg, está fora da plataforma.",
    "Cadete Tigrão.",
    "O scanner mostra peso e normal. A força ainda é zero.",
    "Objetivo: reposicionar o módulo N-1.",
    "Postura de ação. O controle passa para você.",
  ];
  return (
    <section className="panel title-card" data-ui>
      <p className="kicker">Programa Orbital · Cadete Tigrão</p>
      <p className="beat">{lines[beat] ?? lines[0]}</p>
      <h1>
        MISSÃO NEWTON
        <span>RESGATE DA ESTAÇÃO ORBITAL</span>
      </h1>
      <p className="sub">Missão 01 — Fundamentos e Inércia. A física se aprende empurrando.</p>
      <div className="row">
        <button className="btn" type="button" onClick={() => startMission()}>
          COMEÇAR
        </button>
        <span className="chip">Pular abertura</span>
      </div>
      {best != null ? <p className="best">Melhor tempo {clock(best)}</p> : null}
      <p className="hints">WASD mover · mouse olhar · Shift correr · Espaço saltar · E interagir · Q scanner · Tab mapa · Esc pausa</p>
    </section>
  );
}

function useBeat(): number {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const next = shotIndex(sim.shotTime);
      setBeat((current) => (current === next ? current : next));
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return beat;
}

function PlayHud({ snap }: { snap: ReturnType<typeof getSnap> }) {
  return (
    <>
      <div className="hud-left">
        <div className="panel obj">
          <p className="kicker">Objetivo</p>
          <strong>{snap.objective}</strong>
        </div>
        {sim.stage === 2 && elevator.active && elevator.scanned && sim.transit <= 0 ? <ForceStrip /> : null}
        {snap.line ? (
          <div className="panel line" style={{ position: "static", transform: "none", width: "auto" }}>
            <b>{snap.line.speaker}</b>
            {snap.line.speaker === "NEWTON" ? <span className="role">IA de controle da estação</span> : null}
            <span className="wave" aria-hidden>
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <p>{snap.line.text}</p>
          </div>
        ) : null}
      </div>
      <div className="hud-right">
        <div className="panel meter">
          <span>
            Traje <b>{Math.round(snap.integrity)}%</b>
          </span>
          <div className="bar">
            <i style={{ width: `${snap.integrity}%` }} />
          </div>
        </div>
        <div className="panel meter">
          <span>
            Scanner <b>{Math.round(snap.cell)}%</b>
          </span>
          <div className={`bar${snap.cell < 20 ? " amber" : ""}`}>
            <i style={{ width: `${snap.cell}%` }} />
          </div>
        </div>
        <p className={`tool${snap.scanner ? " on" : ""}`}>
          <ScanLine size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
          Nexus {snap.scanner ? "ativo" : "em espera"} · Q
        </p>
        {snap.readout && sim.stage !== 2 ? <ReadoutCard readout={snap.readout} /> : null}
        {sim.stage === 2 && snap.scanner && elevator.active ? <HoistCard /> : null}
      </div>
      {snap.prompt && sim.stage !== 2 ? <div className="panel prompt">{snap.prompt}</div> : null}
      {sim.stage === 2 && elevator.active && sim.transit <= 0 ? <div className="panel prompt wrap">{elevator.hint}</div> : null}
    </>
  );
}

function ReadoutCard({ readout }: { readout: NonNullable<ReturnType<typeof getSnap>["readout"]> }) {
  return (
    <div className="panel readout">
      <p className="kicker">
        {readout.surface} · μ {n(readout.mu, 2)} · μs {n(readout.muS, 2)}
      </p>
      <h2>{readout.name}</h2>
      <div className="eq">
        <em>F</em>
        <span>{n(readout.force, 0)} N</span>
        <em>m</em>
        <span>{n(readout.mass, 0)} kg</span>
        <em>a</em>
        <span>{n(readout.accel, 2)} m/s²</span>
        <em>v</em>
        <span>{n(readout.speed, 2)} m/s</span>
        <em>μ</em>
        <span>{n(readout.mu, 2)}</span>
        <em>μs</em>
        <span>{n(readout.muS, 2)}</span>
        <em>fat</em>
        <span>{n(readout.friction, 0)} N</span>
        <em>estático</em>
        <span>{n(readout.staticFriction, 0)} N</span>
      </div>
      <p className="note">
        F força · v velocidade · a aceleração · f atrito.{" "}
        {readout.blocked
          ? "Parado. A força não vence o atrito estático."
          : readout.speed > 0.08
            ? "Em movimento. Sem força, o atrito é quem para."
            : "F = m · a"}
      </p>
    </div>
  );
}

function br(value: number, digits = 1): string {
  return value.toFixed(digits).replace(".", ",");
}

function HoistCard() {
  const h = hoistState();
  const still = Math.abs(h.Fr) < 0.8;
  const arrow = (n: number) => (Math.abs(n) < 0.05 ? "" : n > 0 ? " ↑" : " ↓");
  return (
    <div className="panel readout hoist">
      <p className="kicker">Scanner Newton</p>
      <h2>{h.name}</h2>
      <div className="eq">
        <em>m</em>
        <span>{br(h.mass, 1)} kg</span>
        <em>g</em>
        <span>{br(h.g, 2)} m/s²</span>
        <em>P</em>
        <span>{br(h.P, 1)} N ↓</span>
        <em>T</em>
        <span>{br(h.T, 1)} N ↑</span>
        <em>Fr</em>
        <span>{still ? "0 N" : `${br(h.Fr, 1)} N${arrow(h.Fr)}`}</span>
        <em>a</em>
        <span>{still ? "0 m/s²" : `${br(h.a, 2)} m/s²${arrow(h.a)}`}</span>
        <em>v</em>
        <span>
          {br(h.v, 2)} m/s{arrow(h.v)}
        </span>
      </div>
      <p className="note">{relation(h)}</p>
      <p className="note dim">P = m·g · Fr = T − P · a = Fr/m</p>
    </div>
  );
}

function relation(h: ReturnType<typeof hoistState>): string {
  if (Math.abs(h.Fr) < 0.8) {
    return Math.abs(h.v) < 0.08
      ? "T ≈ P · Fr ≈ 0 · a ≈ 0 · repouso"
      : "T ≈ P · Fr ≈ 0 · a ≈ 0 · a velocidade se conserva";
  }
  return h.T > h.P ? "T > P · aceleração para cima" : "T < P · aceleração para baixo";
}

function ForceStrip() {
  const h = hoistState();
  const arrow = (n: number) => (Math.abs(n) < 0.05 ? "" : n > 0 ? " ↑" : " ↓");
  return (
    <div className="panel force-strip">
      <p>
        m {br(h.mass, 0)} kg · g {br(h.g, 2)}
        {h.moon ? " · Lua" : ""}
      </p>
      <p>
        P {br(h.P, 1)} N · T {br(h.T, 1)} N
      </p>
      <p>
        Fr {br(h.Fr, 1)} N{arrow(h.Fr)} · a {br(h.a, 2)}
        {arrow(h.a)} · v {br(h.v, 2)}
      </p>
      <p className="note">{h.note}</p>
    </div>
  );
}

function StageReport() {
  const [hide, setHide] = useState(false);
  const h = hoistState();
  if (hide) return null;
  const rows: [string, boolean][] = [
    ["Peso", h.mastery.peso],
    ["Tração", h.mastery.tracao],
    ["Força resultante", h.mastery.resultante],
    ["Massa", h.mastery.massa],
    ["Aceleração", h.mastery.aceleracao],
    ["2ª lei de Newton", h.mastery.newton],
    ["Movimento com resultante zero", h.mastery.uniforme],
    ["Mesma resultante, massas diferentes", h.mastery.mesmaFr],
    ["Peso e gravidade", h.mastery.gravidade],
  ];
  const f = h.flight;
  return (
    <div className="modal" data-ui>
      <div className="panel sheet">
        <p className="kicker">Relatório da missão</p>
        <h2>Etapa 2 concluída</h2>
        <p className="sub">Uma força isolada não determina o movimento. O que importa é a força resultante.</p>
        <ul className="report-list">
          {rows.map(([label, ok]) => (
            <li key={label}>
              <span>{label}</span>
              <b>{ok ? "✓" : "não testado"}</b>
            </li>
          ))}
        </ul>
        <div className="stats">
          <div>
            <span>Tempo</span>
            {clock(h.elapsed)}
          </div>
          <div>
            <span>Impactos</span>
            {h.tries}
          </div>
          <div>
            <span>v máxima</span>
            {br(f.vMax, 2)} m/s
          </div>
          <div>
            <span>Início</span>
            {br(f.brakeY, 2)} m
          </div>
          <div>
            <span>v na frenagem</span>
            {br(f.brakeV, 2)} m/s
          </div>
          <div>
            <span>v na chegada</span>
            {br(f.arriveV, 2)} m/s
          </div>
          <div>
            <span>a na frenagem</span>
            {br(f.brakeA, 2)} m/s²
          </div>
          <div>
            <span>Duração</span>
            {br(f.brakeDur, 1)} s
          </div>
          <div>
            <span>Colisão na chegada</span>
            {f.collided ? "SIM" : "NÃO"}
          </div>
          <div>
            <span>Frenagem válida</span>
            {f.brakeValid ? "SIM" : "NÃO"}
          </div>
        </div>
        <div className="row">
          <button className="btn" type="button" onClick={() => setHide(true)}>
            Continuar observando
          </button>
        </div>
      </div>
    </div>
  );
}

function Bearing() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const el = ref.current;
      if (!el) return;
      const show = sim.phase === "play" && !sim.solved && !sim.paused && !sim.mapOpen;
      el.style.opacity = show ? "1" : "0";
      if (!show) return;
      const tx = 0;
      const tz = sim.stage === 2 ? -58.2 : sim.z < -14 ? -25 : -8;
      const dx = tx - sim.x;
      const dz = tz - sim.z;
      const fx = -Math.sin(sim.camYaw);
      const fz = -Math.cos(sim.camYaw);
      const rx = Math.cos(sim.camYaw);
      const rz = -Math.sin(sim.camYaw);
      const localX = dx * rx + dz * rz;
      const localZ = dx * fx + dz * fz;
      el.style.transform = `rotate(${Math.atan2(localX, localZ)}rad)`;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div className="compass" title="Rumo do objetivo">
      <svg ref={ref} width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <path d="M9 1.5 L14 15 L9 12 L4 15 Z" fill="#e0a23a" />
      </svg>
    </div>
  );
}

function PausePanel() {
  return (
    <div className="modal" data-ui>
      <div className="panel sheet">
        <p className="kicker">Pausa</p>
        <h2>Estação em espera</h2>
        <p className="sub">WASD mover · mouse olhar · Shift correr · Espaço saltar · E interagir · Q scanner</p>
        <div className="row">
          <button className="btn" type="button" onClick={() => togglePause()}>
            Retomar
          </button>
          <button className="btn ghost" type="button" onClick={() => restart(false)}>
            Reiniciar
          </button>
          <button className="btn ghost" type="button" onClick={() => restart(true)}>
            Título
          </button>
        </div>
      </div>
    </div>
  );
}

function Complete({ result }: { result: { time: number; pushes: number; scans: number; blocked: number } }) {
  return (
    <div className="modal" data-ui>
      <div className="panel sheet">
        <p className="kicker">Missão 01</p>
        <h2>Módulo acoplado</h2>
        <div className="stats">
          <div>
            <span>Tempo</span>
            {clock(result.time)}
          </div>
          <div>
            <span>Empurrões</span>
            {result.pushes}
          </div>
          <div>
            <span>Varreduras</span>
            {result.scans}
          </div>
          <div>
            <span>Bloqueios</span>
            {result.blocked}
          </div>
        </div>
        <p className="log">
          Registro — Primeira lei. Um corpo permanece em movimento uniforme até uma força, aqui o atrito, alterar esse estado. Massa maior, mesma força, menor aceleração.
        </p>
        <div className="row">
          <button className="btn" type="button" onClick={() => beginStage2()}>
            CONTINUAR PARA ETAPA 2
          </button>
          <button className="btn ghost" type="button" onClick={() => continueLab()}>
            Continuar no laboratório
          </button>
          <button className="btn ghost" type="button" onClick={() => restart(false)}>
            Repetir
          </button>
        </div>
      </div>
    </div>
  );
}

function MapPanel() {
  const x = ((sim.x + 9.4) / 18.8) * 100;
  const y = ((11.6 - sim.z) / (11.6 + 30.8)) * 100;
  return (
    <div className="modal" data-ui>
      <div className="panel sheet map-sheet">
        <p className="kicker">Navegação · Newton-1</p>
        <h2>Mapa da missão</h2>
        {sim.stage === 2 ? <p className="sub">Etapa 2 · A força invisível. O setor de carga fica além do mapa da etapa 1.</p> : null}
        <div className="map-layout">
          <div className="schematic" aria-hidden>
            <div className="room goal" style={{ left: "28%", right: "28%", top: "6%", height: "22%" }}>
              Plataforma
            </div>
            <div className="room" style={{ left: "18%", right: "18%", top: "32%", height: "28%" }}>
              Inércia
            </div>
            <div className="room" style={{ left: "40%", right: "40%", top: "60%", height: "12%" }}>
              Corredor
            </div>
            <div className="room" style={{ left: "22%", right: "22%", top: "74%", height: "18%" }}>
              Treino
            </div>
            <i className="dot" style={{ left: `${x}%`, top: `${y}%` }} />
          </div>
          <div>
            <p className="kicker">Setores</p>
            <ul className="locked">
              <li>
                <b>01 Inércia</b>
                <em>ATIVA</em>
              </li>
              <li>
                <b>02 Propulsão</b>
                <em>BLOQUEADA</em>
              </li>
              <li>
                <b>06 Energia</b>
                <em>BLOQUEADA</em>
              </li>
              <li>
                <b>09 Hangar</b>
                <em>BLOQUEADA</em>
              </li>
              <li>
                <b>10 Núcleo</b>
                <em>BLOQUEADA</em>
              </li>
            </ul>
            <div className="row">
              <button className="btn" type="button" onClick={() => toggleMap()}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Touch() {
  const knob = useRef<HTMLDivElement>(null);
  const origin = useRef<{ x: number; y: number } | null>(null);

  const move = (clientX: number, clientY: number) => {
    const o = origin.current;
    const el = knob.current;
    if (!o || !el) return;
    const dx = clientX - o.x;
    const dy = clientY - o.y;
    const max = 52;
    const mag = Math.hypot(dx, dy) || 1;
    const scale = Math.min(max, mag) / mag;
    const cx = dx * scale;
    const cy = dy * scale;
    el.style.transform = `translate(${cx}px, ${cy}px)`;
    setStick(cx / max, -cy / max);
  };

  return (
    <div className="touch-controls">
      <div
        className="stick"
        data-ui
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          origin.current = { x: event.clientX, y: event.clientY };
          move(event.clientX, event.clientY);
        }}
        onPointerMove={(event) => {
          if (origin.current) move(event.clientX, event.clientY);
        }}
        onPointerUp={() => {
          origin.current = null;
          if (knob.current) knob.current.style.transform = "translate(0px, 0px)";
          setStick(0, 0);
          setTouchSprint(false);
        }}
      >
        <div className="stick-knob" ref={knob} />
      </div>
      <div className="touch-actions" data-ui>
        <button type="button" onPointerDown={() => setTouchSprint(true)} onPointerUp={() => setTouchSprint(false)} onPointerLeave={() => setTouchSprint(false)}>
          Correr
        </button>
        <button type="button" onPointerDown={() => queueJump()}>
          Pular
        </button>
        <button type="button" onPointerDown={() => queueInteract()}>
          Agir
        </button>
        <button type="button" onPointerDown={() => queueScan()}>
          Scan
        </button>
        <button className="wide" type="button" onPointerDown={() => toggleMap()}>
          Mapa
        </button>
      </div>
    </div>
  );
}
