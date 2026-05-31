'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const HeaderScroll = () => {
  const anchorRef = useRef<HTMLSpanElement>(null)
  const tickingRef = useRef(false)
  const [isHome, setIsHome] = useState(false)

  useEffect(() => {
    const pathname = window.location.pathname
    setIsHome(pathname === '/' || pathname === '/home')
  }, [])

  const applyScrollClasses = useCallback(
    (scrolled: boolean) => {
      const outer = anchorRef.current?.parentElement
      const inner = outer?.querySelector('header')
      if (!outer || !inner) return

      if (scrolled || isHome) {
        inner.classList.remove('max-w-2xl')
        inner.classList.add('max-w-6xl')
      }
      if (scrolled) {
        outer.classList.remove('border-violet-100')
        outer.classList.add('bg-white/95', 'border-violet-200', 'dark:bg-xyz-700/95', 'shadow-xs')
      }
      if (!scrolled) {
        outer.classList.add('border-violet-100')
        outer.classList.remove(
          'bg-white/95',
          'border-violet-200',
          'dark:bg-xyz-700/95',
          'shadow-xs'
        )
      }
      if (!scrolled && !isHome) {
        inner.classList.add('max-w-2xl')
        inner.classList.remove('max-w-6xl')
      }
    },
    [isHome]
  )

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          applyScrollClasses(window.scrollY > 20)
          tickingRef.current = false
        })
        tickingRef.current = true
      }
    }

    // Apply initial state
    applyScrollClasses(false)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [applyScrollClasses])

  return <span ref={anchorRef} className="hidden" />
}

export default HeaderScroll
