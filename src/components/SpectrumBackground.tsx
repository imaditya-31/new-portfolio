import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

const Spectrum = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const [hovered, setHovered] = useState(false);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame(({ clock }) => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const time = clock.getElapsedTime();

        for (let i = 0; i < 100; i++) {
            const x = i % 10 - 5;
            const z = Math.floor(i / 10) - 5;
            const y = Math.sin(time + i * 0.3) * 0.6;

            dummy.position.set(x, y, z);
            dummy.scale.setScalar(hovered ? 1.2 : 1);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, 100]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color={hovered ? '#60a5fa' : '#3b82f6'} />
        </instancedMesh>
    );
};

const SpectrumBackground = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 15], fov: 75 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1,
                width: '100%',
                height: '100%',
            }}
        >
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} />
            <Spectrum />
        </Canvas>
    );
};

export default SpectrumBackground;
