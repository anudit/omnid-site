import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
    const { nodes, materials } = useGLTF('/cuneiform.glb');
    console.log({ nodes, materials })
    return (
        <group {...props} dispose={null}>
            <group position={[0, -0.019, 2.44]} rotation={[3.137, 0, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2['geometry']}
                    material={materials.Material_0}
                    position={[-10.496, -9.285, -8.115]}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/cuneiform.glb')