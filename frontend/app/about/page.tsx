import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Muhammad Abdullah — IT Student and Full Stack Developer passionate about building scalable web applications and AI solutions.',
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <AboutContent />
    </PageWrapper>
  )
}
