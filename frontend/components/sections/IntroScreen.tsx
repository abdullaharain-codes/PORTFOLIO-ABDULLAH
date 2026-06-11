'use client'
import { useEffect, useState } from 'react'
import { personal } from '@/lib/data/portfolio'

interface Props {
  onComplete: () => void
}

export default function IntroScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Animate progress bar to 100% over ~1.8s
    const duration = 1800
    const interval = 20
    const step = (100 / duration) * interval
    let current = 0

    const timer = setInterval(() => {
      current = Math.min(current + step, 100)
      setProgress(current)
      if (current >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setExiting(true)
          setTimeout(onComplete, 700)
        }, 300)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: '#0D0D0D',
        transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Logo + name */}
      <div
        className="relative z-10 flex flex-col items-center gap-6"
        style={{ animation: 'logoIn 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: 'linear-gradient(135deg,rgba(139,92,246,0.18),rgba(109,40,217,0.08))',
            border: '1px solid rgba(139,92,246,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Syne', sans-serif",
            fontSize: 30,
            fontWeight: 800,
            color: '#8B5CF6',
            position: 'relative',
            animation: 'glowPulse 2s ease-in-out 1s infinite',
          }}
        >
          {personal.initials}
          {/* Gradient border overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 20,
              background:
                'linear-gradient(135deg,rgba(139,92,246,0.5),transparent 50%,rgba(139,92,246,0.15))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: 1,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Name */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 600,
            color: '#A3A3A3',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            animation: 'fadeUp 0.6s ease 0.8s both',
          }}
        >
          {personal.name}
        </p>
      </div>

      {/* Loader bar */}
      <div
        className="absolute bottom-12 flex items-center gap-3"
        style={{ animation: 'fadeUp 0.5s ease 1s both' }}
      >
        <div
          style={{
            width: 140,
            height: 1,
            background: '#2A2A2A',
            borderRadius: 1,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: '#8B5CF6',
              transition: 'width 0.02s linear',
              borderRadius: 1,
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#525252',
            letterSpacing: '0.1em',
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>

      <style>{`
        @keyframes logoIn {
          from { opacity:0; transform:scale(0.7) translateY(16px) }
          to   { opacity:1; transform:scale(1) translateY(0) }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(8px) }
          to   { opacity:1; transform:translateY(0) }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow:0 0 0 0 rgba(139,92,246,0.4) }
          50%     { box-shadow:0 0 28px 6px rgba(139,92,246,0.18) }
        }
      `}</style>
    </div>
  )
}
