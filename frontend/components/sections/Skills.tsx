'use client'
import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import { skillCategories } from '@/lib/data/portfolio'
import { cn } from '@/lib/utils/helpers'

export default function Skills() {
  const { ref, isVisible } = useScrollReveal(0.08)

  return (
    <section id="skills" className="py-24" style={{ background: 'linear-gradient(to bottom,transparent,rgba(23,23,23,0.4),transparent)' }}>
      <div className="section-wrapper">
        <div
          ref={ref as any}
          className={cn('transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
        >
          <div className="section-label">What I Know</div>
          <h2 className="font-display font-bold text-white tracking-tight mb-2"
              style={{ fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em' }}>
            Skills & Expertise
          </h2>
          <p className="text-text-secondary text-[15px] mb-12">
            Technologies I work with daily.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, ci) => (
            <SkillCategory key={cat.category} category={cat} delay={ci * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCategory({
  category,
  delay,
}: {
  category: typeof skillCategories[0]
  delay: number
}) {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref as any}
      className={cn('transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Category card */}
      <div
        className="rounded-xl p-6 border"
        style={{ background: '#171717', borderColor: '#2A2A2A' }}
      >
        <h3 className="font-mono text-[11px] font-semibold text-accent uppercase tracking-[0.12em] mb-5">
          {category.category}
        </h3>
        <div className="flex flex-col gap-4">
          {category.items.map((skill) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              animate={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillBar({
  name,
  percentage,
  animate,
}: {
  name: string
  percentage: number
  animate: boolean
}) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[13px] font-medium text-white group-hover:text-accent transition-colors">
          {name}
        </span>
        <span className="font-mono text-[11px] text-accent">{percentage}%</span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: '#2A2A2A' }}>
        <div
          className="skill-bar-fill h-full rounded-full"
          style={{
            width: animate ? `${percentage}%` : '0%',
            transitionDelay: '200ms',
          }}
        />
      </div>
    </div>
  )
}
