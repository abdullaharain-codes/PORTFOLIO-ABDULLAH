'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeIn from '@/components/animations/FadeIn'
import StaggerChildren, { staggerItem } from '@/components/animations/StaggerChildren'
import { personal, experience, certifications, testimonials } from '@/lib/data/portfolio'

export default function AboutContent() {
  const typeColors: Record<string, string> = {
    work: '#8b5cf6', education: '#3b82f6', project: '#10b981',
    achievement: '#f59e0b', learning: '#ec4899',
  }

  return (
    <div className="py-16">
      <div className="container">

        {/* ── Hero row ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">

          {/* Profile image */}
          <FadeIn direction="right">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 rounded-full"
                  style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%)', filter: 'blur(50px)' }} />
              </div>
              <div className="relative">
                {/* Spinning outer ring */}
                <div className="absolute -inset-4 rounded-full opacity-30 animate-spin-slow"
                  style={{ background: 'conic-gradient(from 0deg,rgba(124,58,237,0.7),rgba(167,139,250,0.2),rgba(236,72,153,0.4),rgba(124,58,237,0.7))' }} />

                {/* Image */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden"
                  style={{
                    border: '2px solid rgba(124,58,237,0.35)',
                    boxShadow: '0 0 48px rgba(124,58,237,0.22), 0 0 100px rgba(124,58,237,0.08)',
                  }}>
                  <Image
                    src="/images/profile.png"
                    alt="Muhammad Abdullah"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Fallback initials */}
                  <div className="absolute inset-0 flex items-center justify-center font-display font-black"
                    style={{ fontSize: 72, background: 'linear-gradient(135deg,rgba(124,58,237,0.15),rgba(19,19,31,0.95))', color: 'rgba(167,139,250,0.5)' }}>
                    MA
                  </div>
                </div>

                {/* Status badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-xl glass"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-mono text-[11px] text-white font-semibold">Open to opportunities</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeIn>

          {/* Bio */}
          <FadeIn direction="left" delay={0.1}>
            <div className="section-label">Who I Am</div>
            <h1 className="font-display font-extrabold text-white tracking-tight mb-6"
              style={{ fontSize: 'clamp(28px,4vw,50px)', letterSpacing: '-0.02em' }}>
              About <span className="text-accent-gradient">Me</span>
            </h1>

            {personal.bio.split('\n\n').map((para, i) => (
              <p key={i} className="text-text-secondary text-[15px] leading-relaxed mb-4">
                {i === 0
                  ? <><strong className="text-white font-semibold">I&apos;m Muhammad Abdullah</strong>{para.replace("I'm Muhammad Abdullah", '')}</>
                  : para}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 mt-6 mb-8">
              {personal.tags.map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Location',  value: personal.location },
                { label: 'Status',    value: '✓ Available', color: '#4ade80' },
                { label: 'Focus',     value: 'Full Stack + AI' },
                { label: 'Education', value: 'IT Student' },
              ].map(item => (
                <div key={item.label} className="glass rounded-xl p-3">
                  <p className="font-mono text-[9px] text-text-muted uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-[13px] font-medium" style={{ color: item.color || '#f0eeff' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={personal.resumeUrl} download className="btn-primary">
                <span className="material-symbols-outlined" style={{ fontSize: 15, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>download</span>
                Download CV
              </a>
              <Link href="/contact" className="btn-secondary">
                <span className="material-symbols-outlined" style={{ fontSize: 15, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>mail</span>
                Hire Me
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* ── Experience Timeline ──────────────────────── */}
        <FadeIn>
          <div className="section-label">My Journey</div>
          <h2 className="font-display font-bold text-white tracking-tight mb-12"
            style={{ fontSize: 'clamp(24px,3.5vw,40px)', letterSpacing: '-0.02em' }}>
            Experience &amp; Timeline
          </h2>
        </FadeIn>

        <div className="relative max-w-2xl mb-24">
          <div className="absolute left-5 top-0 bottom-0 w-px timeline-line" />
          <StaggerChildren className="flex flex-col gap-5">
            {experience.map((item, i) => {
              const color = typeColors[item.type] || '#8b5cf6'
              return (
                <motion.div key={i} variants={staggerItem} className="relative flex gap-6 pl-14">
                  <div className="absolute left-[13px] top-5 w-4 h-4 rounded-full border-2 flex-shrink-0"
                    style={{ background: color, borderColor: '#080810', boxShadow: `0 0 12px ${color}70`, transform: 'translateX(-50%)' }} />
                  <div className="flex-1 glass glass-hover rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-1 flex-wrap">
                      <h3 className="font-display font-bold text-[14px] text-white">{item.role}</h3>
                      <span className="font-mono text-[9px] text-text-muted px-2 py-1 rounded-full flex-shrink-0"
                        style={{ background: 'rgba(37,37,56,0.6)', border: '1px solid #252538' }}>
                        {item.period}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] font-semibold mb-2 uppercase tracking-wider" style={{ color }}>
                      {item.company}
                    </p>
                    <p className="text-text-secondary text-[12px] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </StaggerChildren>
        </div>

        {/* ── Certifications ───────────────────────────── */}
        <FadeIn>
          <div className="section-label">Credentials</div>
          <h2 className="font-display font-bold text-white tracking-tight mb-10"
            style={{ fontSize: 'clamp(24px,3.5vw,40px)', letterSpacing: '-0.02em' }}>
            Certifications
          </h2>
        </FadeIn>
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {certifications.map((cert, i) => (
            <motion.div key={i} variants={staggerItem} className="glass glass-hover rounded-xl p-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-[11px] font-bold mb-4 border"
                style={{ background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>
                {cert.abbr}
              </div>
              <h3 className="font-display font-semibold text-white text-[13px] leading-snug mb-1.5">{cert.name}</h3>
              <p className="font-mono text-[10px] text-[#a78bfa] mb-3 uppercase tracking-wider">{cert.organization}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-text-muted">{cert.date}</span>
                <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
                  className="font-body text-[11px] text-[#a78bfa] hover:underline flex items-center gap-1">
                  Verify
                  <span className="material-symbols-outlined" style={{ fontSize: 12, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>arrow_outward</span>
                </a>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* ── Testimonials ─────────────────────────────── */}
        <FadeIn>
          <div className="section-label">Kind Words</div>
          <h2 className="font-display font-bold text-white tracking-tight mb-10"
            style={{ fontSize: 'clamp(24px,3.5vw,40px)', letterSpacing: '-0.02em' }}>
            Testimonials
          </h2>
        </FadeIn>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={staggerItem}
              className="glass glass-hover rounded-2xl p-7 flex flex-col"
              style={i === 1 ? { borderColor: 'rgba(124,58,237,0.35)', boxShadow: '0 0 32px rgba(124,58,237,0.08)' } : {}}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, j) => <span key={j} className="text-[#a78bfa] text-sm">★</span>)}</div>
                <span className="font-display text-5xl leading-none" style={{ color: 'rgba(124,58,237,0.25)', lineHeight: 1 }}>&ldquo;</span>
              </div>
              <p className="text-text-secondary text-[13px] leading-relaxed italic flex-1 mb-5">{t.quote}</p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(37,37,56,0.6)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(124,58,237,0.08))', border: '1px solid rgba(124,58,237,0.3)', color: '#fff' }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-[13px] font-semibold leading-none mb-0.5">{t.author}</p>
                  <p className="text-text-muted text-[11px]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

      </div>
    </div>
  )
}
