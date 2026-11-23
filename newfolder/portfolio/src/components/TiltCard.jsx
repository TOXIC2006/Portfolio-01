import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

export default function TiltCard({ children, className = '', max = 8 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 18 })
  const sry = useSpring(ry, { stiffness: 180, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.10), transparent 55%)`

  const onMove = (e) => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * max * 2)
    rx.set((0.5 - py) * max * 2)
    gx.set(px * 100)
    gy.set(py * 100)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? {} : { rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', perspective: 900 }}
      className={className}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: glare, opacity: 0.8 }}
      />
    </motion.div>
  )
}
