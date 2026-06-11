'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { authApi } from '@/lib/utils/api'
import { cn } from '@/lib/utils/helpers'

const NAV = [
  { label: 'Dashboard', icon: 'dashboard',     href: '/admin/dashboard' },
  { label: 'Projects',  icon: 'folder_special', href: '/admin/projects' },
  { label: 'Messages',  icon: 'mail',           href: '/admin/messages' },
  { label: 'About',     icon: 'person_edit',    href: '/admin/about' },
  { label: 'Settings',  icon: 'settings',       href: '/admin/settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [admin, setAdmin]     = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) { setLoading(false); return }
    let cancelled = false
    const token = localStorage.getItem('admin_token')
    if (!token) { router.replace('/admin/login'); return }
    authApi.me()
      .then(r => { if (!cancelled) setAdmin({ name: r.data.name || r.data.email, email: r.data.email }) })
      .catch(() => { if (!cancelled) { localStorage.removeItem('admin_token'); router.replace('/admin/login') } })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [isLoginPage, router])

  const handleLogout = () => { localStorage.removeItem('admin_token'); router.replace('/admin/login') }

  if (isLoginPage) return <>{children}</>

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:'#080810' }}>
      <div className="w-8 h-8 rounded-full border-2 border-[#7c3aed] border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div className="flex min-h-screen" style={{ background:'#0d0e0f' }}>
      <aside className="fixed left-0 top-0 h-full w-64 flex flex-col py-8 px-6 z-50"
        style={{ background:'#080810', borderRight:'1px solid #1a1a2e' }}>
        <div className="mb-10">
          <h1 className="font-display text-[24px] font-bold tracking-tighter" style={{ color:'#d0bcff' }}>DevPortal</h1>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] mt-0.5" style={{ color:'#9b94b8' }}>Cinematic Admin</p>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          {NAV.map(item => {
            const active = pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href}
                className={cn('flex items-center gap-3.5 px-4 py-3 rounded-xl font-body text-[13px] transition-all duration-150',
                  active ? 'font-semibold' : 'hover:bg-white/[0.04]')}
                style={{ color:active?'#a78bfa':'#9b94b8', background:active?'rgba(124,58,237,0.1)':undefined, borderRight:active?'2px solid #7c3aed':'2px solid transparent' }}>
                <span className="material-symbols-outlined"
                  style={{ fontSize:18, fontVariationSettings:active?"'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24":"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24" }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="pt-5" style={{ borderTop:'1px solid #1a1a2e' }}>
          {admin && (
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-body text-[12px] font-bold flex-shrink-0"
                style={{ background:'linear-gradient(135deg,rgba(124,58,237,0.35),rgba(124,58,237,0.1))', border:'1px solid rgba(124,58,237,0.3)', color:'#fff' }}>
                {admin.name.slice(0,1).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="font-body text-[12px] font-semibold text-white truncate">{admin.name}</p>
                <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color:'#9b94b8' }}>Admin</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-[13px] transition-all"
            style={{ color:'#9b94b8' }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(147,0,10,0.18)';e.currentTarget.style.color='#ffb4ab'}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='#9b94b8'}}>
            <span className="material-symbols-outlined" style={{ fontSize:18, fontVariationSettings:"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24" }}>logout</span>
            Sign Out
          </button>
        </div>
      </aside>
      <div className="ml-64 flex-1 flex flex-col">
        <header className="fixed top-0 right-0 z-40 flex items-center justify-between h-16 px-6"
          style={{ width:'calc(100% - 16rem)', background:'rgba(13,14,15,0.9)', backdropFilter:'blur(20px)', borderBottom:'1px solid #1a1a2e' }}>
          <span className="font-display text-[17px] font-bold" style={{ color:'#d0bcff' }}>Admin Console</span>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all"
              style={{ color:'#9b94b8', border:'1px solid #1a1a2e' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='#7c3aed';e.currentTarget.style.color='#d0bcff'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#1a1a2e';e.currentTarget.style.color='#9b94b8'}}>
              <span className="material-symbols-outlined" style={{ fontSize:13, fontVariationSettings:"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>public</span>
              View Site
            </a>
          </div>
        </header>
        <main className="mt-16 flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
