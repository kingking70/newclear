import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function City(props) {
  const { nodes, materials } = useGLTF('./City1.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tmp41pk7b31ply.geometry}
        material={nodes.tmp41pk7b31ply.material}
      />
    </group>
  )
}

useGLTF.preload('./City1.glb')