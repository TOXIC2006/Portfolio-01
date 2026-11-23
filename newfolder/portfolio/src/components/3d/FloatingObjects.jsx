import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function WireframeSphere({ radius = 1.7, color = '#4d7cfe' }) {
  const mesh = useRef()
  useFrame((_, delta) => {
    mesh.current.rotation.y += delta * 0.18
    mesh.current.rotation.x += delta * 0.07
  })
  return (
    <mesh ref={mesh} scale={0.92}>
      <icosahedronGeometry args={[radius, 2]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.28} />
    </mesh>
  )
}

export default function FloatingObjects() {
  const group = useRef()

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.05
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 0.5,
      0.02
    )
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      state.pointer.y * 0.35,
      0.02
    )
  })

  return (
    <group ref={group} position={[3.6, 0.2, -1]}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.1}>
        <WireframeSphere radius={1.9} color="#4d7cfe" />
      </Float>

      <Float speed={1.9} rotationIntensity={0.9} floatIntensity={1.6}>
        <mesh position={[-1.6, 1.5, -0.6]}>
          <octahedronGeometry args={[0.55]} />
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.75}
            roughness={0.25}
            emissive="#8b5cf6"
            emissiveIntensity={0.18}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={1.4} floatIntensity={1.3}>
        <mesh position={[1.4, -1.4, 0.4]}>
          <torusGeometry args={[0.5, 0.16, 16, 48]} />
          <meshStandardMaterial
            color="#f5b642"
            metalness={0.85}
            roughness={0.2}
            emissive="#f5b642"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={1.6} floatIntensity={1.8}>
        <mesh position={[-0.5, -1.9, -0.8]}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshStandardMaterial
            color="#4d7cfe"
            metalness={0.7}
            roughness={0.3}
            emissive="#4d7cfe"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </group>
  )
}
