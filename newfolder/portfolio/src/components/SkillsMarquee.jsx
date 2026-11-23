import { Asterisk } from 'lucide-react'

const ITEMS = ['Java', 'Spring Boot', 'React', 'Spring AI', 'Microservices', 'Docker', 'PostgreSQL', 'RAG']

export default function SkillsMarquee() {
  return (
    <div className="expertise-strip" aria-label="Core technologies">
      <ul>
        {[...ITEMS, ...ITEMS].map((item, index) => (
          <li key={`${item}-${index}`} className={index >= ITEMS.length ? 'marquee-copy' : ''} aria-hidden={index >= ITEMS.length ? true : undefined}>
            <Asterisk size={16} className="text-blue" aria-hidden="true" /><span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
