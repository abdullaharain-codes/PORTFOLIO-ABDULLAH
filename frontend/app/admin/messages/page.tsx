'use client'
import { useEffect, useState } from 'react'
import { messagesApi } from '@/lib/utils/api'
import { formatDate, cn } from '@/lib/utils/helpers'

export default function AdminMessages() {
  const [messages, setMessages]   = useState<any[]>([])
  const [selected, setSelected]   = useState<any>(null)
  const [loading, setLoading]     = useState(true)
  const [deleteId, setDeleteId]   = useState<string | null>(null)

  useEffect(() => {
    messagesApi.getAll({ limit: 50 })
      .then((r) => { setMessages(r.data.data); if (r.data.data.length) setSelected(r.data.data[0]) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const openMessage = async (msg: any) => {
    setSelected(msg)
    if (msg.status === 'unread') {
      await messagesApi.updateStatus(msg._id, { status: 'read' })
      setMessages((prev) => prev.map((m) => m._id === msg._id ? { ...m, status: 'read' } : m))
    }
  }

  const handleDelete = async (id: string) => {
    await messagesApi.delete(id)
    setMessages((prev) => prev.filter((m) => m._id !== id))
    if (selected?._id === id) setSelected(null)
    setDeleteId(null)
  }

  const handleMarkRead = async () => {
    if (!selected) return
    await messagesApi.updateStatus(selected._id, { status: 'read' })
    setMessages((prev) => prev.map((m) => m._id === selected._id ? { ...m, status: 'read' } : m))
    setSelected((s: any) => ({ ...s, status: 'read' }))
  }

  const STATUS_COLOR: Record<string, string> = {
    unread:  '#F59E0B',
    read:    '#3B82F6',
    replied: '#10B981',
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -mt-6 -mx-8 md:-mx-8">

      {/* ── Left pane: message list ───────────────────── */}
      <div
        className="w-80 flex-shrink-0 flex flex-col"
        style={{ borderRight: '1px solid #494454', background: '#1A1C1C' }}
      >
        {/* Pane header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #494454' }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: '#CBC3D7' }}>
            Inbox ({messages.length})
          </span>
          <button className="transition-colors" style={{ color: '#CBC3D7' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
              filter_list
            </span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-5 animate-pulse" style={{ borderBottom: '1px solid #494454' }}>
                <div className="h-3 rounded mb-2" style={{ background: '#2A2A2A', width: '60%' }} />
                <div className="h-2 rounded mb-1.5" style={{ background: '#2A2A2A', width: '80%' }} />
                <div className="h-2 rounded" style={{ background: '#2A2A2A', width: '40%' }} />
              </div>
            ))
          ) : messages.map((msg) => (
            <button
              key={msg._id}
              onClick={() => openMessage(msg)}
              className="w-full text-left p-5 transition-all duration-150 active:scale-[0.98]"
              style={{
                borderBottom: '1px solid #494454',
                borderLeft: selected?._id === msg._id ? '2px solid #8B5CF6' : '2px solid transparent',
                background: selected?._id === msg._id ? 'rgba(139,92,246,0.05)' : 'transparent',
              }}
              onMouseEnter={(e) => { if (selected?._id !== msg._id) e.currentTarget.style.background = 'rgba(52,53,53,0.3)' }}
              onMouseLeave={(e) => { if (selected?._id !== msg._id) e.currentTarget.style.background = 'transparent' }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-body font-semibold text-[13px]" style={{ color: '#E3E2E2' }}>
                  {msg.name}
                </span>
                <span className="font-mono text-[9px]" style={{ color: '#958EA0' }}>
                  {formatDate(msg.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                {msg.status === 'unread' && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#F59E0B' }} />
                )}
                <p
                  className="font-body text-[12px] truncate"
                  style={{ color: msg.status === 'unread' ? '#D0BCFF' : '#E3E2E2' }}
                >
                  {msg.subject}
                </p>
              </div>
              <p className="font-body text-[11px] leading-relaxed line-clamp-2" style={{ color: '#958EA0' }}>
                {msg.body}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Right pane: message detail ─────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#121414' }}>
        {selected ? (
          <>
            {/* Actions bar */}
            <div
              className="flex items-center justify-between px-8 py-3 flex-shrink-0"
              style={{
                background: 'rgba(18,20,20,0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid #494454',
              }}
            >
              <div className="flex gap-2">
                <button
                  onClick={handleMarkRead}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border font-mono text-[10px] uppercase tracking-wider transition-all hover:border-primary-act"
                  style={{ borderColor: '#494454', color: '#E3E2E2' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 15, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
                    done_all
                  </span>
                  Mark Read
                </button>
                <button
                  onClick={() => setDeleteId(selected._id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border font-mono text-[10px] uppercase tracking-wider transition-all hover:bg-error-cont/20"
                  style={{ borderColor: 'rgba(255,180,171,0.3)', color: '#FFB4AB' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 15, fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
                    delete_outline
                  </span>
                  Delete
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider border"
                  style={{
                    color: STATUS_COLOR[selected.status] || '#958EA0',
                    borderColor: `${STATUS_COLOR[selected.status] || '#958EA0'}40`,
                    background: `${STATUS_COLOR[selected.status] || '#958EA0'}12`,
                  }}
                >
                  {selected.status}
                </span>
              </div>
            </div>

            {/* Message content */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-8 lg:p-12 max-w-3xl">
              {/* Sender */}
              <div className="flex items-center gap-5 mb-10">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-body text-xl font-bold flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg,rgba(208,188,255,0.25),rgba(208,188,255,0.08))',
                    border: '2px solid rgba(208,188,255,0.2)',
                    color: '#E3E2E2',
                  }}
                >
                  {selected.name.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-display font-bold text-[26px] tracking-tight mb-0.5" style={{ color: '#E3E2E2' }}>
                    {selected.name}
                  </h3>
                  <p className="font-mono text-[12px]" style={{ color: '#D0BCFF' }}>
                    {selected.email}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: '#958EA0' }}>
                    {formatDate(selected.createdAt)}
                  </p>
                </div>
              </div>

              {/* Subject */}
              <h2 className="font-display font-bold text-[22px] mb-6" style={{ color: '#D0BCFF', lineHeight: 1.3 }}>
                {selected.subject}
              </h2>

              {/* Body */}
              <div className="font-body text-[15px] leading-loose mb-10 whitespace-pre-wrap" style={{ color: 'rgba(227,226,226,0.85)' }}>
                {selected.body}
              </div>

              {/* Reply placeholder */}
              <div
                className="flex items-center gap-4 p-5 rounded-2xl border cursor-text transition-all"
                style={{ background: '#292A2A', borderColor: '#494454' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8B5CF6' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#494454' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#958EA0', fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24" }}>
                  reply
                </span>
                <p className="flex-1 font-body text-[13px]" style={{ color: '#958EA0' }}>
                  Reply to {selected.name}...
                </p>
                <button
                  className="px-5 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:brightness-110 active:scale-95"
                  style={{ background: '#D0BCFF', color: '#3C0091' }}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-text-muted" style={{ fontSize: 48, fontVariationSettings: "'FILL' 0,'wght' 200,'GRAD' 0,'opsz' 48" }}>
                mail_outline
              </span>
              <p className="font-body text-[14px] mt-3" style={{ color: '#958EA0' }}>
                Select a message to read
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="rounded-2xl p-7 max-w-sm w-full" style={{ background: '#171717', border: '1px solid #2A2A2A' }}>
            <h3 className="font-display font-bold text-white text-lg mb-2">Delete Message?</h3>
            <p className="text-text-secondary text-[13px] mb-6">This message will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-lg border font-mono text-[11px] uppercase tracking-wider" style={{ borderColor: '#2A2A2A', color: '#CBC3D7' }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-wider active:scale-95" style={{ background: '#93000A', color: '#FFDAD6', border: '1px solid rgba(255,180,171,0.2)' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
