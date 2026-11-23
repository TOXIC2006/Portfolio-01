import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import FloatingObjects from './FloatingObjects'

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.7, 0.04)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.5, 0.04)
    state.camera.lookAt(0, 0, -2)
  })
  return null
}

function deviceTier() {
  if (typeof window === 'undefined') return 'high'
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const small = window.innerWidth < 768
  const cores = navigator.hardwareConcurrency ?? 8
  if (coarse || small || cores <= 4) return 'low'
  return 'high'
}

export default function HeroScene() {
  const [tier] = useState(deviceTier)
  const [failed, setFailed] = useState(false)
  const particleCount = useMemo(() => (tier === 'low' ? 160 : 420), [tier])

  useEffect(() => {
    // Hard-stop for users who prefer reduced motion: static CSS fallback instead.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) setFailed(true)
  }, [])

  if (failed) return null

  const dpr = tier === 'low' ? [1, 1] : [1, 1.75]

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      aria-hidden="true"
      role="img"
      aria-label="Abstract 3D particle network and floating geometric shapes"
    >
      <fog attach="fog" args={['#08080f', 7, 18]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-6, -2, 3]} intensity={14} color="#4d7cfe" />
      <pointLight position={[5, 3, -2]} intensity={9} color="#f5b642" />
      <Suspense fallback={null}>
        <ParticleField count={particleCount} />
        <FloatingObjects />
        <CameraRig />
      </Suspense>
    </Canvas>
  )
}
