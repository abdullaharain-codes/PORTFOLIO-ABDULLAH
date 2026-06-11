'use client'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { certifications } from '@/lib/data/portfolio'
import { cn } from '@/lib/utils/helpers'

export default function Certifications() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section
      id="certifications"
      className="py-24"
      style={{
        background:
          'linear-gradient(to bottom,transparent,rgba(23,23,23,0.35),transparent)',
      }}
    >
      <div className="section-wrapper">
        <div
          ref={ref as any}
          className={cn(
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <div className="section-label">Credentials</div>
          <h2
            className="font-display font-bold text-white tracking-tight mb-2"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em' }}
          >
            Certifications
          </h2>
          <p className="text-text-secondary text-[15px] mb-12 max-w-[480px]">
            Courses and certifications completed along the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <div
      ref={ref as any}
      className={cn(
        'group rounded-xl p-5 border transition-all duration-500 cursor-default',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      )}
      style={{
        background: '#171717',
        borderColor: '#2A2A2A',
        transitionDelay: `${index * 60}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2A2A2A'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Org badge */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold mb-4 border"
        style={{
          background: 'rgba(139,92,246,0.08)',
          borderColor: 'rgba(139,92,246,0.2)',
          color: '#8B5CF6',
        }}
      >
        {cert.abbr}
      </div>

      {/* Name */}
      <h3 className="font-display font-semibold text-white text-[14px] leading-snug mb-1.5 group-hover:text-accent transition-colors">
        {cert.name}
      </h3>

      {/* Org */}
      <p className="font-mono text-[11px] text-accent mb-3 uppercase tracking-wider">
        {cert.organization}
      </p>

      {/* Date + verify */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className="material-symbols-outlined text-text-muted"
            style={{
              fontSize: 13,
              fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20",
            }}
          >
            calendar_month
          </span>
          <span className="font-mono text-[10px] text-text-muted">{cert.date}</span>
        </div>

        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[12px] text-accent hover:underline flex items-center gap-1 transition-opacity hover:opacity-80"
        >
          Verify
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 13,
              fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20",
            }}
          >
            arrow_outward
          </span>
        </a>
      </div>
    </div>
  )
}
