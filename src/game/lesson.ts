import { FORCE_COAST, FORCE_EQ, SPEED_MOVE, SPEED_REST } from "./hoist.ts";

export type LabFlags = {
  up: boolean;
  down: boolean;
  balance: boolean;
  coast: boolean;
  masses: boolean;
  gravity: boolean;
};

export type LessonAsk = "coast" | "brake" | "moon";

export function labReady(flags: LabFlags): boolean {
  return flags.up && flags.down && flags.balance && flags.coast && flags.masses && flags.gravity;
}

export function guardMet(phase: number, P: number, T: number, Fr: number, a: number, v: number): boolean {
  if (phase <= 0) return Math.abs(Fr) < FORCE_EQ && Math.abs(v) < SPEED_REST;
  if (phase === 1) return T > P + FORCE_EQ && v > 0.12;
  if (phase === 2) return Fr > 30 && a > 0.2;
  if (phase === 3) return Math.abs(Fr) <= FORCE_COAST && v > SPEED_MOVE;
  return v < -0.12 && a > 0.08;
}

export function hintLevel(stuck: number): 0 | 1 | 2 {
  const t = Number.isFinite(stuck) ? stuck : 0;
  if (t >= 18) return 2;
  if (t >= 8) return 1;
  return 0;
}

export function liveLine(P: number, T: number, Fr: number, a: number, v: number): string {
  if (v < -SPEED_MOVE && a > 0.05) return "A carga desce e a aceleração aponta para cima. Isso é frenagem.";
  if (v > SPEED_MOVE && a < -0.05) return "A carga sobe e a aceleração aponta para baixo. A velocidade está caindo.";
  if (Math.abs(Fr) < FORCE_EQ && Math.abs(v) > SPEED_MOVE) return "Fr ≈ 0 e a carga continua em movimento. Velocidade não é aceleração.";
  if (Math.abs(Fr) < FORCE_EQ && Math.abs(v) <= SPEED_REST) return "T ≈ P. Forças equilibradas e a carga está em repouso.";
  if (T > P + FORCE_EQ) return "T > P. A resultante aponta para cima.";
  if (T < P - FORCE_EQ) return "T < P. A resultante aponta para baixo.";
  return "Compare T e P. A diferença é a força resultante.";
}

const CONTROL_KEYS = "E aumenta a tração. Shift+E diminui.";
const CONTROL_TOUCH = "Agir aumenta a tração. Correr inverte.";

export function lessonFor(input: {
  goal: string;
  drop: number;
  proto: number;
  arrived: boolean;
  touch: boolean;
  stuck: number;
  lab: LabFlags;
}): {
  step: number;
  total: number;
  title: string;
  task: string;
  control: string;
  why: string;
  hints: [string, string, string];
} {
  const control = input.touch ? CONTROL_TOUCH : CONTROL_KEYS;
  if (input.goal === "scan" && !input.arrived) {
    return {
      step: 1,
      total: 8,
      title: "Investigue o elevador",
      task: "Vá até o painel. A carga está parada e o cabo não a move.",
      control: "Caminhe com WASD ou o joystick.",
      why: "Antes de mudar a tração, descubra quais forças já existem.",
      hints: [
        "O painel do guincho fica junto da carga.",
        "Aproxime-se até a interação aparecer.",
        "O painel está no setor de carga, à frente da plataforma.",
      ],
    };
  }
  if (input.goal === "scan") {
    return {
      step: 2,
      total: 8,
      title: "Peso e tração",
      task: "Ative o scanner e leia P e T.",
      control: "Q liga o scanner, de frente para a carga.",
      why: "Peso é a gravidade, para baixo. Tração é o cabo, para cima.",
      hints: ["Aperte Q perto da carga.", "O scanner mostra P = m·g e a tração do cabo.", "Fique junto do painel e aperte Q."],
    };
  }
  if (input.goal === "compare") {
    return {
      step: 3,
      total: 8,
      title: "Força resultante",
      task: "Mude a tração e observe Fr = T − P.",
      control,
      why: "Uma força sozinha não decide o movimento. A resultante decide a aceleração.",
      hints: [
        "Compare T com P enquanto mexe na tração.",
        "Se T fica maior que P, Fr aponta para cima.",
        "Aumente T alguns newtons acima de P e veja a seta da resultante.",
      ],
    };
  }
  if (input.goal === "rise") {
    return {
      step: 4,
      total: 8,
      title: "Faça a carga subir",
      task: "A tração precisa superar o peso.",
      control,
      why: "T > P produz Fr > 0 e aceleração para cima.",
      hints: ["Compare T e P.", "A tração precisa ficar maior que o peso.", "Segure E até T passar de P. Qualquer valor acima já serve."],
    };
  }
  if (input.goal === "balance") {
    return {
      step: 5,
      total: 8,
      title: "Pare a aceleração",
      task: "Iguale T e P. Não é preciso zerar a velocidade na hora.",
      control,
      why: "Fr = 0 significa a = 0. Se a carga já se move, a velocidade tende a continuar.",
      hints: [
        "Traga a tração para perto do peso.",
        "Fr perto de zero e a carga ainda pode estar subindo.",
        "Ajuste E ou Shift+E até T ficar cerca de 8 N do peso. Depois espere a velocidade cair.",
      ],
    };
  }
  if (input.goal === "descent" && input.drop === 0) {
    return {
      step: 6,
      total: 8,
      title: "Faça a carga descer",
      task: "Reduza a tração até ficar menor que o peso.",
      control,
      why: "T < P produz resultante e aceleração para baixo.",
      hints: ["O peso precisa vencer a tração.", "Shift+E reduz a tração.", "Deixe T alguns newtons abaixo de P e observe v para baixo."],
    };
  }
  if (input.goal === "descent" && input.drop === 1) {
    return {
      step: 6,
      total: 8,
      title: "Desça com velocidade constante",
      task: "Iguale T e P sem parar a carga.",
      control,
      why: "Fr = 0 não apaga a velocidade. A aceleração é que fica nula.",
      hints: [
        "A carga já desce. Agora zere a resultante, não a velocidade.",
        "Aumente T até ficar perto de P, com v ainda para baixo.",
        "Se a velocidade zerar, reduza T de novo e reequilibre no meio da descida.",
      ],
    };
  }
  if (input.goal === "descent") {
    return {
      step: 6,
      total: 8,
      title: "Freie a descida",
      task: "A carga desce. A aceleração precisa apontar para cima.",
      control,
      why: "Frear é acelerar contra o movimento. Na descida, isso pede T > P.",
      hints: [
        "Você precisa diminuir a velocidade, não inverter o cabo.",
        "A aceleração precisa apontar contra o movimento.",
        "Como a carga desce, faça T maior que P até a velocidade ficar pequena, longe do piso.",
      ],
    };
  }
  if (input.goal === "guardian") {
    const titles = ["Peso", "Tração", "Resultante", "Velocidade constante", "Frenagem"];
    const tasks = [
      "Deixe T perto de P, com a carga parada. Esse equilíbrio revela o peso.",
      "Faça a tração superar o peso e a carga subir.",
      "Mantenha uma resultante clara para cima, acima de 30 N.",
      "Iguale T e P sem parar a subida.",
      "A carga precisa descer perdendo velocidade: aceleração para cima.",
    ];
    const phase = Math.max(0, Math.min(4, input.proto));
    return {
      step: 8,
      total: 8,
      title: `Guardião · ${titles[phase]}`,
      task: tasks[phase] ?? tasks[0] ?? "",
      control,
      why: "O guardião não cai por tiro. Cada fase pede Fr = T − P de um jeito diferente.",
      hints: [
        "Errou a tração? Ajuste e tente de novo. O invasor não pune o erro de conta.",
        tasks[phase] ?? "",
        "Observe o painel: T, P, Fr, a e v. O sinal da velocidade não é o sinal da aceleração.",
      ],
    };
  }
  if (input.goal === "lab") {
    const missing = [
      input.lab.up ? "" : "subida",
      input.lab.balance ? "" : "equilíbrio parado",
      input.lab.down ? "" : "descida",
      input.lab.coast ? "" : "Fr = 0 em movimento",
      input.lab.masses ? "" : "duas massas com Fr parecida",
      input.lab.gravity ? "" : "gravidade da Lua",
    ].filter(Boolean);
    const next = missing[0] ? `Próximo: ${missing[0]}.` : "O protocolo abre quando a lista fechar.";
    return {
      step: 7,
      total: 8,
      title: "Laboratório de forças",
      task: missing.length ? `Ainda falta: ${missing.join(", ")}.` : "As seis situações estão registradas.",
      control: `${control} E numa carga troca a massa. E no simulador troca g.`,
      why: "A mesma resultante acelera menos uma massa maior. Mudar g muda o peso, não a massa.",
      hints: [next, missing[1] ? `Depois: ${missing[1]}.` : next, missing[2] ? `E também: ${missing[2]}.` : next],
    };
  }
  if (input.goal === "protocol" && input.proto === 0) {
    return {
      step: 8,
      total: 8,
      title: "Protocolo · repouso",
      task: "Deixe T = P, com a carga parada e baixa.",
      control,
      why: "Repouso aqui é Fr ≈ 0 e v ≈ 0 ao mesmo tempo.",
      hints: ["Iguale tração e peso.", "A velocidade também precisa estar perto de zero.", "Fique abaixo de 2 m e segure T cerca de 8 N do peso."],
    };
  }
  if (input.goal === "protocol" && input.proto === 1) {
    return {
      step: 8,
      total: 8,
      title: "Protocolo · aceleração",
      task: "Faça a carga subir de verdade.",
      control,
      why: "T > P produz aceleração para cima. A velocidade deve crescer.",
      hints: ["A tração precisa superar o peso.", "Suba além de 3 m com velocidade crescendo.", "Segure E até a > 0 e a carga passar de 3,6 m."],
    };
  }
  if (input.goal === "protocol" && input.proto === 2) {
    return {
      step: 8,
      total: 8,
      title: "Protocolo · velocidade constante",
      task: "Iguale T e P sem parar a subida.",
      control,
      why: "Fr = 0 não significa parada. Significa que a velocidade se mantém.",
      hints: [
        "Se a velocidade zerou, acelere de novo e equilibre no meio.",
        "Fr perto de zero e v para cima, por um instante.",
        "Solte o excesso de tração até T ficar perto de P, com a carga ainda subindo.",
      ],
    };
  }
  if (input.goal === "protocol") {
    return {
      step: 8,
      total: 8,
      title: "Protocolo · frenagem",
      task: "A carga sobe. Faça a velocidade cair antes do topo.",
      control,
      why: "Movimento para cima e aceleração para baixo: T < P. Bater no teto não conta.",
      hints: [
        "Diminua a velocidade enquanto a carga ainda sobe.",
        "A aceleração precisa apontar contra o movimento.",
        "Reduza T abaixo de P cedo o bastante para chegar devagar, sem encostar no limite.",
      ],
    };
  }
  return {
    step: 8,
    total: 8,
    title: "Etapa 2 concluída",
    task: "A resultante decide a aceleração.",
    control,
    why: "P, T e Fr continuam valendo no módulo seguinte.",
    hints: ["A etapa 3 abre em seguida.", "A etapa 3 abre em seguida.", "A etapa 3 abre em seguida."],
  };
}

export function gradeLesson(id: LessonAsk, index: number): { ok: boolean; text: string } {
  if (id === "coast") {
    const ok = index === 2;
    return {
      ok,
      text: ok
        ? "Se a velocidade é constante, a aceleração é zero. Logo Fr = 0."
        : "Velocidade constante não pede força resultante. A aceleração é que é zero.",
    };
  }
  if (id === "brake") {
    const ok = index === 0;
    return {
      ok,
      text: ok
        ? "A carga desce e perde velocidade. A aceleração aponta para cima, contra o movimento."
        : "Olhe o movimento e a mudança da velocidade. Frear uma descida pede aceleração para cima.",
    };
  }
  const ok = index === 1;
  return {
    ok,
    text: ok
      ? "A massa não mudou. O peso mudou porque P = m·g e g mudou."
      : "Massa e peso não são a mesma coisa. Na Lua, g é menor, então o peso diminui.",
  };
}
