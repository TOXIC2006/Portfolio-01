import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'
import CountUp from './CountUp'
import { ABOUT_STATS, COURSEWORK, EDUCATION, SITE } from '../data/site'

const viewport = { once: true, amount: 0.15 }
const ease = [0.22, 1, 0.36, 1]

export default function About() {
  const reduced = useReducedMotion()
  const reveal = {
    initial: reduced ? false : { opacity: 0, y: 16 },
    animate: reduced ? { opacity: 1, y: 0 } : undefined,
    whileInView: reduced ? undefined : { opacity: 1, y: 0 },
    viewport,
    transition: { duration: reduced ? 0 : 0.4, ease },
  }

  return (
    <section id="about" aria-labelledby="about-title" className="section-shell bg-[#eeede8] text-[#101114]">
      <div className="site-container">
        <motion.div {...reveal} className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <p className="section-kicker text-[#555650]">02 / THE PERSON BEHIND THE CODE</p>
            <h2 id="about-title" className="editorial-heading mt-6 text-[#101114]">
              Curiosity,<br />put to work.
            </h2>
          </div>
          <div className="max-w-xl lg:pb-2">
            <p className="font-display text-xl leading-relaxed sm:text-2xl">
              I&apos;m {SITE.name}, a Computer Science &amp; Engineering undergraduate building full-stack web applications and AI-powered systems.
            </p>
            <p className="mt-5 text-sm leading-7 text-[#555650] sm:text-base">
              My focus is Java and Spring Boot on the backend, React on the frontend, and the fundamentals that make them work together: data structures, APIs, authentication, and databases.
            </p>
          </div>
        </motion.div>

        <motion.article
          {...reveal}
          aria-labelledby="education-title"
          className="mt-12 rounded-2xl border border-black/15 bg-[#f7f6f2] p-5 sm:mt-16 sm:p-8 lg:p-10"
        >
          <div className="grid gap-9 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="section-kicker text-[#555650]">Education / Undergraduate</p>
                <span className="font-mono text-xs text-[#555650]">{EDUCATION.period}</span>
              </div>
              <h3 id="education-title" className="font-display mt-5 max-w-md text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                {EDUCATION.degree}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#3f403c]">{EDUCATION.institution}</p>
              <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-[#555650]">
                <MapPin aria-hidden="true" size={13} />
                {EDUCATION.location}
                <span aria-hidden="true" className="mx-1">/</span>
                B.Tech · 4-Year Degree
              </p>

              <div className="mt-8 border-t border-black/15 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs">
                  <p className="text-[#555650]">Academic progression</p>
                  <p className="font-medium">{EDUCATION.year} <span className="text-[#555650]">({EDUCATION.semester})</span></p>
                </div>
                <div
                  role="progressbar"
                  aria-label="Academic progression"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={EDUCATION.progress}
                  aria-valuetext={`${EDUCATION.year}, ${EDUCATION.semester}, ${EDUCATION.progress}%`}
                  className="mt-5 h-1 overflow-hidden rounded-full bg-black/10"
                >
                  <motion.div
                    initial={reduced ? false : { scaleX: 0 }}
                    animate={reduced ? { scaleX: 1 } : undefined}
                    whileInView={reduced ? undefined : { scaleX: 1 }}
                    viewport={viewport}
                    transition={{ duration: reduced ? 0 : 0.4, ease }}
                    style={{ width: `${EDUCATION.progress}%`, transformOrigin: 'left' }}
                    className="h-full bg-blue"
                  />
                </div>
                <ol aria-label="Degree timeline" className="mt-3 flex justify-between gap-1">
                  {EDUCATION.years.map((year) => (
                    <li key={year.label} aria-current={year.now ? 'step' : undefined} className="min-w-0 text-center">
                      <span aria-hidden="true" className={`mx-auto block h-1.5 w-1.5 rounded-full ${year.now ? 'bg-[#101114]' : 'bg-black/20'}`} />
                      <span className={`mt-2 block font-mono text-[10px] sm:text-xs ${year.now ? 'font-bold text-[#101114]' : 'text-[#555650]'}`}>
                        {year.label}
                      </span>
                      {year.now && <span className="mt-1 block text-[10px] font-medium">Now</span>}
                      {year.grad && (
                        <span className="mt-1 block">
                          <GraduationCap aria-hidden="true" size={14} className="mx-auto text-[#555650]" />
                          <span className="sr-only">Graduation</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="min-w-0 border-t border-black/15 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="section-kicker text-[#555650]">Coursework</p>
              <p className="font-display mt-5 text-xl font-medium tracking-tight">The foundations behind the work.</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {COURSEWORK.map((course) => (
                  <li key={course.name} className="max-w-full rounded-full border border-black/15 px-3.5 py-2.5 text-xs leading-5 text-[#3f403c]">
                    {course.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>

        <motion.dl {...reveal} className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:mt-12 lg:grid-cols-4 lg:gap-10">
          {ABOUT_STATS.map(({ value, label }) => (
            <div key={label} className="flex min-w-0 flex-col border-t border-black/20 pt-5">
              <dt className="order-2 mt-2 text-xs leading-5 text-[#555650] sm:text-sm">{label}</dt>
              <dd className="font-display order-1 text-[clamp(1.75rem,3vw,2.6rem)] font-medium leading-tight tracking-tight">
                {value === '120+' && !reduced ? <CountUp to={120} suffix="+" duration={0.4} /> : value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
