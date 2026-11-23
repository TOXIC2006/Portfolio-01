import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { ALL_SKILLS, SKILL_CATEGORIES } from '../data/skills'

const CATEGORY_BY_ID = Object.fromEntries(SKILL_CATEGORIES.map((category) => [category.id, category]))
const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue'

export default function Skills() {
  const [active, setActive] = useState('backend')
  const reduced = useReducedMotion()
  const category = CATEGORY_BY_ID[active]

  return (
    <section id="skills" aria-label="Technical skills" className="section-shell bg-[#101114] text-[#eeede8]">
      <div className="site-container">
        <SectionHeading
          eyebrow="03 / THE TOOLKIT"
          title="Built on fundamentals. Open to what's next."
          description="Backend-heavy by design, frontend-capable by practice — with AI tooling folded into the stack."
          align="left"
        />

        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14">
          <div className="min-w-0">
            <p className="mb-5 text-sm leading-6 text-muted">Select a category to explore the stack.</p>
            <div role="group" aria-label="Skill categories" className="border-t border-white/15">
              {SKILL_CATEGORIES.map((item, index) => {
                const isActive = item.id === active
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(item.id)}
                    aria-pressed={isActive}
                    aria-controls="skills-panel"
                    className={`group flex min-h-16 w-full items-center gap-4 border-b border-white/15 px-3 py-5 text-left transition-colors duration-200 motion-reduce:transition-none sm:px-4 ${focus} ${
                      isActive ? 'bg-blue/10 text-[#eeede8]' : 'text-muted hover:bg-white/[0.03] hover:text-[#eeede8]'
                    }`}
                  >
                    <span aria-hidden="true" className={`font-mono text-[10px] ${isActive ? 'text-blue' : 'text-muted'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display flex-1 text-lg font-medium tracking-tight sm:text-xl">{item.label}</span>
                    <span className="font-mono text-xs text-muted">
                      {String(item.skills.length).padStart(2, '0')}<span className="sr-only"> skills</span>
                    </span>
                    <ArrowRight aria-hidden="true" size={18} className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isActive ? 'translate-x-0 text-blue' : '-translate-x-1 text-muted group-hover:translate-x-0'}`} />
                  </button>
                )
              })}
            </div>
          </div>

          <div id="skills-panel" role="region" aria-labelledby="skills-active-title" aria-describedby="skills-selection-status" className="surface-panel min-w-0 rounded-2xl p-5 sm:p-8 lg:min-h-[460px]">
            <p id="skills-selection-status" role="status" aria-live="polite" aria-atomic="true" className="text-xs leading-5 text-muted">
              Showing {category.skills.length} skills in {category.label}.
            </p>
            <motion.div
              key={category.id}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 mt-5 flex items-center justify-between gap-4">
                <h3 id="skills-active-title" className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{category.label}</h3>
                <span aria-hidden="true" className="font-display text-5xl leading-none tracking-tighter text-blue sm:text-6xl">
                  {String(category.skills.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 sm:gap-x-7">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="flex min-h-14 min-w-0 items-center gap-2 border-t border-white/10 py-4 text-sm sm:gap-3 sm:text-base">
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-blue" />
                    <span className="break-words">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-7 sm:mt-16">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="section-kicker text-muted">The full toolkit</h3>
            <p className="font-mono text-[11px] text-muted">{ALL_SKILLS.length} skills / {SKILL_CATEGORIES.length} categories</p>
          </div>
          <div role="group" aria-label="Explore categories by skill" className="flex flex-wrap gap-2">
            {ALL_SKILLS.map((skill) => {
              const isActive = skill.categoryId === active
              return (
                <button
                  key={`${skill.categoryId}-${skill.name}`}
                  type="button"
                  onClick={() => setActive(skill.categoryId)}
                  aria-pressed={isActive}
                  aria-controls="skills-panel"
                  aria-label={`${skill.name}: show ${CATEGORY_BY_ID[skill.categoryId].label} skills`}
                  className={`inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border px-4 py-2 text-left text-xs transition-colors duration-200 motion-reduce:transition-none ${focus} ${
                    isActive ? 'border-blue/60 bg-blue/10 text-[#eeede8]' : 'border-white/15 text-muted hover:border-white/35 hover:text-[#eeede8]'
                  }`}
                >
                  <span aria-hidden="true" className={`h-1 w-1 shrink-0 rounded-full ${isActive ? 'bg-blue' : 'bg-white/30'}`} />
                  {skill.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
