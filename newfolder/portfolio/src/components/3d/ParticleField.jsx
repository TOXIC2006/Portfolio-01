import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 420, radius = 6.5 }) {
  const points = useRef()

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [new THREE.Color('#4d7cfe'), new THREE.Color('#8b5cf6'), new THREE.Color('#f5b642')]
    for (let i = 0; i < count; i++) {
      // Points distributed in a spherical shell for depth
      const r = radius * (0.55 + 0.45 * Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72
      positions[i * 3 + 2] = r * Math.cos(phi) - 2.5
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count, radius])

  useFrame((state, delta) => {
    if (!points.current) return
    points.current.rotation.y += delta * 0.04
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08
    // Subtle drift toward the pointer
    points.current.position.x = THREE.MathUtils.lerp(
      points.current.position.x,
      state.pointer.x * 0.35,
      0.03
    )
    points.current.position.y = THREE.MathUtils.lerp(
      points.current.position.y,
      state.pointer.y * 0.25,
      0.03
    )
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}
