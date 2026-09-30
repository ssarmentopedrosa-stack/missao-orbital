import { i as __toESM } from "../_runtime.mjs";
import { D as Vector3, E as TextureLoader, O as require_jsx_runtime, S as SRGBColorSpace, T as SpriteMaterial, _ as MeshStandardMaterial, a as PMREMGenerator, b as RepeatWrapping, c as BufferAttribute, d as Fog, f as Group, h as MeshBasicMaterial, k as require_react, l as BufferGeometry, m as Mesh, n as useFrame, o as ArrowHelper, r as useThree, t as Canvas, u as CanvasTexture, v as Object3D, w as Sprite, x as RingGeometry } from "../_libs/@react-three/fiber+[...].mjs";
import { n as ScanLine } from "../_libs/lucide-react.mjs";
import { t as RoomEnvironment } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Game-CfaqlrnX.js
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				2.2,
				.012,
				6.4
			],
			rotation: [
				-Math.PI / 2,
				0,
				.2
			],
			material: M.hullDark,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.9, .35] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-3.1,
				.012,
				2.2
			],
			rotation: [
				-Math.PI / 2,
				0,
				-.4
			],
			material: M.dark,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.7, .22] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				4.6,
				1.15,
				8.8
			],
			material: M.pipe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.04,
				1.6,
				.04
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-4.2,
				.9,
				9.6
			],
			material: M.pipe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.04,
				1.2,
				.04
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
	const bed = context.createBufferSource();
	bed.buffer = noise;
	bed.loop = true;
	const bedFilter = context.createBiquadFilter();
	bedFilter.type = "lowpass";
	bedFilter.frequency.value = 240;
	const bedGain = context.createGain();
	bedGain.gain.value = .01;
	bed.connect(bedFilter);
	bedFilter.connect(bedGain);
	bedGain.connect(master);
	bed.start();
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
	scanTick() {
		if (!ctx) return;
		tone(820, ctx.currentTime, .01, .05);
	},
	jump() {
		if (!ctx) return;
		tone(220, ctx.currentTime, .02, .12);
	},
	land() {
		burst(64, .09, .05, 240);
	},
	fail() {
		if (!ctx) return;
		tone(196, ctx.currentTime, .028, .14, "triangle");
		tone(146, ctx.currentTime + .08, .02, .18, "triangle");
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
	},
	motor() {
		if (!ctx) return;
		tone(72, ctx.currentTime, .012, .1, "triangle");
	},
	cable() {
		burst(160, .07, .022, 880);
	}
};
/** Vertical hoist math. g matches layout.ts. The fixed-mass helpers stay for stage-1-era tests. */
var HOIST_G = 9.81;
40 * HOIST_G;
var Y_MIN = 1.05;
var Y_MAX = 9.15;
var G_MOON = 1.62;
var HOIST_Y_MIN = Y_MIN;
var HOIST_Y_MAX = Y_MAX;
var HOIST_V_MAX = 5.6;
function finite$1(n, fallback) {
	return Number.isFinite(n) ? n : fallback;
}
/** Smallest mass the formula will divide by. Stops a bad load from producing Infinity. */
var MASS_MIN = .5;
/** Scanner label only: "equilíbrio" when the two forces are visually the same. */
var FORCE_SCAN = .8;
/** The only place P, Fr and a are computed. HUD, vectors and the integrator all read this. */
function forcesOf(tension, mass, g = HOIST_G) {
	const m = Math.max(MASS_MIN, finite$1(mass, 40));
	const grav = Math.max(0, finite$1(g, HOIST_G));
	const T = finite$1(tension, 0);
	const P = m * grav;
	const Fr = T - P;
	const a = Fr / m;
	return {
		mass: m,
		g: grav,
		T,
		P,
		Fr,
		a: Number.isFinite(a) ? a : 0
	};
}
/** P = m·g. Defaults match the station gravity used by stage 1. */
function weightOf(mass, g = HOIST_G) {
	return forcesOf(0, mass, g).P;
}
/** a = Fr / m. The value the HUD shows is the value that is integrated. */
function accelOf(tension, mass, g = HOIST_G) {
	return forcesOf(tension, mass, g).a;
}
function integrateVariable(y, v, tension, mass, g, dt, locked, yMin = HOIST_Y_MIN, yMax = HOIST_Y_MAX) {
	const step = Math.min(.05, Math.max(0, finite$1(dt, 0)));
	const a = accelOf(tension, mass, g);
	const y0 = finite$1(y, yMin);
	if (locked) return {
		y: y0,
		v: 0,
		a,
		hitTop: false,
		hitFloor: false
	};
	let vy = finite$1(v, 0) + a * step;
	if (vy > 5.6) vy = HOIST_V_MAX;
	if (vy < -5.6) vy = -5.6;
	let py = y0 + vy * step;
	let hitFloor = false;
	let hitTop = false;
	if (py < yMin) {
		hitFloor = true;
		py = yMin;
		if (vy < 0) vy = 0;
	} else if (py > yMax) {
		hitTop = true;
		py = yMax;
		if (vy > 0) vy = 0;
	}
	if (!Number.isFinite(py) || !Number.isFinite(vy)) return {
		y: y0,
		v: 0,
		a: 0,
		hitTop: false,
		hitFloor: false
	};
	return {
		y: py,
		v: vy,
		a,
		hitTop,
		hitFloor
	};
}
/** Braking may begin only while the load is still climbing, before the arrival ceiling. */
function brakingGate(a, v, y) {
	return a < -.15 && v > .12 && y > 2 && y < 9.02 && Number.isFinite(a) && Number.isFinite(v) && Number.isFinite(y);
}
/**
* Controlled arrival. A ceiling hit is never success, and rest/accel/coast cannot skip ahead.
* Speed must have fallen since braking started, inside the band, still not a collision.
* brakeDur, when supplied by the mission, must show the brake was held.
*/
function arrivalAllowed(input) {
	if (input.hitTop) return false;
	if (input.phase !== "brake" || !input.brakeValid) return false;
	if (!(input.brakeV > .12) || !Number.isFinite(input.brakeV)) return false;
	if (!Number.isFinite(input.y) || !Number.isFinite(input.v)) return false;
	if (!(input.v < input.brakeV - .08)) return false;
	if (input.brakeDur != null && !(input.brakeDur >= .4)) return false;
	if (input.y < 8.45 || input.y > 9.02) return false;
	if (!(input.v >= -.02 && input.v < .45)) return false;
	return true;
}
/**
* Arrow length for the scanner only. Same reference for P, T and Fr, so a larger force is a longer arrow.
* Clamped so an extreme tension cannot fill the bay. Never fed back into the integrator.
*/
function vectorLength(magnitude, reference) {
	const mag = Math.abs(finite$1(magnitude, 0));
	if (mag < 1) return 0;
	const raw = mag / Math.max(mag, Math.abs(finite$1(reference, 0)), 80) * 1.6;
	if (raw < .05) return 0;
	return Math.min(1.65, Math.max(.34, raw));
}
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
	},
	{
		minX: -5.75,
		maxX: -5.3,
		minZ: -63.1,
		maxZ: -48.7,
		h: 4.4,
		kind: "hidden"
	},
	{
		minX: 5.3,
		maxX: 5.75,
		minZ: -63.1,
		maxZ: -48.7,
		h: 4.4,
		kind: "hidden"
	},
	{
		minX: -5.75,
		maxX: 5.75,
		minZ: -63.1,
		maxZ: -62.65,
		h: 4.4,
		kind: "hidden"
	},
	{
		minX: -5.75,
		maxX: 5.75,
		minZ: -49.15,
		maxZ: -48.7,
		h: 4.4,
		kind: "hidden"
	},
	{
		minX: -4.05,
		maxX: -3.1,
		minZ: -54.95,
		maxZ: -54.05,
		h: .95,
		kind: "hidden"
	},
	{
		minX: -4.05,
		maxX: -3.1,
		minZ: -57.15,
		maxZ: -56.25,
		h: .95,
		kind: "hidden"
	},
	{
		minX: -4.05,
		maxX: -3.1,
		minZ: -59.35,
		maxZ: -58.45,
		h: .95,
		kind: "hidden"
	},
	{
		minX: 2.85,
		maxX: 3.8,
		minZ: -52.6,
		maxZ: -51.85,
		h: 1.2,
		kind: "hidden"
	},
	{
		minX: 3.7,
		maxX: 4.45,
		minZ: -56.7,
		maxZ: -56.1,
		h: 1.05,
		kind: "hidden"
	},
	{
		minX: 12.15,
		maxX: 12.55,
		minZ: -64.2,
		maxZ: -57.4,
		h: 4.2,
		kind: "hidden"
	},
	{
		minX: 12.15,
		maxX: 12.55,
		minZ: -54.6,
		maxZ: -47.8,
		h: 4.2,
		kind: "hidden"
	},
	{
		minX: 12.15,
		maxX: 28.1,
		minZ: -64.2,
		maxZ: -63.75,
		h: 4.2,
		kind: "hidden"
	},
	{
		minX: 12.15,
		maxX: 28.1,
		minZ: -48.25,
		maxZ: -47.8,
		h: 4.2,
		kind: "hidden"
	},
	{
		minX: 27.7,
		maxX: 28.1,
		minZ: -64.2,
		maxZ: -47.8,
		h: 4.2,
		kind: "hidden"
	}
];
/** Title beats. 0–1 are exterior; 2–8 move inside the station. */
function shotIndex(shotTime) {
	const u = shotTime % 64;
	if (u < 9) return 0;
	if (u < 16) return 1;
	if (u < 23) return 2;
	if (u < 29) return 3;
	if (u < 37) return 4;
	if (u < 45) return 5;
	if (u < 52) return 6;
	if (u < 58) return 7;
	return 8;
}
function exteriorShot(shot) {
	return shot <= 1;
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
	stage: 1,
	transit: 0,
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
	downed: false,
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
	actEdge: false,
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
function speak(speaker, text, seconds) {
	say(speaker, text, seconds);
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
		if (!sim.sawScan && sim.stage === 1) {
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
	sim.stage = 1;
	sim.transit = 0;
	sim.actEdge = false;
	sim.integrity = 100;
	sim.cell = 100;
	sim.pushes = 0;
	sim.scans = 0;
	sim.blocked = 0;
	sim.result = null;
	sim.animLock = null;
	sim.anim = "idle";
	sim.shake = 0;
	sim.downed = false;
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
		const dx = x - cx;
		const dz = z - cz;
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
	if (sim.paused || sim.mapOpen || sim.downed) {
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
	if ((sim.stage === 2 || sim.stage === 3) && sim.transit > 0) {
		sim.vx = 0;
		sim.vz = 0;
		sim.vy = 0;
		sim.speed = 0;
		sim.grounded = true;
		sim.anim = "walk";
		sim.lookDX = 0;
		sim.lookDY = 0;
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
		if (sim.stage === 2 || sim.stage === 3) sim.actEdge = true;
		else tryInteract();
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
					if (crate.kind === "heavy" && !sim.sawHeavy && sim.stage === 1) {
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
	if (sim.stage === 1 && !sim.sawHall && sim.z < -1.6) {
		sim.sawHall = true;
		say("NEWTON", "Três pistas à frente: gelo, metal e borracha. A força que você aplica é a mesma. A aceleração, não.", 6);
	}
	if (sim.stage === 1 && !sim.sawBay && sim.z < -10.2) {
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
		getHeld: () => [...held],
		getState: () => ({
			phase: sim.phase,
			x: sim.x,
			y: sim.y,
			z: sim.z,
			yaw: sim.yaw,
			vy: sim.vy,
			speed: Math.hypot(sim.vx, sim.vz),
			paused: sim.paused,
			mapOpen: sim.mapOpen,
			scanner: sim.scanner,
			pushes: sim.pushes,
			stage: sim.stage
		}),
		setKeys: (codes) => {
			held.clear();
			for (const code of codes) held.add(code);
		},
		advanceTitle: (t) => {
			sim.shotTime = t;
		}
	};
}
var PANEL = {
	x: 2.55,
	z: -52.15
};
var SHAFT = {
	x: 0,
	z: -58.2
};
var GRAV = {
	x: 4.05,
	z: -56.4
};
var LOADS = [
	{
		id: "a",
		name: "Carga A",
		mass: 20,
		x: -3.55,
		z: -54.5
	},
	{
		id: "b",
		name: "Carga B",
		mass: 50,
		x: -3.55,
		z: -56.7
	},
	{
		id: "c",
		name: "Carga C",
		mass: 100,
		x: -3.55,
		z: -58.9
	}
];
var Y_START = 2.55;
var TRANSIT$1 = 6.4;
var T_MAX = 1800;
var elevator = {
	active: false,
	goal: "scan",
	tension: 300,
	mass: 40,
	g: HOIST_G,
	loadId: "maint",
	y: Y_START,
	v: 0,
	scanned: false,
	arrived: false,
	alarm: false,
	alarmT: 0,
	done: false,
	hint: "",
	note: "",
	balanceHold: 0,
	compareHold: 0,
	drop: 0,
	dropHold: 0,
	labUp: false,
	labDown: false,
	labBalance: false,
	labCoast: false,
	labHold: 0,
	coastHold: 0,
	proto: 0,
	protoHold: 0,
	braking: false,
	flight: freshFlight(),
	flinch: 0,
	warnAt: 0,
	samples: [],
	cheer: 0,
	finale: 0,
	prevE: false,
	prevFr: 0,
	adjusting: false,
	motorT: 0,
	tries: 0,
	t0: 0,
	swaps: 0,
	saidG: false,
	saidWait: false,
	saidSame: false,
	saidCoast: false,
	saidPair: false,
	saidSurge: false,
	lineQueue: [],
	mastery: {
		peso: false,
		tracao: false,
		resultante: false,
		massa: false,
		aceleracao: false,
		newton: false,
		gravidade: false,
		uniforme: false,
		mesmaFr: false
	}
};
function freshFlight() {
	return {
		vMax: 0,
		brakeY: 0,
		brakeV: 0,
		arriveV: 0,
		brakeA: 0,
		brakeDur: 0,
		collided: false,
		brakeValid: false,
		impacts: 0
	};
}
function resetMotion() {
	elevator.goal = "scan";
	elevator.tension = 300;
	elevator.mass = 40;
	elevator.g = HOIST_G;
	elevator.loadId = "maint";
	elevator.y = Y_START;
	elevator.v = 0;
	elevator.scanned = false;
	elevator.arrived = false;
	elevator.alarm = false;
	elevator.alarmT = 0;
	elevator.done = false;
	elevator.hint = "";
	elevator.note = "";
	elevator.balanceHold = 0;
	elevator.compareHold = 0;
	elevator.drop = 0;
	elevator.dropHold = 0;
	elevator.labUp = false;
	elevator.labDown = false;
	elevator.labBalance = false;
	elevator.labCoast = false;
	elevator.labHold = 0;
	elevator.coastHold = 0;
	elevator.proto = 0;
	elevator.protoHold = 0;
	elevator.braking = false;
	elevator.flight = freshFlight();
	elevator.flinch = 0;
	elevator.warnAt = 0;
	elevator.samples = [];
	elevator.cheer = 0;
	elevator.finale = 0;
	elevator.prevE = false;
	elevator.prevFr = 0;
	elevator.adjusting = false;
	elevator.motorT = 0;
	elevator.tries = 0;
	elevator.swaps = 0;
	elevator.saidG = false;
	elevator.saidWait = false;
	elevator.saidSame = false;
	elevator.saidCoast = false;
	elevator.saidPair = false;
	elevator.saidSurge = false;
	elevator.lineQueue = [];
	elevator.mastery = {
		peso: false,
		tracao: false,
		resultante: false,
		massa: false,
		aceleracao: false,
		newton: false,
		gravidade: false,
		uniforme: false,
		mesmaFr: false
	};
}
function queueAs$1(speaker, text, seconds) {
	elevator.lineQueue.push({
		speaker,
		text,
		seconds
	});
}
function queue$1(text, seconds) {
	queueAs$1("NEWTON", text, seconds);
}
function pumpLines$1() {
	if (sim.line) return;
	const next = elevator.lineQueue.shift();
	if (!next) return;
	speak(next.speaker, next.text, next.seconds);
}
function comma(n, digits = 1) {
	return (Math.abs(n) < 5 * 10 ** -(digits + 1) ? 0 : n).toFixed(digits).replace(".", ",");
}
function loadName() {
	if (elevator.loadId === "protocol") return "Protocolo Newton";
	const found = LOADS.find((item) => item.id === elevator.loadId);
	if (found) return found.name;
	return "Contêiner de manutenção";
}
function hoistState() {
	const f = forcesOf(elevator.tension, elevator.mass, elevator.g);
	const state = Math.abs(f.Fr) < .8 ? "EQUILÍBRIO" : f.Fr > 0 ? "ACELERANDO ↑" : "ACELERANDO ↓";
	return {
		mass: f.mass,
		g: f.g,
		P: f.P,
		T: f.T,
		Fr: f.Fr,
		a: f.a,
		v: elevator.v,
		y: elevator.y,
		state,
		goal: elevator.goal,
		hint: elevator.hint,
		note: elevator.note,
		alarm: elevator.alarm,
		done: elevator.done,
		scanned: elevator.scanned,
		active: elevator.active,
		name: loadName(),
		finale: elevator.finale,
		tries: elevator.tries,
		elapsed: Math.max(0, sim.time - elevator.t0),
		mastery: elevator.mastery,
		moon: f.g < 5,
		flight: elevator.flight
	};
}
function near$1(x, z, r) {
	return Math.hypot(sim.x - x, sim.z - z) < r;
}
function nearPanel() {
	return near$1(PANEL.x, PANEL.z, 2.15);
}
function nearHoist() {
	return nearPanel() || near$1(SHAFT.x, SHAFT.z, 6.8);
}
function nearLoad() {
	let best = null;
	let bestD = 1.45;
	for (const load of LOADS) {
		const d = Math.hypot(sim.x - load.x, sim.z - load.z);
		if (d < bestD) {
			bestD = d;
			best = load;
		}
	}
	return best;
}
function clampTension(value) {
	if (!Number.isFinite(value)) return elevator.tension;
	return Math.max(0, Math.min(T_MAX, Math.round(value * 10) / 10));
}
function physicsNote(P, T, Fr, a, v) {
	if (Math.abs(Fr) < 8 && Math.abs(v) > .22) return "Resultante nula — e a carga continua em movimento.";
	if (Math.abs(Fr) < 8) return "Forças equilibradas. A resultante é nula.";
	if (T > P + 8 && a > .05) return "Tração maior que o peso. A carga acelera para cima.";
	if (T < P - 8 && a < -.05) return "Peso maior que a tração. A aceleração aponta para baixo.";
	if (a > .05) return "A aceleração aponta para cima.";
	if (a < -.05) return "A aceleração aponta para baixo.";
	return "Observe o peso, a tração e a diferença entre eles.";
}
function bumpTension(dir, amount) {
	elevator.tension = clampTension(elevator.tension + dir * amount);
	elevator.mastery.tracao = true;
}
function applyLoad(load) {
	const prevM = elevator.mass;
	const prevA = forcesOf(elevator.tension, prevM, elevator.g).a;
	const nextA = forcesOf(elevator.tension, load.mass, elevator.g).a;
	elevator.mass = load.mass;
	elevator.loadId = load.id;
	elevator.mastery.massa = true;
	elevator.swaps += 1;
	sfx.ui();
	if (Math.abs(prevM - load.mass) > .5) queue$1(`${load.name}, ${load.mass} kg. A tração ficou em ${comma(elevator.tension, 0)} N. A aceleração foi de ${comma(prevA, 2)} para ${comma(nextA, 2)} m/s².`, 5.6);
	if (elevator.swaps >= 2 && !elevator.saidSame) {
		elevator.saidSame = true;
		queue$1("Mesma tração não significa mesma resultante: o peso muda com a massa. E, para a mesma resultante, a massa maior acelera menos. a = Fr / m.", 6.4);
	}
}
function toggleGravity() {
	const moon = elevator.g < 5;
	const mass = elevator.mass;
	elevator.g = moon ? HOIST_G : G_MOON;
	elevator.mastery.gravidade = true;
	sfx.ui();
	queue$1(`Simulador em gravidade da ${elevator.g < 5 ? "Lua" : "estação"}. A massa continua ${comma(mass, 0)} kg. O peso passou a ${comma(weightOf(mass, elevator.g), 1)} N.`, 5.2);
	if (!elevator.saidG) {
		elevator.saidG = true;
		queueAs$1("TIGRÃO", "Minha massa continua a mesma.", 2.8);
		queue$1("Exatamente. O que mudou foi a força gravitacional. Peso é força. Massa, não.", 4.6);
	}
}
function enterDescent() {
	elevator.goal = "descent";
	elevator.drop = 0;
	elevator.dropHold = 0;
	elevator.mastery.resultante = true;
	if (elevator.y < 4.3) elevator.y = 4.9;
	elevator.v = 0;
	elevator.tension = clampTension(weightOf(elevator.mass, elevator.g) - 110);
	elevator.alarm = true;
	elevator.alarmT = 2.4;
	sim.shake = Math.max(sim.shake, .16);
	sfx.cable();
	queue$1("A tração caiu abaixo do peso. A carga acelera para baixo. Isso é a força resultante, não um defeito do cabo.", 5.4);
}
function enterLab() {
	elevator.goal = "lab";
	elevator.g = HOIST_G;
	elevator.labUp = false;
	elevator.labDown = false;
	elevator.labBalance = false;
	elevator.labCoast = false;
	elevator.labHold = 0;
	elevator.coastHold = 0;
	elevator.samples = [];
	elevator.alarm = false;
	queue$1("Laboratório de forças. Escolha 20, 50 ou 100 kg. Suba, equilibre parado, desça — e também siga em movimento com a resultante zero.", 6.6);
	queue$1("O simulador à direita troca a gravidade entre a estação e a Lua. A massa não muda. O peso, sim.", 5.4);
}
function enterProtocol() {
	elevator.goal = "protocol";
	elevator.g = HOIST_G;
	elevator.mass = 120;
	elevator.loadId = "protocol";
	elevator.y = HOIST_Y_MIN + .15;
	elevator.v = 0;
	elevator.tension = clampTension(weightOf(120, HOIST_G));
	elevator.proto = 0;
	elevator.protoHold = 0;
	elevator.braking = false;
	elevator.flight = freshFlight();
	elevator.flinch = 0;
	elevator.warnAt = 0;
	elevator.saidSurge = false;
	elevator.mastery.newton = true;
	sfx.ui();
	queue$1("Protocolo Newton. Cento e vinte quilogramas. Você já sabe o suficiente. Controle o elevador.", 4.8);
	queue$1("Mantenha parada, suba acelerando, siga com velocidade constante e desacelere antes da plataforma.", 5.6);
}
function finish$1() {
	if (elevator.done) return;
	elevator.flight.arriveV = elevator.v;
	elevator.flight.collided = false;
	elevator.done = true;
	elevator.goal = "done";
	elevator.alarm = false;
	elevator.v = 0;
	elevator.tension = clampTension(weightOf(elevator.mass, HOIST_G));
	elevator.g = HOIST_G;
	elevator.finale = 7.2;
	elevator.cheer = 7.2;
	sim.animLock = "celebrate";
	sim.shake = Math.max(sim.shake, .12);
	sim.objective = "Etapa 2 concluída";
	sfx.success();
	queue$1("Você descobriu algo importante.", 2.8);
	queue$1("Uma força isolada não determina o movimento.", 3.4);
	queue$1("O que importa é a força resultante.", 3.2);
	queue$1("Quando você entende as forças, começa a entender o movimento.", 4.2);
}
function beginStage2() {
	if (sim.stage === 2 && elevator.active) return;
	resetMotion();
	elevator.active = true;
	elevator.t0 = sim.time;
	elevator.hint = "Caminhe até o painel. A carga está pronta e mesmo assim não sobe.";
	sim.stage = 2;
	sim.phase = "play";
	sim.paused = false;
	sim.mapOpen = false;
	sim.freeplay = false;
	sim.scanner = false;
	sim.animLock = null;
	sim.transit = TRANSIT$1;
	sim.x = -3.1;
	sim.y = 0;
	sim.z = -50.35;
	sim.yaw = Math.PI;
	sim.vx = 0;
	sim.vy = 0;
	sim.vz = 0;
	sim.speed = 0;
	sim.objective = "Investigue o elevador e descubra por que ele não sobe.";
	elevator.lineQueue = [
		{
			speaker: "NEWTON",
			text: "Tigrão, temos um problema.",
			seconds: 3.1
		},
		{
			speaker: "NEWTON",
			text: "A carga está pronta, mas o elevador não consegue colocá-la em movimento.",
			seconds: 4.6
		},
		{
			speaker: "NEWTON",
			text: "Você está diante de três forças: peso, tração e força resultante.",
			seconds: 4.6
		},
		{
			speaker: "NEWTON",
			text: "Descubra como elas determinam o movimento.",
			seconds: 3.6
		}
	];
	const first = elevator.lineQueue.shift();
	if (first) speak(first.speaker, first.text, first.seconds);
	else sfx.ui();
}
function readForces() {
	const f = forcesOf(elevator.tension, elevator.mass, elevator.g);
	return {
		P: f.P,
		T: f.T,
		Fr: f.Fr,
		a: f.a
	};
}
function tickElevator(dt) {
	if (sim.stage !== 2) {
		elevator.active = false;
		elevator.alarm = false;
		elevator.adjusting = false;
		return;
	}
	const tap = sim.actEdge;
	sim.actEdge = false;
	const hdt = Math.min(.05, Math.max(0, Number.isFinite(dt) ? dt : 0));
	if (!(elevator.mass >= .5) || !Number.isFinite(elevator.mass)) elevator.mass = 40;
	if (!(elevator.g >= 0) || !Number.isFinite(elevator.g)) elevator.g = HOIST_G;
	if (!Number.isFinite(elevator.tension)) elevator.tension = clampTension(weightOf(elevator.mass, elevator.g));
	if (!Number.isFinite(elevator.y)) elevator.y = Y_START;
	if (!Number.isFinite(elevator.v)) elevator.v = 0;
	if (!elevator.active) return;
	if (sim.transit > 0) {
		sim.transit = Math.max(0, sim.transit - hdt);
		const u = 1 - sim.transit / TRANSIT$1;
		const s = u * u * (3 - 2 * u);
		sim.x = -3.1;
		sim.y = 0;
		sim.z = -50.35 + (-53.15 - -50.35) * Math.min(1, s);
		sim.yaw = Math.PI;
		sim.vx = 0;
		sim.vz = 0;
		sim.speed = 0;
		sim.objective = "Investigue o elevador e descubra por que ele não sobe.";
		pumpLines$1();
		return;
	}
	if (elevator.finale > 0) {
		elevator.finale = Math.max(0, elevator.finale - hdt);
		sim.x = .2;
		sim.y = 0;
		sim.z = -54.6;
		sim.yaw = 0;
		sim.vx = 0;
		sim.vy = 0;
		sim.vz = 0;
		sim.speed = 0;
		sim.animLock = elevator.finale > 0 ? "celebrate" : null;
		sim.objective = "Etapa 2 concluída";
		pumpLines$1();
		return;
	}
	if (elevator.alarmT > 0) {
		elevator.alarmT = Math.max(0, elevator.alarmT - hdt);
		elevator.alarm = elevator.alarmT > 0;
	}
	if (sim.phase !== "play" || sim.paused || sim.mapOpen) {
		elevator.adjusting = false;
		pumpLines$1();
		return;
	}
	const e = held.has("KeyE");
	const shift = held.has("ShiftLeft") || held.has("ShiftRight") || sim.touchSprint;
	const atPanel = nearPanel();
	const load = nearLoad();
	const atGrav = near$1(GRAV.x, GRAV.z, 1.55);
	elevator.adjusting = Boolean(atPanel && e && elevator.goal !== "scan" && elevator.goal !== "done");
	if (tap && load && elevator.goal === "lab") applyLoad(load);
	else if (tap && atGrav && elevator.goal === "lab") toggleGravity();
	else if (tap && load && elevator.goal !== "lab") queue$1("As cargas do laboratório entram depois que você controlar a descida.", 3.6);
	else if (tap && atGrav && elevator.goal !== "lab") queue$1("O simulador de gravidade abre no laboratório de forças.", 3.4);
	else if (elevator.goal === "scan" && tap && atPanel && !elevator.saidWait) {
		elevator.saidWait = true;
		queue$1("Antes de alterar qualquer coisa, observe. Abra o scanner na carga.", 3.8);
	} else if (atPanel && elevator.goal !== "scan" && elevator.goal !== "done") {
		const dir = shift ? -1 : 1;
		const gap = Math.abs(elevator.tension - weightOf(elevator.mass, elevator.g));
		const rate = gap > 80 ? Math.max(36, Math.min(120, elevator.mass * .9)) : gap > 25 ? 22 : 9;
		const tapStep = gap > 60 ? Math.max(10, elevator.mass * .22) : 2;
		if (e) {
			if (!elevator.prevE) bumpTension(dir, Math.min(8, tapStep));
			else bumpTension(dir, rate * hdt);
		} else if (tap) bumpTension(dir, tapStep);
	}
	elevator.prevE = e;
	const locked = elevator.goal === "scan" || elevator.goal === "done";
	const prevV = elevator.v;
	const step = integrateVariable(elevator.y, elevator.v, elevator.tension, elevator.mass, elevator.g, hdt, locked);
	elevator.y = step.y;
	elevator.v = step.v;
	if (step.hitFloor && prevV < -1.2 && !locked) {
		elevator.tries += 1;
		elevator.alarmT = Math.max(elevator.alarmT, 1.3);
		elevator.y = Math.max(elevator.y, 3.5);
		elevator.v = -.15;
		sfx.fail();
		queue$1("Impacto no piso. A velocidade estava grande. Aumente a tração antes do fim da descida.", 4.4);
	}
	let crashed = false;
	if (step.hitTop && elevator.goal === "protocol" && prevV > .05) {
		crashed = true;
		elevator.tries += 1;
		elevator.flight.impacts += 1;
		elevator.flight.collided = true;
		elevator.flight.brakeValid = false;
		elevator.braking = false;
		elevator.flinch += 1;
		elevator.y = 7.05;
		elevator.v = .4;
		elevator.alarmT = Math.max(elevator.alarmT, 1.2);
		sim.shake = Math.max(sim.shake, .22);
		sfx.fail();
		queue$1("Impacto! Você chegou rápido demais. É necessário iniciar a frenagem antes do topo.", 4.2);
	}
	const { P, T, Fr, a } = readForces();
	elevator.note = physicsNote(P, T, Fr, a, elevator.v);
	if (elevator.prevFr * Fr < -1 && Math.abs(Fr) > 4 && Math.abs(elevator.prevFr) > 4) sfx.cable();
	elevator.prevFr = Fr;
	if (Math.abs(Fr) < 8) elevator.mastery.resultante = true;
	if (Math.abs(elevator.v) > .22) {
		elevator.motorT += hdt;
		if (elevator.motorT > .48) {
			elevator.motorT = 0;
			sfx.motor();
		}
	}
	if (elevator.goal === "scan") {
		sim.objective = elevator.arrived ? "2 · Ative o scanner" : "1 · Investigue o elevador";
		if (!elevator.arrived && atPanel) {
			elevator.arrived = true;
			queue$1("O cabo está frouxo para o peso desta carga. Escaneie antes de mudar a tração.", 4.4);
		}
		elevator.hint = elevator.arrived ? "Q liga o scanner. Peso para baixo, tração para cima." : "Caminhe até o painel do guincho. A carga não sobe.";
		if (sim.scanner && nearHoist()) {
			elevator.scanned = true;
			elevator.mastery.peso = true;
			elevator.goal = "compare";
			elevator.compareHold = 0;
			queue$1("Peso é m·g, para baixo. Tração é o cabo, para cima. As duas existem ao mesmo tempo.", 5);
			queue$1("E aumenta a tração. Shift+E diminui. No toque, Agir faz o mesmo passo — Correr inverte.", 4.6);
		}
	} else if (elevator.goal === "compare") {
		sim.objective = "3 · Compare o peso e a tração";
		elevator.hint = T > P + 12 ? "A tração já supera o peso. A resultante aponta para cima." : T < P - 12 ? `Peso ${comma(P, 1)} N, tração ${comma(T, 1)} N. A resultante ainda aponta para baixo.` : "Quase iguais. Resultante perto de zero não é ausência de forças.";
		if (elevator.mastery.tracao) elevator.compareHold += hdt;
		if (elevator.compareHold > .9 || elevator.y > 3.0999999999999996 && elevator.v > .12 && Fr > 0) {
			elevator.goal = "rise";
			queue$1("A diferença entre elas é a força resultante. Fr = T − P. E Fr = m·a.", 4.8);
			queue$1("Faça a carga subir. A tração precisa ser maior que o peso.", 3.8);
		}
	} else if (elevator.goal === "rise") {
		sim.objective = "4 · Faça a carga subir";
		elevator.hint = Fr > 8 ? "Tração maior que o peso. A resultante aponta para cima." : Math.abs(Fr) <= 8 ? "Forças equilibradas. Se a carga estava parada, ela continua parada." : "A tração ainda não supera o peso.";
		if (elevator.y > 3.0999999999999996 && elevator.v > .14 && Fr > 0) {
			elevator.mastery.aceleracao = true;
			elevator.goal = "balance";
			elevator.balanceHold = 0;
			queue$1("Agora pare a aceleração. Iguale a tração ao peso. Se ela ainda sobe, a velocidade não zera na hora.", 5.8);
		}
	} else if (elevator.goal === "balance") {
		sim.objective = "5 · Pare a aceleração";
		if (Math.abs(Fr) <= 8) {
			elevator.balanceHold += hdt;
			elevator.hint = Math.abs(elevator.v) > .35 ? "Resultante quase zero: a velocidade se conserva. Reduza a tração para frear, depois volte ao peso." : "Tração e peso continuam. A resultante é zero. A aceleração também.";
		} else {
			elevator.balanceHold = 0;
			elevator.hint = Fr > 0 ? "Ainda há resultante para cima. A tração está maior que o peso." : "Ainda há resultante para baixo.";
		}
		if (elevator.balanceHold > 1.05 && Math.abs(elevator.v) < .35) {
			elevator.v = 0;
			enterDescent();
		}
	} else if (elevator.goal === "descent") {
		sim.objective = "6 · Controle a descida";
		if (elevator.drop === 0) {
			elevator.hint = a < -.12 ? "Aceleração para baixo. Deixe a velocidade crescer um pouco." : "Reduza a tração abaixo do peso.";
			if (a < -.12 && elevator.v < -.18) elevator.drop = 1;
		} else if (elevator.drop === 1) {
			elevator.hint = "Iguale a tração ao peso sem parar a carga. Resultante zero não apaga a velocidade.";
			if (Math.abs(Fr) <= 8 && elevator.v < -.12) elevator.dropHold += hdt;
			else elevator.dropHold = 0;
			if (elevator.dropHold > .75) {
				elevator.drop = 2;
				elevator.mastery.resultante = true;
				queue$1("Observe: a velocidade não é zero, e a força resultante é. Velocidade e aceleração não são a mesma coisa.", 5.6);
			}
		} else {
			elevator.hint = "Freie antes do piso. Para frear na descida, a aceleração precisa apontar para cima, contra o movimento.";
			if (elevator.y > 1.7 && elevator.y < 8.2 && Math.abs(elevator.v) < .28 && Math.abs(a) <= .35 && a > -.08) enterLab();
		}
	} else if (elevator.goal === "lab") {
		sim.objective = "Laboratório · subida, equilíbrio e descida";
		if (!(elevator.loadId === "a" || elevator.loadId === "b" || elevator.loadId === "c")) elevator.hint = "E numa carga à esquerda: 20, 50 ou 100 kg. Depois ajuste a tração no painel.";
		else {
			if (a > .3 && elevator.v > .1) elevator.labUp = true;
			if (a < -.3 && elevator.v < -.1) elevator.labDown = true;
			if (Math.abs(Fr) <= 8 && Math.abs(elevator.v) < .2) elevator.labHold += hdt;
			else elevator.labHold = 0;
			if (elevator.labHold > .65) elevator.labBalance = true;
			if (Math.abs(Fr) <= 8 && elevator.v > .22) elevator.coastHold += hdt;
			else elevator.coastHold = 0;
			if (elevator.coastHold > .7) {
				elevator.labCoast = true;
				elevator.mastery.uniforme = true;
				elevator.mastery.resultante = true;
				if (!elevator.saidCoast) {
					elevator.saidCoast = true;
					queueAs$1("TIGRÃO", "Então força resultante zero não significa necessariamente objeto parado?", 3.6);
					queue$1("Exatamente. Resultante zero significa aceleração zero. Observe: a força resultante é zero, mas a carga continua em movimento.", 6.2);
				}
			}
			if (Math.abs(a) > .35 && Math.abs(Fr) > 30) {
				const known = elevator.samples.find((item) => item.mass === elevator.mass);
				if (known) {
					known.Fr = Fr;
					known.a = a;
				} else elevator.samples.push({
					mass: elevator.mass,
					Fr,
					a
				});
				if (!elevator.saidPair && elevator.samples.length >= 2) {
					const [first, second] = elevator.samples;
					if (first && second && Math.abs(first.Fr - second.Fr) < 25 && Math.abs(first.mass - second.mass) > 10) {
						elevator.saidPair = true;
						elevator.mastery.mesmaFr = true;
						const heavy = first.mass > second.mass ? first : second;
						const light = first.mass > second.mass ? second : first;
						queue$1(`Resultante parecida, perto de ${comma(light.Fr, 0)} N. ${comma(light.mass, 0)} kg acelerou ${comma(light.a, 2)} m/s²; ${comma(heavy.mass, 0)} kg acelerou ${comma(heavy.a, 2)} m/s². A massa maior acelera menos.`, 6.4);
					}
				}
			}
			const missing = [
				elevator.labUp ? "" : "subida",
				elevator.labBalance ? "" : "equilíbrio",
				elevator.labDown ? "" : "descida",
				elevator.labCoast ? "" : "resultante zero em movimento"
			].filter(Boolean);
			elevator.hint = missing.length ? `Com ${comma(elevator.mass, 0)} kg falta: ${missing.join(", ")}.` : "As quatro situações estão registradas. Troque a massa e repita uma resultante parecida.";
			if (elevator.labUp && elevator.labDown && elevator.labBalance && elevator.labCoast) enterProtocol();
		}
	} else if (elevator.goal === "protocol") {
		sim.objective = `7 · ${elevator.proto === 0 ? "Repouso" : elevator.proto === 1 ? "Acelerando" : elevator.proto === 2 ? "Velocidade constante" : "Frenagem"}`;
		if (elevator.v > elevator.flight.vMax) elevator.flight.vMax = elevator.v;
		if (!elevator.saidSurge && elevator.v > 5.55) {
			elevator.saidSurge = true;
			queue$1("Você aumentou demais a tração. Observe como isso aumentou a aceleração.", 3.6);
		}
		if (elevator.proto === 0) {
			elevator.hint = "Repouso: tração igual ao peso, resultante zero, velocidade zero.";
			if (Math.abs(Fr) < 12 && Math.abs(a) < .08 && Math.abs(elevator.v) < .18 && elevator.y < 2.2) elevator.protoHold += hdt;
			else elevator.protoHold = 0;
			if (elevator.protoHold > .85) {
				elevator.proto = 1;
				elevator.protoHold = 0;
				queue$1("Equilíbrio de forças: a resultante é aproximadamente zero.", 3.2);
				queue$1("Agora faça a carga subir. A tração precisa ser maior que o peso.", 3.4);
			}
		} else if (elevator.proto === 1) {
			elevator.hint = "Aceleração para cima: tração maior que o peso, velocidade crescendo.";
			if (elevator.y > 3.6 && a > .28 && elevator.v > .2) {
				elevator.proto = 2;
				elevator.protoHold = 0;
				queue$1("Agora iguale a tração ao peso sem parar a carga.", 3.4);
			}
		} else if (elevator.proto === 2) {
			elevator.hint = Math.abs(elevator.v) < .12 ? "A velocidade zerou. Aumente um pouco a tração e, no meio da subida, iguale de novo." : "Resultante perto de zero e velocidade para cima. Segure assim por um instante.";
			if (Math.abs(Fr) <= 10 && Math.abs(a) < .08 && elevator.v > .22) elevator.protoHold += hdt;
			else elevator.protoHold = 0;
			if (elevator.protoHold > .8) {
				elevator.proto = 3;
				queue$1("Resultante zero não significa necessariamente repouso.", 3.2);
				queue$1("Como a aceleração é zero, a velocidade permanece constante.", 3.4);
				queueAs$1("TIGRÃO", "Então, se a resultante é zero, a carga pode continuar subindo?", 3.2);
				queue$1("Sim. Se a velocidade já for diferente de zero, ela continua constante. Agora freie antes do topo.", 4.2);
			}
		} else if (!crashed) {
			if (!elevator.flight.brakeValid && brakingGate(a, elevator.v, elevator.y)) {
				elevator.flight.brakeValid = true;
				elevator.flight.brakeY = elevator.y;
				elevator.flight.brakeV = elevator.v;
				elevator.flight.brakeA = a;
				elevator.flight.brakeDur = 0;
				elevator.braking = true;
			} else if (elevator.flight.brakeValid && elevator.v > elevator.flight.brakeV - .04 && a > -.05) {
				elevator.flight.brakeValid = false;
				elevator.braking = false;
			}
			if (elevator.flight.brakeValid) {
				elevator.flight.brakeDur += hdt;
				if (a < elevator.flight.brakeA) elevator.flight.brakeA = a;
			}
			const inBand = elevator.y >= 8.45 && elevator.y <= 9.02;
			if (elevator.flight.brakeValid && inBand && elevator.v >= .45 && sim.time > elevator.warnAt) {
				elevator.warnAt = sim.time + 6;
				queue$1("Frenagem insuficiente. A velocidade ainda era alta na chegada.", 3.2);
			}
			elevator.hint = elevator.flight.brakeValid ? "Frenagem válida. A velocidade precisa cair antes do limite — bater no topo não conta." : "Tração abaixo do peso, ainda subindo, para a velocidade cair antes do topo.";
			if (arrivalAllowed({
				phase: "brake",
				brakeValid: elevator.flight.brakeValid,
				brakeV: elevator.flight.brakeV,
				y: elevator.y,
				v: elevator.v,
				hitTop: step.hitTop,
				brakeDur: elevator.flight.brakeDur
			})) finish$1();
		}
	} else {
		sim.objective = "Etapa 2 concluída · força resultante";
		elevator.hint = "Tração e peso continuam. Quem decide a aceleração é a resultante.";
		elevator.alarm = false;
	}
	if (Math.abs(elevator.v) > 5.6) elevator.v = Math.sign(elevator.v) * HOIST_V_MAX;
	pumpLines$1();
}
if (typeof window !== "undefined") window.__elevatorTest = {
	begin: beginStage2,
	get: hoistState,
	setTension: (n) => {
		elevator.tension = clampTension(n);
	},
	setMass: (n) => {
		elevator.mass = n;
	},
	setGravity: (n) => {
		elevator.g = n;
	},
	skipTransit: () => {
		sim.transit = 0;
		sim.x = -3.1;
		sim.z = -53.15;
		sim.yaw = Math.PI;
	}
};
function Cargo() {
	const car = (0, import_react.useRef)(null);
	const cable = (0, import_react.useRef)(null);
	const alarmL = (0, import_react.useRef)(null);
	const alarmR = (0, import_react.useRef)(null);
	const drum = (0, import_react.useRef)(null);
	const pick = (0, import_react.useRef)(null);
	const plate = (0, import_react.useMemo)(() => plateTexture("NEWTON-1"), []);
	const mission = (0, import_react.useMemo)(() => plateTexture("DINÂMICA"), []);
	const screen = (0, import_react.useMemo)(() => M.emit.clone(), []);
	useFrame((_, dt) => {
		const y = elevator.active ? elevator.y : 2.55;
		if (car.current) car.current.position.y = y;
		if (cable.current) {
			const top = 10.6;
			const hook = y + .72;
			const len = Math.max(.3, top - hook);
			cable.current.scale.y = len;
			cable.current.position.y = hook + len / 2;
			const tension = .02 + Math.min(.03, elevator.tension / 6e4);
			cable.current.scale.x = tension / .025;
			cable.current.scale.z = tension / .025;
		}
		if (drum.current) drum.current.rotation.x += elevator.v * dt * 1.6;
		if (pick.current) {
			const load = LOADS.find((item) => item.id === elevator.loadId);
			pick.current.visible = Boolean(load);
			if (load) pick.current.position.set(load.x, .05, load.z);
		}
		screen.emissive.set(elevator.alarm ? "#e07a4a" : elevator.v > .2 ? "#8fd0a8" : elevator.v < -.2 ? "#e0a23a" : "#7eb8cc");
		const flash = elevator.alarm ? 1.2 + Math.sin(sim.time * 14) * 1.6 : .12;
		if (alarmL.current) alarmL.current.intensity = flash;
		if (alarmR.current) alarmR.current.intensity = flash;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				0,
				-56
			],
			receiveShadow: true,
			material: M.floor,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [11.2, 14.6] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.02,
				-58.2
			],
			material: M.lane,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				1.15,
				1.45,
				28
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				4.35,
				-56
			],
			material: M.hullDark,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [11, 14.4] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				-5.52,
				2.15,
				-56
			],
			args: [
				.28,
				4.3,
				14.2
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				5.52,
				2.15,
				-56
			],
			args: [
				.28,
				4.3,
				14.2
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				0,
				2.15,
				-62.85
			],
			args: [
				11,
				4.3,
				.28
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				0,
				2.15,
				-48.95
			],
			args: [
				11,
				4.3,
				.28
			],
			material: M.hullDark
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				0,
				1.2,
				-48.78
			],
			args: [
				2.2,
				2.4,
				.08
			],
			material: M.suitBlue
		}),
		[
			-4.2,
			-1.4,
			1.4,
			4.2
		].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				x,
				2.2,
				-62.6
			],
			material: M.hullDark,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.12,
				4,
				.12
			] })
		}, x)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-5.2,
				3.55,
				-56
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: M.pipe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.06,
				.06,
				13.5,
				8
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				5.2,
				3.15,
				-57
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: M.pipe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.05,
				.05,
				12,
				8
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				.04,
				-55
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			material: M.stripe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.16, 8] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				-1.15,
				5.4,
				-58.2
			],
			args: [
				.18,
				9.2,
				.18
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				1.15,
				5.4,
				-58.2
			],
			args: [
				.18,
				9.2,
				.18
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				0,
				10.15,
				-58.2
			],
			args: [
				2.8,
				.28,
				1.4
			],
			material: M.suitBlue
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				9.7,
				-58.2
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: M.gold,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.28,
				.05,
				8,
				16
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			ref: drum,
			position: [
				0,
				10.05,
				-58.2
			],
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			material: M.hullDark,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.16,
				.16,
				.72,
				12
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			ref: cable,
			position: [
				0,
				8,
				-58.2
			],
			material: M.hullDark,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.025,
				.025,
				1,
				6
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: car,
			position: [
				SHAFT.x,
				2.55,
				SHAFT.z
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					material: M.suit,
					castShadow: true,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						1.35,
						1.05,
						1.15
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						0,
						.59
					],
					material: M.suitBlue,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						1.05,
						.28,
						.04
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						.62,
						0
					],
					material: M.gold,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.28,
						.12,
						.28
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.18,
						.62
					],
					rotation: [
						0,
						0,
						0
					],
					dispose: null,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.7, .22] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: plate,
						toneMapped: false
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				3.15,
				0,
				-52.2
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
					position: [
						0,
						.55,
						0
					],
					args: [
						1.15,
						1.1,
						.7
					],
					material: M.hullDark
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						1.28,
						.28
					],
					material: M.dark,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.7,
						.42,
						.06
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						1.28,
						.32
					],
					material: screen,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.58, .3] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						.28,
						.7,
						.38
					],
					material: M.stripe,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.08,
						.2,
						.08
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						-.28,
						.7,
						.38
					],
					material: M.suitBlue,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.06,
						.06,
						.22,
						8
					] })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				2.4,
				-62.55
			],
			dispose: null,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.4, .42] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: mission,
				toneMapped: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "SETOR DE CARGA",
			position: [
				0,
				3.3,
				-62.4
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "P = m · g",
			position: [
				-3.3,
				3.15,
				-62.45
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "FR = T − P",
			position: [
				0,
				2.55,
				-62.45
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "a = FR / m",
			position: [
				3.3,
				3.15,
				-62.45
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "GUINCHO",
			position: [
				3.15,
				1.85,
				-52.2
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "PLATAFORMA",
			position: [
				2.3,
				8.95,
				-57.1
			]
		}),
		LOADS.map((load) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				load.x,
				.36,
				load.z
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					material: load.mass > 80 ? M.dark : load.mass > 30 ? M.hull : M.suit,
					castShadow: true,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.72,
						.58,
						.72
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						.08,
						.37
					],
					material: M.stripe,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.46,
						.06,
						.03
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
					text: `${load.name}  ${load.mass} kg`,
					position: [
						0,
						.62,
						0
					]
				})
			]
		}, load.id)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			ref: pick,
			visible: false,
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			material: M.lane,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				.55,
				.68,
				24
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				GRAV.x,
				0,
				GRAV.z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
				position: [
					0,
					.48,
					0
				],
				args: [
					.62,
					.96,
					.42
				],
				material: M.hullDark
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.92,
					.22
				],
				material: M.emit,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.36, .18] })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "g  ESTAÇÃO / LUA",
			position: [
				GRAV.x,
				1.55,
				GRAV.z
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-1.7,
				8.62,
				-57.15
			],
			material: M.hull,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.5,
				.12,
				.42
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				1.7,
				8.62,
				-57.15
			],
			material: M.hull,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.5,
				.12,
				.42
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				8.62,
				-59.15
			],
			material: M.hullDark,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				3.6,
				.1,
				.28
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-2.15,
				6.4,
				-58.2
			],
			material: M.pipe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.04,
				.04,
				7.2,
				8
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				2.15,
				6.4,
				-58.2
			],
			material: M.pipe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.04,
				.04,
				7.2,
				8
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				-4.6,
				1.3,
				-54
			],
			material: M.alarm,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.12,
				.12,
				.5
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				4.6,
				1.3,
				-60
			],
			material: M.alarm,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.12,
				.12,
				.5
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			ref: alarmL,
			position: [
				-4.2,
				2.4,
				-54
			],
			color: "#e0a23a",
			distance: 8,
			decay: 2,
			intensity: .15
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			ref: alarmR,
			position: [
				4.2,
				2.4,
				-60
			],
			color: "#e0a23a",
			distance: 8,
			decay: 2,
			intensity: .15
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				3.2,
				-58.2
			],
			color: "#9fd4e6",
			distance: 10,
			decay: 2,
			intensity: 1.15
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-2,
				2.6,
				-51
			],
			color: "#d5e4ef",
			distance: 8,
			decay: 2,
			intensity: .55
		})
	] });
}
/** Work and energy. Every HUD number in stage 3 comes from these functions. */
function finite(n, fallback = 0) {
	return Number.isFinite(n) ? n : fallback;
}
/** W = F·d·cos(θ). θ in degrees. A right angle is exactly zero, not a float leftover. */
function workOf(force, distance, thetaDeg = 0) {
	const F = finite(force);
	const d = finite(distance);
	const theta = finite(thetaDeg);
	const wrapped = (theta % 360 + 360) % 360;
	const c = Math.abs(wrapped - 90) < 1e-6 || Math.abs(wrapped - 270) < 1e-6 ? 0 : Math.cos(theta * Math.PI / 180);
	const w = F * d * c;
	return Number.isFinite(w) ? w : 0;
}
/** Net work along a displacement. Same source as workOf, θ = 0 when Fr and d share a sign. */
function workFromResultant(resultant, signedDistance) {
	const Fr = finite(resultant);
	const d = finite(signedDistance);
	if (d === 0 || Fr === 0) return 0;
	return workOf(Math.abs(Fr), Math.abs(d), Math.sign(Fr) === Math.sign(d) ? 0 : 180);
}
/** Ec = ½mv². Speed is squared, so the sign of velocity does not create negative energy. */
function kineticEnergy(mass, speed) {
	const m = Math.max(0, finite(mass));
	const v = finite(speed);
	const e = .5 * m * v * v;
	return Number.isFinite(e) ? e : 0;
}
/** Epg = mgh. Negative mass, gravity or height do not produce a negative well. */
function potentialEnergy(mass, g, height) {
	const m = Math.max(0, finite(mass));
	const grav = Math.max(0, finite(g));
	const h = Math.max(0, finite(height));
	const e = m * grav * h;
	return Number.isFinite(e) ? e : 0;
}
/** Em = Ec + Epg. */
function mechanicalEnergy(kinetic, potential) {
	const e = finite(kinetic) + finite(potential);
	return Number.isFinite(e) ? e : 0;
}
/** Energy that left the mechanical account. Never negative: a gain is not dissipation. */
function dissipatedEnergy(initialMechanical, finalMechanical) {
	const lost = finite(initialMechanical) - finite(finalMechanical);
	return lost > 0 && Number.isFinite(lost) ? lost : 0;
}
/** W_resultante = Ec_final − Ec_inicial. */
function workEnergyDelta(initialKinetic, finalKinetic) {
	const w = finite(finalKinetic) - finite(initialKinetic);
	return Number.isFinite(w) ? w : 0;
}
/** True when mechanical energy is unchanged within a relative tolerance. */
function mechanicallyConserved(initial, final, tol = .08) {
	const a = finite(initial);
	const b = finite(final);
	const scale = Math.max(1, Math.abs(a), Math.abs(b));
	return Math.abs(a - b) <= Math.abs(tol) * scale;
}
/**
* Horizontal cart. Weight is perpendicular to the rail, so its work is zero.
* W = F·d should track ΔEc. Friction removes mechanical energy as heat.
*/
function stepCart(x, v, force, mass, mu, g, dt) {
	const m = Math.max(.5, finite(mass, 1));
	const step = Math.min(.05, Math.max(0, finite(dt)));
	const F = finite(force);
	const frictionMax = Math.max(0, finite(mu)) * m * Math.max(0, finite(g));
	const speed = finite(v);
	let friction = 0;
	if (Math.abs(speed) > .02) friction = -Math.sign(speed) * frictionMax;
	else if (Math.abs(F) <= frictionMax) friction = -F;
	else friction = -Math.sign(F || 1) * frictionMax;
	const a = (F + friction) / m;
	let vy = speed + a * step;
	if (Math.abs(speed) > .02 && Math.sign(vy) !== Math.sign(speed) && frictionMax > 0) vy = 0;
	const x0 = finite(x);
	const x1 = x0 + vy * step;
	const heat = frictionMax * Math.abs(x1 - x0);
	if (!Number.isFinite(x1) || !Number.isFinite(vy)) return {
		x: x0,
		v: 0,
		a: 0,
		heat: 0
	};
	return {
		x: x1,
		v: vy,
		a,
		heat: Number.isFinite(heat) ? heat : 0
	};
}
/** Vertical drop. Up is positive. Without friction, Em stays nearly constant. */
function stepFall(h, v, mass, g, mu, dt) {
	const m = Math.max(0, finite(mass));
	const grav = Math.max(0, finite(g));
	const step = Math.min(.05, Math.max(0, finite(dt)));
	const h0 = Math.max(0, finite(h));
	if (m <= 0) return {
		h: h0,
		v: 0,
		a: 0,
		heat: 0,
		ec: 0,
		epg: potentialEnergy(0, grav, h0),
		em: 0
	};
	const friction = Math.max(0, finite(mu)) * m * grav;
	const speed = finite(v);
	let a = -grav;
	if (friction > 0 && Math.abs(speed) > .02) a += -Math.sign(speed) * friction / m;
	let vy = speed + a * step;
	let hy = h0 + vy * step;
	if (hy < 0) {
		hy = 0;
		vy = 0;
	}
	const heat = friction * Math.abs(hy - h0);
	const ec = kineticEnergy(m, vy);
	const epg = potentialEnergy(m, grav, hy);
	return {
		h: hy,
		v: vy,
		a,
		heat: Number.isFinite(heat) ? heat : 0,
		ec,
		epg,
		em: mechanicalEnergy(ec, epg)
	};
}
var INVULN_TIME = 1.8;
var CHECKPOINTS = [
	{
		id: 1,
		x: 14.2,
		z: -56,
		name: "Entrada do módulo"
	},
	{
		id: 2,
		x: 17.2,
		z: -56.8,
		name: "Laboratório de energia"
	},
	{
		id: 3,
		x: 22.4,
		z: -54.2,
		name: "Câmara das rampas"
	},
	{
		id: 4,
		x: 24.4,
		z: -56,
		name: "Núcleo de energia"
	}
];
var PICKUPS = [
	{
		id: "core-a",
		kind: "core",
		x: 18.6,
		z: -54.4
	},
	{
		id: "core-b",
		kind: "core",
		x: 23.5,
		z: -55.4
	},
	{
		id: "core-c",
		kind: "core",
		x: 21.4,
		z: -61.1
	},
	{
		id: "cell",
		kind: "cell",
		x: 14.9,
		z: -53.4
	},
	{
		id: "full",
		kind: "full",
		x: 26.4,
		z: -53.1
	}
];
function freshCrew() {
	return {
		lives: 3,
		invuln: 0,
		score: 0,
		cores: 0,
		checkpoint: 1,
		over: false,
		flash: 0,
		source: "",
		tries: 0,
		solved: {},
		picked: {}
	};
}
function freshAliens() {
	return [
		{
			id: "drone",
			kind: "patrol",
			x: 19.2,
			z: -62.2,
			homeX: 19.2,
			homeZ: -62.2,
			span: 2.4,
			mode: "patrol",
			t: 0,
			disabled: false
		},
		{
			id: "field",
			kind: "energy",
			x: 19.4,
			z: -61.2,
			homeX: 19.4,
			homeZ: -61.2,
			span: 0,
			mode: "patrol",
			t: 0,
			disabled: false
		},
		{
			id: "guardian",
			kind: "guardian",
			x: 25.2,
			z: -56.8,
			homeX: 25.2,
			homeZ: -56.8,
			span: 0,
			mode: "patrol",
			t: 0,
			disabled: false
		}
	];
}
function takeDamage(crew, source) {
	if (crew.over || crew.invuln > 0 || crew.lives <= 0) return {
		...crew,
		applied: false
	};
	const lives = Math.max(0, crew.lives - 1);
	return {
		...crew,
		lives,
		invuln: INVULN_TIME,
		over: lives <= 0,
		score: Math.max(0, crew.score - 25),
		flash: .45,
		source,
		applied: true
	};
}
function tickCrew(crew, dt) {
	const step = Math.min(.05, Math.max(0, Number.isFinite(dt) ? dt : 0));
	return {
		...crew,
		lives: Math.max(0, Math.min(3, crew.lives)),
		invuln: Math.max(0, crew.invuln - step),
		flash: Math.max(0, crew.flash - step),
		score: Math.max(0, crew.score),
		cores: Math.max(0, Math.min(5, crew.cores))
	};
}
function heal(crew, amount) {
	if (crew.lives >= 3 || amount <= 0) return {
		...crew,
		lives: Math.min(3, crew.lives),
		gained: false
	};
	return {
		...crew,
		lives: Math.min(3, crew.lives + amount),
		gained: true
	};
}
function addCore(crew) {
	if (crew.cores >= 5) return {
		...crew,
		gained: false
	};
	return {
		...crew,
		cores: crew.cores + 1,
		score: crew.score + 150,
		gained: true
	};
}
function addScore(crew, amount) {
	const next = crew.score + (Number.isFinite(amount) ? amount : 0);
	return {
		...crew,
		score: Math.max(0, Math.min(99999, next))
	};
}
function reachCheckpoint(crew, id) {
	if (id <= crew.checkpoint) return {
		...crew,
		fresh: false
	};
	return {
		...crew,
		checkpoint: id,
		score: crew.score + 100,
		fresh: true
	};
}
function challengeOf(id) {
	if (id === "work") {
		const answer = workOf(50, 6, 0);
		return {
			id,
			title: "Trabalho",
			prompt: "Um alien de energia trava a plataforma. A força de 50 N acompanha 6 m de deslocamento.",
			facts: "F = 50 N · d = 6 m · θ = 0°",
			options: [
				50,
				100,
				answer,
				600
			],
			answer,
			explain: "A força está no mesmo sentido do deslocamento. W = 50 × 6 × cos 0° = 300 J.",
			hint: "Observe o ângulo. Se θ = 0°, cos θ = 1 e W = F·d."
		};
	}
	if (id === "kinetic") {
		const answer = kineticEnergy(10, 6);
		return {
			id,
			title: "Energia cinética",
			prompt: "O mecanismo pede a energia de uma carga de 10 kg a 6 m/s.",
			facts: "m = 10 kg · v = 6 m/s · Ec = ½mv²",
			options: [
				60,
				answer,
				360,
				90
			],
			answer,
			explain: "Ec = ½ × 10 × 6² = 180 J. A velocidade entra ao quadrado.",
			hint: "Eleve a velocidade ao quadrado antes de multiplicar pela metade da massa."
		};
	}
	if (id === "potential") {
		const answer = potentialEnergy(20, 9.8, 5);
		return {
			id,
			title: "Energia potencial",
			prompt: "A plataforma pede a energia para erguer 20 kg por 5 m.",
			facts: "m = 20 kg · g = 9,8 m/s² · h = 5 m",
			options: [
				100,
				490,
				answer,
				1960
			],
			answer,
			explain: "Epg = mgh = 20 × 9,8 × 5 = 980 J. Mais alto, mais energia armazenada.",
			hint: "Multiplique massa, gravidade e altura. Nenhum desses três pode faltar."
		};
	}
	if (id === "guard-work") {
		const answer = workOf(100, 5, 0);
		return {
			id,
			title: "Guardião · trabalho",
			prompt: "O núcleo exige 500 J. Uma força de 100 N age por 5 m, no mesmo sentido.",
			facts: "F = 100 N · d = 5 m · θ = 0°",
			options: [
				20,
				105,
				answer,
				250
			],
			answer,
			explain: "W = 100 × 5 = 500 J. Esse trabalho é a energia que o núcleo aceita.",
			hint: "Mesma direção e mesmo sentido: o cosseno vale 1."
		};
	}
	if (id === "guard-energy") {
		const answer = mechanicalEnergy(0, potentialEnergy(2, 9.81, 10));
		return {
			id,
			title: "Guardião · conservação",
			prompt: "Uma carga de 2 kg parte do repouso a 10 m. Qual é a energia mecânica?",
			facts: "v = 0 · h = 10 m · Em = Ec + Epg",
			options: [
				98.1,
				answer,
				392.4,
				20
			],
			answer,
			explain: "No alto, Ec = 0 e Epg = 2 × 9,81 × 10 = 196,2 J. Em é essa soma.",
			hint: "Se a velocidade é zero, a cinética é zero. Resta o mgh."
		};
	}
	const lost = dissipatedEnergy(490.5, 320);
	return {
		id,
		title: "Guardião · dissipação",
		prompt: "A mecânica caiu de 490,5 J para 320 J. Quanto virou calor?",
		facts: "Em não desaparece. A diferença foi dissipada.",
		options: [
			120,
			lost,
			490.5,
			810.5
		],
		answer: lost,
		explain: "490,5 − 320 = 170,5 J deixaram de ser energia mecânica. Viraram calor no atrito.",
		hint: "Subtraia a energia mecânica final da inicial. O que saiu não sumiu."
	};
}
function gradeChallenge(id, picked) {
	const spec = challengeOf(id);
	return {
		ok: Number.isFinite(picked) && Math.abs(picked - spec.answer) < .05,
		spec
	};
}
function stepAlien(alien, px, pz, dt, asleep) {
	const step = Math.min(.05, Math.max(0, Number.isFinite(dt) ? dt : 0));
	const next = {
		...alien,
		t: alien.t + step
	};
	if (asleep || next.disabled) {
		next.disabled = true;
		next.mode = "sleep";
		next.x += (next.homeX - next.x) * Math.min(1, step * 2);
		next.z += (next.homeZ + 1.2 - next.z) * Math.min(1, step * 2);
		return next;
	}
	const dist = Math.hypot(px - next.x, pz - next.z);
	if (next.kind === "energy") {
		next.mode = dist < 3.4 ? "alert" : "patrol";
		return next;
	}
	if (next.kind === "guardian") {
		next.mode = dist < 1.7 ? "attack" : "patrol";
		return next;
	}
	if (dist < .85) next.mode = "attack";
	else if (dist < 3.1) next.mode = "chase";
	else if (next.mode === "chase" || next.mode === "attack" || next.mode === "alert") next.mode = "return";
	else next.mode = dist < 4.2 ? "alert" : "patrol";
	if (next.mode === "chase" || next.mode === "attack") {
		const len = Math.max(.001, dist);
		const speed = 1.55;
		next.x += (px - next.x) / len * speed * step;
		next.z += (pz - next.z) / len * speed * step;
	} else if (next.mode === "return") {
		next.x += (next.homeX - next.x) * Math.min(1, step * 1.4);
		next.z += (next.homeZ - next.z) * Math.min(1, step * 1.4);
		if (Math.hypot(next.homeX - next.x, next.homeZ - next.z) < .3) next.mode = "patrol";
	} else {
		next.x = next.homeX + Math.sin(next.t * .8) * next.span;
		next.z = next.homeZ;
		next.mode = "patrol";
	}
	return next;
}
function crateZ(time) {
	return -52.6 + Math.sin(time * .9) * 1.1;
}
function hazardHits(aliens, px, pz, time, shield) {
	if (shield) return null;
	for (const alien of aliens) {
		if (alien.disabled || alien.mode === "sleep") continue;
		const dist = Math.hypot(px - alien.x, pz - alien.z);
		if (alien.kind === "patrol" && alien.mode === "attack" && dist < .85) return {
			source: "drone de patrulha",
			ox: alien.x,
			oz: alien.z
		};
		if (alien.kind === "energy" && dist < 1.35) return {
			source: "campo do alien de energia",
			ox: alien.x,
			oz: alien.z
		};
		if (alien.kind === "guardian" && alien.mode === "attack" && dist < 1.15) return {
			source: "guardião do núcleo",
			ox: alien.x,
			oz: alien.z
		};
	}
	const cz = crateZ(time);
	if (Math.hypot(px - 18.5, pz - cz) < .55) return {
		source: "caixa em movimento",
		ox: 18.5,
		oz: cz
	};
	return null;
}
var HATCH = {
	x: 15.4,
	z: -60.2
};
var HOIST = {
	x: 16.8,
	z: -56
};
var DIAL = {
	x: 21.2,
	z: -60.4
};
var TRACK = {
	x: 22.6,
	z: -53.5
};
var CORE = {
	x: 25.2,
	z: -56
};
var ANGLES = [
	0,
	30,
	45,
	60,
	90,
	120,
	180
];
var TRANSIT = 5.2;
var vault = {
	active: false,
	goal: "arrive",
	hint: "",
	note: "",
	mass: 20,
	g: HOIST_G,
	tension: 20 * HOIST_G,
	workT: 0,
	y: 1.2,
	v: 0,
	yMark: 1.2,
	angle: 0,
	angleI: 0,
	benchF: 100,
	benchD: 0,
	cartX: 0,
	cartV: 0,
	cartF: 80,
	cartM: 20,
	h: 5,
	fallV: 0,
	mu: 0,
	thermal: 0,
	em0: 0,
	sawUp: false,
	kinSlow: false,
	kinFast: false,
	kinV: 2,
	ang0: false,
	ang90: false,
	ang180: false,
	hold: 0,
	finale: 0,
	t0: 0,
	lineQueue: [],
	modules: 0,
	crew: freshCrew(),
	aliens: freshAliens(),
	quiz: null,
	quizNote: "",
	banner: "",
	bannerT: 0,
	guardianSleep: false
};
function resetVault() {
	vault.active = false;
	vault.goal = "arrive";
	vault.hint = "";
	vault.note = "";
	vault.mass = 20;
	vault.g = HOIST_G;
	vault.tension = 20 * HOIST_G;
	vault.workT = 0;
	vault.y = 1.2;
	vault.v = 0;
	vault.yMark = 1.2;
	vault.angle = 0;
	vault.angleI = 0;
	vault.benchF = 100;
	vault.benchD = 0;
	vault.cartX = 0;
	vault.cartV = 0;
	vault.cartF = 80;
	vault.cartM = 20;
	vault.h = 5;
	vault.fallV = 0;
	vault.mu = 0;
	vault.thermal = 0;
	vault.em0 = potentialEnergy(10, HOIST_G, 5);
	vault.sawUp = false;
	vault.kinSlow = false;
	vault.kinFast = false;
	vault.kinV = 2;
	vault.ang0 = false;
	vault.ang90 = false;
	vault.ang180 = false;
	vault.hold = 0;
	vault.finale = 0;
	vault.lineQueue = [];
	vault.modules = 0;
	vault.crew = freshCrew();
	vault.aliens = freshAliens();
	vault.quiz = null;
	vault.quizNote = "";
	vault.banner = "";
	vault.bannerT = 0;
	vault.guardianSleep = false;
	sim.downed = false;
}
function queue(text, seconds = 3.6) {
	vault.lineQueue.push({
		speaker: "NEWTON",
		text,
		seconds
	});
}
function queueAs(speaker, text, seconds = 3.2) {
	vault.lineQueue.push({
		speaker,
		text,
		seconds
	});
}
function pumpLines() {
	if (sim.line) return;
	const next = vault.lineQueue.shift();
	if (next) speak(next.speaker, next.text, next.seconds);
}
function near(p, r = 1.85) {
	return Math.hypot(sim.x - p.x, sim.z - p.z) < r;
}
function mark(goal, modules) {
	vault.goal = goal;
	vault.modules = modules;
	vault.hold = 0;
	sfx.ui();
}
function vaultState() {
	const dy = vault.y - vault.yMark;
	const tensionWork = vault.workT;
	const weightWork = workOf(vault.mass * vault.g, Math.abs(dy), dy >= 0 ? 180 : 0);
	const ec = kineticEnergy(vault.mass, vault.v);
	const epg = potentialEnergy(vault.mass, vault.g, Math.max(0, vault.y - 1.05));
	const benchW = workOf(vault.benchF, vault.benchD, vault.angle);
	const cartEc = kineticEnergy(vault.cartM, vault.cartV);
	const cartW = workFromResultant(vault.cartF, vault.cartX);
	const fallEc = kineticEnergy(10, vault.fallV);
	const fallEpg = potentialEnergy(10, vault.g, vault.h);
	const fallEm = fallEc + fallEpg;
	return {
		goal: vault.goal,
		hint: vault.hint,
		note: vault.note,
		active: vault.active,
		done: vault.goal === "done",
		finale: vault.finale,
		modules: vault.modules,
		mass: vault.mass,
		g: vault.g,
		tension: vault.tension,
		y: vault.y,
		v: vault.v,
		h: Math.max(0, vault.y - 1.05),
		dy,
		tensionWork,
		weightWork,
		netWork: tensionWork + weightWork,
		ec,
		epg,
		em: ec + epg,
		angle: vault.angle,
		benchF: vault.benchF,
		benchD: vault.benchD,
		benchW,
		kinV: vault.kinV,
		kinEc: kineticEnergy(50, vault.kinV),
		cartX: vault.cartX,
		cartV: vault.cartV,
		cartW,
		cartEc,
		cartDelta: workEnergyDelta(0, cartEc),
		fallH: vault.h,
		fallV: vault.fallV,
		fallEc,
		fallEpg,
		fallEm,
		thermal: vault.thermal,
		em0: vault.em0,
		mu: vault.mu
	};
}
function beginStage3() {
	if (sim.stage === 3 && vault.active) return;
	resetVault();
	vault.active = true;
	vault.t0 = sim.time;
	sim.stage = 3;
	sim.phase = "play";
	sim.paused = false;
	sim.mapOpen = false;
	sim.freeplay = false;
	sim.scanner = false;
	sim.solved = false;
	sim.animLock = null;
	sim.transit = TRANSIT;
	sim.x = 14.1;
	sim.y = 0;
	sim.z = -56;
	sim.yaw = Math.PI / 2;
	sim.vx = 0;
	sim.vy = 0;
	sim.vz = 0;
	sim.speed = 0;
	sim.objective = "1 · O que é trabalho?";
	vault.hint = "Caminhe até a escotilha travada.";
	queue("Tigrão, conseguimos controlar as forças. Agora precisamos descobrir para onde vai a energia.", 4.4);
	queue("Na missão anterior, a resultante produzia aceleração. Aqui a força encontra um deslocamento.", 4.6);
	queueAs("TIGRÃO", "Então força sozinha não basta?", 2.6);
	queue("Exatamente. Sem deslocamento, o trabalho mecânico é zero.", 3.4);
	const first = vault.lineQueue.shift();
	if (first) speak(first.speaker, first.text, first.seconds);
}
function finish() {
	if (vault.goal === "done") return;
	vault.goal = "done";
	vault.modules = 8;
	vault.finale = 7;
	vault.hint = "O núcleo aceitou a energia. Trabalho e energia contam a mesma história.";
	sim.objective = "Etapa 3 concluída";
	sim.animLock = "celebrate";
	sfx.success();
	queue("O núcleo estável não recebeu força mágica.", 3.2);
	queue("Recebeu trabalho, transformação e o que o atrito tinha espalhado em calor.", 4.2);
	queueAs("TIGRÃO", "A energia não sumiu. Só mudou de endereço.", 3.2);
}
function banner(text) {
	vault.banner = text;
	vault.bannerT = 1.6;
}
function tickThreats(hdt) {
	vault.bannerT = Math.max(0, vault.bannerT - hdt);
	if (vault.bannerT <= 0) vault.banner = "";
	const asleepField = Boolean(vault.crew.solved.work);
	const asleepGuard = vault.guardianSleep;
	vault.aliens = vault.aliens.map((alien) => stepAlien(alien, sim.x, sim.z, hdt, alien.kind === "energy" && asleepField || alien.kind === "guardian" && asleepGuard));
	vault.crew = tickCrew(vault.crew, hdt);
	if (!vault.quiz && vault.goal !== "done") {
		const hit = hazardHits(vault.aliens, sim.x, sim.z, sim.time, false);
		if (hit) {
			const next = takeDamage(vault.crew, hit.source);
			vault.crew = next;
			if (next.applied) {
				const len = Math.hypot(sim.x - hit.ox, sim.z - hit.oz) || 1;
				sim.vx += (sim.x - hit.ox) / len * 3.4;
				sim.vz += (sim.z - hit.oz) / len * 3.4;
				sim.shake = Math.max(sim.shake, .28);
				sfx.hit();
				if (next.over) {
					sim.downed = true;
					sfx.fail();
				}
				publishNow();
			}
		}
	}
	for (const point of CHECKPOINTS) {
		if (Math.hypot(sim.x - point.x, sim.z - point.z) > 1.35) continue;
		const next = reachCheckpoint(vault.crew, point.id);
		vault.crew = next;
		if (next.fresh) {
			banner(`Checkpoint ativado · ${point.name}`);
			sfx.ui();
		}
	}
	for (const item of PICKUPS) {
		if (vault.crew.picked[item.id]) continue;
		if (Math.hypot(sim.x - item.x, sim.z - item.z) > .8) continue;
		vault.crew = {
			...vault.crew,
			picked: {
				...vault.crew.picked,
				[item.id]: true
			}
		};
		if (item.kind === "core") {
			const next = addCore(vault.crew);
			vault.crew = next;
			if (next.gained) {
				banner("Núcleo de energia +1");
				sfx.success();
			}
		} else if (item.kind === "cell") {
			const next = heal(vault.crew, 1);
			vault.crew = next;
			banner(next.gained ? "Célula de energia · +1 vida" : "Vidas já estão no máximo");
			sfx.ui();
		} else {
			const next = heal(vault.crew, 3);
			vault.crew = next;
			banner(next.gained ? "Recuperação completa" : "Vidas já estão no máximo");
			sfx.success();
		}
	}
}
function answerChallenge(index) {
	if (!vault.quiz || sim.stage !== 3) return;
	const spec = challengeOf(vault.quiz);
	const picked = spec.options[index];
	if (picked == null) return;
	if (!gradeChallenge(vault.quiz, picked).ok) {
		vault.crew = {
			...vault.crew,
			tries: vault.crew.tries + 1
		};
		vault.quizNote = spec.hint;
		sfx.fail();
		return;
	}
	const first = vault.crew.tries === 0;
	vault.crew = addScore({
		...vault.crew,
		tries: 0,
		solved: {
			...vault.crew.solved,
			[vault.quiz]: true
		}
	}, first ? 150 : 100);
	vault.quizNote = spec.explain;
	sfx.success();
	const order = [
		"guard-work",
		"guard-energy",
		"guard-heat"
	];
	if (vault.quiz === "work") {
		vault.crew = addCore(vault.crew);
		vault.quiz = null;
		banner("Campo desligado · 300 J transferidos");
		return;
	}
	const guardIndex = order.indexOf(vault.quiz);
	if (guardIndex >= 0 && guardIndex < order.length - 1) {
		vault.quiz = order[guardIndex + 1] ?? null;
		return;
	}
	if (vault.quiz === "guard-heat") {
		vault.crew = addCore(vault.crew);
		vault.quiz = null;
		vault.guardianSleep = true;
		banner("O guardião recuou. O núcleo pode receber a energia.");
		queue("O guardião não foi destruído. Sem energia para sustentar o campo, ele apenas dorme.", 4);
		return;
	}
	vault.quiz = null;
	banner("Cálculo confirmado");
}
function openChallenge(id) {
	if (vault.crew.solved[id] || vault.crew.over) return;
	vault.quiz = id;
	vault.quizNote = "";
	vault.crew = {
		...vault.crew,
		tries: 0
	};
	sfx.ui();
}
function resumeCheckpoint() {
	const spot = CHECKPOINTS.find((item) => item.id === vault.crew.checkpoint) ?? CHECKPOINTS[0];
	if (!spot) return;
	sim.downed = false;
	sim.paused = false;
	sim.x = spot.x;
	sim.y = 0;
	sim.z = spot.z;
	sim.vx = 0;
	sim.vy = 0;
	sim.vz = 0;
	sim.speed = 0;
	vault.crew = {
		...vault.crew,
		lives: 3,
		invuln: 1.8,
		over: false,
		flash: 0
	};
	vault.quiz = null;
	banner(`Retorno · ${spot.name}`);
	sfx.ui();
}
function tickVault(dt) {
	if (sim.stage !== 3) {
		if (vault.active && vault.goal !== "done") vault.active = false;
		return;
	}
	const tap = sim.actEdge;
	sim.actEdge = false;
	const hdt = Math.min(.05, Math.max(0, Number.isFinite(dt) ? dt : 0));
	if (!vault.active) return;
	if (sim.transit > 0) {
		sim.transit = Math.max(0, sim.transit - hdt);
		pumpLines();
		return;
	}
	tickThreats(hdt);
	if (vault.crew.over) {
		sim.downed = true;
		pumpLines();
		return;
	}
	if (vault.finale > 0) {
		vault.finale = Math.max(0, vault.finale - hdt);
		sim.x = CORE.x - 1.6;
		sim.z = CORE.z + 1.1;
		sim.yaw = Math.atan2(CORE.x - sim.x, CORE.z - sim.z);
	}
	const e = held.has("KeyE");
	const shift = held.has("ShiftLeft") || held.has("ShiftRight") || sim.touchSprint;
	const atHoist = near(HOIST);
	const P = vault.mass * vault.g;
	if (vault.goal === "positive" || vault.goal === "negative" || vault.goal === "potential") {
		if (atHoist && e) {
			const dir = shift ? -1 : 1;
			const stepN = tap ? 12 : 70 * hdt;
			vault.tension = Math.max(0, Math.min(1800, vault.tension + dir * stepN));
		} else if (atHoist && tap) vault.tension = Math.max(0, Math.min(1800, vault.tension + (shift ? -12 : 12)));
		const prevY = vault.y;
		const step = integrateVariable(vault.y, vault.v, vault.tension, vault.mass, vault.g, hdt, false, 1.05, 7.4);
		vault.y = step.y;
		vault.v = step.v;
		const moved = vault.y - prevY;
		if (moved >= 0) vault.workT += workOf(vault.tension, moved, 0);
		else vault.workT += workOf(vault.tension, -moved, 180);
		if (step.v > .12) vault.sawUp = true;
	}
	if (vault.goal === "angle") {
		vault.benchD = Math.min(4, vault.benchD + .55 * hdt);
		if (near(DIAL) && tap) {
			vault.angleI = (vault.angleI + 1) % ANGLES.length;
			vault.angle = ANGLES[vault.angleI] ?? 0;
			sfx.ui();
		}
		const w = workOf(vault.benchF, vault.benchD, vault.angle);
		if (vault.benchD > 1.4 && vault.angle === 0 && w > 50) vault.ang0 = true;
		if (vault.benchD > 1.4 && vault.angle === 90 && Math.abs(w) < 1) vault.ang90 = true;
		if (vault.benchD > 1.4 && vault.angle === 180 && w < -50) vault.ang180 = true;
	}
	if (vault.goal === "kinetic" && near(TRACK) && tap) {
		vault.kinV = vault.kinV < 3 ? 4 : 2;
		vault.hold = 0;
		sfx.ui();
	}
	if (vault.goal === "kinetic") {
		vault.hold += hdt;
		if (vault.kinV === 2 && vault.hold > .45) vault.kinSlow = true;
		if (vault.kinV === 4 && vault.hold > .45) vault.kinFast = true;
	}
	if (vault.goal === "theorem") {
		const step = stepCart(vault.cartX, vault.cartV, vault.cartF, vault.cartM, 0, vault.g, hdt);
		vault.cartX = Math.min(6, step.x);
		vault.cartV = step.v;
	}
	if (vault.goal === "fall" || vault.goal === "friction") {
		const step = stepFall(vault.h, vault.fallV, 10, vault.g, vault.mu, hdt);
		vault.thermal += step.heat;
		vault.h = step.h;
		vault.fallV = step.v;
	}
	const s = vaultState();
	if (vault.goal === "arrive") {
		sim.objective = "1 · O que é trabalho?";
		vault.hint = "A escotilha travada está à esquerda. Encoste nela e segure E.";
		vault.note = "Força sem deslocamento não transfere energia.";
		if (near(HATCH)) {
			mark("null", 0);
			queue("A escotilha não cede. Existe força. Não existe deslocamento.", 3.8);
		}
	} else if (vault.goal === "null") {
		sim.objective = "2 · Trabalho nulo";
		vault.hint = near(HATCH) ? "Segure E. A força existe. O deslocamento continua zero." : "Volte à escotilha travada.";
		vault.note = "W = F·d·cosθ. Se d = 0, W = 0.";
		if (near(HATCH) && e) vault.hold += hdt;
		else vault.hold = 0;
		if (vault.hold > 1.15 && workOf(80, 0, 0) === 0) {
			mark("positive", 1);
			vault.mass = 20;
			vault.y = 1.2;
			vault.v = 0;
			vault.yMark = 1.2;
			vault.tension = 20 * HOIST_G;
			vault.workT = 0;
			vault.sawUp = false;
			queue("A força continua existindo, mas sem deslocamento não há trabalho mecânico.", 4);
			queue("Agora eleve a carga de 20 kg. Tração e deslocamento apontam para cima: o trabalho é positivo.", 4.4);
		}
	} else if (vault.goal === "positive") {
		sim.objective = "3 · Trabalho positivo";
		vault.hint = atHoist ? "E aumenta a tração. Shift+E diminui. A carga precisa subir." : "O guincho está no centro da sala.";
		vault.note = "θ = 0° · cos 0° = 1 · W = F·d";
		if (vault.sawUp && s.dy > 1.15 && s.tensionWork > 180) {
			mark("negative", 2);
			vault.y = 4.4;
			vault.v = 0;
			vault.yMark = 4.4;
			vault.tension = Math.max(0, P - 70);
			vault.workT = 0;
			queue("A força atuou no mesmo sentido do deslocamento. O trabalho foi positivo.", 3.8);
			queue("Agora a carga desce e a tração continua para cima. Isso é trabalho negativo — a frenagem da etapa anterior.", 4.6);
		}
	} else if (vault.goal === "negative") {
		sim.objective = "4 · Trabalho negativo";
		vault.hint = "Deixe descer. Se quiser, Shift+E reduz ainda mais a tração. O trabalho da tração fica negativo.";
		vault.note = "θ = 180° · a força de sustentação aponta contra o deslocamento.";
		if (s.dy < -.9 && s.tensionWork < -80 && vault.v < -.05) {
			mark("angle", 3);
			vault.benchD = 0;
			vault.angle = 0;
			vault.angleI = 0;
			queue("A força de frenagem atua contra o deslocamento. Por isso, seu trabalho é negativo.", 4.2);
			queue("No trilho ao fundo, gire o ângulo com E. 0° transfere, 90° não, 180° retira.", 4.4);
		}
	} else if (vault.goal === "angle") {
		sim.objective = "5 · O ângulo importa";
		vault.hint = near(DIAL) ? `Ângulo ${vault.angle}°. E troca o ângulo. Falta: ${[
			vault.ang0 ? "" : "0°",
			vault.ang90 ? "" : "90°",
			vault.ang180 ? "" : "180°"
		].filter(Boolean).join(", ") || "nada"}.` : "O disco de ângulo está no fundo da sala.";
		vault.note = "θ = 90° · a força é perpendicular ao deslocamento · W = 0.";
		if (vault.ang0 && vault.ang90 && vault.ang180) {
			mark("kinetic", 4);
			vault.kinV = 2;
			vault.hold = 0;
			queue("Força perpendicular ao deslocamento não realiza trabalho. Força não é a mesma coisa que trabalho.", 4.6);
			queueAs("TIGRÃO", "E se a velocidade dobrar?", 2.4);
			queue("A energia cinética não dobra. Ela quadruplica. Ec = ½mv².", 3.8);
		}
	} else if (vault.goal === "kinetic") {
		sim.objective = "6 · Energia cinética";
		vault.hint = near(TRACK) ? "E alterna 2 m/s e 4 m/s. A massa fica em 50 kg. Compare as duas energias." : "A bancada de velocidade está no trilho.";
		vault.note = "Ec = ½mv². Dobrar v multiplica a energia por quatro.";
		if (vault.kinSlow && vault.kinFast) {
			const slow = kineticEnergy(50, 2);
			if (kineticEnergy(50, 4) > slow * 3.9) {
				mark("theorem", 5);
				vault.cartX = 0;
				vault.cartV = 0;
				queue("50 kg a 4 m/s têm 400 J. A 2 m/s, 100 J. A velocidade pesa ao quadrado.", 4.2);
				queue("No trilho, o peso é perpendicular ao deslocamento: trabalho nulo. Quem muda a energia cinética é a força ao longo do trilho.", 5);
			}
		}
	} else if (vault.goal === "theorem") {
		sim.objective = "7 · Trabalho e energia cinética";
		const scale = Math.max(1, Math.abs(s.cartW), Math.abs(s.cartDelta));
		const close = Math.abs(s.cartW - s.cartDelta) < .08 * scale;
		vault.hint = "A força empurra o carrinho. Compare o trabalho com a variação da energia cinética.";
		vault.note = "W_resultante = ΔEc. O peso, perpendicular ao trilho, não entra nessa conta.";
		if (s.cartX > 1.6 && s.cartV > .4 && close) {
			mark("potential", 5);
			vault.mass = 10;
			vault.g = HOIST_G;
			vault.y = 1.12;
			vault.v = 0;
			vault.yMark = 1.12;
			vault.tension = 10 * HOIST_G;
			vault.workT = 0;
			vault.sawUp = false;
			queue("O trabalho da resultante apareceu como energia cinética. W = ΔEc.", 3.8);
			queue("Agora eleve 10 kg até cerca de 5 m. A energia potencial é mgh.", 4);
		}
	} else if (vault.goal === "potential") {
		sim.objective = "8 · Energia potencial";
		const h = Math.max(0, vault.y - 1.05);
		vault.hint = atHoist ? "E aumenta a tração. A altura de referência é o piso do guincho. Alvo: 5 m." : "Volte ao guincho. Carga de 10 kg.";
		vault.note = "Epg = mgh. Mais alto, mais energia armazenada no campo gravitacional.";
		const epg = potentialEnergy(10, HOIST_G, h);
		if (h > 4.85 && h < 6.4 && Math.abs(vault.v) < .55 && Math.abs(epg - 490.5) < 40) {
			mark("fall", 6);
			vault.h = 5;
			vault.fallV = 0;
			vault.mu = 0;
			vault.thermal = 0;
			vault.em0 = potentialEnergy(10, HOIST_G, 5);
			queue("10 kg, 9,81 m/s², 5 m. Epg fica em 490,5 J. A altura entrou na conta.", 4.2);
			queue("Solte a carga. A potencial deve virar cinética. A mecânica fica quase constante.", 4.2);
		}
	} else if (vault.goal === "fall") {
		sim.objective = "9 · Conservação";
		vault.hint = "Observe a queda sem atrito. Uma barra desce, a outra sobe, a soma quase não muda.";
		vault.note = "Em = Ec + Epg. Sem dissipação, Em inicial ≈ Em final.";
		const dropped = vault.em0 - s.fallEpg > 80 && s.fallEc > 60;
		if (vault.h < 1.15 && vault.h > .2 && vault.fallV < -.8 && dropped && mechanicallyConserved(vault.em0, s.fallEm, .18)) {
			mark("friction", 7);
			vault.h = 5;
			vault.fallV = 0;
			vault.mu = .35;
			vault.thermal = 0;
			vault.em0 = potentialEnergy(10, HOIST_G, 5);
			queue("Durante a queda, a energia potencial foi transformada em energia cinética.", 4);
			queue("Observe o painel. A energia mecânica permaneceu praticamente constante.", 3.8);
			queue("Agora o trilho tem atrito. A mecânica diminui. A energia não desaparece.", 4.2);
		}
	} else if (vault.goal === "friction") {
		sim.objective = "10 · Atrito e dissipação";
		vault.hint = "A energia térmica sobe enquanto a mecânica desce. Nada some: muda de forma.";
		vault.note = "Em final < Em inicial. A diferença foi para energia térmica.";
		if (vault.h < 1.3 && vault.h > .15 && vault.thermal > 20 && s.fallEm < vault.em0 - 15) {
			mark("core", 7);
			queue("A energia mecânica diminuiu porque parte dela foi transformada em energia térmica pelo atrito.", 4.6);
			queueAs("TIGRÃO", "Então o núcleo pode receber o que a gente mediu?", 3);
			queue("Sim. Vá até o núcleo e confirme. Ele só abre depois dessa sequência real.", 3.8);
		}
	} else if (vault.goal === "core") {
		sim.objective = "11 · Restaurar o núcleo";
		vault.hint = near(CORE) ? "Segure E depois que o guardião dormir. Os três cálculos abrem o núcleo." : "O núcleo está no fim da sala, à direita.";
		vault.note = "Força → resultante → aceleração → deslocamento → trabalho → energia.";
		if (!vault.guardianSleep && !vault.quiz && !vault.crew.solved["guard-heat"]) openChallenge("guard-work");
		if (near(CORE) && e && vault.guardianSleep) vault.hold += hdt;
		else if (!vault.guardianSleep) vault.hold = 0;
		else vault.hold = 0;
		if (vault.hold > 1.4 && vault.modules >= 7 && vault.guardianSleep) finish();
	} else {
		sim.objective = "Etapa 3 concluída · trabalho e energia";
		vault.hint = "Tração e peso continuam. O deslocamento é que decide o trabalho.";
		vault.note = "W = Fd cosθ · Ec = ½mv² · Epg = mgh · Em = Ec + Epg";
	}
	pumpLines();
}
if (typeof window !== "undefined") window.__vaultTest = {
	begin: beginStage3,
	get: vaultState
};
function Vault() {
	const hoist = (0, import_react.useRef)(null);
	const arm = (0, import_react.useRef)(null);
	const cart = (0, import_react.useRef)(null);
	const core = (0, import_react.useRef)(null);
	const drop = (0, import_react.useRef)(null);
	const crate = (0, import_react.useRef)(null);
	const drone = (0, import_react.useRef)(null);
	const field = (0, import_react.useRef)(null);
	const guard = (0, import_react.useRef)(null);
	const screen = (0, import_react.useMemo)(() => M.emit.clone(), []);
	useFrame(() => {
		if (hoist.current) hoist.current.position.y = vault.active ? vault.y : 1.2;
		if (arm.current) arm.current.rotation.z = (vault.angle || 0) * Math.PI / 180;
		if (cart.current) cart.current.position.x = TRACK.x - 1.2 + Math.min(2.4, vault.cartX * .4);
		if (drop.current) drop.current.position.y = .35 + (vault.goal === "fall" || vault.goal === "friction" ? vault.h * .55 : 2.4);
		const droneA = vault.aliens.find((item) => item.id === "drone");
		const fieldA = vault.aliens.find((item) => item.id === "field");
		const guardA = vault.aliens.find((item) => item.id === "guardian");
		if (drone.current && droneA) {
			drone.current.position.set(droneA.x, .55, droneA.z);
			drone.current.rotation.y = sim.time * (droneA.mode === "chase" ? 2.4 : .8);
		}
		if (field.current && fieldA) field.current.position.set(fieldA.x, .7, fieldA.z);
		if (guard.current && guardA) {
			guard.current.position.set(guardA.x, guardA.mode === "sleep" ? .25 : .85, guardA.z);
			guard.current.scale.setScalar(guardA.mode === "sleep" ? .65 : 1);
		}
		if (crate.current) crate.current.position.set(18.5, .35, crateZ(sim.time));
		if (core.current) {
			const live = sim.stage === 3 && vault.active;
			core.current.emissiveIntensity = live ? .25 + vault.modules * .22 : .05;
		}
		screen.emissive.set(vault.goal === "done" ? "#8fd0a8" : "#e0a23a");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				20,
				0,
				-56
			],
			receiveShadow: true,
			material: M.floor,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [16, 16] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				20,
				2.1,
				-63.9
			],
			args: [
				16,
				4.2,
				.28
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				20,
				2.1,
				-48.1
			],
			args: [
				16,
				4.2,
				.28
			],
			material: M.hullDark
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				12.35,
				2.1,
				-60.6
			],
			args: [
				.28,
				4.2,
				6.4
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				12.35,
				2.1,
				-51.2
			],
			args: [
				.28,
				4.2,
				6.2
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				27.85,
				2.1,
				-56
			],
			args: [
				.28,
				4.2,
				15.6
			],
			material: M.hull
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
			position: [
				HATCH.x,
				1.15,
				HATCH.z
			],
			args: [
				.35,
				2.1,
				1.3
			],
			material: M.stripe
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "ESCOTILHA TRAVADA",
			position: [
				HATCH.x,
				2.45,
				HATCH.z
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				HOIST.x,
				0,
				HOIST.z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Solid, {
				position: [
					0,
					4.2,
					0
				],
				args: [
					.12,
					7.2,
					.12
				],
				material: M.hull
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				ref: hoist,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					material: M.suitBlue,
					dispose: null,
					castShadow: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.9,
						.7,
						.9
					] })
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "GUINCHO",
			position: [
				HOIST.x,
				3.3,
				HOIST.z + .8
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				DIAL.x,
				1.15,
				DIAL.z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				material: M.dark,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.55,
					.55,
					.08,
					20
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				ref: arm,
				position: [
					0,
					.08,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						.38,
						0,
						0
					],
					material: M.emit,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.7,
						.06,
						.06
					] })
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "ÂNGULO θ",
			position: [
				DIAL.x,
				2.1,
				DIAL.z
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				TRACK.x,
				.35,
				TRACK.z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				material: M.hull,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					3.2,
					.08,
					.35
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				ref: cart,
				position: [
					-1.2,
					.28,
					0
				],
				material: M.suit,
				dispose: null,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.45,
					.35,
					.4
				] })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "TRILHO",
			position: [
				TRACK.x,
				1.5,
				TRACK.z
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			ref: drop,
			position: [
				24.1,
				2.4,
				-56
			],
			material: M.stripe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.42,
				.42,
				.42
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			ref: crate,
			position: [
				18.5,
				.35,
				-52.6
			],
			material: M.stripe,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.55,
				.55,
				.55
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: drone,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					material: M.suitBlue,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.28,
						14,
						12
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						.16,
						.08,
						.12
					],
					material: M.emit,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.07,
						10,
						8
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						-.16,
						.08,
						.12
					],
					material: M.emit,
					dispose: null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.07,
						10,
						8
					] })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: field,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				material: M.hull,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.16,
					.35,
					4,
					8
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				material: M.emit,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.72,
					16,
					12
				] })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: guard,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				material: M.hullDark,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.46,
					16,
					12
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					.22,
					.28
				],
				material: M.emit,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.12,
					10,
					8
				] })
			})]
		}),
		CHECKPOINTS.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				point.x,
				.04,
				point.z
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			material: M.suitBlue,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				.45,
				.62,
				20
			] })
		}, point.id)),
		PICKUPS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				item.x,
				.35,
				item.z
			],
			material: item.kind === "core" ? M.emit : M.gold,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.16, 0] })
		}, item.id)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				CORE.x,
				1.15,
				CORE.z
			],
			dispose: null,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.55,
				.7,
				1.5,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				ref: core,
				color: "#123044",
				emissive: "#7eb8cc",
				emissiveIntensity: .08,
				roughness: .35,
				metalness: .45
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				CORE.x,
				1.7,
				CORE.z + .72
			],
			material: screen,
			dispose: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.7, .28] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloLabel, {
			text: "NÚCLEO",
			position: [
				CORE.x,
				2.35,
				CORE.z
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				20,
				3.2,
				-56
			],
			color: "#9fd4e6",
			intensity: .7,
			distance: 16,
			decay: 2
		})
	] });
}
var KEY_FROM_CHAR = {
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
	Enter: "Enter"
};
var HANDLED = /* @__PURE__ */ new Set([
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
	"Escape"
]);
function resolveCode(code, key) {
	if (code && code !== "Unidentified") return code;
	return KEY_FROM_CHAR[key] ?? "";
}
/** Returns true only on the transition to pressed, so auto-repeat does not retrigger. */
function noteDown(held, code) {
	if (held.has(code)) return false;
	held.add(code);
	return true;
}
function noteUp(held, code) {
	held.delete(code);
}
function releaseAll(held) {
	held.clear();
}
function focusGame(root) {
	window.focus();
	if (root && document.activeElement !== root) root.focus({ preventScroll: true });
}
function installControls(hooks) {
	let locked = false;
	let exitRequested = false;
	const onKeyDown = (event) => {
		if (event.ctrlKey || event.metaKey) return;
		const target = event.target;
		if (target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
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
	const onKeyUp = (event) => {
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
			elevator.alarm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "alarm-tint" }) : null,
			snap.phase === "play" && !snap.solved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bearing, {}) : null,
			snap.phase === "title" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { best: snap.best }) : null,
			snap.phase === "play" || snap.phase === "cinema" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayHud, { snap }) : null,
			snap.mapOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPanel, {}) : null,
			snap.paused && !snap.mapOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PausePanel, {}) : null,
			snap.phase === "complete" && snap.result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Complete, { result: snap.result }) : null,
			sim.stage === 2 && sim.transit > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageCard, {}) : null,
			sim.stage === 3 && sim.transit > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaultCard, {}) : null,
			elevator.done && elevator.finale <= 0 && snap.phase === "play" && sim.stage === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageReport, {}) : null,
			vault.goal === "done" && vault.finale <= 0 && snap.phase === "play" && sim.stage === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaultReport, {}) : null,
			sim.stage === 3 && vault.crew.over ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Downed, {}) : null,
			snap.phase === "play" && !snap.paused && !snap.mapOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Touch, {}) : null
		]
	});
}
function StageCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel title-card",
		"data-ui": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Missão Newton"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["ETAPA 2", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A FORÇA INVISÍVEL" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sub",
				children: "Nem toda força pode ser vista. Mas seus efeitos podem ser medidos."
			})
		]
	});
}
function Title({ best }) {
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
		"Postura de ação. O controle passa para você."
	];
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
				children: lines[beat] ?? lines[0]
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
					children: "Pular abertura"
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
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel obj",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Objetivo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: snap.objective })]
				}),
				sim.stage === 3 && vault.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeRow, {}) : null,
				sim.stage === 2 && elevator.active && elevator.scanned && sim.transit <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForceStrip, {}) : null,
				sim.stage === 3 && vault.active && sim.transit <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnergyStrip, {}) : null,
				snap.line ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				}) : null
			]
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
				snap.readout && sim.stage === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadoutCard, { readout: snap.readout }) : null,
				sim.stage === 2 && snap.scanner && elevator.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoistCard, {}) : null
			]
		}),
		snap.prompt && sim.stage === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel prompt",
			children: snap.prompt
		}) : null,
		sim.stage === 2 && elevator.active && sim.transit <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel prompt wrap",
			children: elevator.hint
		}) : null,
		sim.stage === 3 && vault.active && sim.transit <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel prompt wrap",
			children: vault.hint
		}) : null,
		sim.stage === 3 && vault.active && sim.transit <= 0 && !vault.crew.over ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChallengePanel, {}) : null
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
function br(value, digits = 1) {
	return value.toFixed(digits).replace(".", ",");
}
function HoistCard() {
	const h = hoistState();
	const still = Math.abs(h.Fr) < FORCE_SCAN;
	const arrow = (n) => Math.abs(n) < .05 ? "" : n > 0 ? " ↑" : " ↓";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel readout hoist",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Scanner Newton"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: h.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "eq",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "m" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [br(h.mass, 1), " kg"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "g" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [br(h.g, 2), " m/s²"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "P" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [br(h.P, 1), " N ↓"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "T" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [br(h.T, 1), " N ↑"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Fr" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: still ? "0 N" : `${br(h.Fr, 1)} N${arrow(h.Fr)}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: still ? "0 m/s²" : `${br(h.a, 2)} m/s²${arrow(h.a)}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "v" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						br(h.v, 2),
						" m/s",
						arrow(h.v)
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "note",
				children: relation(h)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "note dim",
				children: "P = m·g · Fr = T − P · a = Fr/m"
			})
		]
	});
}
function relation(h) {
	if (Math.abs(h.Fr) < .8) return Math.abs(h.v) < .18 ? "T ≈ P · Fr ≈ 0 · a ≈ 0 · repouso" : "T ≈ P · Fr ≈ 0 · a ≈ 0 · a velocidade se conserva";
	return h.T > h.P ? "T > P · aceleração para cima" : "T < P · aceleração para baixo";
}
function ForceStrip() {
	const h = hoistState();
	const arrow = (n) => Math.abs(n) < .05 ? "" : n > 0 ? " ↑" : " ↓";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel force-strip",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"m ",
				br(h.mass, 0),
				" kg · g ",
				br(h.g, 2),
				h.moon ? " · Lua" : ""
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"P ",
				br(h.P, 1),
				" N · T ",
				br(h.T, 1),
				" N"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Fr ",
				br(h.Fr, 1),
				" N",
				arrow(h.Fr),
				" · a ",
				br(h.a, 2),
				arrow(h.a),
				" · v ",
				br(h.v, 2)
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "note",
				children: h.note
			})
		]
	});
}
function LifeRow() {
	const hearts = Array.from({ length: 3 }, (_, i) => i < vault.crew.lives ? "♥" : "♡");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel force-strip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"Vidas ",
			hearts.join(" "),
			" ",
			vault.crew.lives,
			"/3 · Núcleos ",
			vault.crew.cores,
			"/5 · ",
			vault.crew.score,
			" pts"
		] }), vault.banner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "note",
			children: vault.banner
		}) : null]
	});
}
function ChallengePanel() {
	const [tick, setTick] = (0, import_react.useState)(0);
	const id = vault.quiz;
	if (!id) {
		const offer = !vault.crew.solved.work && (vault.goal === "null" || vault.goal === "positive" || vault.goal === "negative") ? "work" : vault.goal === "kinetic" && !vault.crew.solved.kinetic ? "kinetic" : vault.goal === "potential" && !vault.crew.solved.potential ? "potential" : null;
		if (!offer) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel prompt wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn",
				type: "button",
				onClick: () => {
					openChallenge(offer);
					setTick(tick + 1);
				},
				children: "Abrir o cálculo"
			})
		});
	}
	const spec = challengeOf(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel sheet quiz",
		"data-ui": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Desafio de física"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: spec.title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: spec.prompt }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sub",
				children: spec.facts
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row",
				children: spec.options.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn",
					type: "button",
					onClick: () => {
						answerChallenge(index);
						setTick(tick + 1);
					},
					children: [option.toLocaleString("pt-BR"), " J"]
				}, `${option}-${index}`))
			}),
			vault.quizNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "log",
				children: vault.quizNote
			}) : null
		]
	});
}
function Downed() {
	const spot = vault.crew.checkpoint;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal",
		"data-ui": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Sistema crítico"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Tigrão foi derrotado" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "sub",
					children: "O módulo de energia continua instável. O progresso dos desafios fica no último checkpoint."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						type: "button",
						onClick: () => beginStage3(),
						children: "Tentar novamente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn ghost",
						type: "button",
						onClick: () => resumeCheckpoint(),
						children: ["Voltar ao checkpoint ", spot]
					})]
				})
			]
		})
	});
}
function VaultCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel title-card",
		"data-ui": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Missão Newton"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["ETAPA 3", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "O MÓDULO DE ENERGIA" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Força, deslocamento, trabalho e a energia que a estação precisa de volta." })
		]
	});
}
function EnergyStrip() {
	const s = vaultState();
	const cap = 800;
	const bar = (value) => `${Math.max(0, Math.min(100, Math.abs(value) / cap * 100))}%`;
	const showWork = s.goal === "null" || s.goal === "positive" || s.goal === "negative" || s.goal === "angle";
	const showPot = s.goal === "potential" || s.goal === "fall" || s.goal === "friction" || s.goal === "core" || s.goal === "done";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel force-strip",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Módulo ",
				s.modules,
				"/8",
				s.goal === "angle" ? ` · θ ${s.angle}° · W ${br(s.benchW, 0)} J` : "",
				s.goal === "kinetic" ? ` · v ${br(s.kinV, 0)} m/s · Ec ${br(s.kinEc, 0)} J` : "",
				s.goal === "theorem" ? ` · W ${br(s.cartW, 0)} J · ΔEc ${br(s.cartDelta, 0)} J` : "",
				showWork && s.goal !== "angle" ? ` · W ${br(s.tensionWork, 0)} J · d ${br(s.dy, 2)} m` : ""
			] }),
			showPot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Ec ",
				br(s.goal === "fall" || s.goal === "friction" ? s.fallEc : s.ec, 0),
				" J · Epg",
				" ",
				br(s.goal === "fall" || s.goal === "friction" ? s.fallEpg : s.epg, 0),
				" J · Em",
				" ",
				br(s.goal === "fall" || s.goal === "friction" ? s.fallEm : s.em, 0),
				" J",
				s.goal === "friction" ? ` · calor ${br(s.thermal, 0)} J` : ""
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "energy-bars",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: bar(showPot && (s.goal === "fall" || s.goal === "friction") ? s.fallEc : s.ec) } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
						className: "pot",
						style: { width: bar(showPot && (s.goal === "fall" || s.goal === "friction") ? s.fallEpg : s.epg) }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
						className: "heat",
						style: { width: bar(s.thermal) }
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "note",
				children: s.note
			})
		]
	});
}
function VaultReport() {
	const [hide, setHide] = (0, import_react.useState)(false);
	if (hide) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal",
		"data-ui": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Relatório da missão"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Etapa 3 concluída" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "sub",
					children: "Força ao longo de um deslocamento transfere energia. A energia muda de forma. Não desaparece."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stats",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vidas" }),
							vault.crew.lives,
							"/3"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Núcleos" }),
							vault.crew.cores,
							"/5"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pontos" }), vault.crew.score] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Módulos" }),
							vault.modules,
							"/8"
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "report-list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Trabalho positivo, negativo e nulo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "✓" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Energia cinética e potencial" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "✓" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "W = ΔEc e conservação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "✓" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Atrito dissipa em calor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "✓" })] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "row",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						type: "button",
						onClick: () => setHide(true),
						children: "Continuar observando"
					})
				})
			]
		})
	});
}
function StageReport() {
	const [hide, setHide] = (0, import_react.useState)(false);
	const h = hoistState();
	if (hide) return null;
	const rows = [
		["Peso", h.mastery.peso],
		["Tração", h.mastery.tracao],
		["Força resultante", h.mastery.resultante],
		["Massa", h.mastery.massa],
		["Aceleração", h.mastery.aceleracao],
		["2ª lei de Newton", h.mastery.newton],
		["Movimento com resultante zero", h.mastery.uniforme],
		["Mesma resultante, massas diferentes", h.mastery.mesmaFr],
		["Peso e gravidade", h.mastery.gravidade]
	];
	const f = h.flight;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal",
		"data-ui": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Relatório da missão"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Etapa 2 concluída" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "sub",
					children: "Uma força isolada não determina o movimento. O que importa é a força resultante."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "report-list",
					children: rows.map(([label, ok]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: ok ? "✓" : "não testado" })] }, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stats",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tempo" }), clock(h.elapsed)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Impactos" }), h.tries] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "v máxima" }),
							br(f.vMax, 2),
							" m/s"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Início" }),
							br(f.brakeY, 2),
							" m"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "v na frenagem" }),
							br(f.brakeV, 2),
							" m/s"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "v na chegada" }),
							br(f.arriveV, 2),
							" m/s"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "a na frenagem" }),
							br(f.brakeA, 2),
							" m/s²"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Duração" }),
							br(f.brakeDur, 1),
							" s"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Colisão na chegada" }), f.collided ? "SIM" : "NÃO"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Frenagem válida" }), f.brakeValid ? "SIM" : "NÃO"] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						type: "button",
						onClick: () => setHide(true),
						children: "Continuar observando"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn",
						type: "button",
						onClick: () => beginStage3(),
						children: "Continuar para a Etapa 3"
					})]
				})
			]
		})
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
			const tx = sim.stage === 3 ? 25.2 : 0;
			const tz = sim.stage === 3 ? -56 : sim.stage === 2 ? -58.2 : sim.z < -14 ? -25 : -8;
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
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn",
							type: "button",
							onClick: () => beginStage2(),
							children: "CONTINUAR PARA ETAPA 2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn ghost",
							type: "button",
							onClick: () => continueLab(),
							children: "Continuar no laboratório"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn ghost",
							type: "button",
							onClick: () => restart(false),
							children: "Repetir"
						})
					]
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
				sim.stage === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "sub",
					children: "Etapa 2 · A força invisível. O setor de carga fica além do mapa da etapa 1."
				}) : null,
				sim.stage === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "sub",
					children: "Etapa 3 · O módulo de energia. Trabalho, transformação e conservação."
				}) : null,
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
		tickElevator(dt);
		tickVault(dt);
		pump(sim.phase);
		M.alarm.emissiveIntensity = elevator.alarm ? .55 + (Math.sin(sim.time * 12) * .5 + .5) * 2.1 : sim.phase === "title" ? .35 + (Math.sin(sim.time * 6) * .5 + .5) * 1.3 : .2;
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
		const ext = sim.phase === "title" && exteriorShot(shotIndex(sim.shotTime));
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
		const ext = sim.phase === "title" && exteriorShot(shotIndex(sim.shotTime));
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
	if (sim.stage === 3 && vault.finale > 0) {
		desired.set(CORE.x - 2.4, 2.5, CORE.z + 3.2);
		look.set(CORE.x, 1.4, CORE.z);
		return true;
	}
	if (sim.stage === 3 && sim.transit > 0) {
		const u = 1 - sim.transit / 5.2;
		desired.set(11.2 + u * 2.2, 2.3, -52.5);
		look.set(20, 1.5, -56);
		return true;
	}
	if (sim.stage === 2 && elevator.finale > 0) {
		const u = 1 - Math.min(1, elevator.finale / 7.2);
		desired.set(1.35, 2.4 + u * 5.1, -53.4);
		look.set(SHAFT.x, Math.min(8.4, elevator.y + .3), SHAFT.z);
		return true;
	}
	if (sim.stage === 2 && sim.transit > 0) {
		const u = 1 - sim.transit / 6.4;
		desired.set(-1.2 + u * .4, 2.15 + u * 1.4, sim.z + 3.1);
		look.set(SHAFT.x, 2.2 + u * 1.6, SHAFT.z);
		return true;
	}
	if (sim.phase === "title") {
		const shot = shotIndex(sim.shotTime);
		const u = sim.shotTime % 64;
		if (shot === 0) {
			const a = u * .07;
			desired.set(Math.sin(a) * 16, 205.4, Math.cos(a) * 16);
			look.set(.4, 201.15, 0);
		} else if (shot === 1) {
			const a = .65 + (u - 9) * .05;
			desired.set(Math.sin(a) * 8.2, 202.35, Math.cos(a) * 8.2);
			look.set(.15, 200.7, .3);
		} else if (shot === 2) {
			const t = (u - 16) / 7;
			desired.set(6.1 - t * 1.4, 2.5, 10.3);
			look.set(.1, 1.25, 3.4);
		} else if (shot === 3) {
			desired.set(.15, 2.05, -2.6);
			look.set(0, 1.35, -8.2);
		} else if (shot === 4) {
			const t = (u - 29) / 8;
			desired.set(3.2 - t * .5, 1.85, -11.4);
			look.set(0, .55, -15.3);
		} else if (shot === 5) {
			desired.set(1.2, 1.82, 9.35);
			look.set(0, 1.28, 7.15);
		} else if (shot === 6) {
			desired.set(.85, 1.68, 6.35);
			look.set(0, .85, -4);
		} else if (shot === 7) {
			desired.set(2.35, 1.42, -13.05);
			look.set(0, .48, -15.25);
		} else {
			const t = Math.min(1, (u - 58) / 5);
			desired.set(.12, 1.52, 5.65 + t * .25);
			look.set(0, 1.42, 7.18);
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
			const talking = Boolean(sim.line);
			const cruise = 5.25 + Math.min(sim.speed / 4.2, 1) * .45;
			const dist = pushing ? 4.45 : talking ? 4.4 : scanning ? 4.5 : sim.sprinting && sim.speed > 4 ? 6.2 : cruise;
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
			if (sim.stage === 2 && elevator.active && elevator.goal !== "done" && Math.hypot(sim.x - SHAFT.x, sim.z - SHAFT.z) < 12) {
				const aimY = Math.min(6.8, 1.15 + elevator.y * .42);
				look.y += (aimY - look.y) * .16;
				look.x += (SHAFT.x - look.x) * .08;
				look.z += (SHAFT.z - look.z) * .08;
			}
		}
		const jump = smooth.distanceTo(desired) > 24;
		const follow = sim.sprinting && sim.speed > 3 ? 7.4 : sim.pushing ? 6.2 : 4.5;
		const k = sim.reduce || jump ? 1 : 1 - Math.exp(-follow * capped);
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
		const labels = [
			"F",
			"v",
			"a",
			"f",
			"P",
			"N",
			"TRAÇÃO",
			"PESO",
			"RESULTANTE"
		];
		const tagColors = [
			"#f4f7fb",
			"#7eb8cc",
			"#c7c3ef",
			"#e0a23a",
			"#8aa0b5",
			"#d5e4ef",
			"#e0a23a",
			"#9fb0c0",
			"#f4f7fb"
		];
		const tags = labels.map((text, i) => {
			const { tex, w } = labelSprite(text, tagColors[i] ?? "#fff");
			const sprite = new Sprite(new SpriteMaterial({
				map: tex,
				transparent: true,
				depthWrite: false
			}));
			sprite.visible = false;
			sprite.scale.set(i >= 6 ? Math.min(1.25, w) : .42, i >= 6 ? .18 : .16, 1);
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
		if (sim.stage === 2 && elevator.active && sim.scanner && sim.phase === "play") {
			const h = hoistState();
			const y = h.y + .55;
			const span = Math.max(h.P, h.T, Math.abs(h.Fr), 80);
			const weight = vectorLength(h.P, span);
			const tension = vectorLength(h.T, span);
			const resultant = vectorLength(h.Fr, span);
			if (weight > 0) show(SHAFT.x - .22, y, SHAFT.z, 0, -1, 0, weight, 9085109, 7);
			if (tension > 0) show(SHAFT.x + .22, y, SHAFT.z, 0, 1, 0, tension, 14721594, 6);
			if (resultant > 0) show(SHAFT.x + .62, y, SHAFT.z, 0, Math.sign(h.Fr) || 1, 0, resultant, 16054267, 8);
			pack.ring.visible = true;
			pack.ring.position.set(SHAFT.x, .06, SHAFT.z);
			const pulse = 1 + Math.sin(sim.time * 4) * .05;
			pack.ring.scale.set(1.7 * pulse, 1.7 * pulse, 1);
			return;
		}
		if (sim.phase === "title" && (shotIndex(sim.shotTime) === 6 || shotIndex(sim.shotTime) === 7)) {
			const crate = sim.crates.find((item) => item.kind === "module");
			if (crate) {
				show(crate.x + crate.hx + .15, crate.h * .7, crate.z, 0, -1, 0, .55, 9085109, 4);
				show(crate.x + crate.hx + .15, .15, crate.z, 0, 1, 0, .55, 14017775, 5);
				pack.ring.visible = true;
				pack.ring.position.set(crate.x, .05, crate.z);
				pack.ring.scale.set(crate.hx * 2.6, crate.hx * 2.6, 1);
			}
			return;
		}
		if (!sim.scanner || sim.phase !== "play") return;
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
	const celebrated = (0, import_react.useRef)(false);
	useFrame((_, dt) => {
		if (sim.solved && !celebrated.current) {
			celebrated.current = true;
			sim.shake = Math.max(sim.shake, .1);
			sim.puffs.forEach((puff, i) => {
				const ang = i / sim.puffs.length * Math.PI * 2;
				puff.x = sim.x + Math.cos(ang) * .45;
				puff.z = sim.z + Math.sin(ang) * .45;
				puff.life = 1;
			});
		}
		if (!sim.solved) celebrated.current = false;
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
function clamp(v, a, b) {
	return Math.max(a, Math.min(b, v));
}
function lookYaw(x, z) {
	const face = Math.atan2(-(x - sim.x), -(z - sim.z));
	return Math.atan2(Math.sin(face - sim.yaw), Math.cos(face - sim.yaw));
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
	const tailMid = (0, import_react.useRef)(null);
	const earL = (0, import_react.useRef)(null);
	const earR = (0, import_react.useRef)(null);
	const eyeL = (0, import_react.useRef)(null);
	const eyeR = (0, import_react.useRef)(null);
	const lidL = (0, import_react.useRef)(null);
	const lidR = (0, import_react.useRef)(null);
	const tongue = (0, import_react.useRef)(null);
	const brow = (0, import_react.useRef)(null);
	const wrist = (0, import_react.useRef)(null);
	const beam = (0, import_react.useRef)(null);
	const lamp = (0, import_react.useRef)(null);
	const wasAir = (0, import_react.useRef)(false);
	const airT = (0, import_react.useRef)(0);
	const land = (0, import_react.useRef)(0);
	const react = (0, import_react.useRef)(0);
	const confuse = (0, import_react.useRef)(0);
	const seenBlocked = (0, import_react.useRef)(sim.blocked);
	const seenHoist = (0, import_react.useRef)(0);
	const prevYaw = (0, import_react.useRef)(sim.yaw);
	const prevSpeed = (0, import_react.useRef)(0);
	const turn = (0, import_react.useRef)(0);
	const settle = (0, import_react.useRef)(0);
	const scanAt = (0, import_react.useRef)(0);
	const badge = (0, import_react.useMemo)(() => badgeTexture(), []);
	const nexus = (0, import_react.useMemo)(() => plateTexture("NEXUS"), []);
	const newton = (0, import_react.useMemo)(() => plateTexture("NEWTON-1"), []);
	useFrame((_, raw) => {
		const g = root.current;
		if (!g) return;
		const dt = Math.min(raw, .05);
		g.position.set(sim.x, sim.y, sim.z);
		g.rotation.y = sim.yaw;
		const t = sim.time;
		const run = sim.anim === "run";
		const moving = sim.anim === "walk" || run;
		const freq = moving ? (run ? 9.6 : 7.2) * (.82 + .22 * Math.min(1, sim.speed / (run ? 6.4 : 4))) : 1.1;
		const amp = moving ? Math.min(.62, .16 + sim.speed * .07) * (run ? 1.12 : 1) : .025;
		const swing = Math.sin(t * freq) * amp;
		const breathe = Math.sin(t * 1.55);
		const yawDelta = Math.atan2(Math.sin(sim.yaw - prevYaw.current), Math.cos(sim.yaw - prevYaw.current));
		prevYaw.current = sim.yaw;
		turn.current = approach(turn.current, clamp(-yawDelta * 9, -.32, .32), dt, 8);
		if (sim.grounded && prevSpeed.current > 1.5 && sim.speed < .4) settle.current = .24;
		prevSpeed.current = sim.speed;
		if (!sim.grounded) {
			if (!wasAir.current) airT.current = 0;
			wasAir.current = true;
			airT.current += dt;
		} else if (wasAir.current) {
			wasAir.current = false;
			land.current = .2;
			airT.current = 0;
			if (sim.phase === "play") {
				sfx.land();
				sim.shake = Math.max(sim.shake, .07);
			}
		} else airT.current = 0;
		if (land.current > 0) land.current = Math.max(0, land.current - dt);
		if (sim.blocked !== seenBlocked.current) {
			seenBlocked.current = sim.blocked;
			if (sim.phase === "play") {
				react.current = .38;
				confuse.current = 1.1;
				sim.shake = Math.max(sim.shake, .05);
				sfx.fail();
			}
		}
		if (react.current > 0) react.current = Math.max(0, react.current - dt);
		if (confuse.current > 0) confuse.current = Math.max(0, confuse.current - dt);
		if (settle.current > 0) settle.current = Math.max(0, settle.current - dt);
		let near = null;
		for (const crate of sim.crates) {
			const d = Math.hypot(crate.x - sim.x, crate.z - sim.z);
			if (!near || d < near.d) near = {
				x: crate.x,
				z: crate.z,
				d
			};
		}
		const shot = sim.phase === "title" ? shotIndex(sim.shotTime) : -1;
		let mood = "normal";
		if (sim.anim === "celebrate" || sim.solved && sim.phase !== "play") mood = "success";
		else if (react.current > .16) mood = "surprise";
		else if (react.current > 0) mood = "fail";
		else if (confuse.current > .15 && sim.anim === "idle") mood = "confused";
		else if (sim.anim === "push") mood = "effort";
		else if (sim.anim === "scan" || sim.scanner && sim.speed < .45 || shot === 6) mood = "curious";
		else if (shot === 3 || shot >= 8) mood = "alert";
		else if (shot === 4 || shot === 5 || shot === 7) mood = "curious";
		else if (near && near.d < 2.6 && sim.anim === "idle") mood = "curious";
		else if (!sim.grounded && sim.vy < 0) mood = "alert";
		if (sim.stage === 2 && elevator.active && sim.phase === "play") {
			if (elevator.flinch !== seenHoist.current) {
				seenHoist.current = elevator.flinch;
				react.current = .42;
			}
			if (elevator.done) mood = "success";
			else if (react.current > .16) mood = "surprise";
			else if (elevator.braking && !sim.scanner) mood = "effort";
			else if (sim.scanner && sim.speed < .45) mood = "curious";
		}
		if (sim.stage === 3 && vault.active && vault.goal === "done") mood = "success";
		const stride = moving ? Math.abs(Math.sin(t * freq)) : 0;
		let hipY = .7 + (moving ? stride * (run ? .045 : .028) - Math.abs(swing) * .04 : breathe * .01);
		if (mood === "success") hipY = .7 + Math.abs(Math.sin(t * 7.5)) * .055;
		let torsoX = breathe * .02 + (run ? -.18 : moving ? -.05 : 0);
		let torsoY = 0;
		const torsoZ = (moving ? Math.sin(t * freq) * (run ? .055 : .032) : Math.sin(t * .55) * .02) + turn.current;
		let lLeg = swing;
		let rLeg = -swing;
		let lArm = -swing * (run ? 1.05 : .78);
		let rArm = swing * (run ? 1.05 : .78);
		let lZ = .16;
		let rZ = -.16;
		let lKnee = Math.max(0, -swing) * (run ? 1.15 : .95);
		let rKnee = Math.max(0, swing) * (run ? 1.15 : .95);
		let headX = moving ? -.02 : Math.sin(t * .37) * .06;
		let headY = moving ? -Math.sin(t * freq) * .035 : Math.sin(t * .31) * .18;
		const headZ = moving ? -Math.sin(t * freq) * .025 : Math.sin(t * .47) * .03;
		let tailX = moving ? -.15 : -.42;
		let tailY = Math.sin(t * (run ? 8.2 : moving ? 4.6 : 1.55) + Math.sin(t * .4)) * (mood === "success" ? .7 : run ? .48 : moving ? .3 : .2);
		tailY += Math.sin(t * .63) * .07;
		if (sim.anim === "push") {
			torsoX = -.58;
			lArm = 1.22;
			rArm = 1.22;
			lZ = .04;
			rZ = -.04;
			lLeg = -.28;
			rLeg = .42;
			lKnee = .55;
			rKnee = .22;
			headX = -.16;
			tailX = .15;
			tailY *= .3;
		} else if (mood === "curious" && (sim.anim === "scan" || sim.scanner || shot === 6)) {
			lArm = 1.05;
			lZ = .34;
			rArm = .15;
			headX = .08;
		} else if (sim.anim === "jump") {
			const launch = airT.current < .09 && sim.vy > 0;
			const up = sim.vy > .2;
			if (launch) {
				lKnee = .9;
				rKnee = .85;
				lLeg = .32;
				rLeg = .28;
				torsoX = -.22;
				lArm = -.45;
				rArm = -.4;
				hipY -= .04;
			} else if (up) {
				lLeg = -.35;
				rLeg = -.28;
				lArm = 2.15;
				rArm = 2.05;
				lKnee = .15;
				rKnee = .12;
				torsoX = .1;
				headX = .14;
			} else {
				lLeg = .18;
				rLeg = .12;
				lArm = -.25;
				rArm = .35;
				lZ = .42;
				rZ = -.42;
				lKnee = .25;
				rKnee = .2;
				torsoX = -.08;
				headX = .12;
			}
		} else if (mood === "success") {
			lArm = 2.45;
			rArm = 2.45;
			lZ = .28;
			rZ = -.28;
			headX = .22;
			tailX = -.7;
		}
		if (sim.stage === 2 && elevator.active && (sim.anim === "idle" || sim.anim === "scan" || sim.scanner || elevator.alarm)) {
			headY = clamp(lookYaw(SHAFT.x, SHAFT.z), -.7, .7);
			headX = elevator.alarm ? .22 : elevator.y > 5 ? .16 : -.08;
		} else if (near && near.d < 4.2 && (sim.anim === "idle" || sim.anim === "push" || sim.anim === "scan" || sim.scanner)) {
			const aim = lookYaw(near.x, near.z);
			if (Math.abs(aim) < 1.45) {
				headY = clamp(aim, -.7, .7);
				torsoY = clamp(headY * .28, -.22, .22);
			}
			if (sim.anim === "push") headX = -.12;
		}
		if (sim.line && sim.phase === "play" && sim.anim !== "push" && sim.anim !== "jump") {
			const spk = sim.line.speaker;
			const aim = spk === "NEWTON" ? lookYaw(NEWTON.x, NEWTON.z) : spk === "NEXUS" ? 0 : lookYaw(FICHA.x, FICHA.z);
			if (spk === "NEXUS") headX = -.12;
			else if (Math.abs(aim) < 1.45) headY = clamp(aim, -.6, .6);
			if (sim.anim === "idle") {
				rArm = .72;
				rZ = -.22;
			}
		}
		if (sim.stage === 2 && elevator.adjusting && sim.anim === "idle" && !sim.line) {
			rArm = 1.12;
			rZ = -.08;
			torsoX = -.16;
			headX = -.04;
		}
		if (shot === 3) {
			headY = Math.sin(t * 1.4) * .42;
			headX = -.05;
		} else if (shot === 4 || shot === 7) {
			headX = -.22;
			headY = .04;
		} else if (shot === 5) {
			headX = .08;
			headY = Math.sin(t * .8) * .28;
		} else if (shot === 6) {
			lArm = 1.02;
			lZ = .32;
			headX = .12;
			headY = .08;
		} else if (shot >= 8) {
			torsoX = -.18;
			lArm = .55;
			rArm = .42;
			headX = .06;
			headY = 0;
		}
		if (react.current > 0) {
			const hit = react.current / .38;
			headX = react.current > .16 ? .32 : -.06;
			headY = Math.sin(t * 18) * react.current * .45;
			torsoX = .16 * hit;
			torsoY = Math.sin(t * 14) * .08;
			tailX = .25;
			lZ = .36;
			rZ = -.36;
			lArm = -.5;
			rArm = -.35;
		}
		if (land.current > 0 && sim.anim !== "jump") {
			const k = land.current / .2;
			lKnee += .6 * k;
			rKnee += .6 * k;
			lLeg += .18 * k;
			rLeg += .18 * k;
			torsoX -= .12 * k;
			hipY -= .025 * k;
		}
		if (settle.current > 0 && sim.anim === "idle") {
			const k = settle.current / .24;
			lKnee += .35 * k;
			rKnee += .35 * k;
			torsoX -= .08 * k;
			hipY -= .02 * k;
		}
		let earLZ = 1.15;
		let earRZ = -1.15;
		let earLX = .42;
		if (mood === "alert") {
			earLZ = .42;
			earRZ = -.42;
			earLX = .05;
		} else if (mood === "curious") {
			earLZ = .55;
			earRZ = -1.2;
			earLX = .12;
		} else if (mood === "surprise") {
			earLZ = .18 + Math.sin(t * 22) * .14;
			earRZ = -.18 - Math.sin(t * 22) * .14;
			earLX = -.08;
		} else if (mood === "fail" || mood === "confused") {
			earLZ = 1.45;
			earRZ = -1.38;
			earLX = .62;
		} else if (mood === "effort") {
			earLZ = 1.32;
			earRZ = -1.32;
			earLX = .55;
		} else if (mood === "success") {
			earLZ = .95;
			earRZ = -.9;
			earLX = .22;
		}
		const twitch = Math.sin(t * 2.7) * Math.max(0, Math.sin(t * .55));
		earLZ += twitch * .07;
		earRZ -= Math.sin(t * 1.6) * .035;
		if (hips.current) hips.current.position.y = approach(hips.current.position.y, hipY, dt, 10);
		setX(torso.current, torsoX, dt, sim.anim === "push" ? 8 : run ? 9 : 6);
		setY(torso.current, torsoY, dt, 7);
		setZ(torso.current, torsoZ, dt, 8);
		setX(legL.current, lLeg, dt, 16);
		setX(legR.current, rLeg, dt, 16);
		setX(kneeL.current, lKnee, dt, 16);
		setX(kneeR.current, rKnee, dt, 16);
		setX(armL.current, lArm, dt, 12);
		setX(armR.current, rArm, dt, 12);
		setZ(armL.current, lZ, dt, 12);
		setZ(armR.current, rZ, dt, 12);
		setX(head.current, headX, dt, 9);
		setY(head.current, headY, dt, 9);
		setZ(head.current, headZ, dt, 8);
		if (earL.current) {
			earL.current.rotation.z = approach(earL.current.rotation.z, earLZ, dt, mood === "surprise" ? 16 : 6);
			earL.current.rotation.x = approach(earL.current.rotation.x, earLX, dt, 6);
		}
		if (earR.current) {
			earR.current.rotation.z = approach(earR.current.rotation.z, earRZ, dt, mood === "surprise" ? 16 : 6);
			earR.current.rotation.x = approach(earR.current.rotation.x, earLX, dt, 6);
		}
		setX(tail.current, tailX, dt, 5);
		setY(tail.current, tailY, dt, 7);
		if (tailMid.current) {
			tailMid.current.rotation.y = approach(tailMid.current.rotation.y, Math.sin(t * (run ? 9 : 2.8) + .8) * (mood === "success" ? .55 : .28), dt, 8);
			tailMid.current.rotation.x = approach(tailMid.current.rotation.x, Math.sin(t * 1.3) * .12, dt, 6);
		}
		if (brow.current) {
			const furrow = mood === "effort" || mood === "confused" ? .35 : mood === "alert" ? .15 : 0;
			brow.current.rotation.x = approach(brow.current.rotation.x, furrow, dt, 8);
		}
		const gaze = clamp(-headY, -.7, .7) * .02;
		const gazeY = clamp(-headX, -.4, .4) * .012;
		if (eyeL.current) {
			eyeL.current.position.x = approach(eyeL.current.position.x, -.07 + gaze, dt, 12);
			eyeL.current.position.y = approach(eyeL.current.position.y, .045 + gazeY, dt, 12);
		}
		if (eyeR.current) {
			eyeR.current.position.x = approach(eyeR.current.position.x, .07 + gaze, dt, 12);
			eyeR.current.position.y = approach(eyeR.current.position.y, .045 + gazeY, dt, 12);
		}
		const blink = Math.pow(Math.max(0, Math.sin(t * 1.15 + (mood === "alert" ? 1 : 0))), 46);
		if (lidL.current) lidL.current.scale.y = .28 + blink * 7;
		if (lidR.current) lidR.current.scale.y = .28 + blink * 7;
		if (tongue.current) {
			const out = mood === "success" ? 1.15 : mood === "effort" ? .45 : .12 + Math.sin(t * 1.6) * .05;
			tongue.current.scale.z = approach(tongue.current.scale.z, .85 + out, dt, 8);
			tongue.current.position.z = approach(tongue.current.position.z, -.2 - out * .035, dt, 8);
		}
		if (wrist.current) {
			const mat = wrist.current.material;
			if (!Array.isArray(mat)) mat.emissiveIntensity = sim.scanner || shot === 6 ? 1.9 + Math.sin(t * 8) * .4 : .08;
		}
		const beamOn = shot === 6 || sim.scanner && sim.phase === "play";
		if (beam.current) beam.current.visible = beamOn;
		if (lamp.current) lamp.current.intensity = beamOn ? 1.8 : 0;
		if (beamOn && t > scanAt.current) {
			scanAt.current = t + .85;
			sfx.scanTick();
		}
		if (root.current) {
			const blink = sim.stage === 3 && vault.active && vault.crew.invuln > 0 && Math.sin(sim.time * 22) > 0;
			root.current.visible = !blink;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: root,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: hips,
			position: [
				0,
				.7,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					material: M.suit,
					dispose: null,
					castShadow: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.16,
						16,
						12
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					ref: tail,
					position: [
						0,
						.02,
						.14
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.02,
							.07
						],
						material: M.fur,
						dispose: null,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.055,
							12,
							10
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: tailMid,
						position: [
							0,
							.03,
							.12
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								position: [
									0,
									.02,
									.07
								],
								material: M.muzzle,
								dispose: null,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.042,
									10,
									8
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								position: [
									.01,
									.05,
									.14
								],
								material: M.fur,
								dispose: null,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.032,
									10,
									8
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								position: [
									.015,
									.07,
									.2
								],
								material: M.muzzle,
								dispose: null,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.022,
									8,
									8
								] })
							})
						]
					})]
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
						.2,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.16,
								0
							],
							scale: [
								1,
								1.05,
								.82
							],
							material: M.suit,
							dispose: null,
							castShadow: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.24,
								22,
								16
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.02,
								.02
							],
							scale: [
								.9,
								.7,
								.75
							],
							material: M.suitDark,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.18,
								16,
								12
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.09,
								12,
								10
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.09,
								12,
								10
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.12,
								-.16
							],
							scale: [
								1.15,
								.85,
								.35
							],
							material: M.suitBlue,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.12,
								14,
								10
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.12,
								-.22
							],
							rotation: [
								0,
								Math.PI,
								0
							],
							dispose: null,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.22, .12] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
								map: badge,
								toneMapped: false
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.32,
								-.02
							],
							material: M.muzzle,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.075,
								12,
								10
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.36,
								.02
							],
							material: M.fur,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
								.055,
								.05,
								4,
								8
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.4,
								0
							],
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							material: M.hull,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
								.09,
								.016,
								6,
								12
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								-.11,
								-.02,
								-.08
							],
							material: M.gold,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.05,
								.05,
								.04
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.11,
								-.02,
								-.08
							],
							material: M.gold,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.05,
								.05,
								.04
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								0,
								.16,
								.2
							],
							scale: [
								.85,
								1.05,
								.55
							],
							material: M.suit,
							dispose: null,
							castShadow: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.16,
								16,
								12
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								-.06,
								.18,
								.28
							],
							rotation: [
								.15,
								0,
								.1
							],
							material: M.hull,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.035,
								.035,
								.26,
								8
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.06,
								.18,
								.28
							],
							rotation: [
								.15,
								0,
								-.1
							],
							material: M.hull,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.035,
								.035,
								.26,
								8
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								-.14,
								.34,
								.1
							],
							rotation: [
								1.05,
								0,
								.55
							],
							material: M.pipe,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.011,
								.011,
								.28,
								6
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.02,
								.28
							],
							dispose: null,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.16, .05] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
								map: nexus,
								toneMapped: false
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.08,
								.3,
								.18
							],
							material: M.emit,
							dispose: null,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.02,
								8,
								8
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.26,
								.18,
								-.02
							],
							rotation: [
								0,
								Math.PI / 2,
								0
							],
							dispose: null,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.1, .04] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
								map: newton,
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
								-.03
							],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									material: M.fur,
									dispose: null,
									castShadow: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.2,
										24,
										18
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										0,
										-.02,
										-.13
									],
									scale: [
										1.08,
										.78,
										1.45
									],
									material: M.muzzle,
									dispose: null,
									castShadow: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.115,
										18,
										14
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										0,
										.04,
										-.185
									],
									scale: [
										.7,
										.45,
										.22
									],
									material: M.muzzle,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.07,
										10,
										8
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										-.075,
										.035,
										-.15
									],
									scale: [
										1.15,
										.72,
										.45
									],
									material: M.furDark,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.055,
										10,
										8
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										.075,
										.035,
										-.15
									],
									scale: [
										1.15,
										.72,
										.45
									],
									material: M.furDark,
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
										.012,
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
										-.05,
										-.22
									],
									rotation: [
										.35,
										0,
										0
									],
									material: M.furDark,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
										.075,
										.01,
										.02
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									ref: tongue,
									position: [
										0,
										-.072,
										-.2
									],
									scale: [
										1,
										.62,
										1
									],
									material: M.tongue,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.026,
										8,
										8
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
									ref: brow,
									position: [
										0,
										.09,
										-.17
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
										position: [
											-.055,
											0,
											0
										],
										rotation: [
											0,
											0,
											.35
										],
										material: M.furDark,
										dispose: null,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
											.055,
											.012,
											.016
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
										position: [
											.055,
											0,
											0
										],
										rotation: [
											0,
											0,
											-.35
										],
										material: M.furDark,
										dispose: null,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
											.055,
											.012,
											.016
										] })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
									x: -.072,
									lid: lidL,
									look: eyeL
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
									x: .072,
									lid: lidR,
									look: eyeR
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
									ref: earL,
									position: [
										-.18,
										.12,
										.02
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
										rotation: [
											.35,
											.2,
											0
										],
										scale: [
											.38,
											1.7,
											.18
										],
										material: M.fur,
										dispose: null,
										castShadow: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.11,
											12,
											10
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
										position: [
											.012,
											-.02,
											-.012
										],
										rotation: [
											.35,
											.2,
											0
										],
										scale: [
											.2,
											1.05,
											.1
										],
										material: M.furDark,
										dispose: null,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.1,
											10,
											8
										] })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
									ref: earR,
									position: [
										.18,
										.12,
										.02
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
										rotation: [
											.35,
											-.2,
											0
										],
										scale: [
											.38,
											1.7,
											.18
										],
										material: M.fur,
										dispose: null,
										castShadow: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.11,
											12,
											10
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
										position: [
											-.012,
											-.02,
											-.012
										],
										rotation: [
											.35,
											-.2,
											0
										],
										scale: [
											.2,
											1.05,
											.1
										],
										material: M.furDark,
										dispose: null,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
											.1,
											10,
											8
										] })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										0,
										.05,
										.11
									],
									scale: [
										1.08,
										1,
										.68
									],
									material: M.suit,
									dispose: null,
									castShadow: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.22,
										20,
										16
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										0,
										.07,
										-.175
									],
									scale: [
										1.45,
										.38,
										.32
									],
									material: M.glass,
									dispose: null,
									renderOrder: 3,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.1,
										14,
										10
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										0,
										-.02,
										.08
									],
									rotation: [
										1.2,
										0,
										0
									],
									material: M.suitDark,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
										.2,
										.018,
										6,
										16
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										-.2,
										0,
										.08
									],
									material: M.suitBlue,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.038,
										8,
										8
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										.2,
										0,
										.08
									],
									material: M.suitBlue,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.038,
										8,
										8
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										-.22,
										.06,
										.04
									],
									material: M.emit,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.015,
										8,
										8
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
									position: [
										.22,
										.06,
										.04
									],
									material: M.emit,
									dispose: null,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
										.015,
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
			side * .12,
			-.02,
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
					.07,
					.14,
					4,
					8
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.22,
					.02
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				material: M.suitBlue,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.075,
					.016,
					6,
					10
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: knee,
				position: [
					0,
					-.32,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							-.14,
							0
						],
						material: M.suit,
						dispose: null,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.055,
							.12,
							3,
							8
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							-.28,
							.02
						],
						material: M.boot,
						dispose: null,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.08,
							12,
							10
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							-.3,
							-.05
						],
						scale: [
							1,
							.45,
							1.15
						],
						material: M.glove,
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
							-.312,
							-.09
						],
						material: M.dark,
						dispose: null,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.016,
							6,
							6
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
			side * .28,
			.24,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.14,
					0
				],
				material: M.suit,
				dispose: null,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.05,
					.12,
					3,
					8
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.22,
					0
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				material: M.hull,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.055,
					.012,
					6,
					10
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.32,
					0
				],
				material: M.suitDark,
				dispose: null,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.042,
					.12,
					3,
					8
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					-.46,
					-.02
				],
				material: M.glove,
				dispose: null,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.06,
					12,
					10
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					side * .015,
					-.49,
					-.065
				],
				material: M.dark,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.014,
					6,
					6
				] })
			}),
			side < 0 && wrist && beam && lamp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					ref: wrist,
					position: [
						0,
						-.4,
						-.08
					],
					dispose: null,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.045,
						.03,
						.06
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#7eb8cc",
						emissive: "#7eb8cc",
						emissiveIntensity: .08,
						roughness: .35,
						metalness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					ref: beam,
					position: [
						0,
						-.5,
						-.34
					],
					rotation: [
						-1.05,
						0,
						0
					],
					visible: false,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.01,
						.055,
						.55,
						8,
						1,
						true
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: "#9fd8ea",
						transparent: true,
						opacity: .32,
						depthWrite: false
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					ref: lamp,
					position: [
						0,
						-.46,
						-.2
					],
					color: "#9fd4e6",
					distance: 4.2,
					decay: 2,
					intensity: 0
				})
			] }) : null
		]
	});
}
function Eye({ x, lid, look }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: look,
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
					.046,
					14,
					12
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					0,
					-.022
				],
				material: M.iris,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.028,
					12,
					10
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: [
					0,
					0,
					-.038
				],
				material: M.pupil,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.013,
					8,
					8
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.012,
					.012,
					-.044
				],
				dispose: null,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.006,
					6,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#ffffff" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				ref: lid,
				position: [
					0,
					.03,
					-.02
				],
				material: M.fur,
				dispose: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.07,
					.01,
					.025
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
	const cineOnce = (0, import_react.useRef)(false);
	const stage = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const tick = () => {
			frame = requestAnimationFrame(tick);
			if (cineOnce.current) return;
			if (sim.phase !== "title") {
				cineOnce.current = true;
				return;
			}
			if (sim.shotTime >= 64) {
				cineOnce.current = true;
				startMission();
			}
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, []);
	(0, import_react.useEffect)(() => {
		sim.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const root = stage.current;
		let phase = sim.phase;
		let looking = false;
		const removeKeys = installControls({
			held,
			root,
			getPhase: () => sim.phase,
			start: () => {
				startMission();
				focusGame(root);
			},
			jump: queueJump,
			interact: queueInteract,
			scan: queueScan,
			map: toggleMap,
			pause: togglePause
		});
		const removeSub = subscribe(() => {
			if (sim.phase === "play" && phase !== "play") focusGame(root);
			phase = sim.phase;
		});
		const onDown = (event) => {
			focusGame(root);
			const target = event.target;
			if (!(target instanceof Element)) return;
			if (target.closest("[data-ui]")) return;
			if (!(target instanceof HTMLCanvasElement)) return;
			looking = true;
			const lock = target.requestPointerLock?.();
			if (lock && typeof lock.catch === "function") lock.catch(() => {});
		};
		const onUp = () => {
			looking = false;
		};
		const onMove = (event) => {
			if (!document.pointerLockElement && !looking) return;
			sim.lookDX += event.movementX;
			sim.lookDY += event.movementY;
		};
		focusGame(root);
		window.addEventListener("pointerdown", onDown, true);
		window.addEventListener("pointerup", onUp);
		window.addEventListener("pointercancel", onUp);
		window.addEventListener("pointermove", onMove);
		return () => {
			removeKeys();
			removeSub();
			window.removeEventListener("pointerdown", onDown, true);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointercancel", onUp);
			window.removeEventListener("pointermove", onMove);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stage",
		ref: stage,
		tabIndex: 0,
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cargo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vault, {}),
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
