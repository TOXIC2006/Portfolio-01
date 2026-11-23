import { motion, useReducedMotion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const reduced = useReducedMotion()
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}>
      <p className="section-kicker mb-6 text-muted">{eyebrow}</p>
      <div className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${align === 'center' ? 'lg:flex-col lg:items-center' : ''}`}>
        <motion.h2 className="editorial-heading max-w-3xl overflow-hidden pb-2" initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .15 }}>
          <motion.span className="block" variants={{ hidden: { y: '105%' }, visible: { y: 0 } }} transition={{ duration: reduced ? 0 : .55, ease: [.22, 1, .36, 1] }}>{title}</motion.span>
        </motion.h2>
        {description && <p className="max-w-sm text-sm leading-[1.85] text-muted">{description}</p>}
      </div>
    </div>
  )
}
