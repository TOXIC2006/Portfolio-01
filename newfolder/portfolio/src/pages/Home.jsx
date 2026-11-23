import { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SkillsMarquee from '../components/SkillsMarquee'

const About = lazy(() => import('../components/About'))
const Skills = lazy(() => import('../components/Skills'))
const Projects = lazy(() => import('../components/Projects'))
const Certifications = lazy(() => import('../components/Certifications'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />
}

export default function Home({ ready }) {
  return (
    <div className="bg-bg text-ink">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero ready={ready} />
        <SkillsMarquee />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
          <About />
          <Skills />
          <Certifications />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
