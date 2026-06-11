'use client'
import { useState, useEffect, useRef } from 'react'

export function useTypewriter(
  words: string[],
  speed = 90,
  deleteSpeed = 50,
  pauseMs = 2000,
) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (!words.length) return
    const current = words[wordIndex % words.length]

    const tick = () => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1))
        if (displayed.length + 1 === current.length) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseMs)
          return
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1))
        if (displayed.length - 1 === 0) {
          setIsDeleting(false)
          setWordIndex(i => i + 1)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : speed)
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, isDeleting, wordIndex, words, speed, deleteSpeed, pauseMs])

  return displayed
}
