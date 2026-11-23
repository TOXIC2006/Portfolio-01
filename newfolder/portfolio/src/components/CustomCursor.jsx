import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const reduced = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const size = useMotionValue(1)
  const opacity = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28 })
  const sy = useSpring(y, { stiffness: 260, damping: 28 })
  const scale = useSpring(size, { stiffness: 260, damping: 25 })

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return undefined
    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      opacity.set(event.target.closest('input, textarea, dialog') ? 0 : 1)
      size.set(event.target.closest('a, button, [data-cursor="hover"]') ? 1.6 : 1)
    }
    const leave = () => opacity.set(0)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [reduced, x, y, size, opacity])

  if (reduced) return null
  return <motion.div aria-hidden="true" className="cursor-follower pointer-events-none fixed left-0 top-0 z-[80] h-8 w-8 rounded-full border border-blue/50" style={{ x: sx, y: sy, scale, opacity, translateX: '-50%', translateY: '-50%' }} />
}
