import {
  OrbitControls,
  PivotControls,
  TransformControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        scale={1}
        fixed={false}
      >
        <mesh position-x={-2} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            position={[1, 2, 0]}
            wrapperClass="label"
            center
            distanceFactor={6}
            occlude={[cubeRef, sphereRef]}
          >
            That's a sphere 👍
          </Html>
        </mesh>
      </PivotControls>

      <mesh scale={1.5} position-x={2} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <TransformControls object={cubeRef} mode="translate" />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
        <MeshReflectorMaterial
          side={THREE.DoubleSide}
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={0.75}
          mirror={0.75}
          color="greenyellow"
        />
      </mesh>

      <Float speed={5} floatIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          position-y={2}
          color="salmon"
          maxWidth={2}
          textAlign="center"
        >
          I LOVE RF3
          <meshNormalMaterial side={THREE.DoubleSide} />
        </Text>
      </Float>
    </>
  );
}
