'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/helpers'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills',   href: '/skills' },
  { label: 'Contact',  href: '/contact' },
]

export default function Navbar() {
  const pathname  = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-500',
        scrolled
          ? 'bg-[rgba(10,8,18,0.94)] backdrop-blur-2xl'
          : 'bg-[rgba(10,8,18,0.6)] backdrop-blur-md',
      )}>
        {/* Top accent line — matches reference */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg,transparent 5%,rgba(124,58,237,0.5) 30%,rgba(167,139,250,0.9) 50%,rgba(124,58,237,0.5) 70%,transparent 95%)' }} />

        <div className="container h-full flex items-center justify-between">
          {/* Logo — matches reference image (circle badge + text) */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-[13px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg,rgba(124,58,237,0.4),rgba(80,30,180,0.3))',
                border: '1px solid rgba(124,58,237,0.5)',
                boxShadow: '0 0 16px rgba(124,58,237,0.3), inset 0 1px 0 rgba(167,139,250,0.2)',
                color: '#c4b5fd',
              }}>
              MA
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle,rgba(167,139,250,0.2),transparent)' }} />
            </div>
            <div>
              <div className="font-display font-bold text-[16px] text-white leading-none tracking-tight">
                Abdullah
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] leading-none mt-0.5"
                style={{ color: '#4a4568' }}>
                DEV
              </div>
            </div>
          </Link>

          {/* Desktop nav — pill-shaped active indicator (matches reference) */}
          <div className="hidden md:flex items-center rounded-2xl px-2 py-1.5"
            style={{ background: 'rgba(14,11,24,0.7)', border: '1px solid rgba(124,58,237,0.15)', backdropFilter: 'blur(12px)' }}>
            {NAV_LINKS.map(link => {
              const active = isActive(link.href)
              return (
                <Link key={link.href} href={link.href}
                  className="relative px-4 py-1.5 rounded-xl font-body text-[13px] font-medium transition-colors duration-200"
                  style={{ color: active ? '#fff' : '#9b94b8' }}>
                  {active && (
                    <motion.div layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', boxShadow: '0 0 16px rgba(124,58,237,0.4)' }}
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }} />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Hire Me button — matches reference (purple pill) */}
          <div className="hidden md:block">
            <Link href="/contact"
              className="px-5 py-2.5 rounded-xl font-body text-[13px] font-semibold text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
                border: '1px solid rgba(167,139,250,0.2)',
                boxShadow: '0 0 20px rgba(124,58,237,0.35)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(124,58,237,0.6)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(124,58,237,0.35)' }}
            >
              Hire Me
            </Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(v => !v)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-9 h-9"
            aria-label="Toggle menu">
            <span className={cn('w-5 h-px bg-white transition-all duration-300 mx-auto', menuOpen && 'rotate-45 translate-y-[7px]')} />
            <span className={cn('w-5 h-px bg-white transition-all duration-300 mx-auto', menuOpen && 'opacity-0 scale-x-0')} />
            <span className={cn('w-5 h-px bg-white transition-all duration-300 mx-auto', menuOpen && '-rotate-45 -translate-y-[7px]')} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 md:hidden"
            style={{ background: 'rgba(8,6,18,0.98)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
            <div className="container py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href}
                  className={cn('px-4 py-3 rounded-xl text-[14px] font-medium transition-all',
                    isActive(link.href)
                      ? 'text-white'
                      : 'hover:text-white')}
                  style={{
                    color: isActive(link.href) ? '#fff' : '#9b94b8',
                    background: isActive(link.href) ? 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(109,40,217,0.1))' : undefined,
                    border: isActive(link.href) ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
                  }}>
                  {link.label}
                </Link>
              ))}
              <Link href="/contact"
                className="mt-2 py-3 rounded-xl text-center text-white font-semibold text-[14px]"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}>
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
