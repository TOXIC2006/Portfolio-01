import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export default function Orb({ className = '', strength = 60 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength])

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={reduced ? undefined : { y }}
      className={`orb ${className}`}
    />
  )
}
