import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import SkillsContent from './SkillsContent'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Muhammad Abdullah\'s technical skills — React, Next.js, Node.js, NestJS, Python, MongoDB, Docker, AI/ML and more.',
}

export default function SkillsPage() {
  return (
    <PageWrapper>
      <SkillsContent />
    </PageWrapper>
  )
}
