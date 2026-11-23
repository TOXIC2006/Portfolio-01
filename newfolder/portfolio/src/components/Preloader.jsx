import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function Preloader({ ready, onDone }) {
  const reduced = useReducedMotion()
  useEffect(() => {
    const timer = setTimeout(onDone, reduced ? 0 : 650)
    return () => clearTimeout(timer)
  }, [onDone, reduced])

  return (
    <AnimatePresence>
      {!ready && !reduced && (
        <motion.div aria-hidden="true" exit={{ opacity: 0, y: '-8%' }} transition={{ duration: .3, ease: 'easeInOut' }} className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-bg">
          <div className="text-center">
            <span className="font-display text-7xl font-medium tracking-[-.08em]">sr<span className="text-blue">.</span></span>
            <p className="section-kicker mt-5 text-muted">Thoughtful by design. Built in code.</p>
            <div className="mt-7 h-px w-64 overflow-hidden bg-white/10"><motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .6 }} className="h-full origin-left bg-blue" /></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
