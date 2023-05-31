import { Clone, useGLTF } from "@react-three/drei";
import React from "react";


export default function Model() {
  const model = useGLTF('./hamburger-draco.glb')

  return (
    <>
      <Clone object={model.scene} scale={0.35} position={[0, -1, 0]} />
      <Clone object={model.scene} scale={0.35} position={[-4, -1, 0]} />
      <Clone object={model.scene} scale={0.35} position={[4, -1, 0]} />
    </>
  );
}

useGLTF.preload('./hamburger-draco.glb')