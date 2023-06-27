import {
  ContactShadows,
  Environment,
  Float,
  Html,
  PresentationControls,
  Text,
  useGLTF,
} from "@react-three/drei";

export default function Experience() {
  const macbook = useGLTF("models/macbook.glb");

  return (
    <>
      <Environment preset="city" />

      <color args={["#354575"]} attach={"background"} />

      <PresentationControls
        global
        rotation={[0.33, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        // config={{ mass: 2, tension: 400 }}
        snap={{ mass: 2, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#354575"}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={macbook.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://matcastro.vercel.app/" />
            </Html>
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={0.55}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            children={"Matheus\rCastro"}
            textAlign="center"
          >
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows opacity={0.8} scale={5} blur={2.4} position-y={-1.4} />
    </>
  );
}
