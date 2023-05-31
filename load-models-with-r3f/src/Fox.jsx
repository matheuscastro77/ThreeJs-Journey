import { useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import React, { useEffect } from "react";

export default function Fox(props) {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animation } = useControls({
    animation: { options: animations.names }
  });

  useEffect(() => {
    const action = animations.actions[animation];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [animation]);

  return <primitive {...props} object={fox.scene} />;
}
