'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/utils/api'

export default function AdminLogin() {
  const router = useRouter()
  const [form,    setForm]    = useState({ email:'', password:'' })
  const [error,   setError]   = useState('')
  const [status,  setStatus]  = useState<'idle'|'loading'|'success'>('idle')
  const [showPw,  setShowPw]  = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('admin_token')) { router.replace('/admin/dashboard'); return }
    } catch (_) {}
    setChecked(true)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.trim() || !form.password.trim()) { setError('Both fields are required'); return }
    setStatus('loading'); setError('')
    try {
      const res = await authApi.login(form)
      const token = res.data?.access_token
      if (!token) throw new Error('No token')
      localStorage.setItem('admin_token', token)
      setStatus('success')
      setTimeout(() => router.replace('/admin/dashboard'), 700)
    } catch (err: any) {
      setStatus('idle')
      const msg = err?.response?.data?.message || err?.message || 'Invalid credentials'
      setError(Array.isArray(msg) ? msg.join(', ') : msg)
    }
  }

  if (!checked) return null

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background:'#080810', backgroundImage:'linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)', backgroundSize:'48px 48px' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(circle at 50% 50%,rgba(124,58,237,0.08) 0%,transparent 65%)' }} />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display font-bold tracking-tighter mb-1.5"
            style={{ fontSize:34, color:'#d0bcff', textShadow:'0 0 24px rgba(208,188,255,0.2)' }}>
            DevPortal
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color:'#9b94b8' }}>
            Secure Administrative Gateway
          </p>
        </div>
        <div className="rounded-2xl p-9"
          style={{ background:'rgba(15,15,26,0.9)', border:'1px solid #1a1a2e', boxShadow:'0 0 48px rgba(124,58,237,0.06)' }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-[0.14em] ml-0.5" style={{ color:'#9b94b8' }}>
                Identification
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ fontSize:16, color:'#4a4568', fontVariationSettings:"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
                  alternate_email
                </span>
                <input type="email" className="form-input pl-10"
                  placeholder="admin@portfolio.com"
                  value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                  autoComplete="email" disabled={status!=='idle'} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-[0.14em] ml-0.5" style={{ color:'#9b94b8' }}>
                Secret Key
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ fontSize:16, color:'#4a4568', fontVariationSettings:"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
                  lock
                </span>
                <input type={showPw?'text':'password'} className="form-input pl-10 pr-10"
                  placeholder="••••••••••"
                  value={form.password} onChange={e=>setForm({...form,password:e.target.value})}
                  autoComplete="current-password" disabled={status!=='idle'} />
                <button type="button" tabIndex={-1} onClick={()=>setShowPw(v=>!v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color:'#4a4568' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:16, fontVariationSettings:"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>
                    {showPw?'visibility_off':'visibility'}
                  </span>
                </button>
              </div>
            </div>
            {error && (
              <div className="rounded-lg px-4 py-3 text-[12px] text-center"
                style={{ background:'rgba(147,0,10,0.15)', border:'1px solid rgba(255,180,171,0.2)', color:'#ffb4ab' }}>
                {error}
              </div>
            )}
            <button type="submit" disabled={status!=='idle'}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-all active:scale-[0.98]"
              style={{ background:status==='success'?'#16a34a':'#7c3aed', color:'#fff', boxShadow:'0 0 24px rgba(124,58,237,0.35)', opacity:status==='loading'?0.8:1, cursor:status!=='idle'?'not-allowed':'pointer' }}>
              {status==='loading' && (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>Authenticating...</>
              )}
              {status==='success' && (
                <><span className="material-symbols-outlined" style={{ fontSize:18, fontVariationSettings:"'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24" }}>check_circle</span>Access Granted</>
              )}
              {status==='idle' && (
                <>Initialize Session<span className="material-symbols-outlined" style={{ fontSize:16, fontVariationSettings:"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>arrow_forward</span></>
              )}
            </button>
          </form>
          <div className="mt-8 pt-6 flex justify-center" style={{ borderTop:'1px solid #1a1a2e' }}>
            <a href="/" className="flex items-center gap-1.5 font-mono text-[11px] transition-colors" style={{ color:'#4a4568' }}
              onMouseEnter={e=>e.currentTarget.style.color='#a78bfa'}
              onMouseLeave={e=>e.currentTarget.style.color='#4a4568'}>
              <span className="material-symbols-outlined" style={{ fontSize:13, fontVariationSettings:"'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20" }}>public</span>
              Return to Public Interface
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
