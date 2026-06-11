'use client'
import { useState } from 'react'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { projects } from '@/lib/data/portfolio'
import { cn } from '@/lib/utils/helpers'

const FILTERS = ['All', 'AI', 'SaaS', 'Full Stack', 'Tools']

export default function Projects() {
  const { ref, isVisible } = useScrollReveal()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-24">
      <div className="section-wrapper">
        {/* Header */}
        <div
          ref={ref as any}
          className={cn('transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
        >
          <div className="section-label">What I&apos;ve Built</div>
          <h2
            className="font-display font-bold text-white tracking-tight mb-2"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em' }}
          >
            Featured Projects
          </h2>
          <p className="text-text-secondary text-[15px] mb-8 max-w-[480px]">
            A selection of things I&apos;ve designed and built.
          </p>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  'px-4 py-1.5 rounded-full font-mono text-[10px] font-semibold uppercase tracking-wider border transition-all duration-200',
                  activeFilter === f
                    ? 'bg-accent text-white border-accent'
                    : 'text-text-secondary border-border-default hover:border-accent/50 hover:text-white',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.05)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref as any}
      className={cn(
        'group relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{
        background: '#171717',
        borderColor: hovered ? 'rgba(139,92,246,0.4)' : '#2A2A2A',
        transform: isVisible ? (hovered ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(24px)',
        transitionDelay: `${index * 70}ms`,
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.5)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image zone */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <div
          className={cn('w-full h-full flex items-center justify-center bg-gradient-to-br', project.gradient)}
          style={{
            filter: hovered ? 'grayscale(0)' : 'grayscale(0.4)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s ease, filter 0.5s ease',
          }}
        >
          <span style={{ fontSize: 48, opacity: 0.2 }}>{project.icon}</span>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              'font-mono text-[9px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border backdrop-blur-sm',
              project.status === 'live'
                ? 'bg-accent/20 border-accent/50 text-accent'
                : 'bg-surface-high/50 border-border-default text-text-secondary',
            )}
          >
            {project.status}
          </span>
        </div>

        {/* Hover overlay with CTAs */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3 backdrop-blur-sm transition-opacity duration-300"
          style={{
            background: 'rgba(0,0,0,0.65)',
            opacity: hovered ? 1 : 0,
          }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-[12px] font-medium hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-[12px] font-medium hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
          {project.techStack.length > 3 && (
            <span className="tech-tag">+{project.techStack.length - 3}</span>
          )}
        </div>
        <h3
          className="font-display font-bold text-[16px] mb-1.5 transition-colors"
          style={{ color: hovered ? '#8B5CF6' : '#fff' }}
        >
          {project.title}
        </h3>
        <p className="text-text-secondary text-[13px] leading-relaxed">
          {project.shortDescription}
        </p>
      </div>
    </div>
  )
}
