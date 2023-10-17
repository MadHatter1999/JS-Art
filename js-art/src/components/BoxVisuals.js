import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

const Geometries = [
    THREE.TorusKnotGeometry,
    THREE.IcosahedronGeometry,
    THREE.SphereGeometry,
    THREE.TetrahedronGeometry
];

const TrippyColors = [
    new THREE.Color("purple"),
    new THREE.Color("pink"),
    new THREE.Color("cyan"),
    new THREE.Color("yellow"),
    new THREE.Color("green"),
    new THREE.Color("blue")
];

const RandomPattern = () => {
    const mesh = useRef();
    const elapsedTimeRef = useRef(0);
    const { mouse, size } = useThree(); // get mouse vector and size from useThree()

    const { geometry, initialRotation, initialPosition } = useMemo(() => {
        const geometry = new Geometries[Math.floor(Math.random() * Geometries.length)](5);
        return {
            geometry,
            initialRotation: new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1),
            initialPosition: new THREE.Vector3((Math.random() - 0.5) * size.width/10, (Math.random() - 0.5) * size.height/10, Math.random() * 20 - 10)
        };
    }, [size.width, size.height]);

    const material = useMemo(() => new THREE.MeshBasicMaterial({
        color: TrippyColors[Math.floor(Math.random() * TrippyColors.length)],
        wireframe: true,
    }), []);

    useFrame((state) => {
        if (mesh.current) {
            elapsedTimeRef.current += state.clock.getDelta();

            // Adjust rotation and position
            mesh.current.rotation.x += initialRotation.x * 0.01 + mouse.y * 0.1;
            mesh.current.rotation.y += initialRotation.y * 0.01 + mouse.x * 0.1;
            mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, initialPosition.x + mouse.x * 10, 0.01);
            mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, initialPosition.y - mouse.y * 10, 0.01);

            // Cycle through colors
            const colorIdx = Math.floor((elapsedTimeRef.current % TrippyColors.length));
            material.color = TrippyColors[colorIdx];
        }
    });

    return (
        <mesh ref={mesh} geometry={geometry} material={material} />
    );
};

const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.6} color="#FFFFFF" />
            {Array(20).fill(null).map((_, i) => <RandomPattern key={i} />)}
        </>
    );
};

const BoxVisuals = () => {
    return (
        <Canvas camera={{ position: [0, 0, 30], focus: 10 }} style={{ background: '#121212' }}>
            <Scene />
            <EffectComposer>
                <DepthOfField focusDistance={0.02} focalLength={0.5} bokehScale={2} height={window.innerHeight} />
            </EffectComposer>
        </Canvas>
    );
};

export default BoxVisuals;
