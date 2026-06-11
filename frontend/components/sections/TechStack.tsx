'use client'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { techStack } from '@/lib/data/portfolio'
import { cn } from '@/lib/utils/helpers'

export default function TechStack() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="techstack" className="py-24">
      <div className="section-wrapper">
        <div
          ref={ref as any}
          className={cn(
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="section-label">Tools I Use</div>
          <h2
            className="font-display font-bold text-white tracking-tight mb-2"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em' }}
          >
            Tech Stack
          </h2>
          <p className="text-text-secondary text-[15px] mb-12 max-w-[480px]">
            Technologies I reach for every day.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {techStack.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TechCard({
  tech,
  index,
}: {
  tech: { name: string; color: string }
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <div
      ref={ref as any}
      className={cn(
        'group relative flex flex-col items-center justify-center gap-3 p-5 rounded-xl border',
        'cursor-default select-none',
        'transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      )}
      style={{
        background: '#171717',
        borderColor: '#2A2A2A',
        transitionDelay: `${index * 40}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.45)'
        e.currentTarget.style.background = 'rgba(139,92,246,0.04)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2A2A2A'
        e.currentTarget.style.background = '#171717'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Colored dot representing the brand color */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold font-mono transition-all duration-300"
        style={{
          background: `${tech.color}18`,
          color: tech.color,
          border: `1px solid ${tech.color}30`,
        }}
      >
        {tech.name.slice(0, 2).toUpperCase()}
      </div>

      <span className="font-body text-[12px] text-text-secondary group-hover:text-white transition-colors text-center leading-tight">
        {tech.name}
      </span>
    </div>
  )
}
