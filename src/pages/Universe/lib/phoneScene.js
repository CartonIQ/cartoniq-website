// The hero: a procedural Android phone with a metal frame, glass, camera island,
// circuit board and battery. Real-time reflections come from a built-in studio
// environment (no HDRI download). As the visitor scrolls, the phone turns and
// comes apart layer by layer. Everything is generated in code.

import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, Shape, ExtrudeGeometry, BoxGeometry, PlaneGeometry,
  CylinderGeometry, CircleGeometry, MeshStandardMaterial, MeshPhysicalMaterial, MeshBasicMaterial, CanvasTexture,
  SRGBColorSpace, DirectionalLight, PMREMGenerator, ACESFilmicToneMapping, MathUtils,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const PW = 0.78, PH = 1.62, R = 0.115;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const ease = (x) => x * x * (3 - 2 * x);

export function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch { return false; }
}

function roundedRect(w, h, r) {
  const s = new Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

function slab(w, h, r, depth, bevel = 0.004, hole) {
  const shape = roundedRect(w, h, r);
  if (hole) shape.holes.push(roundedRect(hole.w, hole.h, hole.r));
  const g = new ExtrudeGeometry(shape, { depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 28 });
  g.translate(0, 0, -depth / 2);
  return g;
}

function canvas2d(w, h) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  return [c, c.getContext("2d")];
}

function radialTexture(rgb, alpha) {
  const [c, g] = canvas2d(128, 128);
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, `rgba(${rgb},${alpha})`);
  gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return new CanvasTexture(c);
}

// The screen shows the CartoniQ lockup and a radiating "signal" animation.
// It is a brand screen, not a screenshot of any app.
function makeScreen() {
  const w = 512, h = 1088;
  const [c, g] = canvas2d(w, h);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace; tex.anisotropy = 4;
  const sans = '"Archivo Variable", "Arial Black", Arial, sans-serif';
  const mono = '"IBM Plex Mono", ui-monospace, monospace';
  const draw = (t) => {
    const bg = g.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#0b0b0c"); bg.addColorStop(1, "#1d0906");
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    // signal rings
    const cx = w / 2, cy = h * 0.6;
    for (let i = 0; i < 5; i++) {
      const f = (t * 0.00035 + i / 5) % 1;
      g.strokeStyle = `rgba(228,49,31,${(1 - f) * 0.85})`;
      g.lineWidth = 3 + (1 - f) * 3;
      g.beginPath(); g.arc(cx, cy, 14 + f * w * 0.62, 0, Math.PI * 2); g.stroke();
    }
    g.fillStyle = "#e4311f"; g.beginPath(); g.arc(cx, cy, 13, 0, Math.PI * 2); g.fill();
    // wordmark
    g.textBaseline = "alphabetic"; g.font = `800 76px ${sans}`;
    const a = "Carton", b = "iQ", wa = g.measureText(a).width, wb = g.measureText(b).width;
    const x0 = (w - wa - wb) / 2;
    g.fillStyle = "#eee9df"; g.fillText(a, x0, 250);
    g.fillStyle = "#e4311f"; g.fillText(b, x0 + wa, 250);
    g.font = `500 22px ${mono}`; g.fillStyle = "#a39d90";
    const tag = "OFFLINE-FIRST";
    g.fillText(tag, (w - g.measureText(tag).width) / 2, 296);
    // punch-hole camera + home bar
    g.fillStyle = "#000"; g.beginPath(); g.arc(cx, 40, 13, 0, Math.PI * 2); g.fill();
    g.fillStyle = "rgba(238,233,223,.55)"; g.fillRect(cx - 70, h - 28, 140, 6);
    tex.needsUpdate = true;
  };
  return { tex, draw };
}

export async function createHeroScene(canvas, { reduced = false, coarse = false, onContextLost } = {}) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(28, 1, 0.1, 50);
  const disposables = [];
  const track = (o) => { disposables.push(o); return o; };

  // studio reflections
  const pmrem = new PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.85;
  track(envTex);

  try { await Promise.race([document.fonts.load('800 60px "Archivo Variable"'), new Promise((r) => setTimeout(r, 900))]); } catch { /* system font fallback */ }

  // ---------- materials
  const frameMat = track(new MeshPhysicalMaterial({ color: 0x3a3b3f, metalness: 1, roughness: 0.3, clearcoat: 0.3 }));
  const accentMat = track(new MeshPhysicalMaterial({ color: 0xc8210f, metalness: 0.9, roughness: 0.32 }));
  const backGlassMat = track(new MeshPhysicalMaterial({ color: 0x0d0d0f, metalness: 0, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.06 }));
  const coverMat = track(new MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.09, roughness: 0.02, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.02, depthWrite: false }));
  const panelMat = track(new MeshStandardMaterial({ color: 0x050506, roughness: 0.5, metalness: 0.2 }));
  const boardMat = track(new MeshStandardMaterial({ color: 0x1a1d22, roughness: 0.55, metalness: 0.35 }));
  const goldMat = track(new MeshStandardMaterial({ color: 0xc9a24a, roughness: 0.3, metalness: 1 }));
  const chipMat = track(new MeshStandardMaterial({ color: 0x0a0a0b, roughness: 0.4, metalness: 0.2 }));
  const batteryMat = track(new MeshStandardMaterial({ color: 0x7c828c, roughness: 0.42, metalness: 0.7 }));
  const lensGlass = track(new MeshPhysicalMaterial({ color: 0x04070b, roughness: 0.05, metalness: 0.3, clearcoat: 1, clearcoatRoughness: 0.02 }));
  const ledMat = track(new MeshBasicMaterial({ color: 0xff3a22 }));

  const screen = makeScreen();
  screen.draw(0);
  track(screen.tex);
  const screenMat = track(new MeshBasicMaterial({ map: screen.tex, toneMapped: false }));

  // ---------- parts (z is depth; +z faces the viewer)
  const phone = new Group();
  const layers = [];
  const add = (obj, z0, k) => { obj.position.z = z0; phone.add(obj); layers.push({ obj, z0, k }); return obj; };
  const geo = (g) => track(g);

  // 1 cover glass
  add(new Mesh(geo(slab(PW - 0.02, PH - 0.02, R - 0.01, 0.006, 0.002)), coverMat), 0.043, 0.78).renderOrder = 10;

  // 2 display: black panel + lit screen
  const display = new Group();
  display.add(new Mesh(geo(slab(PW - 0.05, PH - 0.05, R - 0.03, 0.008, 0.002)), panelMat));
  const sw = PW - 0.075, sh = PH - 0.075;
  const sp = new Mesh(geo(new PlaneGeometry(sw, sh)), screenMat);
  sp.position.z = 0.0062; display.add(sp);
  add(display, 0.031, 0.42);

  // 3 frame: machined ring with buttons
  const frame = new Group();
  frame.add(new Mesh(geo(slab(PW, PH, R, 0.088, 0.006, { w: PW - 0.05, h: PH - 0.05, r: R - 0.03 })), frameMat));
  const power = new Mesh(geo(new BoxGeometry(0.014, 0.16, 0.014)), accentMat); power.position.set(PW / 2 + 0.002, 0.26, 0.0); frame.add(power);
  const vol = new Mesh(geo(new BoxGeometry(0.014, 0.26, 0.014)), frameMat); vol.position.set(PW / 2 + 0.002, 0.52, 0.0); frame.add(vol);
  add(frame, 0, 0);

  // 4 circuit board with chips
  const board = new Group();
  board.add(new Mesh(geo(slab(PW - 0.1, PH * 0.62, 0.05, 0.008, 0.001)), boardMat));
  const chip = (w, h, d, x, y, m) => { const c = new Mesh(geo(new BoxGeometry(w, h, d)), m); c.position.set(x, y, 0.009); board.add(c); return c; };
  chip(0.2, 0.2, 0.014, 0.0, 0.2, goldMat);
  chip(0.16, 0.16, 0.012, 0.0, 0.2, chipMat).position.z = 0.016;
  chip(0.12, 0.09, 0.01, -0.18, -0.02, chipMat);
  chip(0.1, 0.1, 0.01, 0.16, -0.08, chipMat);
  chip(0.07, 0.07, 0.01, -0.16, -0.22, goldMat);
  chip(0.14, 0.05, 0.008, 0.12, -0.26, chipMat);
  const led = new Mesh(geo(new CircleGeometry(0.012, 16)), ledMat); led.position.set(0.24, 0.36, 0.0095); board.add(led);
  board.position.y = 0.2;
  const boardWrap = new Group(); boardWrap.add(board);
  add(boardWrap, -0.012, -0.34);

  // 5 battery
  const battery = new Group();
  battery.add(new Mesh(geo(slab(PW - 0.2, PH * 0.34, 0.035, 0.014, 0.002)), batteryMat));
  const band = new Mesh(geo(new PlaneGeometry(PW - 0.26, 0.05)), track(new MeshBasicMaterial({ color: 0xc8210f })));
  band.position.z = 0.0092; battery.add(band);
  battery.position.y = -0.38;
  const batteryWrap = new Group(); batteryWrap.add(battery);
  add(batteryWrap, -0.028, -0.7);

  // 6 back glass + camera island
  const back = new Group();
  back.add(new Mesh(geo(slab(PW - 0.012, PH - 0.012, R - 0.008, 0.008, 0.002)), backGlassMat));
  const island = new Mesh(geo(slab(0.34, 0.36, 0.07, 0.01, 0.003)), frameMat);
  island.position.set(-0.12, 0.56, 0.012); back.add(island);
  [[-0.2, 0.64], [-0.2, 0.5], [-0.05, 0.57]].forEach(([x, y]) => {
    const ring = new Mesh(geo(new CylinderGeometry(0.058, 0.058, 0.012, 40).rotateX(Math.PI / 2)), frameMat);
    ring.position.set(x, y, 0.024);
    const lens = new Mesh(geo(new CylinderGeometry(0.046, 0.046, 0.016, 40).rotateX(Math.PI / 2)), lensGlass);
    lens.position.set(x, y, 0.027);
    back.add(ring, lens);
  });
  const flash = new Mesh(geo(new CircleGeometry(0.018, 24)), track(new MeshStandardMaterial({ color: 0xeee9df, roughness: 0.3 })));
  flash.position.set(0.04, 0.68, 0.0185); back.add(flash);
  back.rotation.y = Math.PI; // outer face toward -z
  add(back, -0.046, -1.05);

  scene.add(phone);

  // soft floor glow and lights
  const floor = new Mesh(geo(new CircleGeometry(1.7, 64)), track(new MeshBasicMaterial({ map: track(radialTexture("228,49,31", 0.22)), transparent: true, depthWrite: false })));
  floor.position.set(0, -1.15, -0.4); floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const key = new DirectionalLight(0xffffff, 1.6); key.position.set(3, 4, 5); scene.add(key);
  const rim = new DirectionalLight(0xe4311f, 2.4); rim.position.set(-4, 1.5, -2.5); scene.add(rim);

  // ---------- state
  let progress = 0, active = true, raf = 0, last = 0, lost = false, lastScreen = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const size = { w: 1, h: 1 };
  const minInterval = coarse ? 1000 / 40 : 0;

  function layout() {
    const aspect = size.w / size.h;
    camera.aspect = aspect;
    // Distance that fits the whole phone (assembled) and the full exploded stack.
    camera.userData.near = Math.max(4.3, (1.9 * 1.12) / aspect);
    camera.userData.far = Math.max(4.9, (5.2 * 1.05) / aspect);
    camera.updateProjectionMatrix();
  }

  function pose(t) {
    const spread = ease(clamp01((progress - 0.18) / 0.72));
    for (const l of layers) l.obj.position.z = l.z0 + l.k * spread;
    const sway = reduced ? 0 : Math.sin(t * 0.0005) * 0.06;
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
    phone.rotation.y = MathUtils.lerp(-0.42, -1.02, spread) + pointer.x * 0.35 + sway;
    phone.rotation.x = MathUtils.lerp(0.08, 0.16, spread) + pointer.y * 0.1;
    phone.rotation.z = MathUtils.lerp(0.0, -0.06, spread);
    phone.position.y = reduced ? 0 : Math.sin(t * 0.0007) * 0.025;
    phone.position.x = MathUtils.lerp(0, 0.1, spread);
    camera.position.set(0, 0.1, MathUtils.lerp(camera.userData.near, camera.userData.far, spread));
    camera.lookAt(0, 0, 0);
  }

  function render(t = 0) {
    pose(t);
    if (!reduced && t - lastScreen > 48) { lastScreen = t; screen.draw(t); }
    renderer.render(scene, camera);
  }

  function loop(t) {
    raf = 0;
    if (!active || lost) return;
    if (t - last >= minInterval) { last = t; render(t); }
    if (!reduced) raf = requestAnimationFrame(loop);
  }
  const kick = () => {
    if (lost) return;
    if (reduced) { if (!raf) raf = requestAnimationFrame((t) => { raf = 0; render(t); }); }
    else if (!raf && active) raf = requestAnimationFrame(loop);
  };

  const ro = new ResizeObserver(() => {
    const r = canvas.parentElement.getBoundingClientRect();
    size.w = Math.max(1, Math.round(r.width)); size.h = Math.max(1, Math.round(r.height));
    // Cap the number of pixels drawn so big layouts (tablets, "desktop site" mode) stay smooth.
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
    const maxPixels = coarse ? 1.3e6 : 3.5e6;
    renderer.setPixelRatio(Math.min(dpr, Math.sqrt(maxPixels / (size.w * size.h))));
    renderer.setSize(size.w, size.h, false);
    layout(); kick();
  });
  ro.observe(canvas.parentElement);

  const handleLost = (e) => { e.preventDefault(); lost = true; cancelAnimationFrame(raf); raf = 0; if (onContextLost) onContextLost(); };
  canvas.addEventListener("webglcontextlost", handleLost);

  pmrem.dispose();
  layout();
  render(0);
  kick();

  return {
    setProgress(p) { progress = p; kick(); },
    setPointer(x, y) { if (!reduced) { pointer.tx = x; pointer.ty = y; kick(); } },
    setActive(a) { active = a; if (a) kick(); else { cancelAnimationFrame(raf); raf = 0; } },
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); canvas.removeEventListener("webglcontextlost", handleLost);
      disposables.forEach((d) => d.dispose && d.dispose());
      renderer.dispose();
    },
    canvas,
  };
}
