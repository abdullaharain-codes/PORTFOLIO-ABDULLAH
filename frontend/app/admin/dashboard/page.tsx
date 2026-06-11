'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { adminApi } from '@/lib/utils/api'

interface Stats {
  projects: { total:number; live:number; draft:number }
  messages: { total:number; unread:number; replied:number }
}

export default function AdminDashboard() {
  const [stats,   setStats]   = useState<Stats|null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.dashboard()
      .then(r => setStats(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const cards = stats ? [
    { label:'Total Projects', value:stats.projects.total, icon:'folder_special', color:'#8b5cf6', sub:`${stats.projects.live} live` },
    { label:'Live Projects',  value:stats.projects.live,  icon:'rocket_launch',  color:'#10b981', sub:`${stats.projects.draft} drafts` },
    { label:'Total Messages', value:stats.messages.total, icon:'mail',           color:'#3b82f6', sub:`${stats.messages.unread} unread` },
    { label:'Unread',         value:stats.messages.unread,icon:'mark_email_unread',color:'#f59e0b',sub:`${stats.messages.replied} replied` },
  ] : []

  const quickLinks = [
    { title:'Manage Projects',description:'Add, edit, or remove portfolio projects.',icon:'folder_special',href:'/admin/projects',color:'#8b5cf6',badge:0 },
    { title:'View Messages',  description:'Read contact form submissions.',          icon:'mail',          href:'/admin/messages', color:'#3b82f6',badge:stats?.messages.unread },
    { title:'Update About',   description:'Edit bio, skills, and certifications.',   icon:'person_edit',   href:'/admin/about',    color:'#10b981',badge:0 },
    { title:'Settings',       description:'Change password and preferences.',        icon:'settings',      href:'/admin/settings', color:'#f59e0b',badge:0 },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="font-display font-bold text-[26px] tracking-tight mb-1" style={{ color:'#f0eeff' }}>Dashboard</h2>
        <p className="font-body text-[13px]" style={{ color:'#9b94b8' }}>Welcome back. Here's your portfolio overview.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {Array.from({length:4}).map((_,i)=>(
            <div key={i} className="rounded-xl animate-pulse" style={{ background:'#13131f', height:96 }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cards.map(card => (
            <div key={card.label}
              className="rounded-xl p-5 border transition-all hover:-translate-y-0.5"
              style={{ background:'#13131f', borderColor:'#1a1a2e' }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=`${card.color}40`}
              onMouseLeave={e=>e.currentTarget.style.borderColor='#1a1a2e'}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color:'#9b94b8' }}>{card.label}</span>
                <span className="material-symbols-outlined" style={{ fontSize:15, color:card.color, fontVariationSettings:"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>{card.icon}</span>
              </div>
              <p className="font-display font-bold text-[30px] leading-none mb-1" style={{ color:'#f0eeff' }}>{card.value}</p>
              <p className="font-mono text-[9px]" style={{ color:'#4a4568' }}>{card.sub}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickLinks.map(q => (
          <Link key={q.href} href={q.href}
            className="flex items-start gap-4 p-5 rounded-xl border transition-all hover:-translate-y-0.5 group"
            style={{ background:'#13131f', borderColor:'#1a1a2e', textDecoration:'none' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${q.color}40`;e.currentTarget.style.boxShadow=`0 8px 24px rgba(0,0,0,0.3)`}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#1a1a2e';e.currentTarget.style.boxShadow='none'}}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative"
              style={{ background:`${q.color}18`, border:`1px solid ${q.color}30` }}>
              <span className="material-symbols-outlined" style={{ fontSize:18, color:q.color, fontVariationSettings:"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24" }}>{q.icon}</span>
              {q.badge && q.badge > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px] font-bold text-white" style={{ background:'#f59e0b' }}>
                  {q.badge > 9 ? '9+' : q.badge}
                </span>
              ) : null}
            </div>
            <div>
              <h3 className="font-display font-semibold text-[13px] mb-1 group-hover:text-[#a78bfa] transition-colors" style={{ color:'#f0eeff' }}>{q.title}</h3>
              <p className="font-body text-[12px] leading-relaxed" style={{ color:'#4a4568' }}>{q.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
