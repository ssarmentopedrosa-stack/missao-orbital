import { i as __toESM } from "../_runtime.mjs";
import { D as Vector3, E as TextureLoader, O as require_jsx_runtime, S as SRGBColorSpace, T as SpriteMaterial, _ as MeshStandardMaterial, a as PMREMGenerator, b as RepeatWrapping, c as BufferAttribute, d as Fog, f as Group, h as MeshBasicMaterial, k as require_react, l as BufferGeometry, m as Mesh, n as useFrame, o as ArrowHelper, r as useThree, t as Canvas, u as CanvasTexture, v as Object3D, w as Sprite, x as RingGeometry } from "../_libs/@react-three/fiber+[...].mjs";
import { n as ScanLine } from "../_libs/lucide-react.mjs";
import { t as RoomEnvironment } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Game-B3GGCkUZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function std(color, extra = {}) {
	return new MeshStandardMaterial({
		color,
		roughness: .55,
		metalness: .08,
		...extra
	});
}
var M = {
	suit: std("#e6eef6", {
		roughness: .68,
		metalness: .06
	}),
	suitBlue: std("#184888", {
		roughness: .42,
		metalness: .38
	}),
	suitDark: std("#c9d3de", {
		roughness: .55,
		metalness: .12
	}),
	glove: std("#2a313b", {
		roughness: .92,
		metalness: .04
	}),
	boot: std("#d5dee8", {
		roughness: .32,
		metalness: .62
	}),
	fur: std("#b4743c", {
		roughness: .86,
		metalness: 0
	}),
	furDark: std("#6a3e24", {
		roughness: .88,
		metalness: 0
	}),
	muzzle: std("#f6ebe0", {
		roughness: .72,
		metalness: 0
	}),
	nose: std("#140e0c", {
		roughness: .22,
		metalness: .15
	}),
	tongue: std("#d46a6a", {
		roughness: .42,
		metalness: 0
	}),
	eye: std("#f7f1e8", {
		roughness: .28,
		metalness: 0
	}),
	iris: std("#c47a2c", {
		roughness: .28,
		metalness: .04,
		emissive: "#c47a2c",
		emissiveIntensity: .22
	}),
	pupil: std("#120d0a", { roughness: .4 }),
	gold: std("#e0a23a", {
		roughness: .32,
		metalness: .62,
		emissive: "#e0a23a",
		emissiveIntensity: .18
	}),
	glass: new MeshStandardMaterial({
		color: "#d7f1f8",
		transparent: true,
		opacity: .13,
		roughness: .03,
		metalness: .05,
		envMapIntensity: 1.8,
		depthWrite: false
	}),
	hull: std("#3d4b5c", {
		roughness: .36,
		metalness: .84
	}),
	hullDark: std("#232c38", {
		roughness: .5,
		metalness: .7
	}),
	floor: std("#1a2432", {
		roughness: .48,
		metalness: .5
	}),
	ice: std("#e7f4f8", {
		roughness: .04,
		metalness: .22,
		emissive: "#7eb8cc",
		emissiveIntensity: .08
	}),
	rubber: std("#241f1c", {
		roughness: 1,
		metalness: 0
	}),
	lane: std("#b7c2ce", {
		roughness: .22,
		metalness: .88
	}),
	dark: std("#121820", {
		roughness: .55,
		metalness: .48
	}),
	stripe: std("#e0a23a", {
		roughness: .45,
		metalness: .3,
		emissive: "#e0a23a",
		emissiveIntensity: .25
	}),
	pipe: std("#6a7888", {
		roughness: .28,
		metalness: .86
	}),
	emit: new MeshStandardMaterial({
		color: "#9fd4e6",
		emissive: "#7eb8cc",
		emissiveIntensity: .9,
		roughness: .35
	}),
	alarm: new MeshStandardMaterial({
		color: "#e0a23a",
		emissive: "#e0a23a",
		emissiveIntensity: .4,
		roughness: .4,
		metalness: .2
	}),
	visorLight: new MeshStandardMaterial({
		color: "#f4f7fb",
		emissive: "#d5e4ef",
		emissiveIntensity: 1.4,
		roughness: .3
	})
};
var RIB = 28;
function Dressing() {
	const ribs = (0, import_react.useRef)(null);
	const junk = (0, import_react.useRef)(null);
	const dust = (0, import_react.useMemo)(() => {
		const geo = new BufferGeometry();
		const n = 160;
		const a = /* @__PURE__ */ new Float32Array(480);
		for (let i = 0; i < n; i++) {
			const bay = i % 3 === 0;
			a[i * 3] = (Math.random() - .5) * (bay ? 14 : 12);
			a[i * 3 + 1] = .35 + Math.random() * 2.6;
			a[i * 3 + 2] = bay ? -12 - Math.random() * 16 : -1 + Math.random() * 11;
		}
		geo.setAttribute("position", new BufferAttribute(a, 3));
		return geo;
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		const mesh = ribs.current;
		if (!mesh) return;
		const dummy = new Object3D();
		let i = 0;
		for (let z = -.4; z <= 10.4 && i < 24; z += 1.7) {
			dummy.position.set(7.52, 1.65, z);
			dummy.rotation.set(0, 0, 0);
			dummy.updateMatrix();
			mesh.setMatrixAt(i++, dummy.matrix);
			dummy.position.set(-7.52, 1.65, z);
			dummy.updateMatrix();
			mesh.setMatrixAt(i++, dummy.matrix);
		}
		for (let z = -28; z <= -12 && i < RIB; z += 3.2) {
			dummy.position.set(8.85, 2.1, z);
			dummy.updateMatrix();
			mesh.setMatrixAt(i++, dummy.matrix);
			if (i >= RIB) break;
			dummy.position.set(-8.85, 2.1, z);
			dummy.updateMatrix();
			mesh.setMatrixAt(i++, dummy.matrix);
		}
		mesh.count = i;
		mesh.instanceMatrix.needsUpdate = true;
	}, []);
	useFrame((_, dt) => {
		if (junk.current) junk.current.rotation.y += dt * .04;
		const attr = dust.getAttribute("position");
		for (let i = 0; i < attr.count; i++) {
			let y = attr.getY(i) + dt * .04;
			if (y > 3.15) y = .3;
			attr.setY(i, y);
		}
		attr.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
			ref: ribs,
			args: [
				void 0,
				void 0,
				RIB
			],
			material: M.hullDark,
			count: 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.05,
				1.15,
				1.15
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				6.7,
				3.2,
				5
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: M.pipe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.045,
				.045,
				11.5,
				8
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-6.7,
				3.2,
				5
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: M.pipe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.045,
				.045,
				11.5,
				8
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				2.82,
				-5.2
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: M.pipe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.035,
				.035,
				7.2,
				8
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				3.75,
				-18
			],
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			material: M.hull,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				16,
				.08,
				.08
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				3.75,
				-24
			],
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			material: M.hull,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				14,
				.08,
				.08
			] })
		}),
		[
			-2.2,
			2.4,
			8.2
		].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-7.35,
				2.55,
				z
			],
			material: M.emit,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.04,
				.08,
				.55
			] })
		}, z)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				2.95,
				-1.15
			],
			material: M.alarm,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.4,
				.05,
				.06
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				3.15,
				-9.3
			],
			material: M.alarm,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.2,
				.05,
				.06
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
			geometry: dust,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
				color: "#c5d6e4",
				size: .025,
				transparent: true,
				opacity: .45,
				depthWrite: false,
				sizeAttenuation: true
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: junk,
			position: [
				0,
				200,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						6.4,
						.8,
						3.2
					],
					material: M.hull,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.45,
						.22,
						.7
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						-5.2,
						-.6,
						4.4
					],
					material: M.suitBlue,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.3,
						.3,
						.3
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						2.2,
						1.6,
						-6.5
					],
					material: M.hullDark,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.28, 0] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						8.5,
						-.4,
						-2
					],
					material: M.pipe,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.06,
						.06,
						1.1,
						8
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						-2.4,
						2.2,
						6
					],
					material: M.emit,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.08,
						8,
						8
					] })
				})
			]
		})
	] });
}
var ctx = null;
var master = null;
var started = false;
var noise = null;
var nextNote = 0;
var stepI = 0;
var nextAlarm = 0;
var scale = [
	196,
	247,
	294,
	330,
	392,
	330,
	294,
	247
];
function ac() {
	if (!ctx) {
		ctx = new (window.AudioContext || window.webkitAudioContext)();
		master = ctx.createGain();
		master.gain.value = .55;
		master.connect(ctx.destination);
		noise = ctx.createBuffer(1, ctx.sampleRate * .4, ctx.sampleRate);
		const data = noise.getChannelData(0);
		for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	}
	return ctx;
}
function unlockAudio() {
	const context = ac();
	if (context.state === "suspended") context.resume();
	if (started) return;
	started = true;
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "visible") context.resume();
	});
	const o1 = context.createOscillator();
	const o2 = context.createOscillator();
	const g = context.createGain();
	o1.type = "sine";
	o2.type = "sine";
	o1.frequency.value = 55;
	o2.frequency.value = 82.5;
	g.gain.value = .03;
	o1.connect(g);
	o2.connect(g);
	g.connect(master);
	o1.start();
	o2.start();
	nextNote = context.currentTime + .4;
	nextAlarm = context.currentTime + 1;
}
function pump(phase) {
	if (!ctx || !started || !master) return;
	const t = ctx.currentTime;
	const gap = phase === "title" ? .95 : .78;
	const peak = phase === "play" ? .028 : .016;
	while (nextNote < t + .25) {
		tone(scale[stepI % scale.length] ?? 220, nextNote, peak, 1.5);
		if (stepI % 4 === 0) tone((scale[stepI % scale.length] ?? 220) * 2, nextNote, peak * .35, 1.2);
		stepI++;
		nextNote += gap;
	}
	if (phase === "title" && t > nextAlarm) {
		tone(740, t, .012, .18, "square");
		nextAlarm = t + 2.1;
	}
}
function tone(freq, when, peak, dur, type = "sine") {
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
	g.gain.setValueAtTime(1e-4, when);
	g.gain.exponentialRampToValueAtTime(Math.max(2e-4, peak), when + .03);
	g.gain.exponentialRampToValueAtTime(1e-4, when + dur);
	o.start(when);
	o.stop(when + dur + .02);
}
function burst(freq, dur, peak, filterFreq) {
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
	g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
	src.start(t);
	src.stop(t + dur);
	tone(freq, t, peak * .4, dur * .6);
}
var sfx = {
	radio() {
		burst(520, .08, .03, 1800);
	},
	foot() {
		burst(90, .07, .04, 280);
	},
	shove() {
		burst(70, .16, .07, 220);
	},
	scan() {
		if (!ctx) return;
		tone(660, ctx.currentTime, .03, .12);
		tone(880, ctx.currentTime + .08, .025, .16);
	},
	jump() {
		if (!ctx) return;
		tone(220, ctx.currentTime, .02, .12);
	},
	land() {
		burst(64, .09, .05, 240);
	},
	hit() {
		burst(50, .2, .08, 180);
	},
	success() {
		if (!ctx) return;
		const t = ctx.currentTime;
		[
			523,
			659,
			784,
			1046
		].forEach((f, i) => tone(f, t + i * .11, .04, .45));
	},
	ui() {
		if (!ctx) return;
		tone(480, ctx.currentTime, .02, .08);
	}
};
var SPAWN = {
	x: 0,
	z: 7.2,
	yaw: 0
};
var DOCK = {
	x: 0,
	z: -25,
	r: 1.2
};
var NEWTON = {
	x: -5.3,
	z: 5.15
};
var FICHA = {
	x: 8,
	z: -11.35
};
var G = 9.81;
var CRATE_SPECS = [
	{
		id: "light",
		name: "Caixa leve",
		kind: "light",
		x: -5.2,
		z: -15.2,
		mass: 6,
		hx: .34,
		hz: .34,
		h: .46
	},
	{
		id: "module",
		name: "Módulo N-1",
		kind: "module",
		x: 0,
		z: -15.2,
		mass: 20,
		hx: .5,
		hz: .42,
		h: .64
	},
	{
		id: "heavy",
		name: "Bateria",
		kind: "heavy",
		x: 5.2,
		z: -15.2,
		mass: 40,
		hx: .62,
		hz: .5,
		h: .8
	}
];
function surfaceAt(x, z) {
	if (z < -12.6 && z > -28.2) {
		if (x > -7.6 && x < -3.05) return {
			name: "Gelo",
			mu: .05,
			muS: .07
		};
		if (x > 3.05 && x < 7.6) return {
			name: "Borracha",
			mu: .62,
			muS: .78
		};
		if (x > -2.5 && x < 2.5) return {
			name: "Metal",
			mu: .3,
			muS: .4
		};
	}
	return {
		name: "Compósito",
		mu: .42,
		muS: .52
	};
}
var BLOCKS = [
	{
		minX: -8.02,
		maxX: -7.6,
		minZ: -1.7,
		maxZ: 11.65,
		h: 3.5,
		kind: "wall"
	},
	{
		minX: 7.6,
		maxX: 8.02,
		minZ: -1.7,
		maxZ: 11.65,
		h: 3.5,
		kind: "hidden"
	},
	{
		minX: -8.05,
		maxX: 8.05,
		minZ: 11.2,
		maxZ: 11.62,
		h: 3.5,
		kind: "wall"
	},
	{
		minX: -8.05,
		maxX: -1.55,
		minZ: -1.6199999999999999,
		maxZ: -1.2,
		h: 3.5,
		kind: "wall"
	},
	{
		minX: 1.55,
		maxX: 8.05,
		minZ: -1.6199999999999999,
		maxZ: -1.2,
		h: 3.5,
		kind: "wall"
	},
	{
		minX: -2.12,
		maxX: -1.7,
		minZ: -9.6,
		maxZ: -1.15,
		h: 3.05,
		kind: "wall"
	},
	{
		minX: 1.7,
		maxX: 2.12,
		minZ: -9.6,
		maxZ: -1.15,
		h: 3.05,
		kind: "wall"
	},
	{
		minX: -9.45,
		maxX: -1.55,
		minZ: -9.62,
		maxZ: -9.2,
		h: 4.1,
		kind: "wall"
	},
	{
		minX: 1.55,
		maxX: 9.45,
		minZ: -9.62,
		maxZ: -9.2,
		h: 4.1,
		kind: "wall"
	},
	{
		minX: -9.42,
		maxX: -9,
		minZ: -30.85,
		maxZ: -9.15,
		h: 4.1,
		kind: "wall"
	},
	{
		minX: 9,
		maxX: 9.42,
		minZ: -30.85,
		maxZ: -9.15,
		h: 4.1,
		kind: "wall"
	},
	{
		minX: -9.45,
		maxX: 9.45,
		minZ: -30.82,
		maxZ: -30.4,
		h: 4.1,
		kind: "hidden"
	},
	{
		minX: 2.35,
		maxX: 4.75,
		minZ: 2.9,
		maxZ: 5.05,
		h: .92,
		kind: "prop"
	},
	{
		minX: -6.15,
		maxX: -4.45,
		minZ: 4.15,
		maxZ: 6.15,
		h: 1.12,
		kind: "prop"
	},
	{
		minX: -6.2,
		maxX: -3.85,
		minZ: -.35,
		maxZ: 1.45,
		h: .55,
		kind: "prop"
	},
	{
		minX: 4.45,
		maxX: 6.7,
		minZ: -.55,
		maxZ: 1.55,
		h: .88,
		kind: "prop"
	},
	{
		minX: 7.15,
		maxX: 8.85,
		minZ: -12.4,
		maxZ: -10.3,
		h: 1.05,
		kind: "prop"
	}
];
function shotIndex(shotTime) {
	const u = shotTime % 21;
	if (u < 8) return 0;
	if (u < 14) return 1;
	return 2;
}
var KEY = "missao-newton-3d-v1";
var held = /* @__PURE__ */ new Set();
function loadBest() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return typeof parsed.best === "number" ? parsed.best : null;
	} catch {
		return null;
	}
}
function freshCrates() {
	return CRATE_SPECS.map((spec) => {
		const surf = surfaceAt(spec.x, spec.z);
		return {
			...spec,
			vx: 0,
			vz: 0,
			force: 0,
			blocked: false,
			wasBlocked: false,
			wasPush: false,
			dirX: 0,
			dirZ: -1,
			docked: false,
			mu: surf.mu,
			muS: surf.muS,
			surface: surf.name,
			speed: 0
		};
	});
}
var sim = {
	phase: "title",
	paused: false,
	mapOpen: false,
	scanner: false,
	freeplay: false,
	solved: false,
	x: SPAWN.x,
	y: 0,
	z: SPAWN.z,
	yaw: SPAWN.yaw,
	vx: 0,
	vy: 0,
	vz: 0,
	speed: 0,
	grounded: true,
	sprinting: false,
	pushing: false,
	anim: "idle",
	animLock: null,
	camYaw: 0,
	camPitch: .38,
	lookDX: 0,
	lookDY: 0,
	time: 0,
	shotTime: 0,
	cinemaT: 0,
	t0: 0,
	shake: 0,
	integrity: 100,
	cell: 100,
	pushes: 0,
	scans: 0,
	blocked: 0,
	objective: "Entre no laboratório de inércia",
	line: null,
	result: null,
	best: loadBest(),
	crates: freshCrates(),
	puffs: Array.from({ length: 6 }, () => ({
		x: 0,
		z: 0,
		life: 0
	})),
	touchX: 0,
	touchY: 0,
	touchSprint: false,
	padX: 0,
	padY: 0,
	padSprint: false,
	jumpEdge: false,
	interactEdge: false,
	scanEdge: false,
	pauseEdge: false,
	nextFoot: 0,
	nextHit: 0,
	sawHall: false,
	sawBay: false,
	sawScan: false,
	sawHeavy: false,
	sawWrong: false,
	reduce: false,
	_padA: false,
	_padX: false,
	_padY: false,
	_padStart: false
};
var listeners = /* @__PURE__ */ new Set();
var snap = buildSnap();
var uiAcc = 0;
var lastPrompt = null;
function subscribe(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
function getSnap() {
	return snap;
}
function publishNow() {
	lastPrompt = computePrompt();
	snap = buildSnap();
	listeners.forEach((listener) => listener());
}
function buildSnap() {
	const line = sim.line && sim.time < sim.line.until ? {
		speaker: sim.line.speaker,
		text: sim.line.text
	} : null;
	return {
		phase: sim.phase,
		paused: sim.paused,
		mapOpen: sim.mapOpen,
		scanner: sim.scanner,
		objective: sim.objective,
		prompt: computePrompt(),
		line,
		integrity: sim.integrity,
		cell: sim.cell,
		pushes: sim.pushes,
		scans: sim.scans,
		blocked: sim.blocked,
		elapsed: Math.max(0, sim.time - sim.t0),
		readout: sim.scanner ? readout() : null,
		result: sim.result,
		best: sim.best,
		freeplay: sim.freeplay,
		solved: sim.solved
	};
}
function dist(x, z) {
	return Math.hypot(sim.x - x, sim.z - z);
}
function computePrompt() {
	if (sim.phase !== "play" || sim.paused || sim.mapOpen) return null;
	if (dist(NEWTON.x, NEWTON.z) < 2.1) return "E  ·  Falar com NEWTON";
	if (nearestCrate(1.8)) return "E  ·  Impulso    ·    caminhe para aplicar força";
	if (dist(FICHA.x, FICHA.z) < 2.1) return "E  ·  Ler a ficha de inércia";
	return null;
}
function focused() {
	return nearestCrate(6.5);
}
function nearestCrate(max) {
	let best = null;
	let bestD = max;
	for (const crate of sim.crates) {
		const d = Math.hypot(crate.x - sim.x, crate.z - sim.z);
		if (d < bestD) {
			bestD = d;
			best = crate;
		}
	}
	return best;
}
function readout() {
	const crate = focused();
	if (!crate) return null;
	const n = crate.mass * G;
	const friction = crate.mu * n;
	const accel = crate.blocked ? 0 : crate.force > 1 ? (crate.force - friction) / crate.mass : crate.speed > .05 ? -friction / crate.mass : 0;
	return {
		name: crate.name,
		mass: crate.mass,
		mu: crate.mu,
		muS: crate.muS,
		surface: crate.surface,
		speed: crate.speed,
		force: crate.force,
		accel,
		friction,
		staticFriction: crate.muS * n,
		blocked: crate.blocked
	};
}
function say(speaker, text, seconds) {
	sim.line = {
		speaker,
		text,
		until: sim.time + seconds
	};
	sfx.radio();
	publishNow();
}
function puff(x, z) {
	const slot = sim.puffs.find((item) => item.life <= 0) ?? sim.puffs[0];
	if (!slot) return;
	slot.x = x;
	slot.z = z;
	slot.life = 1;
}
function saveResult(result) {
	const best = sim.best == null ? result.time : Math.min(sim.best, result.time);
	sim.best = best;
	try {
		localStorage.setItem(KEY, JSON.stringify({
			v: 1,
			best,
			last: result,
			clears: 1
		}));
	} catch {}
}
function startMission() {
	if (sim.phase !== "title") return;
	unlockAudio();
	sfx.ui();
	unlockPlay();
	say("NEWTON", "Cadete Tigrão. O módulo de navegação está solto no laboratório de inércia. Leve-o à plataforma e observe o que a massa faz com o movimento.", 7.2);
}
function unlockPlay() {
	sim.phase = "play";
	sim.t0 = sim.time;
	sim.paused = false;
	sim.mapOpen = false;
	sim.objective = "Atravesse o corredor até o laboratório de inércia";
}
function toggleMap() {
	if (sim.phase !== "play") return;
	sim.mapOpen = !sim.mapOpen;
	sim.paused = false;
	sfx.ui();
	publishNow();
}
function togglePause() {
	if (sim.phase === "cinema") {
		sim.phase = "complete";
		publishNow();
		return;
	}
	if (sim.phase !== "play") return;
	if (sim.mapOpen) sim.mapOpen = false;
	else sim.paused = !sim.paused;
	sfx.ui();
	publishNow();
}
function toggleScanner() {
	if (sim.phase !== "play" || sim.paused) return;
	if (!sim.scanner && sim.cell < 4) {
		say("NEXUS", "Célula do scanner ainda recarregando.", 2.4);
		return;
	}
	sim.scanner = !sim.scanner;
	if (sim.scanner) {
		sim.scans += 1;
		sfx.scan();
		if (!sim.sawScan) {
			sim.sawScan = true;
			say("NEXUS", "Scanner ativo. Ciano é velocidade, âmbar é atrito, branco é a sua força. Se ela não vence o atrito estático, o corpo não sai do lugar.", 6.5);
			return;
		}
	}
	publishNow();
}
function queueJump() {
	sim.jumpEdge = true;
}
function queueInteract() {
	sim.interactEdge = true;
}
function queueScan() {
	sim.scanEdge = true;
}
function setStick(x, y) {
	sim.touchX = x;
	sim.touchY = y;
}
function setTouchSprint(on) {
	sim.touchSprint = on;
}
function continueLab() {
	sim.phase = "play";
	sim.freeplay = true;
	sim.paused = false;
	sim.mapOpen = false;
	sim.animLock = null;
	sim.objective = "Laboratório livre: compare massa, força e atrito";
	publishNow();
}
function restart(toTitle) {
	sim.crates = freshCrates();
	sim.x = SPAWN.x;
	sim.y = 0;
	sim.z = SPAWN.z;
	sim.yaw = SPAWN.yaw;
	sim.vx = 0;
	sim.vy = 0;
	sim.vz = 0;
	sim.speed = 0;
	sim.grounded = true;
	sim.camYaw = 0;
	sim.camPitch = .38;
	sim.paused = false;
	sim.mapOpen = false;
	sim.scanner = false;
	sim.freeplay = false;
	sim.solved = false;
	sim.integrity = 100;
	sim.cell = 100;
	sim.pushes = 0;
	sim.scans = 0;
	sim.blocked = 0;
	sim.result = null;
	sim.animLock = null;
	sim.anim = "idle";
	sim.shake = 0;
	sim.cinemaT = 0;
	sim.sawHall = false;
	sim.sawBay = false;
	sim.sawScan = false;
	sim.sawHeavy = false;
	sim.sawWrong = false;
	sim.line = null;
	sim.shotTime = 0;
	if (toTitle) {
		sim.phase = "title";
		sim.objective = "Entre no laboratório de inércia";
	} else {
		sim.phase = "play";
		sim.t0 = sim.time;
		sim.objective = "Atravesse o corredor até o laboratório de inércia";
	}
	sfx.ui();
	publishNow();
}
function resolveCircle(x, z, radius) {
	for (const block of BLOCKS) {
		const cx = Math.max(block.minX, Math.min(x, block.maxX));
		const cz = Math.max(block.minZ, Math.min(z, block.maxZ));
		let dx = x - cx;
		let dz = z - cz;
		const d2 = dx * dx + dz * dz;
		if (d2 >= radius * radius) continue;
		if (d2 < 1e-8) {
			const left = x - block.minX;
			const right = block.maxX - x;
			const back = z - block.minZ;
			const fwd = block.maxZ - z;
			const m = Math.min(left, right, back, fwd);
			if (m === left) x = block.minX - radius;
			else if (m === right) x = block.maxX + radius;
			else if (m === back) z = block.minZ - radius;
			else z = block.maxZ + radius;
			continue;
		}
		const d = Math.sqrt(d2);
		const push = (radius - d) / d;
		x += dx * push;
		z += dz * push;
	}
	return {
		x,
		z
	};
}
function resolveCrateBlock(crate, block) {
	const overlapX = Math.min(crate.x + crate.hx, block.maxX) - Math.max(crate.x - crate.hx, block.minX);
	const overlapZ = Math.min(crate.z + crate.hz, block.maxZ) - Math.max(crate.z - crate.hz, block.minZ);
	if (overlapX <= 0 || overlapZ <= 0) return;
	if (overlapX < overlapZ) {
		crate.x += crate.x > (block.minX + block.maxX) / 2 ? overlapX : -overlapX;
		crate.vx *= -.08;
	} else {
		crate.z += crate.z > (block.minZ + block.maxZ) / 2 ? overlapZ : -overlapZ;
		crate.vz *= -.08;
	}
}
function shove() {
	const fx = -Math.sin(sim.yaw);
	const fz = -Math.cos(sim.yaw);
	let best = null;
	let bestD = 1.7;
	for (const crate of sim.crates) {
		if (crate.docked) continue;
		const dx = crate.x - sim.x;
		const dz = crate.z - sim.z;
		const d = Math.hypot(dx, dz) || 1;
		const dot = (dx * fx + dz * fz) / d;
		if (d < bestD && dot > .2) {
			best = crate;
			bestD = d;
		}
	}
	if (!best) return false;
	const surf = surfaceAt(best.x, best.z);
	const vAdd = 80 / best.mass;
	best.vx += fx * vAdd;
	best.vz += fz * vAdd;
	best.dirX = fx;
	best.dirZ = fz;
	best.force = 80 / .18;
	sim.vx -= fx * 1 * .45;
	sim.vz -= fz * 1 * .45;
	sim.pushes += 1;
	sim.pushing = true;
	puff(best.x, best.z);
	sfx.shove();
	best.surface = surf.name;
	return true;
}
function tryInteract() {
	if (dist(NEWTON.x, NEWTON.z) < 2.15) {
		say("NEWTON", "Sem força resultante, o movimento não muda. A sua força entra no F de F = m · a. Massa maior, mesma força, menos aceleração.", 6.4);
		return;
	}
	if (shove()) return;
	if (dist(FICHA.x, FICHA.z) < 2.15) {
		say("FICHA 01", "Inércia: velocidade constante se a força resultante é zero. Atrito estático impede o início; o cinético freia. Suas botas são magnéticas — o piso age nos módulos, não em você.", 7);
		return;
	}
}
function pollPad() {
	const pad = (navigator.getGamepads?.())?.[0];
	if (!pad) {
		sim.padX = 0;
		sim.padY = 0;
		sim.padSprint = false;
		return;
	}
	const dead = .18;
	const lx = pad.axes[0] ?? 0;
	const ly = pad.axes[1] ?? 0;
	const rx = pad.axes[2] ?? 0;
	const ry = pad.axes[3] ?? 0;
	sim.padX = Math.abs(lx) > dead ? lx : 0;
	sim.padY = Math.abs(ly) > dead ? -ly : 0;
	sim.padSprint = Boolean(pad.buttons[7]?.pressed || pad.buttons[5]?.pressed);
	if (Math.abs(rx) > dead) sim.lookDX += rx * 14;
	if (Math.abs(ry) > dead) sim.lookDY += ry * 10;
	const a = Boolean(pad.buttons[0]?.pressed);
	const x = Boolean(pad.buttons[2]?.pressed);
	const y = Boolean(pad.buttons[3]?.pressed);
	const start = Boolean(pad.buttons[9]?.pressed);
	if (a && !sim._padA) {
		if (sim.phase === "title") startMission();
		else sim.jumpEdge = true;
	}
	if (x && !sim._padX) sim.interactEdge = true;
	if (y && !sim._padY) sim.scanEdge = true;
	if (start && !sim._padStart) sim.pauseEdge = true;
	sim._padA = a;
	sim._padX = x;
	sim._padY = y;
	sim._padStart = start;
}
function tickCells(dt) {
	if (sim.scanner) {
		sim.cell = Math.max(0, sim.cell - dt * 5);
		if (sim.cell <= 0) {
			sim.scanner = false;
			say("NEXUS", "Célula esgotada. O scanner recarrega sozinho.", 2.6);
		}
	} else sim.cell = Math.min(100, sim.cell + dt * 10);
}
function solve(module) {
	module.docked = true;
	module.x = DOCK.x;
	module.z = DOCK.z;
	module.vx = 0;
	module.vz = 0;
	sim.solved = true;
	sim.phase = "cinema";
	sim.cinemaT = 0;
	sim.shake = .2;
	sim.animLock = "celebrate";
	sim.result = {
		time: Math.max(0, sim.time - sim.t0),
		pushes: sim.pushes,
		scans: sim.scans,
		blocked: sim.blocked
	};
	saveResult(sim.result);
	sfx.success();
	say("NEWTON", "Módulo acoplado. Você usou a inércia — não apenas repetiu uma fórmula. A Newton-1 registra o cadete.", 6.5);
}
function step(dt) {
	sim.time += dt;
	if (sim.phase === "play" || sim.phase === "title") try {
		pollPad();
	} catch {}
	if (sim.phase === "title") {
		sim.shotTime += dt;
		sim.anim = "idle";
		sim.lookDX = 0;
		sim.lookDY = 0;
		sim.speed = 0;
		return;
	}
	if (sim.phase === "cinema") {
		sim.cinemaT += dt;
		sim.anim = "celebrate";
		const module = sim.crates.find((crate) => crate.kind === "module");
		if (module) {
			module.x = DOCK.x;
			module.z = DOCK.z;
			module.vx = 0;
			module.vz = 0;
		}
		if (sim.cinemaT > 3.5) {
			sim.phase = "complete";
			publishNow();
		}
		return;
	}
	if (sim.phase === "complete") {
		sim.anim = "celebrate";
		sim.lookDX = 0;
		sim.lookDY = 0;
		return;
	}
	if (sim.pauseEdge) {
		sim.pauseEdge = false;
		togglePause();
	}
	if (sim.scanEdge) {
		sim.scanEdge = false;
		toggleScanner();
	}
	if (sim.paused || sim.mapOpen) {
		sim.vx = 0;
		sim.vz = 0;
		sim.speed = 0;
		sim.anim = "idle";
		sim.lookDX = 0;
		sim.lookDY = 0;
		uiAcc += dt;
		if (uiAcc > .25) {
			uiAcc = 0;
			publishNow();
		}
		return;
	}
	sim.camYaw -= sim.lookDX * .0042;
	sim.camPitch = Math.max(.22, Math.min(.78, sim.camPitch - sim.lookDY * .0032));
	sim.lookDX = 0;
	sim.lookDY = 0;
	let ix = sim.touchX + sim.padX;
	let iz = sim.touchY + sim.padY;
	if (held.has("KeyA") || held.has("ArrowLeft")) ix -= 1;
	if (held.has("KeyD") || held.has("ArrowRight")) ix += 1;
	if (held.has("KeyW") || held.has("ArrowUp")) iz += 1;
	if (held.has("KeyS") || held.has("ArrowDown")) iz -= 1;
	const mag = Math.hypot(ix, iz);
	if (mag > 1) {
		ix /= mag;
		iz /= mag;
	}
	sim.sprinting = (held.has("ShiftLeft") || held.has("ShiftRight") || sim.padSprint || sim.touchSprint) && mag > .08;
	const fx = -Math.sin(sim.camYaw);
	const fz = -Math.cos(sim.camYaw);
	const rx = Math.cos(sim.camYaw);
	const rz = -Math.sin(sim.camYaw);
	let wnx = 0;
	let wnz = 0;
	const wish = Math.min(1, mag);
	if (wish > .01) {
		const wx = fx * iz + rx * ix;
		const wz = fz * iz + rz * ix;
		const wl = Math.hypot(wx, wz) || 1;
		wnx = wx / wl;
		wnz = wz / wl;
		const target = Math.atan2(-wnx, -wnz);
		const delta = Math.atan2(Math.sin(target - sim.yaw), Math.cos(target - sim.yaw));
		sim.yaw += delta * Math.min(1, 12 * dt);
	}
	const max = sim.sprinting ? 6.6 : 4.25;
	const tvx = wnx * max * wish;
	const tvz = wnz * max * wish;
	const rate = sim.grounded ? 16 : 3.2;
	const blend = 1 - Math.exp(-rate * dt);
	sim.vx += (tvx - sim.vx) * blend;
	sim.vz += (tvz - sim.vz) * blend;
	if (sim.jumpEdge && sim.grounded) {
		sim.vy = 5.45;
		sim.grounded = false;
		sfx.jump();
	}
	sim.jumpEdge = false;
	sim.vy += -18 * dt;
	sim.y += sim.vy * dt;
	if (sim.y <= 0) {
		sim.y = 0;
		sim.vy = 0;
		sim.grounded = true;
	}
	sim.x += sim.vx * dt;
	sim.z += sim.vz * dt;
	const resolved = resolveCircle(sim.x, sim.z, .34);
	sim.x = resolved.x;
	sim.z = resolved.z;
	sim.speed = Math.hypot(sim.vx, sim.vz);
	if (sim.grounded && sim.speed > .8 && sim.time > sim.nextFoot) {
		sim.nextFoot = sim.time + (sim.sprinting ? .28 : .42);
		sfx.foot();
	}
	if (sim.interactEdge) {
		sim.interactEdge = false;
		tryInteract();
	}
	sim.pushing = false;
	tickCells(dt);
	for (const crate of sim.crates) {
		crate.force = Math.max(0, crate.force - dt * 90);
		crate.blocked = false;
		if (crate.docked) {
			crate.x = DOCK.x;
			crate.z = DOCK.z;
			crate.vx = 0;
			crate.vz = 0;
			crate.speed = 0;
			continue;
		}
		const surf = surfaceAt(crate.x, crate.z);
		crate.mu = surf.mu;
		crate.muS = surf.muS;
		crate.surface = surf.name;
		const closestX = Math.max(crate.x - crate.hx, Math.min(sim.x, crate.x + crate.hx));
		const closestZ = Math.max(crate.z - crate.hz, Math.min(sim.z, crate.z + crate.hz));
		let dx = sim.x - closestX;
		let dz = sim.z - closestZ;
		let d = Math.hypot(dx, dz);
		const radius = .36;
		if (d < radius) {
			if (d < 1e-4) {
				dx = sim.x - crate.x || 1;
				dz = sim.z - crate.z;
				d = Math.hypot(dx, dz) || 1;
			}
			const nx = dx / d;
			const nz = dz / d;
			const into = -(sim.vx * nx + sim.vz * nz);
			const pushF = sim.sprinting ? 340 : 180;
			const blocked = Math.hypot(crate.vx, crate.vz) < .12 && into > .2 && pushF < surf.muS * crate.mass * 9.81;
			const pen = radius - d;
			if (blocked || into <= .12) {
				sim.x += nx * pen;
				sim.z += nz * pen;
			} else {
				const wa = 1 / 80;
				const wb = 1 / crate.mass;
				const share = wa + wb;
				sim.x += nx * pen * (wa / share);
				sim.z += nz * pen * (wa / share);
				crate.x -= nx * pen * (wb / share);
				crate.z -= nz * pen * (wb / share);
			}
			if (into > .2) {
				crate.dirX = -nx;
				crate.dirZ = -nz;
				crate.force = pushF;
				if (blocked) {
					crate.blocked = true;
					if (!crate.wasBlocked) sim.blocked += 1;
					const vin = -(sim.vx * nx + sim.vz * nz);
					if (vin > 0) {
						sim.vx += nx * vin;
						sim.vz += nz * vin;
					}
					if (crate.kind === "heavy" && !sim.sawHeavy) {
						sim.sawHeavy = true;
						say("NEWTON", "A bateria não se move. Abra o scanner e compare a sua força com o atrito estático.", 5.5);
					}
				} else {
					const scale = Math.min(1, into / 2.2);
					crate.vx -= nx * (pushF / crate.mass) * scale * dt;
					crate.vz -= nz * (pushF / crate.mass) * scale * dt;
					sim.vx += nx * (pushF / 80) * .55 * scale * dt;
					sim.vz += nz * (pushF / 80) * .55 * scale * dt;
					sim.pushing = true;
					if (!crate.wasPush) {
						sim.pushes += 1;
						puff(crate.x, crate.z);
						sfx.shove();
					}
				}
			}
		}
		crate.wasBlocked = crate.blocked;
		crate.wasPush = crate.force > 40 && !crate.blocked;
		const v0 = Math.hypot(crate.vx, crate.vz);
		const drop = Math.min(surf.mu * G * dt, v0);
		if (v0 > .001 && drop > 0) {
			crate.vx -= crate.vx / v0 * drop;
			crate.vz -= crate.vz / v0 * drop;
		}
		if (Math.hypot(crate.vx, crate.vz) < .06 && crate.force < 30) {
			crate.vx = 0;
			crate.vz = 0;
		}
		const sp = Math.hypot(crate.vx, crate.vz);
		if (sp > 6) {
			crate.vx = crate.vx / sp * 6;
			crate.vz = crate.vz / sp * 6;
		}
		crate.x += crate.vx * dt;
		crate.z += crate.vz * dt;
		crate.speed = Math.hypot(crate.vx, crate.vz);
		if (crate.kind === "module") {
			const dx = DOCK.x - crate.x;
			const dz = DOCK.z - crate.z;
			const dd = Math.hypot(dx, dz);
			if (dd < 1.75 && dd > .001) {
				const pull = 2.4 * (1.75 - dd);
				crate.vx += dx / dd * pull * dt;
				crate.vz += dz / dd * pull * dt;
				crate.vx *= 1 - Math.min(.5, 1.6 * dt);
				crate.vz *= 1 - Math.min(.5, 1.6 * dt);
			}
			if (dd < .62 && crate.speed < .9) solve(crate);
		} else if (!sim.sawWrong && crate.speed < .4) {
			if (Math.hypot(DOCK.x - crate.x, DOCK.z - crate.z) < .85) {
				sim.sawWrong = true;
				say("NEWTON", "A plataforma só trava o módulo de navegação. Massa certa, corpo certo.", 4.2);
			}
		}
	}
	const settled = resolveCircle(sim.x, sim.z, .34);
	sim.x = settled.x;
	sim.z = settled.z;
	sim.speed = Math.hypot(sim.vx, sim.vz);
	for (const crate of sim.crates) {
		if (crate.docked) continue;
		for (const block of BLOCKS) resolveCrateBlock(crate, block);
	}
	for (let i = 0; i < sim.crates.length; i++) for (let j = i + 1; j < sim.crates.length; j++) {
		const a = sim.crates[i];
		const b = sim.crates[j];
		if (!a || !b || a.docked || b.docked) continue;
		const overlapX = a.hx + b.hx - Math.abs(b.x - a.x);
		const overlapZ = a.hz + b.hz - Math.abs(b.z - a.z);
		if (overlapX <= 0 || overlapZ <= 0) continue;
		const wa = 1 / a.mass;
		const wb = 1 / b.mass;
		if (overlapX < overlapZ) {
			const sign = b.x >= a.x ? 1 : -1;
			a.x -= sign * overlapX * (wa / (wa + wb));
			b.x += sign * overlapX * (wb / (wa + wb));
		} else {
			const sign = b.z >= a.z ? 1 : -1;
			a.z -= sign * overlapZ * (wa / (wa + wb));
			b.z += sign * overlapZ * (wb / (wa + wb));
		}
	}
	for (const crate of sim.crates) {
		if (crate.docked || crate.speed < 3.5 || sim.time < sim.nextHit) continue;
		const closestX = Math.max(crate.x - crate.hx, Math.min(sim.x, crate.x + crate.hx));
		const closestZ = Math.max(crate.z - crate.hz, Math.min(sim.z, crate.z + crate.hz));
		if (Math.hypot(sim.x - closestX, sim.z - closestZ) < .42) {
			sim.integrity = Math.max(0, sim.integrity - Math.min(22, crate.speed * 3));
			sim.nextHit = sim.time + .9;
			sim.shake = .16;
			sfx.hit();
			if (sim.integrity <= 0) {
				sim.integrity = 58;
				say("NEWTON", "Impacto no traje. Saia da linha do movimento — inércia não desvia sozinha.", 4);
			}
		}
	}
	if (!sim.sawHall && sim.z < -1.6) {
		sim.sawHall = true;
		say("NEWTON", "Três pistas à frente: gelo, metal e borracha. A força que você aplica é a mesma. A aceleração, não.", 6);
	}
	if (!sim.sawBay && sim.z < -10.2) {
		sim.sawBay = true;
		sim.objective = sim.solved ? sim.objective : "Acople o módulo de 20 kg na plataforma azul";
		say("NEWTON", "Empurre o módulo de 20 kg até a plataforma. Quando soltar, ele continua — até o atrito agir.", 6.2);
	}
	if (sim.animLock) sim.anim = sim.animLock;
	else if (!sim.grounded) sim.anim = "jump";
	else if (sim.pushing) sim.anim = "push";
	else if (sim.scanner && sim.speed < .35) sim.anim = "scan";
	else if (sim.speed > 5.1) sim.anim = "run";
	else if (sim.speed > .28) sim.anim = "walk";
	else sim.anim = "idle";
	uiAcc += dt;
	const prompt = computePrompt();
	if (sim.line && sim.time >= sim.line.until) {
		sim.line = null;
		publishNow();
		uiAcc = 0;
	} else if (uiAcc > .2 || prompt !== lastPrompt) {
		uiAcc = 0;
		publishNow();
	}
}
function installProbe() {
	window.__controlsTest = {
		getYaw: () => sim.yaw,
		getSpeed: () => Math.hypot(sim.vx, sim.vz),
		setKeys: (codes) => {
			held.clear();
			for (const code of codes) held.add(code);
		},
		advanceTitle: (t) => {
			sim.shotTime = t;
		}
	};
}
function clock(seconds) {
	const s = Math.max(0, Math.floor(seconds));
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function n(value, digits = 1) {
	return value.toFixed(digits);
}
function Overlay() {
	const snap = (0, import_react.useSyncExternalStore)(subscribe, getSnap, getSnap);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hud",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette" }),
			snap.scanner && snap.phase === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scanner-tint" }) : null,
			snap.phase === "play" && !snap.solved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bearing, {}) : null,
			snap.phase === "title" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { best: snap.best }) : null,
			snap.phase === "play" || snap.phase === "cinema" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayHud, { snap }) : null,
			snap.mapOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPanel, {}) : null,
			snap.paused && !snap.mapOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PausePanel, {}) : null,
			snap.phase === "complete" && snap.result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Complete, { result: snap.result }) : null,
			snap.phase === "play" && !snap.paused && !snap.mapOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Touch, {}) : null
		]
	});
}
function Title({ best }) {
	const beat = useBeat();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel title-card",
		"data-ui": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Programa Orbital · Cadete Tigrão"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "beat",
				children: [
					"Newton-1 em órbita. Alerta no sistema de navegação.",
					"Falha no sistema de navegação. O módulo N-1 está solto no laboratório.",
					"Cadete Tigrão — a força pode ser a mesma. A aceleração, não."
				][beat]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["MISSÃO NEWTON", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RESGATE DA ESTAÇÃO ORBITAL" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sub",
				children: "Missão 01 — Fundamentos e Inércia. A física se aprende empurrando."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn",
					type: "button",
					onClick: () => startMission(),
					children: "COMEÇAR"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chip",
					children: "Recorte jogável"
				})]
			}),
			best != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "best",
				children: ["Melhor tempo ", clock(best)]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hints",
				children: "WASD mover · mouse olhar · Shift correr · Espaço saltar · E interagir · Q scanner · Tab mapa · Esc pausa"
			})
		]
	});
}
function useBeat() {
	const [beat, setBeat] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const tick = () => {
			frame = requestAnimationFrame(tick);
			const next = shotIndex(sim.shotTime);
			setBeat((current) => current === next ? current : next);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, []);
	return beat;
}
function PlayHud({ snap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hud-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel obj",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Objetivo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: snap.objective })]
			}), snap.line ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel line",
				style: {
					position: "static",
					transform: "none",
					width: "auto"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: snap.line.speaker }),
					snap.line.speaker === "NEWTON" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "role",
						children: "IA de controle da estação"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "wave",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: snap.line.text })
				]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hud-right",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel meter",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Traje ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [Math.round(snap.integrity), "%"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${snap.integrity}%` } })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel meter",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Scanner ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [Math.round(snap.cell), "%"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `bar${snap.cell < 20 ? " amber" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${snap.cell}%` } })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: `tool${snap.scanner ? " on" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, {
							size: 14,
							style: {
								verticalAlign: "-2px",
								marginRight: 6
							}
						}),
						"Nexus ",
						snap.scanner ? "ativo" : "em espera",
						" · Q"
					]
				}),
				snap.readout ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadoutCard, { readout: snap.readout }) : null
			]
		}),
		snap.prompt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel prompt",
			children: snap.prompt
		}) : null
	] });
}
function ReadoutCard({ readout }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel readout",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "kicker",
				children: [
					readout.surface,
					" · μ ",
					n(readout.mu, 2),
					" · μs ",
					n(readout.muS, 2)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: readout.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "eq",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "F" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [n(readout.force, 0), " N"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "m" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [n(readout.mass, 0), " kg"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [n(readout.accel, 2), " m/s²"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "v" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [n(readout.speed, 2), " m/s"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "μ" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n(readout.mu, 2) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "μs" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n(readout.muS, 2) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "fat" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [n(readout.friction, 0), " N"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "estático" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [n(readout.staticFriction, 0), " N"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "note",
				children: [
					"F força · v velocidade · a aceleração · f atrito.",
					" ",
					readout.blocked ? "Parado. A força não vence o atrito estático." : readout.speed > .08 ? "Em movimento. Sem força, o atrito é quem para." : "F = m · a"
				]
			})
		]
	});
}
function Bearing() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "compass",
		title: "Rumo do objetivo",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			ref,
			width: "18",
			height: "18",
			viewBox: "0 0 18 18",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 1.5 L14 15 L9 12 L4 15 Z",
				fill: "#e0a23a"
			})
		})
	});
}
function PausePanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal",
		"data-ui": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Pausa"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Estação em espera" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "sub",
					children: "WASD mover · mouse olhar · Shift correr · Espaço saltar · E interagir · Q scanner"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn",
							type: "button",
							onClick: () => togglePause(),
							children: "Retomar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn ghost",
							type: "button",
							onClick: () => restart(false),
							children: "Reiniciar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn ghost",
							type: "button",
							onClick: () => restart(true),
							children: "Título"
						})
					]
				})
			]
		})
	});
}
function Complete({ result }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal",
		"data-ui": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Missão 01"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Módulo acoplado" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stats",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tempo" }), clock(result.time)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Empurrões" }), result.pushes] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Varreduras" }), result.scans] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bloqueios" }), result.blocked] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "log",
					children: "Registro — Primeira lei. Um corpo permanece em movimento uniforme até uma força, aqui o atrito, alterar esse estado. Massa maior, mesma força, menor aceleração."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						type: "button",
						onClick: () => continueLab(),
						children: "Continuar no laboratório"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn ghost",
						type: "button",
						onClick: () => restart(false),
						children: "Repetir"
					})]
				})
			]
		})
	});
}
function MapPanel() {
	const x = (sim.x + 9.4) / 18.8 * 100;
	const y = (11.6 - sim.z) / 42.4 * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal",
		"data-ui": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel sheet map-sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Navegação · Newton-1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Mapa da missão" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "map-layout",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "schematic",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "room goal",
								style: {
									left: "28%",
									right: "28%",
									top: "6%",
									height: "22%"
								},
								children: "Plataforma"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "room",
								style: {
									left: "18%",
									right: "18%",
									top: "32%",
									height: "28%"
								},
								children: "Inércia"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "room",
								style: {
									left: "40%",
									right: "40%",
									top: "60%",
									height: "12%"
								},
								children: "Corredor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "room",
								style: {
									left: "22%",
									right: "22%",
									top: "74%",
									height: "18%"
								},
								children: "Treino"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								className: "dot",
								style: {
									left: `${x}%`,
									top: `${y}%`
								}
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: "Setores"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "locked",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "01 Inércia" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "ATIVA" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "02 Propulsão" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "BLOQUEADA" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "06 Energia" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "BLOQUEADA" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "09 Hangar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "BLOQUEADA" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "10 Núcleo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "BLOQUEADA" })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "row",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn",
								type: "button",
								onClick: () => toggleMap(),
								children: "Fechar"
							})
						})
					] })]
				})
			]
		})
	});
}
function Touch() {
	const knob = (0, import_react.useRef)(null);
	const origin = (0, import_react.useRef)(null);
	const move = (clientX, clientY) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "touch-controls",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "stick",
			"data-ui": true,
			onPointerDown: (event) => {
				event.currentTarget.setPointerCapture(event.pointerId);
				origin.current = {
					x: event.clientX,
					y: event.clientY
				};
				move(event.clientX, event.clientY);
			},
			onPointerMove: (event) => {
				if (origin.current) move(event.clientX, event.clientY);
			},
			onPointerUp: () => {
				origin.current = null;
				if (knob.current) knob.current.style.transform = "translate(0px, 0px)";
				setStick(0, 0);
				setTouchSprint(false);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stick-knob",
				ref: knob
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "touch-actions",
			"data-ui": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onPointerDown: () => setTouchSprint(true),
					onPointerUp: () => setTouchSprint(false),
					onPointerLeave: () => setTouchSprint(false),
					children: "Correr"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onPointerDown: () => queueJump(),
					children: "Pular"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onPointerDown: () => queueInteract(),
					children: "Agir"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onPointerDown: () => queueScan(),
					children: "Scan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "wide",
					type: "button",
					onPointerDown: () => toggleMap(),
					children: "Mapa"
				})
			]
		})]
	});
}
function canvas(w, h) {
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	const g = c.getContext("2d");
	if (!g) throw new Error("canvas");
	return [c, g];
}
function texOf(c, repeat = false) {
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 8;
	if (repeat) {
		tex.wrapS = RepeatWrapping;
		tex.wrapT = RepeatWrapping;
	}
	return tex;
}
function earthTexture() {
	const [c, g] = canvas(1024, 512);
	const ocean = g.createLinearGradient(0, 0, 0, 512);
	ocean.addColorStop(0, "#1c4f8a");
	ocean.addColorStop(.45, "#0f315c");
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
	g.ellipse(430, 210, 50, 22, .4, 0, Math.PI * 2);
	g.fill();
	g.fillStyle = "rgba(255,255,255,0.16)";
	for (let i = 0; i < 14; i++) {
		g.beginPath();
		g.ellipse(80 + i * 137 % 900, 70 + i * 61 % 360, 70 + i % 4 * 18, 16 + i % 3 * 6, i * .3, 0, Math.PI * 2);
		g.fill();
	}
	const night = g.createLinearGradient(760, 0, 1024, 0);
	night.addColorStop(0, "rgba(0,0,0,0)");
	night.addColorStop(1, "rgba(0,8,18,0.5)");
	g.fillStyle = night;
	g.fillRect(760, 0, 264, 512);
	return texOf(c);
}
function cloudTexture() {
	const [c, g] = canvas(1024, 512);
	g.clearRect(0, 0, 1024, 512);
	for (let i = 0; i < 22; i++) {
		g.fillStyle = `rgba(255,255,255,${.25 + i % 5 * .08})`;
		g.beginPath();
		g.ellipse(i * 97 % 1e3, 40 + i * 53 % 420, 90 + i % 6 * 16, 18 + i % 4 * 5, i * .2, 0, Math.PI * 2);
		g.fill();
	}
	return texOf(c);
}
function starTexture() {
	const [c, g] = canvas(256, 256);
	g.fillStyle = "#070d16";
	g.fillRect(0, 0, 256, 256);
	for (let i = 0; i < 80; i++) {
		g.fillStyle = i % 7 === 0 ? "#e0a23a" : "#d5e4ef";
		g.globalAlpha = .4 + i % 5 * .12;
		g.fillRect(i * 47 % 256, i * 91 % 256, i % 9 === 0 ? 2 : 1, i % 9 === 0 ? 2 : 1);
	}
	g.globalAlpha = 1;
	return texOf(c);
}
function panelTexture() {
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
	for (let y = 0; y < 256; y += 64) for (let x = 0; x < 256; x += 64) g.strokeRect(x + 8, y + 8, 48, 48);
	const tex = texOf(c, true);
	tex.repeat.set(4, 4);
	return tex;
}
function paintScreen(ctx, w, h, title, formula, time) {
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
		const y = h * .62 + Math.sin(u * 8 + time * 1.6) * 36 + Math.sin(u * 3 + time) * 12;
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
function badgeTexture() {
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
function plateTexture(label) {
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
function flagTexture() {
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
var labels = /* @__PURE__ */ new Map();
function labelSprite(text, color) {
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
	const h = .16;
	const value = {
		tex,
		w: h * (c.width / c.height),
		h
	};
	labels.set(key, value);
	return value;
}
function Solid({ position, args, material, cast, receive, rotation }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		position,
		rotation,
		material,
		castShadow: cast,
		receiveShadow: receive,
		dispose: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args })
	});
}
function HoloLabel({ text, position, color = "#c5e7f4" }) {
	const sprite = (0, import_react.useMemo)(() => labelSprite(text, color), [text, color]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sprite", {
		position,
		scale: [
			sprite.w,
			sprite.h,
			1
		],
		renderOrder: 2,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("spriteMaterial", {
			map: sprite.tex,
			transparent: true,
			depthWrite: false,
			toneMapped: false
		})
	});
}
var desired = new Vector3();
var look = new Vector3();
var smooth = new Vector3(8, 205, 12);
var smoothLook = new Vector3(0, 201, 0);
var head = new Vector3();
var origin = new Vector3();
var dir = new Vector3();
function blocked(x, z) {
	const r = .22;
	for (const block of BLOCKS) if (x > block.minX - r && x < block.maxX + r && z > block.minZ - r && z < block.maxZ + r) return true;
	return false;
}
function Simulator() {
	(0, import_react.useEffect)(() => installProbe(), []);
	useFrame((_, raw) => {
		const dt = Math.min(raw, .05);
		let acc = dt;
		let guard = 0;
		while (acc > 0 && guard < 3) {
			const h = Math.min(acc, 1 / 60);
			step(h);
			acc -= h;
			guard += 1;
		}
		pump(sim.phase);
		M.alarm.emissiveIntensity = sim.phase === "title" ? .35 + (Math.sin(sim.time * 6) * .5 + .5) * 1.3 : .2;
		for (const puff of sim.puffs) if (puff.life > 0) puff.life -= dt * 1.4;
	});
	return null;
}
function StudioEnv() {
	const gl = useThree((s) => s.gl);
	const scene = useThree((s) => s.scene);
	(0, import_react.useEffect)(() => {
		const pmrem = new PMREMGenerator(gl);
		const envScene = new RoomEnvironment();
		const tex = pmrem.fromScene(envScene, .04).texture;
		scene.environment = tex;
		scene.environmentIntensity = .42;
		return () => {
			tex.dispose();
			pmrem.dispose();
		};
	}, [gl, scene]);
	return null;
}
function FogTune() {
	const scene = useThree((s) => s.scene);
	useFrame(() => {
		const fog = scene.fog;
		if (!(fog instanceof Fog)) return;
		const ext = sim.phase === "title" && shotIndex(sim.shotTime) === 0;
		fog.near = ext ? 18 : 9;
		fog.far = ext ? 80 : 40;
	});
	return null;
}
function Sun() {
	const light = (0, import_react.useRef)(null);
	const scene = useThree((s) => s.scene);
	(0, import_react.useEffect)(() => {
		const l = light.current;
		if (!l) return;
		scene.add(l.target);
		return () => {
			scene.remove(l.target);
		};
	}, [scene]);
	useFrame(() => {
		const l = light.current;
		if (!l) return;
		const ext = sim.phase === "title" && shotIndex(sim.shotTime) === 0;
		const x = ext ? 0 : sim.x;
		const y = ext ? 200 : 0;
		const z = ext ? 0 : sim.z;
		l.position.set(x + 8, y + 16, z + 6);
		l.target.position.set(x, y + 1, z);
		l.target.updateMatrixWorld();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
		ref: light,
		castShadow: true,
		intensity: 2.55,
		color: "#f4f7fb",
		"shadow-mapSize-width": 1024,
		"shadow-mapSize-height": 1024,
		"shadow-bias": -35e-5,
		"shadow-normalBias": .04,
		"shadow-camera-near": .5,
		"shadow-camera-far": 34,
		"shadow-camera-left": -8,
		"shadow-camera-right": 8,
		"shadow-camera-top": 8,
		"shadow-camera-bottom": -8
	});
}
function Lights() {
	const dock = (0, import_react.useRef)(null);
	useFrame(() => {
		if (dock.current) dock.current.intensity = sim.solved ? 7 : 2.4 + Math.sin(sim.time * 3) * .5;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#d5e4ef",
			"#241c18",
			.46
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .1 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-8,
				6,
				-6
			],
			intensity: .42,
			color: "#7eb8cc"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				2.5,
				5
			],
			color: "#e7eef6",
			distance: 12,
			decay: 2,
			intensity: 1.35
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			ref: dock,
			position: [
				DOCK.x,
				2.4,
				DOCK.z
			],
			color: "#7eb8cc",
			distance: 9,
			decay: 2,
			intensity: 2.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				2.5,
				7.2
			],
			color: "#e0a23a",
			distance: 7,
			decay: 2,
			intensity: .55
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				2.6,
				-18
			],
			color: "#9fd0e4",
			distance: 14,
			decay: 2,
			intensity: .85
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-5.2,
				2.2,
				5
			],
			color: "#9fd4e6",
			distance: 6,
			decay: 2,
			intensity: .45
		})
	] });
}
function scripted(dt, camera) {
	if (sim.phase === "title") {
		const shot = shotIndex(sim.shotTime);
		if (shot === 0) {
			const a = sim.shotTime * .13;
			desired.set(Math.sin(a) * 13.5, 204.2, Math.cos(a) * 13.5);
			look.set(.6, 201.1, 0);
		} else if (shot === 1) {
			const u = sim.shotTime % 21 - 8;
			desired.set(5.4 - u * .08, 2.35, 10.2);
			look.set(.2, 1.25, 3.2);
		} else {
			const u = Math.min(1, (sim.shotTime % 21 - 14) / 6);
			desired.set(.12, 1.58, 5.85 + u * .42);
			look.set(0, 1.55, 7.15);
		}
		return true;
	}
	if (sim.phase === "cinema") {
		const a = .4 + sim.cinemaT * .32;
		desired.set(DOCK.x + Math.sin(a) * 6.4, 2.35 + sim.cinemaT * .12, DOCK.z + Math.cos(a) * 6.4);
		look.set(DOCK.x, 1.15, DOCK.z);
		return true;
	}
	if (sim.phase === "complete") {
		desired.set(sim.x + 2.4, 2.5, sim.z + 4.6);
		look.set(sim.x, 1.3, sim.z);
		return true;
	}
	return false;
}
function CameraRig() {
	const camera = useThree((s) => s.camera);
	useFrame((_, dt) => {
		const capped = Math.min(dt, .05);
		if (!scripted(capped, camera)) {
			const pushing = sim.pushing;
			const scanning = sim.scanner && sim.speed < .45;
			const dist = pushing ? 4.75 : scanning ? 4.65 : sim.sprinting && sim.speed > 4 ? 6.05 : 5.55;
			const pitch = sim.camPitch;
			const yaw = sim.camYaw;
			const horiz = Math.cos(pitch) * dist;
			desired.set(sim.x + Math.sin(yaw) * horiz, sim.y + 1.02 + Math.sin(pitch) * dist * .62, sim.z + Math.cos(yaw) * horiz);
			head.set(sim.x, sim.y + 1.45, sim.z);
			let sx = head.x;
			let sy = head.y;
			let sz = head.z;
			for (let i = 1; i <= 10; i++) {
				const t = i / 10;
				const x = head.x + (desired.x - head.x) * t;
				const y = head.y + (desired.y - head.y) * t;
				const z = head.z + (desired.z - head.z) * t;
				if (y > 2.65 || blocked(x, z)) break;
				sx = x;
				sy = y;
				sz = z;
			}
			desired.set(sx, Math.max(.45, sy), sz);
			look.set(sim.x + sim.vx * .16, sim.y + 1.22, sim.z + sim.vz * .16);
			if (sim.scanner) {
				let best = null;
				let bestD = 6.5;
				for (const crate of sim.crates) {
					const d = Math.hypot(crate.x - sim.x, crate.z - sim.z);
					if (d < bestD) {
						bestD = d;
						best = crate;
					}
				}
				if (best) {
					look.x += (best.x - look.x) * .18;
					look.y += (best.h * .55 - look.y) * .08;
					look.z += (best.z - look.z) * .18;
				}
			}
		}
		const jump = smooth.distanceTo(desired) > 24;
		const k = sim.reduce || jump ? 1 : 1 - Math.exp(-5.4 * capped);
		smooth.lerp(desired, k);
		smoothLook.lerp(look, k);
		camera.position.copy(smooth);
		if (!sim.reduce && sim.shake > .001) {
			camera.position.x += (Math.random() - .5) * sim.shake;
			camera.position.y += (Math.random() - .5) * sim.shake * .5;
			sim.shake *= Math.exp(-2.8 * capped);
		}
		camera.lookAt(smoothLook);
		const fov = sim.sprinting && sim.speed > 4.2 && sim.phase === "play" ? 50 : 46;
		if (Math.abs(camera.fov - fov) > .05) {
			camera.fov += (fov - camera.fov) * (1 - Math.exp(-5 * capped));
			camera.updateProjectionMatrix();
		}
	});
	return null;
}
function CrateBody({ kind, hx, hz, h }) {
	if (kind === "module") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			material: M.suit,
			castShadow: true,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				hx * 2,
				h,
				hz * 2
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				.02,
				hz + .02
			],
			material: M.suitBlue,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				hx * 1.5,
				h * .28,
				.04
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				h * .2,
				hz + .05
			],
			material: M.gold,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.055,
				10,
				8
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				h * .55,
				0
			],
			material: M.hull,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.04,
				.04,
				.16,
				8
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				h * .55 + .1,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: M.suitBlue,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.09,
				.015,
				6,
				12
			] })
		})
	] });
	if (kind === "heavy") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			material: M.dark,
			castShadow: true,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				hx * 2,
				h,
				hz * 2
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				.05,
				hz + .01
			],
			material: M.stripe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				hx * 1.7,
				.08,
				.04
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				-.16,
				hz + .01
			],
			material: M.stripe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				hx * 1.7,
				.08,
				.04
			] })
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		material: M.hull,
		castShadow: true,
		dispose: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			hx * 2,
			h,
			hz * 2
		] })
	});
}
function CrateView({ index }) {
	const ref = (0, import_react.useRef)(null);
	const spec = CRATE_SPECS[index];
	useFrame(() => {
		const crate = sim.crates[index];
		if (!crate || !ref.current || !spec) return;
		ref.current.position.set(crate.x, spec.h / 2 + .04, crate.z);
	});
	if (!spec) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrateBody, {
			kind: spec.kind,
			hx: spec.hx,
			hz: spec.hz,
			h: spec.h
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: `${spec.name}  ${spec.mass} kg`,
			position: [
				0,
				spec.h / 2 + .28,
				0
			]
		})]
	});
}
function Crates() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: CRATE_SPECS.map((spec, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrateView, { index }, spec.id)) });
}
function Vectors() {
	const pack = (0, import_react.useMemo)(() => {
		const group = new Group();
		const arrows = [];
		for (let i = 0; i < 16; i++) {
			const arrow = new ArrowHelper(new Vector3(0, 1, 0), new Vector3(), .4, 16777215, .16, .08);
			arrow.visible = false;
			group.add(arrow);
			arrows.push(arrow);
		}
		const tags = [
			"F",
			"v",
			"a",
			"f",
			"P",
			"N"
		].map((text, i) => {
			const { tex } = labelSprite(text, [
				"#f4f7fb",
				"#7eb8cc",
				"#c7c3ef",
				"#e0a23a",
				"#8aa0b5",
				"#d5e4ef"
			][i] ?? "#fff");
			const sprite = new Sprite(new SpriteMaterial({
				map: tex,
				transparent: true,
				depthWrite: false
			}));
			sprite.visible = false;
			sprite.scale.set(.42, .16, 1);
			group.add(sprite);
			return sprite;
		});
		const ring = new Mesh(new RingGeometry(.45, .52, 28), new MeshBasicMaterial({
			color: "#7eb8cc",
			transparent: true,
			opacity: .55,
			side: 2,
			depthWrite: false
		}));
		ring.rotation.x = -Math.PI / 2;
		ring.visible = false;
		group.add(ring);
		return {
			group,
			arrows,
			tags,
			ring
		};
	}, []);
	useFrame(() => {
		let n = 0;
		const show = (x, y, z, dx, dy, dz, len, color, label) => {
			const arrow = pack.arrows[n];
			if (!arrow || len < .12) return;
			n += 1;
			origin.set(x, y, z);
			dir.set(dx, dy, dz);
			if (dir.lengthSq() < 1e-6) return;
			dir.normalize();
			arrow.visible = true;
			arrow.position.copy(origin);
			arrow.setColor(color);
			arrow.setDirection(dir);
			const L = Math.min(len, 2.2);
			arrow.setLength(L, Math.min(.2, L * .32), Math.min(.1, L * .16));
			if (label != null && pack.tags[label]) {
				const sprite = pack.tags[label];
				sprite.visible = true;
				sprite.position.set(x + dir.x * (L + .18), y + dir.y * (L + .18) + .08, z + dir.z * (L + .18));
			}
		};
		pack.arrows.forEach((arrow) => {
			arrow.visible = false;
		});
		pack.tags.forEach((sprite) => {
			sprite.visible = false;
		});
		pack.ring.visible = false;
		if (!sim.scanner || sim.phase === "title") return;
		let focus = -1;
		let focusD = 6.5;
		sim.crates.forEach((crate, index) => {
			const d = Math.hypot(crate.x - sim.x, crate.z - sim.z);
			if (d < focusD) {
				focusD = d;
				focus = index;
			}
		});
		sim.crates.forEach((crate, index) => {
			const y = crate.h + .2;
			const accel = crate.blocked || crate.force < 1 ? crate.speed > .08 ? -crate.mu * G / 4 : 0 : (crate.force - crate.mu * crate.mass * G) / crate.mass;
			if (crate.speed > .15) {
				show(crate.x, y, crate.z, crate.vx, 0, crate.vz, crate.speed * .55, 8304844, index === focus ? 1 : void 0);
				const f = crate.mu * crate.mass * G / 150;
				show(crate.x, y + .02, crate.z, -crate.vx, 0, -crate.vz, f, 14721594, index === focus ? 3 : void 0);
			} else if (crate.blocked && crate.force > 10) show(crate.x, y, crate.z, -crate.dirX, 0, -crate.dirZ, crate.muS * crate.mass * G / 160, 14721594, index === focus ? 3 : void 0);
			if (crate.force > 20) show(crate.x, y + .05, crate.z, crate.dirX, 0, crate.dirZ, crate.force / 170, 16054267, index === focus ? 0 : void 0);
			if (Math.abs(accel) > .15 && crate.speed > .05) {
				const sign = accel >= 0 ? 1 : -1;
				const ax = crate.speed > .12 ? crate.vx * sign : crate.dirX;
				const az = crate.speed > .12 ? crate.vz * sign : crate.dirZ;
				show(crate.x, y + .12, crate.z, ax, 0, az, Math.min(1.4, Math.abs(accel) * .18), 13091823, index === focus ? 2 : void 0);
			}
			if (index === focus) {
				show(crate.x + crate.hx + .15, crate.h * .7, crate.z, 0, -1, 0, .55, 9085109, 4);
				show(crate.x + crate.hx + .15, .15, crate.z, 0, 1, 0, .55, 14017775, 5);
				pack.ring.visible = true;
				pack.ring.position.set(crate.x, .05, crate.z);
				const pulse = 1 + Math.sin(sim.time * 4) * .06;
				pack.ring.scale.set(Math.max(crate.hx, crate.hz) * 2.4 * pulse, Math.max(crate.hx, crate.hz) * 2.4 * pulse, 1);
			}
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: pack.group });
}
function Puffs() {
	const refs = (0, import_react.useRef)([]);
	useFrame((_, dt) => {
		if (sim.phase === "play") for (const crate of sim.crates) {
			if (crate.speed < 1.4) continue;
			if (Math.random() > dt * 5) continue;
			const slot = sim.puffs.find((item) => item.life <= 0);
			if (!slot) break;
			slot.x = crate.x;
			slot.z = crate.z;
			slot.life = .55;
		}
		sim.puffs.forEach((puff, i) => {
			const mesh = refs.current[i];
			if (!mesh) return;
			mesh.visible = puff.life > 0;
			if (puff.life <= 0) return;
			mesh.position.set(puff.x, .06, puff.z);
			const s = .4 + (1 - puff.life) * 1.3;
			mesh.scale.setScalar(s);
			const mat = mesh.material;
			mat.opacity = Math.max(0, puff.life) * .7;
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: sim.puffs.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref: (el) => {
			refs.current[i] = el;
		},
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		visible: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
			.2,
			.28,
			18
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: "#d5e4ef",
			transparent: true,
			opacity: 0,
			depthWrite: false
		})]
	}, i)) });
}
function approach(current, target, dt, rate = 11) {
	return current + (target - current) * (1 - Math.exp(-rate * dt));
}
function setX(group, target, dt, rate = 11) {
	if (!group) return;
	group.rotation.x = approach(group.rotation.x, target, dt, rate);
}
function setY(group, target, dt, rate = 11) {
	if (!group) return;
	group.rotation.y = approach(group.rotation.y, target, dt, rate);
}
function setZ(group, target, dt, rate = 11) {
	if (!group) return;
	group.rotation.z = approach(group.rotation.z, target, dt, rate);
}
function Tigrao() {
	const root = (0, import_react.useRef)(null);
	const hips = (0, import_react.useRef)(null);
	const torso = (0, import_react.useRef)(null);
	const head = (0, import_react.useRef)(null);
	const armL = (0, import_react.useRef)(null);
	const armR = (0, import_react.useRef)(null);
	const legL = (0, import_react.useRef)(null);
	const legR = (0, import_react.useRef)(null);
	const kneeL = (0, import_react.useRef)(null);
	const kneeR = (0, import_react.useRef)(null);
	const tail = (0, import_react.useRef)(null);
	const earL = (0, import_react.useRef)(null);
	const earR = (0, import_react.useRef)(null);
	const lidL = (0, import_react.useRef)(null);
	const lidR = (0, import_react.useRef)(null);
	const tongue = (0, import_react.useRef)(null);
	const wrist = (0, import_react.useRef)(null);
	const beam = (0, import_react.useRef)(null);
	const lamp = (0, import_react.useRef)(null);
	const wasAir = (0, import_react.useRef)(false);
	const land = (0, import_react.useRef)(0);
	const prevYaw = (0, import_react.useRef)(sim.yaw);
	const turn = (0, import_react.useRef)(0);
	const badge = (0, import_react.useMemo)(() => badgeTexture(), []);
	const flag = (0, import_react.useMemo)(() => flagTexture(), []);
	const nexus = (0, import_react.useMemo)(() => plateTexture("NEXUS"), []);
	useFrame((_, raw) => {
		const g = root.current;
		if (!g) return;
		const dt = Math.min(raw, .05);
		g.position.set(sim.x, sim.y, sim.z);
		g.rotation.y = sim.yaw;
		const t = sim.time;
		const run = sim.anim === "run";
		const moving = sim.anim === "walk" || run;
		const freq = run ? 11.4 : 7.1;
		const amp = moving ? run ? .72 : .52 : .035;
		const swing = Math.sin(t * freq) * amp;
		const breathe = Math.sin(t * 1.7);
		const yawDelta = Math.atan2(Math.sin(sim.yaw - prevYaw.current), Math.cos(sim.yaw - prevYaw.current));
		prevYaw.current = sim.yaw;
		turn.current = approach(turn.current, Math.max(-.28, Math.min(.28, -yawDelta * 8)), dt, 8);
		if (!sim.grounded) wasAir.current = true;
		else if (wasAir.current) {
			wasAir.current = false;
			land.current = .18;
			if (sim.phase === "play") sfx.land();
		}
		if (land.current > 0) land.current = Math.max(0, land.current - dt);
		let hipY = .8 + (moving ? Math.abs(Math.sin(t * freq)) * (run ? .045 : .028) : 0);
		if (land.current > 0) hipY -= land.current * .22;
		if (sim.anim === "celebrate") hipY = .8 + Math.abs(Math.sin(t * 8)) * .07;
		let torsoX = breathe * .018;
		const torsoZ = (moving ? Math.sin(t * freq) * .035 : 0) + turn.current;
		let lLeg = swing;
		let rLeg = -swing;
		let lArm = -swing * .75;
		let rArm = swing * .75;
		let lZ = .1;
		let rZ = -.1;
		let lKnee = Math.max(0, -swing) * .85;
		let rKnee = Math.max(0, swing) * .85;
		let headX = Math.sin(t * .45) * .04;
		let headY = Math.sin(t * .6) * .1;
		const headZ = moving ? -Math.sin(t * freq) * .035 : 0;
		let tailX = .62;
		let tailY = Math.sin(t * 2.4) * .28;
		if (sim.anim === "push") {
			torsoX = .48;
			lArm = -1.2;
			rArm = -1.2;
			lZ = .18;
			rZ = -.18;
			lLeg = -.28;
			rLeg = .42;
			lKnee = .35;
			rKnee = .15;
			headX = .22;
			headY = 0;
			tailX = .3;
		} else if (sim.anim === "scan" || sim.scanner && sim.speed < .4) {
			lArm = -1.25;
			lZ = .42;
			headX = .12;
			let bestX = sim.x;
			let bestZ = sim.z - 1;
			let bestD = 6.5;
			for (const crate of sim.crates) {
				const d = Math.hypot(crate.x - sim.x, crate.z - sim.z);
				if (d < bestD) {
					bestD = d;
					bestX = crate.x;
					bestZ = crate.z;
				}
			}
			const face = Math.atan2(-(bestX - sim.x), -(bestZ - sim.z));
			const rel = Math.atan2(Math.sin(face - sim.yaw), Math.cos(face - sim.yaw));
			headY = Math.max(-.7, Math.min(.7, rel));
		} else if (sim.anim === "jump") {
			const up = sim.vy > .2;
			lLeg = up ? -.5 : .32;
			rLeg = up ? -.38 : .4;
			lArm = -.85;
			rArm = -.7;
			lKnee = up ? .2 : .45;
			rKnee = up ? .15 : .4;
			torsoX = up ? -.08 : .12;
		} else if (sim.anim === "celebrate") {
			lArm = -2.4;
			rArm = -2.4;
			lZ = .28;
			rZ = -.28;
			headX = -.18;
			tailY = Math.sin(t * 9) * .7;
			tailX = .4;
		}
		if (hips.current) hips.current.position.y = approach(hips.current.position.y, hipY, dt, 10);
		setX(torso.current, torsoX, dt, sim.anim === "push" ? 8 : 6);
		setZ(torso.current, torsoZ, dt, 8);
		if (torso.current) torso.current.position.y = approach(torso.current.position.y, .28 + breathe * .01, dt, 6);
		setX(legL.current, lLeg, dt, 14);
		setX(legR.current, rLeg, dt, 14);
		setX(kneeL.current, lKnee, dt, 14);
		setX(kneeR.current, rKnee, dt, 14);
		setX(armL.current, lArm, dt, 12);
		setX(armR.current, rArm, dt, 12);
		setZ(armL.current, lZ, dt, 12);
		setZ(armR.current, rZ, dt, 12);
		setX(head.current, headX, dt, 8);
		setY(head.current, headY, dt, 8);
		setZ(head.current, headZ, dt, 8);
		if (earL.current) earL.current.rotation.z = approach(earL.current.rotation.z, 1.15 + Math.sin(t * 2.1) * .06, dt, 6);
		if (earR.current) earR.current.rotation.z = approach(earR.current.rotation.z, -1.15 - Math.sin(t * 2.1) * .06, dt, 6);
		setX(tail.current, tailX, dt, 6);
		setY(tail.current, tailY, dt, 8);
		const blink = Math.pow(Math.max(0, Math.sin(t * 1.2)), 48);
		if (lidL.current) lidL.current.scale.y = .35 + blink * 6;
		if (lidR.current) lidR.current.scale.y = .35 + blink * 6;
		if (tongue.current) {
			const out = sim.anim === "celebrate" ? 1.5 : .65 + Math.sin(t * 2) * .08;
			tongue.current.scale.y = approach(tongue.current.scale.y, out, dt, 8);
		}
		if (wrist.current) {
			const mat = wrist.current.material;
			if (!Array.isArray(mat)) mat.emissiveIntensity = sim.scanner ? 1.8 + Math.sin(t * 8) * .45 : .08;
		}
		if (beam.current) beam.current.visible = sim.scanner && sim.phase === "play";
		if (lamp.current) lamp.current.intensity = sim.scanner && sim.phase === "play" ? 1.8 : 0;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: root,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: hips,
			position: [
				0,
				.8,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					ref: tail,
					position: [
						0,
						.04,
						.18
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.02,
								.1
							],
							material: M.fur,
							dispose: null,
							castShadow: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.07,
								12,
								10
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.015,
								.05,
								.2
							],
							material: M.muzzle,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.055,
								10,
								8
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.02,
								.08,
								.3
							],
							material: M.fur,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.042,
								10,
								8
							] })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leg, {
					side: -1,
					leg: legL,
					knee: kneeL
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leg, {
					side: 1,
					leg: legR,
					knee: kneeR
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					ref: torso,
					position: [
						0,
						.28,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.12,
								0
							],
							material: M.suit,
							dispose: null,
							castShadow: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.46,
								.44,
								.28
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.3,
								0
							],
							material: M.suitDark,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.48,
								.1,
								.3
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								-.2,
								.22,
								0
							],
							material: M.suitBlue,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.12,
								.18,
								.26
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.2,
								.22,
								0
							],
							material: M.suitBlue,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.12,
								.18,
								.26
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.08,
								-.15
							],
							material: M.suitBlue,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.3,
								.22,
								.03
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.08,
								-.175
							],
							rotation: [
								0,
								Math.PI,
								0
							],
							dispose: null,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.28, .16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
								map: badge,
								toneMapped: false
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								-.12,
								0
							],
							material: M.hullDark,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.4,
								.07,
								.24
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								-.12,
								-.12,
								-.1
							],
							material: M.gold,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.07,
								.07,
								.05
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.12,
								-.12,
								-.1
							],
							material: M.gold,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.07,
								.07,
								.05
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.14,
								.22
							],
							material: M.suit,
							dispose: null,
							castShadow: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.3,
								.36,
								.14
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								-.08,
								.16,
								.3
							],
							rotation: [
								.1,
								0,
								0
							],
							material: M.hull,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.05,
								.05,
								.28,
								10
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.08,
								.16,
								.3
							],
							rotation: [
								.1,
								0,
								0
							],
							material: M.hull,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.05,
								.05,
								.28,
								10
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.02,
								.3
							],
							dispose: null,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.2, .06] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
								map: nexus,
								toneMapped: false
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.1,
								.34,
								.22
							],
							material: M.visorLight,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.028,
								8,
								8
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.28,
								.22,
								0
							],
							rotation: [
								0,
								Math.PI / 2,
								0
							],
							dispose: null,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.11, .07] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
								map: flag,
								toneMapped: false
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arm, {
							side: -1,
							arm: armL,
							wrist,
							beam,
							lamp
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arm, {
							side: 1,
							arm: armR
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							ref: head,
							position: [
								0,
								.52,
								-.04
							],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									material: M.fur,
									dispose: null,
									castShadow: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.19,
										22,
										18
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										0,
										-.02,
										-.14
									],
									scale: [
										.95,
										.62,
										1.15
									],
									material: M.muzzle,
									dispose: null,
									castShadow: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.12,
										16,
										12
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										0,
										-.01,
										-.28
									],
									material: M.nose,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.038,
										12,
										10
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										0,
										-.055,
										-.2
									],
									material: M.furDark,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.06,
										.012,
										.04
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									ref: tongue,
									position: [
										0,
										-.075,
										-.2
									],
									material: M.tongue,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.026,
										8,
										8
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
									x: -.07,
									lid: lidL
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
									x: .07,
									lid: lidR
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
									ref: earL,
									position: [
										-.16,
										.12,
										-.02
									],
									rotation: [
										.4,
										.2,
										1.15
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
										scale: [
											.45,
											1.35,
											.28
										],
										material: M.fur,
										dispose: null,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.11,
											12,
											10
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
										position: [
											.01,
											-.02,
											-.02
										],
										scale: [
											.28,
											.8,
											.16
										],
										material: M.furDark,
										dispose: null,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.11,
											10,
											8
										] })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
									ref: earR,
									position: [
										.16,
										.12,
										-.02
									],
									rotation: [
										.4,
										-.2,
										-1.15
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
										scale: [
											.45,
											1.35,
											.28
										],
										material: M.fur,
										dispose: null,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.11,
											12,
											10
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
										position: [
											-.01,
											-.02,
											-.02
										],
										scale: [
											.28,
											.8,
											.16
										],
										material: M.furDark,
										dispose: null,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.11,
											10,
											8
										] })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										0,
										.02,
										-.06
									],
									material: M.glass,
									dispose: null,
									renderOrder: 3,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.24,
										28,
										20
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									rotation: [
										Math.PI / 2,
										0,
										0
									],
									material: M.suit,
									dispose: null,
									castShadow: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
										.23,
										.038,
										10,
										24
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										-.22,
										.01,
										0
									],
									material: M.suit,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.07,
										.1,
										.09
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										.22,
										.01,
										0
									],
									material: M.suit,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.07,
										.1,
										.09
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										-.26,
										.02,
										-.02
									],
									material: M.emit,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.026,
										8,
										8
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										.26,
										.02,
										-.02
									],
									material: M.emit,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.026,
										8,
										8
									] })
								})
							]
						})
					]
				})
			]
		})
	});
}
function Leg({ side, leg, knee }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: leg,
		position: [
			side * .13,
			0,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.2,
					0
				],
				material: M.suit,
				dispose: null,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.072,
					.18,
					4,
					8
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.28,
					.04
				],
				material: M.suitBlue,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.13,
					.1,
					.12
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: knee,
				position: [
					0,
					-.38,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							-.16,
							0
						],
						material: M.suit,
						dispose: null,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.06,
							.14,
							3,
							8
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							-.32,
							.03
						],
						material: M.boot,
						dispose: null,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.13,
							.09,
							.2
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							-.34,
							-.06
						],
						material: M.glove,
						dispose: null,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.1,
							.04,
							.06
						] })
					})
				]
			})
		]
	});
}
function Arm({ side, arm, wrist, beam, lamp }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: arm,
		position: [
			side * .3,
			.22,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.16,
					0
				],
				material: M.suit,
				dispose: null,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.052,
					.14,
					3,
					8
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.18,
					0
				],
				material: M.suitBlue,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.09,
					.05,
					.09
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.34,
					0
				],
				material: M.suitDark,
				dispose: null,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.046,
					.14,
					3,
					8
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.48,
					-.02
				],
				material: M.glove,
				dispose: null,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.065,
					12,
					10
				] })
			}),
			side < 0 && wrist && beam && lamp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					ref: wrist,
					position: [
						0,
						-.4,
						-.06
					],
					dispose: null,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.03,
						8,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#7eb8cc",
						emissive: "#7eb8cc",
						emissiveIntensity: .08
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					ref: beam,
					position: [
						0,
						-.55,
						-.55
					],
					rotation: [
						Math.PI / 2.4,
						0,
						0
					],
					visible: false,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.01,
						.08,
						.7,
						8,
						1,
						true
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: "#9fd8ea",
						transparent: true,
						opacity: .28,
						depthWrite: false
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					ref: lamp,
					position: [
						0,
						-.45,
						-.2
					],
					color: "#9fd4e6",
					distance: 4.5,
					decay: 2,
					intensity: 0
				})
			] }) : null
		]
	});
}
function Eye({ x, lid }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			.045,
			-.2
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				material: M.eye,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.048,
					14,
					12
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					0,
					-.024
				],
				material: M.iris,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.03,
					12,
					10
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					0,
					-.04
				],
				material: M.pupil,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.014,
					8,
					8
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.01,
					.012,
					-.046
				],
				dispose: null,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.006,
					6,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#f7fbff" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				ref: lid,
				position: [
					0,
					.028,
					-.02
				],
				material: M.fur,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.07,
					.012,
					.03
				] })
			})
		]
	});
}
function Monitor({ position, rotation, title, formula, w = 1.8, h = 1.02 }) {
	const setup = (0, import_react.useMemo)(() => {
		const c = document.createElement("canvas");
		c.width = 512;
		c.height = 288;
		const g = c.getContext("2d");
		if (g) paintScreen(g, 512, 288, title, formula, 0);
		const tex = new CanvasTexture(c);
		tex.colorSpace = SRGBColorSpace;
		return {
			c,
			tex
		};
	}, [title, formula]);
	const last = (0, import_react.useRef)(0);
	useFrame(() => {
		if (sim.time - last.current < .12) return;
		last.current = sim.time;
		const g = setup.c.getContext("2d");
		if (!g) return;
		paintScreen(g, 512, 288, title, formula, sim.time);
		setup.tex.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position,
		rotation,
		dispose: null,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [w, h] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			map: setup.tex,
			toneMapped: false
		})]
	});
}
function Backdrop({ position, rotation }) {
	const earth = (0, import_react.useMemo)(() => earthTexture(), []);
	const stars = (0, import_react.useMemo)(() => starTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					-.4
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [16, 9] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: stars,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [3.1, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: earth,
				toneMapped: false
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				3.15,
				3.7,
				48
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#7eb8cc",
				transparent: true,
				opacity: .35,
				side: 2,
				depthWrite: false
			})] })
		]
	});
}
function Atom() {
	const ref = (0, import_react.useRef)(null);
	useFrame((_, dt) => {
		if (ref.current) ref.current.rotation.y += dt * .7;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: [
			3.55,
			1.28,
			3.95
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.1,
			18,
			14
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: "#e0a23a",
			toneMapped: false
		})] }), [
			0,
			1.15,
			2.3
		].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				Math.PI / 2.3,
				r,
				.2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.36,
				.008,
				8,
				40
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#7eb8cc",
				toneMapped: false
			})]
		}, r))]
	});
}
function NewtonCore() {
	const ref = (0, import_react.useRef)(null);
	useFrame((_, dt) => {
		if (ref.current) ref.current.rotation.y += dt * .5;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-5.3,
			1.55,
			5.15
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.28,
				.015,
				8,
				32
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#7eb8cc",
				toneMapped: false
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.2,
					.01,
					8,
					28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#d5e4ef",
					toneMapped: false
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "IA NEWTON",
			position: [
				0,
				.48,
				0
			]
		})]
	});
}
function DockPad() {
	const mat = (0, import_react.useRef)(null);
	const beam = (0, import_react.useRef)(null);
	useFrame(() => {
		if (mat.current) {
			mat.current.emissiveIntensity = sim.solved ? 1.3 : .35 + Math.sin(sim.time * 3) * .18;
			mat.current.emissive.set(sim.solved ? "#9ee0c8" : "#1e4d96");
			mat.current.color.set(sim.solved ? "#9ee0c8" : "#1e4d96");
		}
		if (beam.current) beam.current.visible = !sim.solved;
		if (beam.current && !Array.isArray(beam.current.material)) {
			const m = beam.current.material;
			if ("opacity" in m) m.opacity = .08 + Math.sin(sim.time * 4) * .04;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			DOCK.x,
			.05,
			DOCK.z
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
					.72,
					1.18,
					40
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					ref: mat,
					color: "#1e4d96",
					emissive: "#1e4d96",
					emissiveIntensity: .4,
					roughness: .35,
					metalness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: beam,
				position: [
					0,
					1.1,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.45,
					.7,
					2.2,
					16,
					1,
					true
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#7eb8cc",
					transparent: true,
					opacity: .1,
					depthWrite: false,
					side: 2,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
				text: "PLATAFORMA DE ACOPLAMENTO",
				position: [
					0,
					1.7,
					0
				]
			})
		]
	});
}
function Lanes() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				-5.32,
				.025,
				-20.4
			],
			receiveShadow: true,
			material: M.ice,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4.4, 15.2] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.025,
				-20.6
			],
			receiveShadow: true,
			material: M.lane,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4.8, 16] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				5.32,
				.025,
				-20.4
			],
			receiveShadow: true,
			material: M.rubber,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4.4, 15.2] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "GELO   μ 0,05",
			position: [
				-5.32,
				1.4,
				-13.1
			],
			color: "#d5eef6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "METAL   μ 0,30",
			position: [
				0,
				1.4,
				-13.1
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "BORRACHA   μ 0,62",
			position: [
				5.32,
				1.4,
				-13.1
			],
			color: "#e7c27a"
		})
	] });
}
function Portrait() {
	const map = (0, import_react.useMemo)(() => {
		const tex = new TextureLoader().load("/tigrao.png");
		tex.colorSpace = SRGBColorSpace;
		return tex;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-7.32,
			1.75,
			7.6
		],
		rotation: [
			0,
			Math.PI / 2,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
				position: [
					0,
					0,
					-.04
				],
				args: [
					1.35,
					.95,
					.06
				],
				material: M.hullDark
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					0
				],
				dispose: null,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.22, .72] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
				text: "CADETE TIGRÃO",
				position: [
					0,
					-.62,
					.05
				]
			})
		]
	});
}
function Rover() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-5.02,
			.78,
			.55
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				material: M.suitDark,
				castShadow: true,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.72,
					.26,
					.42
				] })
			}),
			[
				[-.24, .16],
				[.24, .16],
				[-.24, -.16],
				[.24, -.16]
			].map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					x ?? 0,
					-.16,
					z ?? 0
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				material: M.dark,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.1,
					.1,
					.08,
					12
				] })
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					.1,
					.18,
					0
				],
				material: M.hull,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.16,
					.1,
					.16
				] })
			})
		]
	});
}
function Rocket() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			5.55,
			1.15,
			.45
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.22,
					0
				],
				material: M.suit,
				dispose: null,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.07,
					.09,
					.4,
					12
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.48,
					0
				],
				material: M.suitBlue,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.08,
					.16,
					12
				] })
			}),
			[
				0,
				2.1,
				4.2
			].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.05,
					0
				],
				rotation: [
					0,
					r,
					0
				],
				material: M.stripe,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.22,
					.05,
					.06
				] })
			}, r))
		]
	});
}
function Station() {
	const earth = (0, import_react.useMemo)(() => earthTexture(), []);
	const clouds = (0, import_react.useMemo)(() => cloudTexture(), []);
	const spin = (0, import_react.useRef)(null);
	useFrame((_, dt) => {
		if (spin.current && sim.phase === "title") spin.current.rotation.y += dt * .08;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: spin,
		position: [
			0,
			200,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				material: M.suit,
				castShadow: true,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					1.5,
					1.5,
					3.6,
					18
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				material: M.hull,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					3.1,
					.16,
					10,
					36
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				rotation: [
					Math.PI / 2,
					.4,
					0
				],
				material: M.hullDark,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					4.4,
					.05,
					8,
					40
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					4.1,
					.2,
					0
				],
				material: M.hull,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.1,
					1.1,
					1.3
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-3.6,
					-.2,
					1.2
				],
				material: M.suitBlue,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.4,
					.9,
					1.6
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.1,
					3.5
				],
				material: M.suitBlue,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					5.2,
					.06,
					1.35
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.1,
					-3.5
				],
				material: M.suitBlue,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					5.2,
					.06,
					1.35
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					1.55,
					1.7,
					0
				],
				material: M.visorLight,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.08,
					8,
					8
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					-1.2,
					1.85,
					.4
				],
				material: M.alarm,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.06,
					8,
					8
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-11,
					1.2,
					-7
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					6.4,
					48,
					32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: earth,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-11,
					1.2,
					-7
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					6.62,
					32,
					24
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: clouds,
					transparent: true,
					opacity: .55,
					depthWrite: false,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-11,
					1.2,
					-7
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					6.85,
					28,
					18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#9fd4e6",
					transparent: true,
					opacity: .12,
					depthWrite: false
				})]
			})
		]
	});
}
function Starfield() {
	const geo = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		const n = 500;
		const a = new Float32Array(n * 3);
		for (let i = 0; i < n; i++) {
			const r = 28 + i * 17 % 50;
			const th = i * 2.399 % (Math.PI * 2);
			const ph = Math.acos(i * .37 % 2 - 1);
			a[i * 3] = r * Math.sin(ph) * Math.cos(th);
			a[i * 3 + 1] = 200 + r * Math.sin(ph) * Math.sin(th) * .45;
			a[i * 3 + 2] = r * Math.cos(ph);
		}
		g.setAttribute("position", new BufferAttribute(a, 3));
		return g;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		geometry: geo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			color: "#d5e4ef",
			size: .14,
			sizeAttenuation: true,
			depthWrite: false
		})
	});
}
function World() {
	const floorMap = (0, import_react.useMemo)(() => panelTexture(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.002,
				5
			],
			receiveShadow: true,
			dispose: null,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [15.2, 12.4] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: floorMap,
				color: "#5e6c7c",
				metalness: .55,
				roughness: .38
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.002,
				-5.2
			],
			receiveShadow: true,
			material: M.floor,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.4, 8] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.002,
				-19.8
			],
			receiveShadow: true,
			material: M.floor,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [18, 21.2] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				0,
				3.44,
				5
			],
			args: [
				15.2,
				.12,
				12.4
			],
			material: M.hullDark
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				0,
				2.98,
				-5.2
			],
			args: [
				3.4,
				.1,
				8
			],
			material: M.hullDark
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				0,
				4.02,
				-19.8
			],
			args: [
				18,
				.12,
				21.2
			],
			material: M.hullDark
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				3.32,
				5
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.4, .5] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#d5e4ef" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-3.2,
				3.32,
				2
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.4, .4] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#c5d4e4" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				2.88,
				-5.2
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.4, 6.2] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#d5e4ef" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				3.9,
				-16
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [6, .45] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#d5e4ef" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				3.9,
				-24
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4, .4] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#c5d4e4" })]
		}),
		BLOCKS.filter((b) => b.kind !== "hidden").map((b, i) => {
			const cx = (b.minX + b.maxX) / 2;
			const cz = (b.minZ + b.maxZ) / 2;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					cx,
					b.h / 2,
					cz
				],
				material: b.kind === "prop" ? M.hullDark : M.hull,
				castShadow: true,
				receiveShadow: true,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					b.maxX - b.minX,
					b.h,
					b.maxZ - b.minZ
				] })
			}, i);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				7.81,
				1.75,
				-.1
			],
			args: [
				.42,
				3.5,
				1.6
			],
			material: M.hull,
			cast: true,
			receive: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				7.81,
				1.75,
				9.55
			],
			args: [
				.42,
				3.5,
				4.15
			],
			material: M.hull,
			cast: true,
			receive: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				7.81,
				.42,
				4.5
			],
			args: [
				.42,
				.85,
				6
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				7.81,
				3.02,
				4.5
			],
			args: [
				.42,
				.95,
				6
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				7.58,
				1.7,
				4.5
			],
			rotation: [
				0,
				Math.PI / 2,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [5.6, 1.6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#9fd0e0",
				transparent: true,
				opacity: .12,
				roughness: .05,
				metalness: .1,
				depthWrite: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {
			position: [
				8.7,
				1.7,
				4.5
			],
			rotation: [
				0,
				-Math.PI / 2,
				0
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				-6.6,
				2.05,
				-30.61
			],
			args: [
				4.8,
				4.1,
				.42
			],
			material: M.hull,
			cast: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				6.6,
				2.05,
				-30.61
			],
			args: [
				4.8,
				4.1,
				.42
			],
			material: M.hull,
			cast: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				0,
				.45,
				-30.61
			],
			args: [
				8.4,
				.9,
				.42
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				0,
				3.45,
				-30.61
			],
			args: [
				8.4,
				1.3,
				.42
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.85,
				-30.35
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [7.8, 1.8] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#9fd0e0",
				transparent: true,
				opacity: .1,
				roughness: .05,
				depthWrite: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {
			position: [
				0,
				1.9,
				-31.7
			],
			rotation: [
				0,
				0,
				0
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-2,
				2.2,
				10.9
			],
			material: M.alarm,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.4,
				.08,
				.08
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				2,
				2.2,
				10.9
			],
			material: M.alarm,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.4,
				.08,
				.08
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				-1.62,
				1.7,
				-1.28
			],
			args: [
				.14,
				3.35,
				.18
			],
			material: M.suitDark
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				1.62,
				1.7,
				-1.28
			],
			args: [
				.14,
				3.35,
				.18
			],
			material: M.suitDark
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				0,
				3.32,
				-1.28
			],
			args: [
				3.4,
				.14,
				.18
			],
			material: M.suitDark
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.03,
				-5.2
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.9, 7.4] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#7eb8cc",
				transparent: true,
				opacity: .28,
				toneMapped: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
			position: [
				-1.6,
				2.15,
				11.05
			],
			rotation: [
				0,
				Math.PI,
				0
			],
			title: "ÓRBITA NEWTON-1",
			formula: "E = mc²"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
			position: [
				1.7,
				2.15,
				11.05
			],
			rotation: [
				0,
				Math.PI,
				0
			],
			title: "DINÂMICA",
			formula: "F = m·a",
			w: 1.7
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
			position: [
				-8.55,
				2.3,
				-18
			],
			rotation: [
				0,
				Math.PI / 2,
				0
			],
			title: "INÉRCIA",
			formula: "ΣF = 0",
			w: 1.5,
			h: .9
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "LABORATÓRIO DE INÉRCIA",
			position: [
				0,
				2.45,
				-.9
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "SETOR DE DINÂMICA",
			position: [
				0,
				2.35,
				-8.7
			]
		}),
		[
			-.2,
			2.2,
			4.4
		].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.12,
				z
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.14,
				.36,
				3
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#7eb8cc",
				transparent: true,
				opacity: .85,
				toneMapped: false
			})]
		}, z)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atom, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewtonCore, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rover, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lanes, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockPad, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Station, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {})
	] });
}
function Game() {
	(0, import_react.useEffect)(() => {
		sim.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let looking = false;
		const onKeyDown = (event) => {
			if (event.code === "Tab") {
				event.preventDefault();
				toggleMap();
				return;
			}
			if (event.code === "Escape") {
				event.preventDefault();
				if (document.pointerLockElement) document.exitPointerLock();
				togglePause();
				return;
			}
			if (event.code === "KeyE") {
				if (!event.repeat) queueInteract();
				return;
			}
			if (event.code === "KeyQ") {
				if (!event.repeat) queueScan();
				return;
			}
			if (event.code === "Space" || event.code === "Enter") {
				if (sim.phase === "title") {
					event.preventDefault();
					if (!event.repeat) startMission();
					return;
				}
				if (event.code === "Space") {
					event.preventDefault();
					if (!event.repeat) queueJump();
				}
				return;
			}
			held.add(event.code);
		};
		const onKeyUp = (event) => {
			held.delete(event.code);
		};
		const onBlur = () => {
			held.clear();
			looking = false;
		};
		const onDown = (event) => {
			const target = event.target;
			if (!(target instanceof Element)) return;
			if (target.closest("[data-ui]")) return;
			if (!(target instanceof HTMLCanvasElement)) return;
			looking = true;
			target.requestPointerLock?.();
		};
		const onUp = () => {
			looking = false;
		};
		const onMove = (event) => {
			const target = event.target;
			if (target instanceof Element && target.closest("[data-ui]")) return;
			if (!document.pointerLockElement && !looking) return;
			sim.lookDX += event.movementX;
			sim.lookDY += event.movementY;
		};
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		window.addEventListener("blur", onBlur);
		window.addEventListener("pointerdown", onDown);
		window.addEventListener("pointerup", onUp);
		window.addEventListener("pointercancel", onUp);
		window.addEventListener("pointermove", onMove);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keyup", onKeyUp);
			window.removeEventListener("blur", onBlur);
			window.removeEventListener("pointerdown", onDown);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointercancel", onUp);
			window.removeEventListener("pointermove", onMove);
			held.clear();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stage",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
			shadows: true,
			dpr: [1, 1.6],
			camera: {
				fov: 46,
				position: [
					8,
					205,
					12
				],
				near: .08,
				far: 240
			},
			gl: {
				antialias: true,
				powerPreference: "high-performance"
			},
			onCreated: ({ gl }) => {
				gl.setClearColor("#071018");
				gl.toneMapping = 4;
				gl.toneMappingExposure = 1.05;
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
					attach: "fog",
					args: [
						"#071018",
						9,
						40
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Simulator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioEnv, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FogTune, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lights, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dressing, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crates, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vectors, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Puffs, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tigrao, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {})]
	});
}
//#endregion
export { Game };
