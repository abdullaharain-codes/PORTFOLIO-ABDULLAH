import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Muhammad Abdullah for freelance work, job opportunities, or project collaborations.',
}

export default function ContactPage() {
  return (
    <PageWrapper>
      <ContactContent />
    </PageWrapper>
  )
}
