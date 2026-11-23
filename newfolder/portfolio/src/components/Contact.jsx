import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import { Loader2, Mail, MapPin, Send } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './icons'
import SectionHeading from './SectionHeading'
import { SITE } from '../data/site'
import { slideLeft, slideRight, stagger, viewportOnce } from '../animations/motionVariants'

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?', autoComplete: 'off' },
]

const inputClass = (invalid) =>
  `w-full rounded-lg border bg-transparent px-4 py-3 text-base text-ink placeholder:text-muted outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/25 ${
    invalid ? 'border-red-500/60' : 'border-white/10'
  }`

export default function Contact() {
  const reduced = useReducedMotion()
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const set = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'That email address doesn\u2019t look right.'
    if (!values.subject.trim()) next.subject = 'Please add a subject.'
    if (!values.message.trim()) next.message = 'Please write a message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const configured = EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey
    if (!configured) {
      toast.error('Message not sent — EmailJS is not configured yet.', {
        description: `Email me directly at ${SITE.email} instead.`,
        duration: 7000,
      })
      return
    }

    setSending(true)
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: values.name,
          reply_to: values.email,
          subject: values.subject,
          message: values.message,
        },
        { publicKey: EMAILJS.publicKey }
      )
      toast.success('Message sent — I\u2019ll get back to you soon.')
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('[Contact] EmailJS send failed:', err)
      toast.error('Something went wrong sending your message.', {
        description: `Please try again, or email ${SITE.email} directly.`,
        duration: 7000,
      })
    } finally {
      setSending(false)
    }
  }

  const channels = [
    {
      label: 'Email',
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      Icon: Mail,
    },
    {
      label: 'GitHub',
      value: 'github.com/TOXIC2006',
      href: SITE.github,
      Icon: GitHubIcon,
      external: true,
    },
    {
      label: 'LinkedIn',
      value: 'Coming soon',
      href: '#',
      Icon: LinkedInIcon,
      pending: true,
    },
  ]

  return (
    <section id="contact" className="section-shell">
      <div className="site-container">
        <SectionHeading
          eyebrow="05 / THE NEXT CONVERSATION"
          title="Have something in mind?"
          description="Have a role, project or idea in mind? My inbox is always open — I'll get back to you as soon as I can."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <motion.div
            variants={stagger(0.1)}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-4 lg:col-span-2"
          >
            {channels.map(({ label, value, href, Icon, external, pending }) => (
              <motion.a
                key={label}
                variants={slideLeft}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                onClick={
                  pending
                    ? (e) => {
                        e.preventDefault()
                        toast.info('LinkedIn URL coming soon.')
                      }
                    : undefined
                }
                className="glow-card flex items-center gap-4 rounded-2xl p-5"
              >
                <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-blue">
                  <Icon size={20} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-muted">
                    {label}
                  </span>
                  <span className={`mt-0.5 block text-sm font-medium ${pending ? 'text-muted' : 'text-ink'}`}>
                    {value}
                  </span>
                </span>
              </motion.a>
            ))}

            <motion.div variants={slideLeft} className="glass flex items-start gap-3 rounded-2xl p-5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              <p className="text-sm leading-relaxed text-muted">
                Based in India · Open to remote internships and opportunities.
              </p>
            </motion.div>
          </motion.div>

          <motion.form
            variants={slideRight}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            viewport={viewportOnce}
            onSubmit={onSubmit}
            noValidate
            className="surface-panel p-6 sm:p-9 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {FIELDS.map(({ name, label, type, placeholder, autoComplete }) => (
                <div key={name} className={name === 'subject' ? 'sm:col-span-2' : ''}>
                  <label htmlFor={name} className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={values[name]}
                    onChange={set(name)}
                    aria-invalid={Boolean(errors[name])}
                    aria-describedby={errors[name] ? `${name}-error` : undefined}
                    className={inputClass(Boolean(errors[name]))}
                  />
                  {errors[name] && (
                    <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project, role or idea…"
                value={values.message}
                onChange={set('message')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputClass(Boolean(errors.message))} resize-none`}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="action-link mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {sending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send Message <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
