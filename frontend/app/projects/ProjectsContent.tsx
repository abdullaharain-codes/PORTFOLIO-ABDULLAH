'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import FadeIn from '@/components/animations/FadeIn'
import { projects } from '@/lib/data/portfolio'

const FILTERS = ['All', 'AI', 'SaaS', 'Full Stack', 'Tools']

export default function ProjectsContent() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <div className="py-16">
      <div className="container">

        {/* Header */}
        <FadeIn className="mb-12">
          <div className="section-label">Portfolio</div>
          <h1 className="font-display font-extrabold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(30px,5vw,60px)', letterSpacing: '-0.02em' }}>
            Featured <span className="text-accent-gradient">Projects</span>
          </h1>
          <p className="text-text-secondary text-[15px] max-w-[520px] leading-relaxed">
            A collection of things I&apos;ve designed, built, and shipped — from AI-powered tools to full-stack SaaS products.
          </p>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.1} className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setActiveFilter(f)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-4 py-1.5 rounded-full font-mono text-[10px] font-semibold uppercase tracking-wider border transition-colors duration-200"
              style={{
                borderColor: activeFilter === f ? 'rgba(124,58,237,0.6)' : '#252538',
                color: activeFilter === f ? '#a78bfa' : '#9b94b8',
                background: activeFilter === f ? 'rgba(124,58,237,0.12)' : 'transparent',
              }}
            >
              {f}
              {activeFilter === f && (
                <motion.div
                  layoutId="filter-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.4)' }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
            </motion.button>
          ))}
        </FadeIn>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-text-muted text-[14px]">No projects in this category yet.</p>
          </div>
        )}

      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden flex flex-col cursor-default"
      style={{
        background: 'rgba(15,15,26,0.8)',
        border: `1px solid ${hovered ? 'rgba(124,58,237,0.4)' : 'rgba(37,37,56,0.8)'}`,
        boxShadow: hovered
          ? '0 20px 50px rgba(0,0,0,0.6), 0 0 32px rgba(124,58,237,0.12)'
          : '0 4px 24px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 0.25s, box-shadow 0.3s, transform 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image zone */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <div
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${project.gradient}`}
          style={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            filter: hovered ? 'brightness(1.1)' : 'brightness(0.85)',
            transition: 'transform 0.5s ease, filter 0.5s ease',
          }}
        >
          <span style={{ fontSize: 52, opacity: 0.18 }}>{project.icon}</span>
        </div>

        {/* Status */}
        <div className="absolute top-3 right-3">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full border backdrop-blur-sm"
            style={project.status === 'live'
              ? { background: 'rgba(124,58,237,0.2)', borderColor: 'rgba(124,58,237,0.45)', color: '#a78bfa' }
              : { background: 'rgba(37,37,56,0.6)', borderColor: '#252538', color: '#9b94b8' }}>
            {project.status}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[8px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(236,72,153,0.2)', border: '1px solid rgba(236,72,153,0.3)', color: '#f9a8d4' }}>
              Featured
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3"
          style={{
            background: 'rgba(8,8,16,0.75)',
            backdropFilter: 'blur(4px)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.25s',
          }}
        >
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="px-4 py-2 rounded-lg font-body text-[12px] font-medium text-white transition-all hover:scale-105"
              style={{ background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.5)', backdropFilter: 'blur(8px)' }}>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="px-4 py-2 rounded-lg font-body text-[12px] font-medium text-white transition-all hover:scale-105"
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
          {project.techStack.length > 3 && (
            <span className="tech-tag">+{project.techStack.length - 3}</span>
          )}
        </div>
        <h3 className="font-display font-bold text-[15px] mb-1.5 transition-colors"
          style={{ color: hovered ? '#a78bfa' : '#f0eeff' }}>
          {project.title}
        </h3>
        <p className="text-text-secondary text-[12px] leading-relaxed flex-1 mb-4">
          {project.shortDescription}
        </p>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3" style={{ borderTop: '1px solid rgba(37,37,56,0.6)' }}>
            {project.features.slice(0, 3).map(f => (
              <span key={f} className="font-mono text-[9px] text-text-muted px-2 py-0.5 rounded"
                style={{ background: 'rgba(37,37,56,0.4)' }}>
                ✓ {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
