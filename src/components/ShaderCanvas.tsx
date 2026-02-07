'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const ShaderPlane = ({ uniforms }: { uniforms: Record<string, { value: unknown }> }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime * 0.4;
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.FrontSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;

  vec2 toPolar(vec2 p) {
    float r = length(p);
    float a = atan(p.y, p.x);
    return vec2(r, a);
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = 6.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);
    vec2 polar = toPolar(p);
    float r = polar.x;

    vec2 i = p;
    float c = 0.0;
    float rot = r + u_time + p.x * 0.1;

    for (float n = 0.0; n < 4.0; n++) {
      float rr = r + 0.15 * sin(u_time * 0.7 + n + r * 2.0);
      p *= mat2(
        cos(rot - sin(u_time / 10.0)), sin(rot),
        -sin(cos(rot) - u_time / 10.0), cos(rot)
      ) * -0.25;

      float t = r - u_time / (n + 30.0);
      i -= p + sin(t - i.y) + rr;

      c += 2.2 / length(vec2(
        sin(i.x + t) / 0.15,
        cos(i.y + t) / 0.15
      ));
    }

    c /= 8.0;

    // Neon terminal palette
    float intensity = smoothstep(0.0, 1.0, c * 0.55);

    vec3 neonGreen = vec3(0.22, 1.0, 0.08);
    vec3 electricBlue = vec3(0.0, 0.83, 1.0);
    vec3 terminalBlack = vec3(0.02, 0.02, 0.02);

    // Shifting between neon green and electric blue
    float shift = sin(c * 2.5 + u_time * 0.15) * 0.5 + 0.5;
    vec3 brightColor = mix(neonGreen, electricBlue, shift * 0.35);
    vec3 color = mix(terminalBlack, brightColor, intensity);

    // Hot pink undertones in mid-range
    float midTone = smoothstep(0.12, 0.32, intensity) * smoothstep(0.52, 0.32, intensity);
    color += vec3(0.12, 0.0, 0.04) * midTone * 0.18;

    // Faint green glow in deep shadows
    color += vec3(0.01, 0.03, 0.0) * (1.0 - intensity) * 0.2;

    fragColor = vec4(color, 1.0);
  }

  void main() {
    vec4 fragColor;
    vec2 fragCoord = vUv * u_resolution.xy;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
  }
`;

export default function ShaderCanvas() {
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
    }),
    [],
  );

  return (
    <Canvas gl={{ antialias: false, alpha: false }}>
      <ShaderPlane uniforms={uniforms} />
    </Canvas>
  );
}
