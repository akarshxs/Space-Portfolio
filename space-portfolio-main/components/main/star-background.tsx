"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

const StarBackground = () => {
  const ref = useRef<THREE.Points | null>(null);

  // Build geometry manually so we can set boundingSphere BEFORE the first render
  const geometry = useMemo(() => {
    const positions = new Float32Array(4000);
    random.inSphere(positions, { radius: 1.2 });

    // Sanitize any NaN / Infinity values
    for (let i = 0; i < positions.length; i++) {
      if (!isFinite(positions[i])) positions[i] = 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Assign a safe bounding sphere directly — skips computeBoundingSphere entirely
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1.5);

    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#ffffff",
        size: 0.002,
        sizeAttenuation: true,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <primitive
        ref={ref}
        object={new THREE.Points(geometry, material)}
        frustumCulled={false}
      />
    </group>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);
