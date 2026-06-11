import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import ProjectsContent from './ProjectsContent'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore Muhammad Abdullah\'s portfolio of full-stack web applications, AI solutions, and SaaS products.',
}

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <ProjectsContent />
    </PageWrapper>
  )
}
