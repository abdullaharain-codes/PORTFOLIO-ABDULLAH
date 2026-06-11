'use client'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { services } from '@/lib/data/portfolio'
import { cn } from '@/lib/utils/helpers'

export default function Services() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="services" className="py-24">
      <div className="section-wrapper">
        <div
          ref={ref as any}
          className={cn('transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
        >
          <div className="section-label">What I Offer</div>
          <h2
            className="font-display font-bold text-white tracking-tight mb-2"
            style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em' }}
          >
            Services
          </h2>
          <p className="text-text-secondary text-[15px] mb-12 max-w-[480px]">
            From concept to deployment — everything you need to ship a great product.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <div
      ref={ref as any}
      className={cn(
        'group relative rounded-2xl p-6 border transition-all duration-300 cursor-default',
        'hover:-translate-y-1',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{
        background: '#171717',
        borderColor: '#2A2A2A',
        transition: `opacity 0.6s ease ${index * 60}ms, transform 0.6s ease ${index * 60}ms, border-color 0.25s, box-shadow 0.25s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2A2A2A'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border group-hover:border-accent/40 transition-colors"
        style={{ background: 'rgba(139,92,246,0.08)', borderColor: 'rgba(139,92,246,0.18)' }}
      >
        <span
          className="material-symbols-outlined text-accent"
          style={{ fontSize: 20, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24" }}
        >
          {service.icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-white text-[15px] mb-2 group-hover:text-accent transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-text-muted text-[13px] leading-relaxed">
        {service.description}
      </p>
    </div>
  )
}
