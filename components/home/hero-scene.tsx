"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { optimized } from "@/lib/utils";

export type HeroItem = { slug: string; title: string; thumbnail: string };

const RADIUS = 4.4;
// Twelve cards must fit the circumference (2πR ≈ 27.6) with a gap between them:
// cards sharing the cylinder wall would z-fight wherever they overlap.
const CARD_W = 2.16;
const CARD_H = 1.44;

/* ───────────── Shaders ───────────── */

const cardVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform float uSpin;
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec3 p = position;
    // A gentle float, plus a ripple that grows with spin speed.
    p.y += sin(uTime * 0.7 + uPhase) * 0.06;
    p.y += sin(uv.x * 3.1416 + uTime * 2.0 + uPhase) * uSpin * 0.22;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const cardFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uImageAspect;
  uniform float uCardAspect;
  uniform float uReveal;
  uniform float uHover;
  uniform float uNear;
  uniform float uFar;
  uniform vec3 uBg;
  varying vec2 vUv;
  varying float vDepth;

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 uv = vUv;
    if (!gl_FrontFacing) uv.x = 1.0 - uv.x;

    // Rounded corners, anti-aliased through alpha-to-coverage.
    vec2 p = (vUv - 0.5) * vec2(uCardAspect, 1.0);
    float d = roundedBox(p, vec2(uCardAspect, 1.0) * 0.5, 0.045);
    float alpha = 1.0 - smoothstep(-0.004, 0.004, d);
    if (alpha < 0.01) discard;

    // object-fit: cover
    float ratio = uImageAspect / uCardAspect;
    vec2 scale = ratio > 1.0 ? vec2(1.0 / ratio, 1.0) : vec2(1.0, ratio);
    uv = (uv - 0.5) * scale * (1.0 - 0.07 * uHover) + 0.5;

    vec3 color = texture2D(uMap, uv).rgb;

    // The far side of the ring fades to the page colour.
    float fog = smoothstep(uNear, uFar, vDepth);
    float back = gl_FrontFacing ? 0.0 : 1.0;
    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(color, vec3(luma), back * 0.55);
    color = mix(color, uBg, clamp(fog * 0.82 + back * 0.12, 0.0, 0.9));
    color += uHover * 0.05;

    // Thin inner frame.
    float frame = smoothstep(-0.022, -0.016, d);
    color = mix(color, mix(color, vec3(1.0), 0.35), frame * (1.0 - back));

    color = mix(uBg, color, uReveal);
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`;

const dustVertex = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += mod(uTime * (0.08 + aSeed * 0.1) + aSeed * 20.0, 14.0) - 7.0 - position.y;
    p.x += sin(uTime * 0.3 + aSeed * 40.0) * 0.5;
    p.z += cos(uTime * 0.25 + aSeed * 31.0) * 0.5;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (9.0 / -mv.z);
    vAlpha = 0.35 + 0.65 * sin(uTime * (0.6 + aSeed) + aSeed * 60.0) * 0.5 + 0.3;
  }
`;

const dustFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * a * vAlpha * 0.6);
    #include <colorspace_fragment>
  }
`;

/* ───────────── Helpers ───────────── */

function cssColor(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(v || fallback);
}

/** A strip of a cylinder wall, facing outward. */
function makeCardGeometry() {
  const geo = new THREE.PlaneGeometry(CARD_W, CARD_H, 24, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const a = pos.getX(i) / RADIUS;
    pos.setXYZ(i, Math.sin(a) * RADIUS, pos.getY(i), Math.cos(a) * RADIUS);
  }
  geo.computeVertexNormals();
  return geo;
}

/** The wordmark drawn into a texture, so it can sit inside the ring: covers pass behind and in front of it. */
function useWordmarkTexture(color: string) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let cancelled = false;
    let created: THREE.CanvasTexture | null = null;
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-fraunces").trim() || "serif";
    const font = `italic 300 560px ${family}`;

    const draw = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = 2048;
      canvas.height = 720;
      const ctx = canvas.getContext("2d")!;
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = color;
      (ctx as unknown as { letterSpacing: string }).letterSpacing = "-26px";
      const w = ctx.measureText("Ranobe").width;
      const s = Math.min(1, 1960 / w);
      ctx.translate(1024, 520);
      ctx.scale(s, s);
      ctx.fillText("Ranobe", -8, 0);
      created = new THREE.CanvasTexture(canvas);
      created.colorSpace = THREE.SRGBColorSpace;
      created.anisotropy = 8;
      setTexture(created);
    };

    document.fonts.load(font, "Ranobe").then(draw, draw);
    return () => {
      cancelled = true;
      created?.dispose();
    };
  }, [color]);

  return texture;
}

/* ───────────── Scene ───────────── */

type Pointer = { x: number; y: number; dragging: boolean; lastX: number; moved: number };

function Ring({
  items,
  colors,
  onHover,
}: {
  items: HeroItem[];
  colors: { bg: THREE.Color };
  onHover: (index: number | null) => void;
}) {
  const router = useRouter();
  const { gl, size } = useThree();
  const group = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const rotation = useRef(0);
  const velocity = useRef(0);
  const hovered = useRef<number | null>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0, dragging: false, lastX: 0, moved: 0 });
  const lastScroll = useRef(0);
  const intro = useRef(0);

  const geometry = useMemo(() => makeCardGeometry(), []);

  const materials = useMemo(
    () =>
      items.map(
        (_, i) =>
          new THREE.ShaderMaterial({
            vertexShader: cardVertex,
            fragmentShader: cardFragment,
            side: THREE.DoubleSide,
            alphaToCoverage: true,
            uniforms: {
              uMap: { value: null },
              uImageAspect: { value: 1.5 },
              uCardAspect: { value: CARD_W / CARD_H },
              uReveal: { value: 0 },
              uHover: { value: 0 },
              uTime: { value: 0 },
              uPhase: { value: i * 1.7 },
              uSpin: { value: 0 },
              uNear: { value: 13.5 },
              uFar: { value: 21.5 },
              uBg: { value: new THREE.Color() },
            },
          }),
      ),
    [items],
  );

  // Textures stream in one by one; each card fades up from the page colour.
  const loaded = useRef<boolean[]>([]);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    loaded.current = items.map(() => false);
    items.forEach((item, i) => {
      loader.load(optimized(item.thumbnail, 640), (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
        textures.push(tex);
        materials[i].uniforms.uMap.value = tex;
        materials[i].uniforms.uImageAspect.value = tex.image.width / tex.image.height;
        loaded.current[i] = true;
      });
    });
    return () => {
      textures.forEach((t) => t.dispose());
      materials.forEach((m) => m.dispose());
    };
  }, [items, materials, gl]);

  useEffect(() => {
    materials.forEach((m) => m.uniforms.uBg.value.copy(colors.bg));
  }, [materials, colors]);

  // Drag to spin, move to tilt.
  useEffect(() => {
    const el = gl.domElement;
    const p = pointer.current;
    const down = (e: PointerEvent) => {
      p.dragging = true;
      p.lastX = e.clientX;
      p.moved = 0;
    };
    const move = (e: PointerEvent) => {
      p.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (p.dragging) {
        const dx = e.clientX - p.lastX;
        p.lastX = e.clientX;
        p.moved += Math.abs(dx);
        velocity.current += dx * 0.00045;
      }
    };
    const up = () => (p.dragging = false);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // Scrolling the page nudges the ring.
    const sy = window.scrollY;
    velocity.current += (sy - lastScroll.current) * 0.00012;
    lastScroll.current = sy;

    velocity.current *= Math.pow(0.04, dt);
    const idle = hovered.current === null ? 0.085 : 0.02;
    rotation.current += (idle + velocity.current * 60) * dt;

    intro.current = Math.min(1, intro.current + dt * 0.55);
    const e = 1 - Math.pow(1 - intro.current, 4);

    if (group.current) {
      group.current.rotation.y = rotation.current - (1 - e) * 2.4;
      const s = 0.72 + 0.28 * e;
      group.current.scale.setScalar(s);
    }
    if (tilt.current) {
      const p = pointer.current;
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, 0.3 + p.y * 0.06, 3, dt);
      tilt.current.rotation.z = THREE.MathUtils.damp(tilt.current.rotation.z, -0.1 + p.x * 0.03, 3, dt);
      tilt.current.rotation.y = THREE.MathUtils.damp(tilt.current.rotation.y, p.x * 0.12, 3, dt);
    }

    const spin = Math.min(1, Math.abs(velocity.current) * 14);
    materials.forEach((m, i) => {
      const u = m.uniforms;
      u.uTime.value = t;
      u.uSpin.value = THREE.MathUtils.damp(u.uSpin.value, spin, 6, dt);
      u.uHover.value = THREE.MathUtils.damp(u.uHover.value, hovered.current === i ? 1 : 0, 8, dt);
      const target = loaded.current[i] && intro.current > 0.08 + i * 0.035 ? 1 : 0;
      u.uReveal.value = THREE.MathUtils.damp(u.uReveal.value, target, 3, dt);
    });
  });

  const setHover = (i: number | null) => {
    hovered.current = i;
    onHover(i);
  };

  // Narrow screens see the ring from further away so more of it fits.
  const aspect = size.width / size.height;
  const fit = THREE.MathUtils.clamp(aspect / 1.35, 0.62, 1);

  return (
    <group ref={tilt} position={[0, 0.3, 0]} scale={fit}>
      <group ref={group}>
        {items.map((item, i) => {
          const angle = (i / items.length) * Math.PI * 2;
          return (
            <mesh
              key={item.slug}
              geometry={geometry}
              material={materials[i]}
              rotation={[0, angle, 0]}
              position={[0, Math.sin(angle * 2) * 0.28, 0]}
              onPointerOver={(e: ThreeEvent<PointerEvent>) => {
                e.stopPropagation();
                setHover(i);
              }}
              onPointerOut={() => hovered.current === i && setHover(null)}
              onClick={(e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                if (pointer.current.moved < 6) router.push(`/blog/${item.slug}`);
              }}
            />
          );
        })}
      </group>
    </group>
  );
}

function Wordmark({ color }: { color: string }) {
  const texture = useWordmarkTexture(color);
  const mesh = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const aspect = size.width / size.height;
  const width = THREE.MathUtils.clamp(aspect * 7.6, 3.2, 7.4);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const m = mesh.current.material as THREE.MeshBasicMaterial;
    m.opacity = THREE.MathUtils.damp(m.opacity, texture ? 1 : 0, 2.2, delta);
    mesh.current.position.y = 0.55 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
  });

  return (
    texture && (
      <mesh key={texture.uuid} ref={mesh} position={[0, 0.55, 0]} renderOrder={2}>
        <planeGeometry args={[width, (width * 720) / 2048]} />
        <meshBasicMaterial map={texture} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
    )
  );
}

function Dust({ color }: { color: THREE.Color }) {
  const { gl } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const count = 260;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    // Deterministic pseudo-random so server and client agree and renders are stable.
    let s = 7;
    const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 22;
      positions[i * 3 + 1] = (rand() - 0.5) * 14;
      positions[i * 3 + 2] = (rand() - 0.5) * 16;
      sizes[i] = 0.6 + rand() * 2.4;
      seeds[i] = rand();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: 1 }, uColor: { value: new THREE.Color() } }),
    [],
  );

  useFrame((state) => {
    const u = material.current?.uniforms;
    if (!u) return;
    u.uTime.value = state.clock.elapsedTime;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uColor.value.copy(color);
  });

  return (
    <points geometry={geometry} frustumCulled={false} renderOrder={3}>
      <shaderMaterial
        ref={material}
        vertexShader={dustVertex}
        fragmentShader={dustFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene({
  items,
  onHover,
}: {
  items: HeroItem[];
  onHover: (index: number | null) => void;
}) {
  const { resolvedTheme } = useTheme();
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [pointing, setPointing] = useState(false);
  const [colors, setColors] = useState(() => ({
    bg: new THREE.Color("#0b0a0d"),
    ink: "#efe8db",
    gold: new THREE.Color("#e6b35c"),
  }));

  useEffect(() => {
    // Read the palette after the theme class has been applied.
    const id = requestAnimationFrame(() => {
      setColors({
        bg: cssColor("--bg", "#0b0a0d"),
        ink: getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#efe8db",
        gold: cssColor(resolvedTheme === "light" ? "--accent" : "--gold", "#e6b35c"),
      });
    });
    return () => cancelAnimationFrame(id);
  }, [resolvedTheme]);

  useEffect(() => {
    if (!wrapper.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.01 });
    io.observe(wrapper.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className={`absolute inset-0 touch-pan-y ${pointing ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"}`}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 16], fov: 30, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Wordmark color={colors.ink} />
        <Ring
          items={items}
          colors={colors}
          onHover={(i) => {
            setPointing(i !== null);
            onHover(i);
          }}
        />
        <Dust color={colors.gold} />
      </Canvas>
    </div>
  );
}
