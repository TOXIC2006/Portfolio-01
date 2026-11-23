import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 })

  const onMove = (e) => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? {} : { x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
