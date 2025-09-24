import { useGLTF } from "@react-three/drei";

export default function Egg(props) {
    const { scene } = useGLTF('egg/scene.gltf')
 
    return <primitive object={scene} {...props} />
  }