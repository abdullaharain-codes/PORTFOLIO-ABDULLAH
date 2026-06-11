'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '@/components/animations/FadeIn'
import { personal } from '@/lib/data/portfolio'
import { messagesApi } from '@/lib/utils/api'

type FormState = { name: string; email: string; subject: string; body: string }
type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactContent() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', body: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<Status>('idle')

  const validate = (): boolean => {
    const e: Partial<FormState> = {}
    if (!form.name.trim() || form.name.length < 2) e.name = 'Name must be at least 2 characters'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim() || form.subject.length < 3) e.subject = 'Subject is required'
    if (!form.body.trim() || form.body.length < 10) e.body = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      await messagesApi.send(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', body: '' })
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const contactLinks = [
    { icon: 'mail',  label: 'Email',    value: personal.email,                          href: `mailto:${personal.email}` },
    { icon: 'link',  label: 'LinkedIn', value: 'linkedin.com/in/muhammad-abdullah',      href: personal.socials.linkedin },
    { icon: 'code',  label: 'GitHub',   value: 'github.com/muhammad-abdullah',           href: personal.socials.github },
    { icon: 'chat',  label: 'WhatsApp', value: 'Available for quick chat',               href: personal.socials.whatsapp },
  ]

  return (
    <div className="py-16">
      <div className="container">

        {/* Header */}
        <FadeIn className="text-center mb-16">
          <div className="section-label justify-center">Get In Touch</div>
          <h1 className="font-display font-extrabold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(30px,5vw,60px)', letterSpacing: '-0.02em' }}>
            Let&apos;s Work <span className="text-accent-gradient">Together</span>
          </h1>
          <p className="text-text-secondary text-[15px] max-w-[480px] mx-auto leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Whether you&apos;re a startup,
            a company, or an individual — let&apos;s build something great.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left — info */}
          <FadeIn direction="right">
            <h2 className="font-display font-bold text-white text-[20px] mb-6">
              Contact Information
            </h2>
            <p className="text-text-secondary text-[14px] leading-relaxed mb-8">
              I&apos;m currently available for freelance work and open to full-time opportunities.
              Response time is usually within 24 hours.
            </p>

            <div className="flex flex-col gap-3 mb-10">
              {contactLinks.map(link => (
                <a key={link.label} href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl glass glass-hover group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
                    style={{ background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.2)' }}>
                    <span className="material-symbols-outlined text-[#a78bfa]"
                      style={{ fontSize: 16, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
                      {link.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-[13px] font-medium group-hover:text-[#a78bfa] transition-colors">
                      {link.value}
                    </p>
                    <p className="text-text-muted text-[11px]">{link.label}</p>
                  </div>
                  <span className="material-symbols-outlined text-text-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ fontSize: 14, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
                    arrow_outward
                  </span>
                </a>
              ))}
            </div>

            {/* Decorative availability card */}
            <div className="relative rounded-2xl overflow-hidden p-6"
              style={{
                background: 'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(109,40,217,0.06))',
                border: '1px solid rgba(124,58,237,0.2)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(167,139,250,0.5),transparent)' }} />
              <div className="flex items-center gap-3 mb-3">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0"
                />
                <span className="font-mono text-[11px] font-semibold text-white uppercase tracking-wider">
                  Currently Available
                </span>
              </div>
              <p className="text-text-secondary text-[13px] leading-relaxed">
                Open to freelance projects, full-time roles, and interesting collaborations.
                Let&apos;s discuss how I can help your team.
              </p>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn direction="left" delay={0.1}>
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-5 py-16 px-8 rounded-2xl glass"
                style={{ border: '1px solid rgba(124,58,237,0.3)' }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                  <span className="material-symbols-outlined text-[#a78bfa]"
                    style={{ fontSize: 32, fontVariationSettings: "'FILL' 1,'wght' 300,'GRAD' 0,'opsz' 40" }}>
                    check_circle
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                  <p className="text-text-secondary text-[14px] leading-relaxed">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <button onClick={() => setStatus('idle')} className="btn-secondary text-sm">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" error={errors.name}>
                    <input type="text" className="form-input" placeholder="John Smith"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input type="email" className="form-input" placeholder="john@example.com"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </Field>
                </div>

                <Field label="Subject" error={errors.subject}>
                  <input type="text" className="form-input" placeholder="Project Inquiry"
                    value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                </Field>

                <Field label="Message" error={errors.body}>
                  <textarea className="form-input resize-none" rows={6}
                    placeholder="Tell me about your project..."
                    value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} />
                </Field>

                {status === 'error' && (
                  <p className="text-red-400 text-[12px] text-center">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed mt-1">
                  {status === 'loading' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
                        send
                      </span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-[12px] font-medium text-text-secondary tracking-wide">{label}</label>
      {children}
      {error && <p className="text-red-400 text-[11px]">{error}</p>}
    </div>
  )
}
