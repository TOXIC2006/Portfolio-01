import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { CERTIFICATIONS } from '../data/certifications'

export default function Certifications() {
  const reduced = useReducedMotion()

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="bg-[#101114] py-16 text-[#eeede8] sm:py-20">
      <div className="site-container">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={reduced ? { opacity: 1, y: 0 } : undefined}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-9 border-y border-white/15 py-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20 lg:py-12"
        >
          <div className="min-w-0">
            <p className="section-kicker text-blue">04 / CERTIFICATIONS</p>
            <h2 id="certifications-title" className="font-display mt-5 max-w-lg text-[clamp(2rem,3.8vw,3.5rem)] font-medium leading-[1.12] tracking-tight">
              Credentials, collected along the way.
            </h2>
          </div>

          {CERTIFICATIONS.length === 0 ? (
            <div className="flex min-w-0 items-start gap-4 lg:border-l lg:border-white/15 lg:pl-10">
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-muted">
                <BookOpen size={19} strokeWidth={1.5} />
              </span>
              <div className="min-w-0 pt-1">
                <p className="font-display text-lg font-medium">No certifications published yet.</p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                  Only verified credentials will appear here when they&apos;re ready to share.
                </p>
              </div>
            </div>
          ) : (
            <ul className="min-w-0 divide-y divide-white/15">
              {CERTIFICATIONS.map((cert) => (
                <li key={`${cert.title}-${cert.issuer}`} className="py-5 first:pt-0 last:pb-0">
                  <article>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display min-w-0 break-words text-lg font-medium leading-snug">{cert.title}</h3>
                      <span className="shrink-0 pt-1 font-mono text-xs text-muted">{cert.year}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted">{cert.issuer}</p>
                    {cert.link && cert.link !== '#' && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-blue transition-colors duration-200 hover:text-[#eeede8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue motion-reduce:transition-none"
                      >
                        View credential
                        <ArrowUpRight aria-hidden="true" size={16} />
                        <span className="sr-only">: {cert.title} (opens in a new tab)</span>
                      </a>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </section>
  )
}
