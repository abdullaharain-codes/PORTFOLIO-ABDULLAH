'use client'
import { motion } from 'framer-motion'
import FadeIn from '@/components/animations/FadeIn'
import StaggerChildren, { staggerItem } from '@/components/animations/StaggerChildren'
import { skillCategories, techStack, services } from '@/lib/data/portfolio'

export default function SkillsContent() {
  return (
    <div className="py-16">
      <div className="container">

        {/* Header */}
        <FadeIn className="mb-16">
          <div className="section-label">Expertise</div>
          <h1 className="font-display font-extrabold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(30px,5vw,60px)', letterSpacing: '-0.02em' }}>
            Skills &amp; <span className="text-accent-gradient">Tech Stack</span>
          </h1>
          <p className="text-text-secondary text-[15px] max-w-[480px] leading-relaxed">
            Technologies and tools I work with daily to build scalable, production-ready products.
          </p>
        </FadeIn>

        {/* Skills by category */}
        <FadeIn className="mb-4">
          <div className="section-label">Proficiency</div>
          <h2 className="font-display font-bold text-white tracking-tight mb-10"
            style={{ fontSize: 'clamp(22px,3vw,36px)', letterSpacing: '-0.02em' }}>
            Skill Breakdown
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {skillCategories.map((cat, ci) => (
            <SkillCategoryCard key={cat.category} category={cat} delay={ci * 0.08} />
          ))}
        </div>

        {/* Tech Stack icons */}
        <FadeIn className="mb-4">
          <div className="section-label">Tools I Use</div>
          <h2 className="font-display font-bold text-white tracking-tight mb-10"
            style={{ fontSize: 'clamp(22px,3vw,36px)', letterSpacing: '-0.02em' }}>
            Technology Stack
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-24">
          {techStack.map(tech => (
            <motion.div
              key={tech.name}
              variants={staggerItem}
              className="glass glass-hover rounded-xl p-4 flex flex-col items-center gap-3 cursor-default group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-300"
                style={{
                  background: `${tech.color}18`,
                  border: `1px solid ${tech.color}30`,
                  color: tech.color,
                }}
              >
                {tech.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="font-body text-[11px] text-text-secondary group-hover:text-white transition-colors text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* Services */}
        <FadeIn className="mb-4">
          <div className="section-label">What I Do</div>
          <h2 className="font-display font-bold text-white tracking-tight mb-10"
            style={{ fontSize: 'clamp(22px,3vw,36px)', letterSpacing: '-0.02em' }}>
            Services I Offer
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
          {services.map(service => (
            <motion.div key={service.title} variants={staggerItem}
              className="glass glass-hover rounded-2xl p-6 cursor-default group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                style={{ background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.2)' }}>
                <span className="material-symbols-outlined text-[#a78bfa]"
                  style={{ fontSize: 18, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24" }}>
                  {service.icon}
                </span>
              </div>
              <h3 className="font-display font-semibold text-white text-[14px] mb-2 group-hover:text-[#a78bfa] transition-colors">
                {service.title}
              </h3>
              <p className="text-text-muted text-[12px] leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </StaggerChildren>

      </div>
    </div>
  )
}

function SkillCategoryCard({
  category,
  delay,
}: {
  category: typeof skillCategories[0]
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl p-6"
      style={{ border: '1px solid rgba(37,37,56,0.8)' }}
    >
      <h3 className="font-mono text-[10px] font-semibold text-[#a78bfa] uppercase tracking-[0.14em] mb-5">
        {category.category}
      </h3>
      <div className="flex flex-col gap-4">
        {category.items.map(skill => (
          <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
        ))}
      </div>
    </motion.div>
  )
}

function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-body text-[13px] font-medium text-white group-hover:text-[#a78bfa] transition-colors">
          {name}
        </span>
        <span className="font-mono text-[11px] text-[#a78bfa]">{percentage}%</span>
      </div>
      <div className="h-[3px] rounded-full overflow-hidden" style={{ background: '#1a1a2e' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="skill-bar-fill h-full rounded-full"
        />
      </div>
    </motion.div>
  )
}
