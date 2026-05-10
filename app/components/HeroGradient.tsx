"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NOISE_GLSL = `
vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute4(vec4 x){return mod289v4(((x*34.)+1.)*x);}
vec4 taylorInvSqrt4(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289v3(i);
  vec4 p=permute4(permute4(permute4(
    i.z+vec4(0.,i1.z,i2.z,1.))+
    i.y+vec4(0.,i1.y,i2.y,1.))+
    i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt4(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = `
${NOISE_GLSL}
#define PI 3.14159265358979

uniform float uTime;
uniform float uSpeed;
uniform float uAmount;
uniform float uFrequency;
varying float vHeight;
varying vec3  vNormal;

vec3 gerstner(vec2 pos, vec2 dir, float wavelength, float amplitude, float steepness, float t) {
  float k  = 2.0 * PI / wavelength;
  float c  = sqrt(9.81 / k);
  float f  = k * (dot(dir, pos) - c * t);
  float Q  = steepness;
  return vec3(
    Q * amplitude * dir.x * cos(f),
    Q * amplitude * dir.y * cos(f),
    amplitude * sin(f)
  );
}

void main() {
  float t   = uTime * uSpeed;
  float amp = uAmount;
  float frq = uFrequency;
  vec2  pos = position.xy;

  vec3 w1 = gerstner(pos, normalize(vec2( 0.00,  1.00)), 2.8/frq, amp*0.42, 0.55, t);
  vec3 w2 = gerstner(pos, normalize(vec2( 0.25,  1.00)), 1.7/frq, amp*0.28, 0.45, t*1.1);
  vec3 w3 = gerstner(pos, normalize(vec2(-0.20,  1.00)), 1.1/frq, amp*0.18, 0.40, t*0.9);
  vec3 w4 = gerstner(pos, normalize(vec2( 0.10,  1.00)), 0.7/frq, amp*0.10, 0.35, t*1.3);

  float chop = snoise(vec3(pos * frq * 2.2, t * 0.6)) * amp * 0.12;

  vec3 displaced = position + w1 + w2 + w3 + w4 + vec3(0.0, 0.0, chop);
  vHeight = displaced.z;

  vNormal = normalize(vec3(-w1.z - w2.z - w3.z, -w1.z - w2.z, 1.0));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec3  uColors[5];
uniform float uAmount;
varying float vHeight;

void main() {
  float n = clamp(vHeight / (uAmount * 0.9) * 0.5 + 0.5, 0.0, 1.0);
  float s = n * 4.0;
  int   i = int(floor(s));
  float t = fract(s);
  vec3 col;
  if      (i == 0) col = mix(uColors[0], uColors[1], t);
  else if (i == 1) col = mix(uColors[1], uColors[2], t);
  else if (i == 2) col = mix(uColors[2], uColors[3], t);
  else             col = mix(uColors[3], uColors[4], t);
  gl_FragColor = vec4(col, 1.0);
}
`;

export const PRESETS = {
  softGrid: {
    colors: ["#000000", "#0d0d0d", "#111111", "#161616", "#1a1a1a"] as [
      string,
      string,
      string,
      string,
      string,
    ],
    amount: 0.55,
    speed: 0.18,
    frequency: 1.4,
  },
  ocean: {
    colors: ["#000000", "#0a0a0a", "#141414", "#1f1f1f", "#2a2a2a"] as [
      string,
      string,
      string,
      string,
      string,
    ],
    amount: 0.65,
    speed: 0.22,
    frequency: 1.2,
  },
} satisfies Record<string, WebGLGradientProps>;

export interface WebGLGradientProps {
  colors?: [string, string, string, string, string];
  amount?: number;
  speed?: number;
  frequency?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Uniforms {
  [uniform: string]: THREE.IUniform<any>;
  uTime: THREE.IUniform<number>;
  uSpeed: THREE.IUniform<number>;
  uAmount: THREE.IUniform<number>;
  uFrequency: THREE.IUniform<number>;
  uColors: THREE.IUniform<THREE.Vector3[]>;
}

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

export default function HeroGradient({
  colors = PRESETS.softGrid.colors,
  amount = PRESETS.softGrid.amount,
  speed = PRESETS.softGrid.speed,
  frequency = PRESETS.softGrid.frequency,
  className,
  style,
}: WebGLGradientProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0xffffff, 1);

    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      el.clientWidth / el.clientHeight,
      0.01,
      200,
    );

    camera.position.set(0, -1.8, 0.55);
    camera.lookAt(0, 4.0, 0);

    const uniforms: Uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uAmount: { value: amount },
      uFrequency: { value: frequency },
      uColors: { value: colors.map(hexToVec3) },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30, 300, 300),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
      }),
    );
    scene.add(mesh);

    let raf: number;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(() => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [colors, amount, speed, frequency]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
}
