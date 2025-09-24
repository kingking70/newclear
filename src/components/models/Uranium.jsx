import { useGLTF } from "@react-three/drei";

export default function Uranium(props) {
    const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/rock/model.gltf')
 
    return <primitive object={scene} {...props} />
  }