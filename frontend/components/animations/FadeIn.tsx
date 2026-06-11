'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

export default function FadeIn({ children, delay=0, direction='up', className='', once=true }: Props) {
  const dirMap = { up:{y:28,x:0}, down:{y:-20,x:0}, left:{x:28,y:0}, right:{x:-28,y:0}, none:{x:0,y:0} }
  const {x,y} = dirMap[direction]
  return (
    <motion.div
      initial={{ opacity:0, x, y }}
      whileInView={{ opacity:1, x:0, y:0 }}
      viewport={{ once, margin:'-40px' }}
      transition={{ duration:0.6, delay, ease:[0.16,1,0.3,1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
