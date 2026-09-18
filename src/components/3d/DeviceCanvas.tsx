import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Smartphone3D from './Smartphone3D';

export const DeviceCanvas: React.FC = () => {
  return (
    <div className="w-full h-[520px] sm:h-[580px] lg:h-[640px] relative">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        {/* Specular Cyan Key Light */}
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#38bdf8" />
        {/* Soft Violet Rim Light */}
        <directionalLight position={[-5, -4, -2]} intensity={1.2} color="#a855f7" />
        {/* Fill Point Light */}
        <pointLight position={[0, 3, 3]} intensity={0.6} />

        <Suspense fallback={null}>
          <Smartphone3D />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default DeviceCanvas;
