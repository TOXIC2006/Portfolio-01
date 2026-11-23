import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/site'
import useActiveSection from '../hooks/useActiveSection'
import { smoothScrollTo } from '../hooks/useSmoothScroll'

const sectionIds = NAV_LINKS.map((link) => link.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const button = useRef(null)
  const panel = useRef(null)
  const reduced = useReducedMotion()
  const active = useActiveSection(sectionIds)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (!open) return undefined
    const key = (event) => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus() }
    }
    const outside = (event) => {
      if (!panel.current?.contains(event.target) && !button.current?.contains(event.target)) setOpen(false)
    }
    window.addEventListener('keydown', key)
    window.addEventListener('pointerdown', outside)
    return () => {
      window.removeEventListener('keydown', key)
      window.removeEventListener('pointerdown', outside)
    }
  }, [open])

  const go = (event, id) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setOpen(false)
    smoothScrollTo(`#${id}`)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur-xl">
      <motion.div aria-hidden="true" style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-blue" />
      <nav className="site-container flex h-20 items-center justify-between gap-6" aria-label="Primary">
        <a href="#home" onClick={(e) => go(e, 'home')} aria-label="Siddharth Rawat, home" className="group flex min-h-11 items-center gap-4">
          <span className="font-display text-3xl font-bold tracking-[-.08em]">sr<span className="text-blue">.</span></span>
          <span className="hidden border-l border-white/20 pl-4 text-[10px] uppercase leading-relaxed tracking-[.16em] text-muted sm:block">Personal<br />portfolio</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.filter((link) => !['home', 'contact'].includes(link.id)).map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={(e) => go(e, link.id)} aria-current={active === link.id ? 'location' : undefined} className={`relative flex min-h-11 items-center text-xs transition-colors hover:text-ink ${active === link.id ? 'text-ink' : 'text-muted'}`}>
              {link.label}
              {active === link.id && <motion.span layoutId="nav-mark" transition={{ duration: reduced ? 0 : .2 }} className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue" />}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#contact" onClick={(e) => go(e, 'contact')} className="hidden min-h-11 items-center gap-6 rounded-full border border-white/25 px-5 text-xs transition hover:bg-ink hover:text-bg sm:flex">Let’s talk <ArrowUpRight size={16} /></a>
          <button ref={button} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 lg:hidden">{open ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.nav ref={panel} id="mobile-navigation" aria-label="Mobile" initial={{ opacity: 0, y: reduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : .2 }} className="border-t border-white/10 bg-bg px-6 py-5 lg:hidden">
            {NAV_LINKS.map((link, index) => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => go(e, link.id)} aria-current={active === link.id ? 'location' : undefined} className="flex min-h-12 items-center justify-between border-b border-white/10 py-3 text-lg"><span><span className="mr-4 font-mono text-xs text-muted">0{index + 1}</span>{link.label}</span><ArrowUpRight size={17} className="text-blue" /></a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
