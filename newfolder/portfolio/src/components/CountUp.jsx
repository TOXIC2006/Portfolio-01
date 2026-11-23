import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

export default function CountUp({ to, suffix = '', duration = 1.2 }) {
  const ref = useRef(null)
  const visible = useInView(ref, { once: true, amount: .3 })
  const reduced = useReducedMotion()
  const count = useMotionValue(0)
  const text = useTransform(count, (value) => `${Math.round(value)}${suffix}`)
  useEffect(() => {
    if (!visible || reduced) return undefined
    const animation = animate(count, to, { duration, ease: 'easeOut' })
    return () => animation.stop()
  }, [visible, reduced, count, to, duration])
  return <span ref={ref} aria-label={`${to}${suffix}`}><motion.span aria-hidden="true">{reduced ? `${to}${suffix}` : text}</motion.span></span>
}
