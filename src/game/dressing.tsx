import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { InstancedMesh } from "three";
import * as THREE from "three";
import { M } from "./materials";

const RIB = 28;

export function Dressing() {
  const ribs = useRef<InstancedMesh>(null);
  const junk = useRef<THREE.Group>(null);
  const dust = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const n = 160;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const bay = i % 3 === 0;
      a[i * 3] = (Math.random() - 0.5) * (bay ? 14 : 12);
      a[i * 3 + 1] = 0.35 + Math.random() * 2.6;
      a[i * 3 + 2] = bay ? -12 - Math.random() * 16 : -1 + Math.random() * 11;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(a, 3));
    return geo;
  }, []);

  useLayoutEffect(() => {
    const mesh = ribs.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    let i = 0;
    for (let z = -0.4; z <= 10.4 && i < RIB - 4; z += 1.7) {
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
    if (junk.current) junk.current.rotation.y += dt * 0.04;
    const attr = dust.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < attr.count; i++) {
      let y = attr.getY(i) + dt * 0.04;
      if (y > 3.15) y = 0.3;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={ribs} args={[undefined, undefined, RIB]} material={M.hullDark} count={0}>
        <boxGeometry args={[0.05, 1.15, 1.15]} />
      </instancedMesh>

      <mesh position={[6.7, 3.2, 5]} rotation={[Math.PI / 2, 0, 0]} material={M.pipe} dispose={null}>
        <cylinderGeometry args={[0.045, 0.045, 11.5, 8]} />
      </mesh>
      <mesh position={[-6.7, 3.2, 5]} rotation={[Math.PI / 2, 0, 0]} material={M.pipe} dispose={null}>
        <cylinderGeometry args={[0.045, 0.045, 11.5, 8]} />
      </mesh>
      <mesh position={[0, 2.82, -5.2]} rotation={[Math.PI / 2, 0, 0]} material={M.pipe} dispose={null}>
        <cylinderGeometry args={[0.035, 0.035, 7.2, 8]} />
      </mesh>
      <mesh position={[0, 3.75, -18]} rotation={[0, 0, Math.PI / 2]} material={M.hull} dispose={null}>
        <boxGeometry args={[16, 0.08, 0.08]} />
      </mesh>
      <mesh position={[0, 3.75, -24]} rotation={[0, 0, Math.PI / 2]} material={M.hull} dispose={null}>
        <boxGeometry args={[14, 0.08, 0.08]} />
      </mesh>

      {[-2.2, 2.4, 8.2].map((z) => (
        <mesh key={z} position={[-7.35, 2.55, z]} material={M.emit} dispose={null}>
          <boxGeometry args={[0.04, 0.08, 0.55]} />
        </mesh>
      ))}
      <mesh position={[0, 2.95, -1.15]} material={M.alarm} dispose={null}>
        <boxGeometry args={[2.4, 0.05, 0.06]} />
      </mesh>
      <mesh position={[0, 3.15, -9.3]} material={M.alarm} dispose={null}>
        <boxGeometry args={[2.2, 0.05, 0.06]} />
      </mesh>

      <mesh position={[2.2, 0.012, 6.4]} rotation={[-Math.PI / 2, 0, 0.2]} material={M.hullDark} dispose={null}>
        <planeGeometry args={[0.9, 0.35]} />
      </mesh>
      <mesh position={[-3.1, 0.012, 2.2]} rotation={[-Math.PI / 2, 0, -0.4]} material={M.dark} dispose={null}>
        <planeGeometry args={[0.7, 0.22]} />
      </mesh>
      <mesh position={[4.6, 1.15, 8.8]} material={M.pipe} dispose={null}>
        <boxGeometry args={[0.04, 1.6, 0.04]} />
      </mesh>
      <mesh position={[-4.2, 0.9, 9.6]} material={M.pipe} dispose={null}>
        <boxGeometry args={[0.04, 1.2, 0.04]} />
      </mesh>
      <points geometry={dust}>
        <pointsMaterial color="#c5d6e4" size={0.025} transparent opacity={0.45} depthWrite={false} sizeAttenuation />
      </points>

      <group ref={junk} position={[0, 200, 0]}>
        <mesh position={[6.4, 0.8, 3.2]} material={M.hull} dispose={null}>
          <boxGeometry args={[0.45, 0.22, 0.7]} />
        </mesh>
        <mesh position={[-5.2, -0.6, 4.4]} material={M.suitBlue} dispose={null}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
        </mesh>
        <mesh position={[2.2, 1.6, -6.5]} material={M.hullDark} dispose={null}>
          <octahedronGeometry args={[0.28, 0]} />
        </mesh>
        <mesh position={[8.5, -0.4, -2]} material={M.pipe} dispose={null}>
          <cylinderGeometry args={[0.06, 0.06, 1.1, 8]} />
        </mesh>
        <mesh position={[-2.4, 2.2, 6]} material={M.emit} dispose={null}>
          <sphereGeometry args={[0.08, 8, 8]} />
        </mesh>
      </group>
    </group>
  );
}
