export default function AdminAbout() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display font-bold text-[26px] tracking-tight mb-2" style={{ color:'#f0eeff' }}>About</h2>
      <p className="font-body text-[13px] mb-8" style={{ color:'#9b94b8' }}>Edit your portfolio content in <code className="font-mono text-[#a78bfa]">frontend/lib/data/portfolio.ts</code></p>
      <div className="rounded-xl p-6 border" style={{ background:'#13131f', borderColor:'#1a1a2e' }}>
        <p className="font-mono text-[12px]" style={{ color:'#9b94b8' }}>
          All portfolio data (bio, skills, experience, certifications, testimonials) is managed in a single file:<br/><br/>
          <span style={{ color:'#a78bfa' }}>frontend/lib/data/portfolio.ts</span><br/><br/>
          Edit that file directly and the changes will appear live on the portfolio instantly with hot reload.
        </p>
      </div>
    </div>
  )
}
