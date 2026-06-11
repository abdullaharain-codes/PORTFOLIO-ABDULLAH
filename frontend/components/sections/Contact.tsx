'use client'
import { useState } from 'react'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { personal } from '@/lib/data/portfolio'
import { messagesApi } from '@/lib/utils/api'
import { cn } from '@/lib/utils/helpers'

export default function Contact() {
  const { ref, isVisible } = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim() || form.name.length < 2) e.name = 'Name must be at least 2 characters'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address'
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
    { icon: 'mail', label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: 'link', label: 'LinkedIn', value: 'linkedin.com/in/muhammad-abdullah', href: personal.socials.linkedin },
    { icon: 'code', label: 'GitHub', value: 'github.com/muhammad-abdullah', href: personal.socials.github },
    { icon: 'chat', label: 'WhatsApp', value: 'Available for quick chat', href: personal.socials.whatsapp },
  ]

  return (
    <section
      id="contact"
      className="py-24"
      style={{ borderTop: '1px solid #1F1F1F' }}
    >
      <div className="section-wrapper">
        <div
          ref={ref as any}
          className={cn(
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="section-label">Get In Touch</div>
          <h2
            className="font-display font-bold text-white tracking-tight mb-2"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em' }}
          >
            Let&apos;s Work Together
          </h2>
          <p className="text-text-secondary text-[15px] mb-12 max-w-[480px]">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — contact info */}
          <div
            className={cn(
              'transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            )}
          >
            <p className="text-text-secondary text-[15px] leading-relaxed mb-8">
              Whether you&apos;re a startup looking for a technical co-founder, a company needing
              a full-stack developer, or someone with a bold idea — let&apos;s connect and build
              something great together.
            </p>

            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 group"
                  style={{ background: '#171717', borderColor: '#2A2A2A' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
                    e.currentTarget.style.background = 'rgba(139,92,246,0.03)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2A2A2A'
                    e.currentTarget.style.background = '#171717'
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
                  >
                    <span
                      className="material-symbols-outlined text-accent"
                      style={{
                        fontSize: 16,
                        fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20",
                      }}
                    >
                      {link.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-[13px] font-medium leading-none mb-0.5 group-hover:text-accent transition-colors">
                      {link.value}
                    </p>
                    <p className="text-text-muted text-[11px]">{link.label}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            className={cn(
              'transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            )}
          >
            {status === 'success' ? (
              <SuccessState onReset={() => setStatus('idle')} />
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Full Name"
                    error={errors.name}
                    input={
                      <input
                        className="form-input"
                        type="text"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    }
                  />
                  <FormField
                    label="Email Address"
                    error={errors.email}
                    input={
                      <input
                        className="form-input"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    }
                  />
                </div>

                {/* Subject */}
                <FormField
                  label="Subject"
                  error={errors.subject}
                  input={
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Project Inquiry"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  }
                />

                {/* Message */}
                <FormField
                  label="Message"
                  error={errors.body}
                  input={
                    <textarea
                      className="form-input resize-none"
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={form.body}
                      onChange={(e) => setForm({ ...form, body: e.target.value })}
                    />
                  }
                />

                {/* Error */}
                {status === 'error' && (
                  <p className="text-red-400 text-[13px]">
                    Something went wrong. Please try again or email directly.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <SpinnerIcon />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: 16, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}
                      >
                        send
                      </span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  error,
  input,
}: {
  label: string
  error?: string
  input: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-[12px] font-medium text-text-secondary tracking-wide">
        {label}
      </label>
      {input}
      {error && <p className="text-red-400 text-[11px]">{error}</p>}
    </div>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-5 py-12 px-8 rounded-2xl border" style={{ background: '#171717', borderColor: 'rgba(139,92,246,0.3)' }}>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)' }}
      >
        <span
          className="material-symbols-outlined text-accent"
          style={{ fontSize: 32, fontVariationSettings: "'FILL' 1,'wght' 300,'GRAD' 0,'opsz' 40" }}
        >
          check_circle
        </span>
      </div>
      <div>
        <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
        <p className="text-text-secondary text-[14px] leading-relaxed">
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
      </div>
      <button onClick={onReset} className="btn-secondary text-sm px-5 py-2.5">
        Send Another
      </button>
    </div>
  )
}

function SpinnerIcon() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
