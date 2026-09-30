import { i as __toESM } from "../_runtime.mjs";
import { O as require_jsx_runtime, k as require_react } from "../_libs/@react-three/fiber+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DZHedAsD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [Game, setGame] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("./Game-DQOJr1iN.mjs").then((mod) => {
			if (live) setGame(() => mod.Game);
		});
		return () => {
			live = false;
		};
	}, []);
	if (!Game) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "boot",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "boot-kicker",
				children: "Programa Orbital"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Missão Newton" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Resgate da Estação Orbital" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "boot-status",
				children: "Calibrando o laboratório…"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Game, {});
}
//#endregion
export { Home as component };
