'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import PageWrapper from '@/components/layout/PageWrapper'
import { personal, projects, services } from '@/lib/data/portfolio'
import { useTypewriter } from '@/lib/hooks/useTypewriter'

/* ─── tiny helpers ─────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
}

/* ─── HERO ─────────────────────────────────────────── */
function HeroSection() {
  const typed = useTypewriter(personal.rotatingTitles, 80, 45, 2200)
  const [imgError, setImgError] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Large purple radial glow — background atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-0 w-[800px] h-[800px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgba(124,58,237,0.5) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        <div className="absolute left-1/4 bottom-0 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="container relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

          {/* ── LEFT: Two stacked glass panels (matches reference) ── */}
          <div className="flex flex-col gap-5">

            {/* Panel 1: Identity */}
            <motion.div {...fadeUp(0.05)}
              className="glass-panel p-7 md:p-9 relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.7),rgba(167,139,250,0.9),transparent)' }} />

              {/* Label row */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <span className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase"
                  style={{ color: 'rgba(167,139,250,0.7)' }}>
                  Professional Identity
                </span>
                {/* Available badge */}
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)' }}>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#a78bfa', boxShadow: '0 0 6px rgba(167,139,250,0.9)' }} />
                  <span className="font-mono text-[11px] font-semibold" style={{ color: '#c4b5fd' }}>
                    Available for Work
                  </span>
                </motion.div>
              </div>

              {/* Name */}
              <motion.h1 {...fadeUp(0.12)}
                className="font-display font-extrabold leading-[1.0] mb-5 tracking-tight"
                style={{ fontSize: 'clamp(44px,7vw,82px)' }}>
                <span className="text-gradient">{personal.firstName}</span>
                <br />
                <span className="text-gradient">{personal.lastName}</span>
              </motion.h1>

              {/* Typewriter line */}
              <motion.div {...fadeUp(0.2)}
                className="flex items-center gap-3 flex-wrap"
                style={{ fontSize: 'clamp(18px,2.5vw,28px)' }}>
                <span className="font-display font-medium" style={{ color: 'rgba(167,139,250,0.55)' }}>
                  I build
                </span>
                <span className="font-display font-semibold" style={{ color: '#a78bfa' }}>
                  {typed}
                  <span className="inline-block w-[2px] h-[0.9em] ml-0.5 align-middle rounded-sm"
                    style={{ background: '#a78bfa', animation: 'blink 1.1s step-end infinite' }} />
                </span>
              </motion.div>

              {/* Bottom shimmer */}
              <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.3),transparent)' }} />
            </motion.div>

            {/* Panel 2: Summary + CTAs */}
            <motion.div {...fadeUp(0.18)}
              className="glass-panel p-7 md:p-9 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.5),rgba(167,139,250,0.6),transparent)' }} />

              <span className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase block mb-4"
                style={{ color: 'rgba(167,139,250,0.7)' }}>
                Professional Summary &amp; Objective
              </span>

              <motion.p {...fadeUp(0.25)}
                className="text-[15px] leading-[1.85] mb-8"
                style={{ color: '#9b94b8', maxWidth: 540 }}>
                {personal.shortBio}
              </motion.p>

              {/* CTA buttons */}
              <motion.div {...fadeUp(0.32)} className="flex flex-wrap gap-3">
                <a href={personal.resumeUrl} download className="btn-primary">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
                  </svg>
                  Download CV
                </a>
                <Link href="/projects" className="btn-secondary">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 7a2 2 0 012-2h3l2 3H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-3" />
                  </svg>
                  View Projects
                </Link>
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.25),transparent)' }} />
            </motion.div>
          </div>

          {/* ── RIGHT: Profile card (matches reference exactly) ── */}
          <motion.div {...fadeUp(0.08)} className="relative flex justify-center lg:justify-end">

            {/* Projects floating badge — top right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 -right-3 z-20 flex flex-col items-center px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(14,11,24,0.92)',
                border: '1px solid rgba(124,58,237,0.4)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.15)',
              }}>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] mb-0.5" style={{ color: '#a78bfa' }}>
                Projects
              </span>
              <span className="font-display font-bold text-2xl text-white leading-none">
                {personal.stats.projectsBuilt}+
              </span>
            </motion.div>

            {/* Main profile card */}
            <div className="relative w-[300px] md:w-[360px] profile-card-glow">
              <div className="relative rounded-[18px] overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg,rgba(30,20,50,0.95),rgba(18,14,32,0.98))',
                  border: '1px solid rgba(124,58,237,0.35)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(124,58,237,0.2)',
                  aspectRatio: '3/4',
                }}>

                {/* Purple glow behind image */}
                <div className="absolute inset-0"
                  style={{ background: 'radial-gradient(circle at 50% 40%, rgba(124,58,237,0.3) 0%, transparent 65%)' }} />

                {/* Profile image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!imgError ? (
                    <Image
                      src="/images/profile.png"
                      alt="Muhammad Abdullah"
                      fill
                      className="object-cover object-top"
                      priority
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    /* Fallback initials */
                    <div className="flex items-center justify-center w-full h-full">
                      <span className="font-display font-black select-none"
                        style={{ fontSize: 100, color: 'rgba(124,58,237,0.35)', letterSpacing: '-0.04em' }}>
                        {personal.initials}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-32"
                  style={{ background: 'linear-gradient(to top,rgba(18,14,32,0.95),transparent)' }} />

                {/* Initials badge at bottom */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg,#7c3aed,#4c1d95)',
                    border: '2px solid rgba(167,139,250,0.4)',
                    boxShadow: '0 0 20px rgba(124,58,237,0.5)',
                  }}>
                  <span className="font-display font-black text-sm text-white">{personal.initials}</span>
                </motion.div>
              </div>
            </div>

            {/* Experience floating badge — bottom left */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-3 -left-3 z-20 px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(14,11,24,0.92)',
                border: '1px solid rgba(124,58,237,0.35)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.12)',
              }}>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] block mb-0.5" style={{ color: '#a78bfa' }}>
                Experience
              </span>
              <span className="font-display font-bold text-xl text-white leading-none">
                {personal.stats.yearsLearning}+ <span className="text-base font-medium" style={{ color: '#a78bfa' }}>Years</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  )
}

/* ─── STATS BAR ────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { num: `${personal.stats.yearsLearning}+`, label: 'Years Learning' },
    { num: `${personal.stats.projectsBuilt}+`, label: 'Projects Built' },
    { num: `${personal.stats.technologiesUsed}+`, label: 'Technologies' },
    { num: '100%', label: 'Commitment' },
  ]
  return (
    <motion.section {...reveal} className="py-8">
      <div className="container">
        <div className="glass-panel px-6 py-5"
          style={{ background: 'rgba(12,9,22,0.7)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
            style={{ '--tw-divide-opacity': '1', borderColor: 'rgba(124,58,237,0.15)' } as any}>
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1 py-4 px-6">
                <span className="font-display font-extrabold text-3xl text-white">{s.num}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#9b94b8' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── PROJECTS PREVIEW ─────────────────────────────── */
function ProjectsPreview() {
  const featured = projects.filter(p => p.featured).slice(0, 3)
  return (
    <section className="py-20">
      <div className="container">
        <motion.div {...reveal} className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="section-label">What I&apos;ve Built</div>
            <h2 className="font-display font-bold tracking-tight"
              style={{ fontSize: 'clamp(26px,3.5vw,42px)', letterSpacing: '-0.02em', color: '#f0eeff' }}>
              Featured Projects
            </h2>
          </div>
          <Link href="/projects" className="btn-secondary text-sm px-4 py-2.5">
            View All
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col cursor-default h-full"
      style={{
        background: 'rgba(14,11,24,0.82)',
        border: `1px solid ${hov ? 'rgba(124,58,237,0.45)' : 'rgba(124,58,237,0.15)'}`,
        boxShadow: hov ? '0 20px 50px rgba(0,0,0,0.6),0 0 40px rgba(124,58,237,0.12)' : '0 4px 24px rgba(0,0,0,0.4)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(20px)',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Image zone */}
      <div className="relative overflow-hidden" style={{ height: 190 }}>
        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${project.gradient}`}
          style={{ transform: hov ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.5s ease', filter: hov ? 'brightness(1.1)' : 'brightness(0.8)' }}>
          <span style={{ fontSize: 52, opacity: 0.18 }}>{project.icon}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={project.status === 'live'
              ? { background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(124,58,237,0.5)', color: '#c4b5fd' }
              : { background: 'rgba(37,37,56,0.7)', border: '1px solid rgba(37,37,56,0.9)', color: '#9b94b8' }}>
            {project.status}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center gap-3 backdrop-blur-sm transition-opacity duration-25"
          style={{ background: 'rgba(8,6,18,0.75)', opacity: hov ? 1 : 0 }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              className="px-4 py-2 rounded-lg text-white text-[12px] font-medium hover:scale-105 transition-transform"
              style={{ background: 'rgba(124,58,237,0.35)', border: '1px solid rgba(124,58,237,0.55)', backdropFilter: 'blur(8px)' }}>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              className="px-4 py-2 rounded-lg text-white text-[12px] font-medium hover:scale-105 transition-transform"
              style={{ background: 'rgba(37,37,56,0.8)', border: '1px solid rgba(124,58,237,0.3)', backdropFilter: 'blur(8px)' }}>
              GitHub
            </a>
          )}
        </div>
      </div>
      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.techStack.slice(0, 3).map(t => <span key={t} className="tech-tag">{t}</span>)}
          {project.techStack.length > 3 && <span className="tech-tag">+{project.techStack.length - 3}</span>}
        </div>
        <h3 className="font-display font-bold text-[15px] mb-1.5 transition-colors"
          style={{ color: hov ? '#c4b5fd' : '#f0eeff' }}>
          {project.title}
        </h3>
        <p className="text-[12px] leading-relaxed flex-1" style={{ color: '#9b94b8' }}>
          {project.shortDescription}
        </p>
      </div>
    </div>
  )
}

/* ─── SERVICES ─────────────────────────────────────── */
function ServicesSection() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div {...reveal} className="mb-10">
          <div className="section-label">What I Offer</div>
          <h2 className="font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(26px,3.5vw,42px)', letterSpacing: '-0.02em', color: '#f0eeff' }}>
            Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel glass-panel-hover p-6 group cursor-default">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.22)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#a78bfa', fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24" }}>
                  {s.icon}
                </span>
              </div>
              <h3 className="font-display font-semibold text-[14px] mb-2 group-hover:text-[#c4b5fd] transition-colors" style={{ color: '#f0eeff' }}>
                {s.title}
              </h3>
              <p className="text-[12px] leading-relaxed" style={{ color: '#4a4568' }}>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA BANNER ───────────────────────────────────── */
function CTABanner() {
  return (
    <motion.section {...reveal} className="py-20 pb-28">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center glass-panel"
          style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(109,40,217,0.06),rgba(18,14,32,0.9))' }}>
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(167,139,250,0.7),transparent)' }} />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.2) 0%,transparent 70%)', filter: 'blur(40px)' }} />
          <h2 className="font-display font-extrabold text-white mb-4 relative z-10"
            style={{ fontSize: 'clamp(22px,3.5vw,46px)', letterSpacing: '-0.02em' }}>
            Let&apos;s Build Something{' '}
            <span className="text-accent-gradient">Great Together</span>
          </h2>
          <p className="mb-8 max-w-[440px] mx-auto leading-relaxed relative z-10" style={{ color: '#9b94b8', fontSize: 15 }}>
            Available for freelance work, full-time roles, and exciting collaborations.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative z-10">
            <Link href="/contact" className="btn-primary">
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
            </Link>
            <a href={personal.resumeUrl} download className="btn-secondary">
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ─── PAGE ─────────────────────────────────────────── */
export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <StatsBar />
      <ProjectsPreview />
      <ServicesSection />
      <CTABanner />
    </PageWrapper>
  )
}
