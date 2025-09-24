import { useGLTF } from "@react-three/drei";

export default function Egg(props) {
    // Use a Vite-friendly URL so the asset is bundled and paths are rewritten in build
    const url = new URL("../../../assets/egg/scene.gltf", import.meta.url).href
    const { scene } = useGLTF(url)
 
    return <primitive object={scene} {...props} />
  }