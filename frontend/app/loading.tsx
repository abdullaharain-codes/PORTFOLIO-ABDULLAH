export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#080810' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#7c3aed] border-t-transparent animate-spin" />
        <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  )
}
