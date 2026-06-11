'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export const staggerItem = {
  hidden: { opacity:0, y:24 },
  show:   { opacity:1, y:0, transition:{ duration:0.55, ease:[0.16,1,0.3,1] } },
}

export default function StaggerChildren({ children, stagger=0.07, delay=0, className='' }: {
  children:ReactNode; stagger?:number; delay?:number; className?:string
}) {
  return (
    <motion.div
      variants={{ hidden:{}, show:{ transition:{ staggerChildren:stagger, delayChildren:delay } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once:true, margin:'-40px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
