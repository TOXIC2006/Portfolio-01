import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

const state = { lenis: null }
const NAV_OFFSET = 96

export function smoothScrollTo(target) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const element = typeof target === 'string' ? document.querySelector(target) : null
  if (typeof target === 'string' && !element) return
  const top = Math.max(0, element ? element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET : target)
  if (state.lenis && !reduced) {
    state.lenis.start()
    state.lenis.scrollTo(top)
  } else {
    window.scrollTo({ top, behavior: reduced ? 'instant' : 'smooth' })
  }
  if (element) {
    history.replaceState(null, '', target)
    if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1')
    element.focus({ preventScroll: true })
  }
}

export function setSmoothScrollPaused(paused) {
  if (paused) state.lenis?.stop()
  else state.lenis?.start()
}

export default function useSmoothScroll() {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return undefined
    const instance = new Lenis({ autoRaf: true, duration: .9, smoothWheel: true })
    state.lenis = instance
    return () => {
      instance.destroy()
      if (state.lenis === instance) state.lenis = null
    }
  }, [reduced])
}
