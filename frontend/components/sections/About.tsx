'use client'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { personal } from '@/lib/data/portfolio'
import { cn } from '@/lib/utils/helpers'

export default function About() {
  const { ref: leftRef,  isVisible: leftVis  } = useScrollReveal()
  const { ref: rightRef, isVisible: rightVis } = useScrollReveal()

  return (
    <section id="about" className="py-24">
      <div className="section-wrapper">
        {/* Heading */}
        <div
          ref={leftRef as any}
          className={cn('transition-all duration-700', leftVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
        >
          <div className="section-label">Who I Am</div>
          <h2 className="font-display font-bold text-white tracking-tight mb-3"
              style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em' }}>
            About Me
          </h2>
          <p className="text-text-secondary text-[15px] max-w-[480px] leading-relaxed">
            A passionate developer building at the intersection of web and artificial intelligence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mt-16">

          {/* Avatar */}
          <div
            ref={leftRef as any}
            className={cn('transition-all duration-700 delay-100', leftVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
          >
            <div
              className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ background: '#171717', border: '1px solid #2A2A2A' }}
            >
              {/* Gradient corner accent */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg,rgba(139,92,246,0.3),transparent 50%,rgba(139,92,246,0.1))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: 1,
                }}
              />
              {/* Corner brackets */}
              {[
                'top-3 left-3 border-t border-l',
                'top-3 right-3 border-t border-r',
                'bottom-3 left-3 border-b border-l',
                'bottom-3 right-3 border-b border-r',
              ].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute w-5 h-5 ${pos}`}
                  style={{ borderColor: 'rgba(139,92,246,0.35)' }}
                />
              ))}
              {/* Initials */}
              <span
                className="text-accent-gradient font-display font-extrabold select-none"
                style={{ fontSize: 'clamp(60px,12vw,88px)' }}
              >
                {personal.initials}
              </span>
            </div>
          </div>

          {/* Text */}
          <div
            ref={rightRef as any}
            className={cn('flex flex-col justify-center transition-all duration-700 delay-200', rightVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
          >
            {personal.bio.split('\n\n').map((para, i) => (
              <p key={i} className="text-text-secondary text-[15px] leading-relaxed mb-5 last:mb-0">
                {para.startsWith("I'm")
                  ? <>{para.slice(0, 4)}<strong className="text-white font-semibold">{personal.name}</strong>{para.slice(4 + personal.name.length)}</>
                  : para}
              </p>
            ))}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {personal.tags.map((tag) => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>

            {/* Quick info */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { label: 'Location',     value: personal.location },
                { label: 'Status',       value: personal.available ? '✓ Available' : 'Unavailable' },
                { label: 'Focus',        value: 'Full Stack + AI' },
                { label: 'Education',    value: 'IT Student' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{item.label}</span>
                  <span className="text-[13px] text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
