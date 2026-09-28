import { useEffect, useRef, useSyncExternalStore } from "react";
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
      {snap.phase === "play" && !snap.solved ? <Bearing /> : null}

      {snap.phase === "title" ? <Title best={snap.best} /> : null}
      {snap.phase === "play" || snap.phase === "cinema" ? <PlayHud snap={snap} /> : null}
      {snap.mapOpen ? <MapPanel /> : null}
      {snap.paused && !snap.mapOpen ? <PausePanel /> : null}
      {snap.phase === "complete" && snap.result ? <Complete result={snap.result} /> : null}
      {snap.phase === "play" && !snap.paused && !snap.mapOpen ? <Touch /> : null}
    </div>
  );
}

function Title({ best }: { best: number | null }) {
  return (
    <section className="panel title-card" data-ui>
      <p className="kicker">Programa Orbital · Cadete Tigrão</p>
      <h1>
        MISSÃO NEWTON
        <span>RESGATE DA ESTAÇÃO ORBITAL</span>
      </h1>
      <p className="sub">Missão 01 — Fundamentos e Inércia. A física se aprende empurrando.</p>
      <div className="row">
        <button className="btn" type="button" onClick={() => startMission()}>
          COMEÇAR
        </button>
        <span className="chip">Recorte jogável</span>
      </div>
      {best != null ? <p className="best">Melhor tempo {clock(best)}</p> : null}
      <p className="hints">WASD mover · mouse olhar · Shift correr · Espaço saltar · E interagir · Q scanner · Tab mapa · Esc pausa</p>
    </section>
  );
}

function PlayHud({ snap }: { snap: ReturnType<typeof getSnap> }) {
  return (
    <>
      <div className="hud-left">
        <div className="panel obj">
          <p className="kicker">Objetivo</p>
          <strong>{snap.objective}</strong>
        </div>
        {snap.line ? (
          <div className="panel line" style={{ position: "static", transform: "none", width: "auto" }}>
            <b>{snap.line.speaker}</b>
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
        {snap.readout ? <ReadoutCard readout={snap.readout} /> : null}
      </div>
      {snap.prompt ? <div className="panel prompt">{snap.prompt}</div> : null}
    </>
  );
}

function ReadoutCard({ readout }: { readout: NonNullable<ReturnType<typeof getSnap>["readout"]> }) {
  return (
    <div className="panel readout">
      <p className="kicker">Nexus Scanner</p>
      <h2>
        {readout.name} · {readout.surface}
      </h2>
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
        {readout.blocked
          ? "Parado. A força não vence o atrito estático."
          : readout.speed > 0.08
            ? "Em movimento. Sem força, o atrito é quem para."
            : "F = m · a"}
      </p>
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
      const tz = sim.z < -14 ? -25 : -8;
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
          <button className="btn" type="button" onClick={() => continueLab()}>
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
