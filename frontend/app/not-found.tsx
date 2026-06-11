import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: '#080810' }}>
      <div className="text-center px-6">
        <p className="font-mono text-[11px] text-[#a78bfa] uppercase tracking-[0.2em] mb-4">404 — Page Not Found</p>
        <h1 className="font-display font-extrabold text-white mb-4"
          style={{ fontSize: 'clamp(48px,10vw,96px)', letterSpacing: '-0.04em', lineHeight: 1 }}>
          Lost in space
        </h1>
        <p className="text-text-secondary text-[15px] mb-8 max-w-[360px] mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body text-[14px] font-medium text-white transition-all"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', boxShadow: '0 0 24px rgba(124,58,237,0.4)' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
