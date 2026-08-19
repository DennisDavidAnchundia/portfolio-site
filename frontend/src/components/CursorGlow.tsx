import { useEffect, useRef, useState } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    let raf: number
    let x = 0
    let y = 0

    const handleMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const animate = () => {
      if (glowRef.current) {
        glowRef.current.style.left = `${x}px`
        glowRef.current.style.top = `${y}px`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <div
      ref={glowRef}
      className="cursor-glow active bg-amber-700/[0.04] dark:bg-cyan-400/[0.03]"
    />
  )
}
