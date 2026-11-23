import { useEffect, useState } from 'react'

export default function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const frame = { id: 0 }
    const update = () => {
      let current = sectionIds[0] ?? ''
      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= 160) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      cancelAnimationFrame(frame.id)
      frame.id = requestAnimationFrame(update)
    }
    const resize = new ResizeObserver(schedule)
    resize.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame.id)
      resize.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [sectionIds])

  return active
}
