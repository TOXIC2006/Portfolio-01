import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowUpRight,
  CreditCard,
  Database,
  ExternalLink,
  FileText,
  Landmark,
  Link2,
  ScanLine,
  ShieldCheck,
  WalletCards,
  X,
} from 'lucide-react'
import { GitHubIcon } from './icons'
import { PROJECTS } from '../data/projects'
import { setSmoothScrollPaused } from '../hooks/useSmoothScroll'

const PREVIEW_STYLES = {
  bank: 'from-[#243a7d] via-[#1a2b59] to-[#151d31]',
  doc: 'from-[#323054] via-[#242b4c] to-[#18263b]',
  shield: 'from-[#183844] via-[#192b3c] to-[#1c2440]',
}

const PREVIEW_CAPTIONS = {
  bank: 'Connected services. One banking experience.',
  doc: 'From documents to contextual answers.',
  shield: 'A prediction is only part of the story.',
}

function BankingConcept() {
  const services = [
    { label: 'Accounts', Icon: WalletCards },
    { label: 'Transfers', Icon: ArrowLeftRight },
    { label: 'Payments', Icon: CreditCard },
  ]

  return (
    <div className="mx-auto w-full max-w-[440px] py-3">
      <div className="mx-auto flex w-fit items-center gap-3 rounded-xl border border-[#94acff]/40 bg-[#6387ff]/20 px-5 py-4 shadow-[0_12px_40px_-16px_#6387ff]">
        <Landmark size={29} strokeWidth={1.3} className="text-[#cbd7ff]" />
        <div>
          <p className="font-display text-lg font-medium tracking-tight text-[#eeede8]">BankEase</p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-[#b6c5ef]">Service layer</p>
        </div>
      </div>
      <div className="mx-auto h-7 w-px bg-[#a4b8ff]/50" />
      <div className="mx-auto w-2/3 border-t border-[#a4b8ff]/50" />
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {services.map(({ label, Icon }) => (
          <div key={label}>
            <div className="mx-auto h-6 w-px bg-[#a4b8ff]/50" />
            <div className="flex min-h-[84px] flex-col items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#121d38]/80 px-1 shadow-lg">
              <Icon size={21} strokeWidth={1.4} className="text-[#a9beff]" />
              <span className="text-[11px] font-medium text-[#dce4ff] sm:text-xs">{label}</span>
            </div>
            <div className="mx-auto h-6 w-px bg-[#a4b8ff]/35" />
          </div>
        ))}
      </div>
      <div className="mx-auto w-2/3 border-t border-[#a4b8ff]/35" />
      <div className="mx-auto h-6 w-px bg-[#a4b8ff]/35" />
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-mono text-[10px] text-[#c5d1f2] sm:text-[11px]">
        <span className="flex items-center gap-2"><Database size={14} /> Apache Kafka</span>
        <span className="text-[#a4b8df]">Events / Notifications</span>
      </div>
    </div>
  )
}

function DocumentConcept() {
  return (
    <div className="mx-auto w-full max-w-[420px] py-3">
      <div className="relative mx-auto w-[190px]">
        <div className="absolute inset-0 translate-x-2 -translate-y-2 rotate-3 rounded-lg border border-[#c4ceff]/25 bg-[#7c88b6]/25" />
        <div className="relative rounded-lg border border-white/60 bg-[#dce3f6] p-4 text-[#293859] shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold"><FileText size={18} strokeWidth={1.5} /> Source documents</div>
          <div className="mt-4 space-y-2">
            <div className="h-1 w-full rounded bg-[#7385b0]/45" />
            <div className="h-1 w-4/5 rounded bg-[#7385b0]/45" />
            <div className="h-1 w-11/12 rounded bg-[#7385b0]/45" />
          </div>
        </div>
      </div>
      <div className="flex h-10 items-center justify-center text-[#b2b9e9]"><ArrowDown size={18} strokeWidth={1.3} /></div>
      <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-[#b0a2ef]/35 bg-[#151d35]/80">
        {['Chunk', 'Embed', 'Retrieve'].map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-3 border-r border-white/10 px-2 py-4 last:border-r-0">
            <div className="flex h-6 items-center gap-1 text-[#b9adff]">
              {index === 0 && <><span className="h-4 w-3 rounded-sm border border-current" /><span className="h-5 w-3 rounded-sm border border-current" /></>}
              {index === 1 && <div className="grid grid-cols-3 gap-1">{Array.from({ length: 9 }, (_, dot) => <span key={dot} className="h-1 w-1 rounded-full bg-[#b9adff]" />)}</div>}
              {index === 2 && <ScanLine size={24} strokeWidth={1.3} />}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#d2cff0] sm:text-[11px]">{step}</span>
          </div>
        ))}
      </div>
      <div className="flex h-10 items-center justify-center text-[#b2b9e9]"><ArrowDown size={18} strokeWidth={1.3} /></div>
      <div className="rounded-xl rounded-tl-sm border border-[#93b7f0]/30 bg-[#6387ff]/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-[#e0e7ff]">Contextual answer</p>
          <span className="rounded border border-[#b9adff]/30 px-2 py-1 font-mono text-[9px] tracking-widest text-[#c3b9ff]">RAG</span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-[#afbddb]">Grounded in retrieved document context.</p>
      </div>
    </div>
  )
}

function ThreatConcept() {
  return (
    <div className="mx-auto w-full max-w-[440px] py-3">
      <div className="flex items-center gap-3 rounded-xl border border-[#88cbd9]/25 bg-[#10242f]/80 px-4 py-3.5">
        <Link2 size={18} className="shrink-0 text-[#95cedb]" />
        <span className="font-mono text-[11px] text-[#c5d7e7]">URL input <span className="ml-2 text-[#91a9be]">/ hostname / path</span></span>
      </div>
      <div className="mx-auto h-7 w-px bg-[#9cbcd4]/40" />
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="relative flex aspect-square w-[44%] shrink-0 items-center justify-center rounded-full border border-[#84baca]/30 bg-[#93c8de]/5">
          <div className="absolute inset-3 rounded-full border border-dashed border-[#a3d2e0]/25" />
          <div className="absolute inset-7 rounded-full border border-[#9bc1e4]/30 bg-[#6387ff]/10" />
          <div className="absolute -inset-x-2 top-1/2 h-px bg-[#8eafc8]/20" />
          <div className="absolute -inset-y-2 left-1/2 w-px bg-[#8eafc8]/20" />
          <ShieldCheck className="relative h-10 w-10 text-[#c0e3ef] sm:h-14 sm:w-14" strokeWidth={1.1} />
          <span className="absolute -bottom-6 font-mono text-[9px] uppercase tracking-[0.16em] text-[#b0c5da]">Analysis lens</span>
        </div>
        <div className="flex-1 space-y-3">
          {['Extract features', 'Classify URL', 'Explain prediction'].map((step) => (
            <div key={step} className="flex items-center gap-2 rounded-lg border border-[#8da9cd]/25 bg-[#152334]/90 px-3 py-3.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#95c1ee]" />
              <span className="text-[10px] font-medium text-[#d2e0ed] sm:text-xs">{step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex items-center justify-between gap-3 border-t border-[#a4c1d7]/20 pt-4 font-mono text-[10px] text-[#a9bdd1]">
        <span>Machine learning</span>
        <span className="text-[#ccd7ed]">Explainable predictions</span>
      </div>
    </div>
  )
}

function ProjectVisual({ project, reducedMotion }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 160, damping: 24 })
  const springY = useSpring(rotateY, { stiffness: 160, damping: 24 })

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const handlePointerMove = (event) => {
    if (reducedMotion || event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    rotateX.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 4)
    rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 4)
  }

  return (
    <div className="h-full min-w-0 [perspective:1200px]">
      <motion.figure
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        style={reducedMotion ? { transform: 'none' } : { rotateX: springX, rotateY: springY }}
        className={`relative flex h-full min-h-[450px] flex-col justify-between overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br p-5 sm:min-h-[490px] sm:p-8 lg:min-h-[500px] ${PREVIEW_STYLES[project.icon] ?? PREVIEW_STYLES.doc}`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#c3cee4] sm:text-[10px]">
          <span className="shrink-0 rounded-full border border-white/20 bg-[#101114]/20 px-3 py-1.5">SYSTEM CONCEPT</span>
          <span aria-hidden="true">{project.icon === 'bank' ? 'Service architecture' : project.icon === 'doc' ? 'Retrieval pipeline' : 'Feature analysis'}</span>
        </div>
        <div aria-hidden="true" className="relative my-5">
          {project.icon === 'bank' ? <BankingConcept /> : project.icon === 'shield' ? <ThreatConcept /> : <DocumentConcept />}
        </div>
        <figcaption className="relative border-t border-white/15 pt-4 text-xs leading-relaxed text-[#c3cee4]">
          {PREVIEW_CAPTIONS[project.icon] ?? PREVIEW_CAPTIONS.doc}
          <span className="sr-only"> Architecture illustration, not a product screenshot or live data.</span>
        </figcaption>
      </motion.figure>
    </div>
  )
}

function ProjectLinks({ project }) {
  const links = [
    { href: project.github, label: 'Repository', pending: 'Repository pending', Icon: GitHubIcon },
    { href: project.demo, label: 'Live demo', pending: 'Demo pending', Icon: ExternalLink },
  ]

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {links.map(({ href, label, pending, Icon }) => (
        !href || href.trim() === '#' || href.trim() === '' ? (
          <button key={label} type="button" disabled className="inline-flex min-h-11 items-center gap-2 text-xs text-[#a1a1a8] disabled:cursor-not-allowed">
            <Icon size={15} aria-hidden="true" /> {pending}
          </button>
        ) : (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} for ${project.title} (opens in a new tab)`} className="inline-flex min-h-11 items-center gap-2 rounded-sm text-xs text-[#b8c8ff] underline decoration-[#6387ff]/40 underline-offset-4 hover:text-[#eeede8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6387ff]">
            <Icon size={15} aria-hidden="true" /> {label}
          </a>
        )
      ))}
    </div>
  )
}

function ProjectRow({ project, index, onOpen, reducedMotion }) {
  const reversed = index % 2 !== 0

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`grid items-center gap-y-8 border-t border-white/10 py-10 sm:py-14 ${reversed ? 'lg:grid-cols-[9fr_11fr]' : 'lg:grid-cols-[11fr_9fr]'}`}
    >
      <div className={`h-full min-w-0 ${reversed ? 'lg:col-start-2 lg:row-start-1' : ''}`}>
        <ProjectVisual project={project} reducedMotion={reducedMotion} />
      </div>
      <div className={`min-w-0 py-1 ${reversed ? 'lg:col-start-1 lg:row-start-1 lg:pr-12 xl:pr-16' : 'lg:pl-12 xl:pl-16'}`}>
        <p className="flex items-baseline gap-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#a1a1a8] sm:text-[11px]">
          <span className="text-[#6387ff]">{String(index + 1).padStart(2, '0')}</span>
          {project.tagline}
        </p>
        <h3 className="font-display mt-5 text-[clamp(1.65rem,2.7vw,2.55rem)] font-medium leading-[1.17] tracking-[-0.04em] text-[#eeede8]">{project.title}</h3>
        <p className="mt-5 max-w-lg text-sm leading-[1.85] text-[#a1a1a8] sm:text-[15px]">{project.description}</p>
        <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="pill border border-white/10 px-3 py-1.5 text-[11px] text-[#b6b6bf]">{tech}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={(event) => onOpen(project, event.currentTarget)}
          aria-label={`View details for ${project.title}`}
          aria-haspopup="dialog"
          className="mt-8 inline-flex min-h-12 items-center gap-4 rounded-full pr-2 text-sm font-medium text-[#eeede8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6387ff]"
        >
          <span className="round-link flex h-12 w-12 items-center justify-center rounded-full border border-white/20"><ArrowUpRight size={19} aria-hidden="true" /></span>
          Explore project
        </button>
        <div className="mt-4"><ProjectLinks project={project} /></div>
      </div>
    </motion.article>
  )
}

function ProjectDialog({ project, trigger, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    const bodyOverflow = document.body.style.overflow
    const rootOverflow = document.documentElement.style.overflow
    const handleCancel = (event) => {
      event.preventDefault()
      onClose()
    }
    // Ignore a queued close event from Strict Mode's previous effect cleanup.
    const handleClose = () => {
      if (!dialog.open) onClose()
    }

    dialog.addEventListener('cancel', handleCancel)
    dialog.addEventListener('close', handleClose)
    // A modal native dialog makes the rest of the document inert and traps focus.
    dialog.showModal()
    closeButtonRef.current?.focus({ preventScroll: true })
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    setSmoothScrollPaused(true)

    return () => {
      dialog.removeEventListener('cancel', handleCancel)
      dialog.removeEventListener('close', handleClose)
      if (dialog.open) dialog.close()
      document.body.style.overflow = bodyOverflow
      document.documentElement.style.overflow = rootOverflow
      setSmoothScrollPaused(false)
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [onClose, trigger])

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-lenis-prevent
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const focusable = [...event.currentTarget.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]')]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
      className="surface-panel fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[#17191f] p-0 text-[#eeede8] shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#17191f] px-6 py-3 sm:px-9">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a1a1a8]">Project details</p>
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close project details" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#eeede8] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6387ff]">
          <X size={19} aria-hidden="true" />
        </button>
      </div>
      <div className="p-6 sm:p-9">
        <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.13em] text-[#91aaff]">{project.tagline}</p>
        <h2 id={titleId} className="font-display mt-4 text-2xl font-medium leading-tight tracking-tight sm:text-4xl">{project.title}</h2>
        <p id={descriptionId} className="mt-5 text-sm leading-[1.85] text-[#b5b5be] sm:text-base">{project.description}</p>
        <h3 className="mt-8 text-sm font-semibold">Key features</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-[#b5b5be]">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6387ff]" />
              {feature}
            </li>
          ))}
        </ul>
        <h3 className="mt-8 text-sm font-semibold">Technologies</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => <li key={tech} className="pill border border-white/10 px-3 py-1.5 text-xs text-[#b5b5be]">{tech}</li>)}
        </ul>
        <div className="mt-8 border-t border-white/10 pt-4"><ProjectLinks project={project} /></div>
      </div>
    </dialog>,
    document.body,
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const reducedMotion = useReducedMotion()
  const openProject = useCallback((project, trigger) => setSelected({ project, trigger }), [])
  const closeProject = useCallback(() => setSelected(null), [])

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-shell relative bg-[#101114]">
      <div className="site-container">
        <header className="mb-10 sm:mb-16">
          <p className="section-kicker">01 / SELECTED WORK</p>
          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
            <h2 id="projects-heading" className="editorial-heading text-[#eeede8]">Built with purpose.</h2>
            <p className="max-w-sm text-sm leading-[1.8] text-[#a1a1a8] sm:text-[15px]">A closer look at the systems I build — from connected banking services to document intelligence and explainable machine learning.</p>
          </div>
        </header>
        <div>
          {PROJECTS.map((project, index) => <ProjectRow key={project.title} project={project} index={index} onOpen={openProject} reducedMotion={reducedMotion} />)}
        </div>
      </div>
      {selected && <ProjectDialog project={selected.project} trigger={selected.trigger} onClose={closeProject} />}
    </section>
  )
}
