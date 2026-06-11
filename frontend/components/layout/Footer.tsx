'use client'
import Link from 'next/link'
import { personal } from '@/lib/data/portfolio'

const LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills',   href: '/skills' },
  { label: 'Contact',  href: '/contact' },
]

export default function Footer() {
  const socials = [
    { icon: 'code',  href: personal.socials.github,   label: 'GitHub' },
    { icon: 'link',  href: personal.socials.linkedin,  label: 'LinkedIn' },
    { icon: 'chat',  href: personal.socials.whatsapp,  label: 'WhatsApp' },
    { icon: 'mail',  href: `mailto:${personal.email}`, label: 'Email' },
  ]

  return (
    <footer style={{ borderTop: '1px solid rgba(37,37,56,0.6)', background: 'rgba(8,8,16,0.95)' }}>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-xs"
                style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa' }}>
                MA
              </div>
              <span className="font-display font-bold text-[15px] text-white">{personal.name}</span>
            </Link>
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
              Full Stack Developer & IT Student
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 flex-wrap justify-center">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className="font-body text-[12px] text-text-muted hover:text-text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-2">
            {socials.map(s => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: '#0f0f1a', borderColor: '#252538' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(124,58,237,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#252538' }}
              >
                <span className="material-symbols-outlined text-text-secondary"
                  style={{ fontSize:15, fontVariationSettings:"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
                  {s.icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(37,37,56,0.4)' }}>
          <p className="font-mono text-[10px] text-text-muted">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-text-muted">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
