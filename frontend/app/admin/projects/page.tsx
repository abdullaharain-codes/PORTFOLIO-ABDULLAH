'use client'
import { useEffect, useState } from 'react'
import { projectsApi } from '@/lib/utils/api'
import { cn } from '@/lib/utils/helpers'

const FILTERS = ['ALL PROJECTS', 'WEB APPS', 'AI', 'OPEN SOURCE']
const CATEGORY_MAP: Record<string, string> = {
  'ALL PROJECTS': '',
  'WEB APPS':    'Web Apps',
  'AI':          'AI',
  'OPEN SOURCE': 'Open Source',
}

export default function AdminProjects() {
  const [projects, setProjects]   = useState<any[]>([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState('ALL PROJECTS')
  const [stats, setStats]         = useState<any>(null)
  const [deleteId, setDeleteId]   = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const cat = CATEGORY_MAP[filter]
      const [pRes, sRes] = await Promise.all([
        projectsApi.getAll(cat ? { category: cat } : {}),
        projectsApi.getStats(),
      ])
      setProjects(pRes.data.data)
      setStats(sRes.data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [filter])

  const handleDelete = async (id: string) => {
    try {
      await projectsApi.delete(id)
      setDeleteId(null)
      load()
    } catch (e) { console.error(e) }
  }

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-display font-bold text-[28px] tracking-tight mb-1" style={{ color: '#E3E2E2' }}>
            Projects
          </h2>
          <p className="font-body text-[14px]" style={{ color: '#CBC3D7' }}>
            Manage your technical portfolio and digital experiments.
          </p>
        </div>
        <a
          href="/admin/projects/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-[13px] transition-all active:scale-95 hover:brightness-110"
          style={{
            background: '#D0BCFF',
            color: '#3C0091',
            boxShadow: '0 4px 16px rgba(208,188,255,0.2)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24" }}>
            add
          </span>
          Add New Project
        </a>
      </div>

      {/* Stats row */}
      {stats && (
        <div className="flex items-center gap-6 mb-6 pb-6" style={{ borderBottom: '1px solid #494454' }}>
          {[
            { label: 'Total', value: stats.total, color: '#D0BCFF' },
            { label: 'Live',  value: stats.live,  color: '#10B981' },
            { label: 'Draft', value: stats.draft, color: '#F59E0B' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: s.color }} />
              <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: '#CBC3D7' }}>
                {s.value} {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Filter bar */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full font-mono text-[10px] font-semibold uppercase tracking-wider border transition-all"
            style={{
              borderColor: filter === f ? '#D0BCFF' : '#494454',
              background:  filter === f ? 'rgba(208,188,255,0.1)' : 'transparent',
              color:        filter === f ? '#D0BCFF' : '#CBC3D7',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl animate-pulse" style={{ background: '#1E2020', height: 280 }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectAdminCard
              key={p._id}
              project={p}
              onDelete={() => setDeleteId(p._id)}
            />
          ))}

          {/* Add new card */}
          <a
            href="/admin/projects/new"
            className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-dashed transition-all group hover:-translate-y-0.5"
            style={{ borderColor: '#494454', minHeight: 200 }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8B5CF6'; e.currentTarget.style.background = 'rgba(139,92,246,0.03)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#494454'; e.currentTarget.style.background = 'transparent' }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border transition-colors group-hover:border-accent"
              style={{ background: '#1E2020', borderColor: '#494454' }}
            >
              <span className="material-symbols-outlined group-hover:text-accent transition-colors" style={{ fontSize: 28, color: '#CBC3D7' }}>
                add_circle
              </span>
            </div>
            <div className="text-center">
              <p className="font-display font-semibold text-[15px] mb-1 group-hover:text-white transition-colors" style={{ color: '#CBC3D7' }}>
                New Architecture
              </p>
              <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(203,195,215,0.5)' }}>
                Initiate New Project Repo
              </p>
            </div>
          </a>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="rounded-2xl p-7 max-w-sm w-full" style={{ background: '#171717', border: '1px solid #2A2A2A' }}>
            <h3 className="font-display font-bold text-white text-lg mb-2">Delete Project?</h3>
            <p className="text-text-secondary text-[13px] mb-6">This action cannot be undone. The project will be permanently removed.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-lg border font-mono text-[11px] uppercase tracking-wider transition-colors"
                style={{ borderColor: '#2A2A2A', color: '#CBC3D7' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all active:scale-95"
                style={{ background: '#93000A', color: '#FFDAD6', border: '1px solid rgba(255,180,171,0.2)' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectAdminCard({ project, onDelete }: { project: any; onDelete: () => void }) {
  const [hovered, setHovered] = useState(false)

  const GRADIENT_MAP: Record<string, string> = {
    AI:          'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',
    SaaS:        'linear-gradient(135deg,#0d1117,#161b22,#1a2332)',
    'Full Stack': 'linear-gradient(135deg,#1a0a2e,#16082e,#0f0520)',
    Tools:       'linear-gradient(135deg,#0d1f0d,#112211,#0a1a0a)',
  }
  const bg = GRADIENT_MAP[project.category] || 'linear-gradient(135deg,#1a1a2e,#161b22,#0d1117)'

  return (
    <div
      className="rounded-xl overflow-hidden border transition-all duration-300 flex flex-col"
      style={{
        background: 'rgba(23,23,23,0.7)',
        backdropFilter: 'blur(20px)',
        borderColor: hovered ? '#8B5CF6' : '#2A2A2A',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.5)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <div
          className="w-full h-full transition-all duration-500"
          style={{
            background: bg,
            filter: hovered ? 'grayscale(0)' : 'grayscale(0.5)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span
            className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border backdrop-blur-sm"
            style={
              project.status === 'live'
                ? { background: 'rgba(208,188,255,0.2)', borderColor: 'rgba(208,188,255,0.5)', color: '#D0BCFF' }
                : { background: 'rgba(52,53,53,0.5)', borderColor: '#494454', color: '#CBC3D7' }
            }
          >
            {project.status?.toUpperCase()}
          </span>
        </div>

        {/* Action overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 backdrop-blur-sm"
          style={{ background: 'rgba(13,13,13,0.8)', opacity: hovered ? 1 : 0 }}
        >
          <a
            href={`/admin/projects/${project._id}/edit`}
            className="w-11 h-11 rounded-full flex items-center justify-center border transition-all hover:border-primary-act"
            style={{ background: '#121414', borderColor: '#494454' }}
          >
            <span className="material-symbols-outlined text-primary-act" style={{ fontSize: 18, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24" }}>
              edit
            </span>
          </a>
          <button
            onClick={onDelete}
            className="w-11 h-11 rounded-full flex items-center justify-center border transition-all hover:border-error"
            style={{ background: '#121414', borderColor: '#494454' }}
          >
            <span className="material-symbols-outlined text-error" style={{ fontSize: 18, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24" }}>
              delete
            </span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-display font-semibold text-[15px] mb-3 transition-colors"
          style={{ color: hovered ? '#D0BCFF' : '#E3E2E2' }}
        >
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-auto">
          {project.techStack?.slice(0, 3).map((t: string) => (
            <span
              key={t}
              className="font-mono text-[9px] px-2 py-0.5 rounded border"
              style={{ background: 'rgba(208,188,255,0.08)', borderColor: 'rgba(208,188,255,0.2)', color: '#D0BCFF' }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: '1px solid #2A2A2A' }}>
          <span className="font-mono text-[10px]" style={{ color: '#958EA0' }}>
            {project.category}
          </span>
          <button className="text-on-surface-var hover:text-white transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
              more_vert
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
