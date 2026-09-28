import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [Game, setGame] = useState<null | typeof import("../game/Game").Game>(null);
  useEffect(() => {
    let live = true;
    void import("../game/Game").then((mod) => {
      if (live) setGame(() => mod.Game);
    });
    return () => {
      live = false;
    };
  }, []);
  if (!Game) {
    return (
      <main className="boot">
        <p className="boot-kicker">Programa Orbital</p>
        <h1>Missão Newton</h1>
        <p>Resgate da Estação Orbital</p>
        <p className="boot-status">Calibrando o laboratório…</p>
      </main>
    );
  }
  return <Game />;
}
