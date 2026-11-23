import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { SITE } from '../data/site'
import { smoothScrollTo } from '../hooks/useSmoothScroll'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="site-container flex flex-wrap items-center justify-between gap-6 py-8">
        <div><p className="font-display text-xl font-medium tracking-tight">Siddharth Rawat<span className="text-blue">.</span></p><p className="mt-2 text-xs text-muted">© {YEAR} · Designed with care. Built with React.</p></div>
        <div className="flex items-center gap-6">
          <a href={SITE.github} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-2 text-xs text-muted hover:text-ink">GitHub <ArrowUpRight size={15} /></a>
          <a href={`mailto:${SITE.email}`} className="flex min-h-11 items-center gap-2 text-xs text-muted hover:text-ink">Email <ArrowUpRight size={15} /></a>
          <a href="#home" onClick={(e) => { e.preventDefault(); smoothScrollTo('#home') }} className="round-link" aria-label="Back to top"><ArrowUp size={18} /></a>
        </div>
      </div>
    </footer>
  )
}
