import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Asterisk, Download } from 'lucide-react'
import { SITE } from '../data/site'
import Magnetic from './Magnetic'
import { smoothScrollTo } from '../hooks/useSmoothScroll'

const reveal = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ ready }) {
  const reduced = useReducedMotion()
  const section = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(y, { stiffness: 100, damping: 22 })
  const rotateY = useSpring(x, { stiffness: 100, damping: 22 })
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const nameX = useTransform(scrollYProgress, [0, 1], [0, -65])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 55])

  const move = (event) => {
    if (reduced || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 10)
    y.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 10)
  }

  return (
    <section id="home" ref={section} className="hero-section">
      <div className="site-container">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <p className="section-kicker text-muted">Independent mind. Full-stack thinking.</p>
          {SITE.available && (
            <span className="section-kicker flex items-center gap-2.5 text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> Open to opportunities
            </span>
          )}
        </div>

        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <motion.h1 initial={reduced ? false : 'hidden'} animate={ready || reduced ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.09 } } }} className="hero-title">
              <span className="block overflow-hidden pb-2"><motion.span variants={reveal} className="block">Good ideas.</motion.span></span>
              <span className="block overflow-hidden pb-2"><motion.span variants={reveal} className="block text-muted">Better systems.</motion.span></span>
              <span className="block overflow-hidden pb-3"><motion.span variants={reveal} className="block">Built by me<span className="text-blue">.</span></motion.span></span>
            </motion.h1>
            <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={ready || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={{ duration: .4, delay: reduced ? 0 : .3 }}>
              <p className="mt-7 max-w-md text-base leading-[1.8] text-muted">
                I’m Siddharth, a Java full-stack developer turning complex problems into thoughtful web experiences. Backend engineering meets a curiosity for AI.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic strength={.12}>
                  <a href="#projects" onClick={(e) => { e.preventDefault(); smoothScrollTo('#projects') }} className="action-link">Explore my work <ArrowDownRight size={19} /></a>
                </Magnetic>
                <a href={SITE.resume} download="Siddharth_Rawat_Resume.pdf" className="action-link secondary">Résumé <Download size={16} /></a>
              </div>
            </motion.div>
          </div>

          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={ready || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} transition={{ duration: .65, delay: reduced ? 0 : .2 }}>
            <motion.div className="portrait-stage" onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }} style={reduced ? {} : { rotateX, rotateY, y: imageY }}>
              <div className="portrait-disc" aria-hidden="true" />
              <div className="portrait-orbit" aria-hidden="true" />
              <div className="portrait-orbit second" aria-hidden="true" />
              <div className="portrait-frame">
                <img src="/me.jpeg" alt="Siddharth Rawat" width="796" height="1178" fetchPriority="high" />
              </div>
              <Asterisk className="hero-star" strokeWidth={1.3} aria-hidden="true" />
              <div className="portrait-note">
                <p className="section-kicker mb-1 text-black/60">Hello, world.</p>
                <p className="font-display text-lg font-medium tracking-tight">Code. Learn. Repeat.</p>
              </div>
              <span className="hero-side-label" aria-hidden="true">BASED IN INDIA / BUILDING EVERYWHERE</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-16 flex items-end justify-between gap-5 border-b border-line pb-8 md:mt-20">
          <div className="overflow-hidden">
            <p className="section-kicker mb-3 text-muted">Java full-stack developer & AI enthusiast</p>
            <motion.p style={reduced ? {} : { x: nameX }} className="hero-name" aria-label={SITE.name}>Siddharth Rawat</motion.p>
          </div>
          <a href="#projects" onClick={(e) => { e.preventDefault(); smoothScrollTo('#projects') }} className="round-link mb-2 shrink-0" aria-label="Scroll to selected work"><ArrowDown size={20} /></a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-muted">
          <span>Thoughtful interfaces. Reliable foundations.</span>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-ink">Behind the code <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  )
}
