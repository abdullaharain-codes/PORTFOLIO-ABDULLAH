'use client'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { testimonials } from '@/lib/data/portfolio'
import { cn } from '@/lib/utils/helpers'

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="testimonials" className="py-24">
      <div className="section-wrapper">
        <div
          ref={ref as any}
          className={cn(
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="section-label">Kind Words</div>
          <h2
            className="font-display font-bold text-white tracking-tight mb-2"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em' }}
          >
            Testimonials
          </h2>
          <p className="text-text-secondary text-[15px] mb-12 max-w-[480px]">
            What clients and collaborators say about working with me.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} item={t} index={i} featured={i === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  item,
  index,
  featured,
}: {
  item: (typeof testimonials)[0]
  index: number
  featured?: boolean
}) {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <div
      ref={ref as any}
      className={cn(
        'flex flex-col rounded-2xl p-7 border transition-all duration-500 cursor-default',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{
        background: '#171717',
        borderColor: featured ? 'rgba(139,92,246,0.35)' : '#2A2A2A',
        boxShadow: featured ? '0 0 32px rgba(139,92,246,0.08)' : 'none',
        transitionDelay: `${index * 80}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = featured
          ? 'rgba(139,92,246,0.35)'
          : '#2A2A2A'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Stars + quote mark row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-accent text-sm">★</span>
          ))}
        </div>
        <span
          className="font-display text-5xl leading-none select-none"
          style={{ color: 'rgba(139,92,246,0.25)', lineHeight: 1 }}
        >
          "
        </span>
      </div>

      {/* Quote */}
      <p className="text-text-secondary text-[14px] leading-relaxed italic flex-1 mb-6">
        {item.quote}
      </p>

      {/* Divider */}
      <div className="h-px mb-5" style={{ background: '#2A2A2A' }} />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-body text-[13px] font-semibold border flex-shrink-0"
          style={{
            background:
              'linear-gradient(135deg,rgba(139,92,246,0.25),rgba(139,92,246,0.08))',
            borderColor: 'rgba(139,92,246,0.3)',
            color: '#fff',
          }}
        >
          {item.initials}
        </div>
        <div>
          <p className="text-white text-[14px] font-semibold leading-none mb-1">
            {item.author}
          </p>
          <p className="text-text-muted text-[12px]">{item.role}</p>
        </div>
      </div>
    </div>
  )
}
