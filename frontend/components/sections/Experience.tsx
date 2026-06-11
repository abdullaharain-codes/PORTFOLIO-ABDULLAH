'use client'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { experience } from '@/lib/data/portfolio'
import { cn } from '@/lib/utils/helpers'

const TYPE_COLORS: Record<string, string> = {
  work:        '#8B5CF6',
  education:   '#3B82F6',
  project:     '#10B981',
  achievement: '#F59E0B',
  learning:    '#EC4899',
}

export default function Experience() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="experience" className="py-24" style={{ background: 'linear-gradient(to bottom,transparent,rgba(23,23,23,0.3),transparent)' }}>
      <div className="section-wrapper">
        <div
          ref={ref as any}
          className={cn('transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
        >
          <div className="section-label">My Journey</div>
          <h2
            className="font-display font-bold text-white tracking-tight mb-2"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em' }}
          >
            Experience & Timeline
          </h2>
          <p className="text-text-secondary text-[15px] mb-16 max-w-[480px]">
            How I got here — the learning, building, and milestones along the way.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px timeline-line"
            style={{ marginLeft: -0.5 }}
          />

          <div className="flex flex-col gap-6">
            {experience.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ item, index }: { item: typeof experience[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1)
  const color = TYPE_COLORS[item.type] || '#8B5CF6'

  return (
    <div
      ref={ref as any}
      className={cn(
        'relative flex gap-6 pl-14 transition-all duration-700',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4',
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Dot */}
      <div
        className="absolute left-[13px] top-5 w-4 h-4 rounded-full border-2 border-bg-base flex-shrink-0"
        style={{
          background: color,
          boxShadow: `0 0 12px ${color}60`,
          transform: 'translateX(-50%)',
        }}
      />

      {/* Card */}
      <div
        className="flex-1 rounded-xl p-5 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
        style={{ background: '#171717', borderColor: '#2A2A2A' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${color}50`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#2A2A2A'
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="font-display font-bold text-[15px] text-white">
            {item.role}
          </h3>
          <span
            className="font-mono text-[10px] text-text-muted px-2.5 py-1 rounded-full flex-shrink-0 border"
            style={{ borderColor: '#2A2A2A', background: '#0D0D0D' }}
          >
            {item.period}
          </span>
        </div>
        <p
          className="font-mono text-[11px] font-semibold mb-2 uppercase tracking-wider"
          style={{ color }}
        >
          {item.company}
        </p>
        <p className="text-text-secondary text-[13px] leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  )
}
