'use client'
import { useState } from 'react'
import { authApi } from '@/lib/utils/api'

export default function AdminSettings() {
  const [form,   setForm]   = useState({ currentPassword:'', newPassword:'', confirmPassword:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [msg,    setMsg]    = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.newPassword !== form.confirmPassword) { setMsg('New passwords do not match'); setStatus('error'); return }
    if (form.newPassword.length < 8) { setMsg('New password must be at least 8 characters'); setStatus('error'); return }
    setStatus('loading')
    try {
      await authApi.changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword })
      setStatus('success'); setMsg('Password changed successfully')
      setForm({ currentPassword:'', newPassword:'', confirmPassword:'' })
    } catch (err: any) {
      setStatus('error'); setMsg(err?.response?.data?.message || 'Failed to change password')
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-display font-bold text-[26px] tracking-tight mb-2" style={{ color:'#f0eeff' }}>Settings</h2>
      <p className="font-body text-[13px] mb-8" style={{ color:'#9b94b8' }}>Manage your admin account.</p>

      <div className="rounded-xl p-6 border" style={{ background:'#13131f', borderColor:'#1a1a2e' }}>
        <h3 className="font-display font-semibold text-[15px] text-white mb-5">Change Password</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {[
            { key:'currentPassword', label:'Current Password', placeholder:'Enter current password' },
            { key:'newPassword',     label:'New Password',     placeholder:'Min 8 characters' },
            { key:'confirmPassword', label:'Confirm Password', placeholder:'Repeat new password' },
          ].map(field => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider" style={{ color:'#9b94b8' }}>{field.label}</label>
              <input type="password" className="form-input" placeholder={field.placeholder}
                value={(form as any)[field.key]}
                onChange={e => setForm({...form, [field.key]: e.target.value})}
                disabled={status==='loading'} />
            </div>
          ))}
          {msg && (
            <p className="text-[12px] text-center" style={{ color: status==='success'?'#4ade80':'#ffb4ab' }}>{msg}</p>
          )}
          <button type="submit" disabled={status==='loading'}
            className="w-full py-3 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all"
            style={{ background:'#7c3aed', color:'#fff', opacity:status==='loading'?0.7:1 }}>
            {status==='loading' ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
