"use client"

import { motion } from "framer-motion"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

type FullPageScrollProps = {
  children: React.ReactNode
  className?: string
}

export function FullPageScroll({ children, className = "" }: Readonly<FullPageScrollProps>) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const items = useMemo(() => React.Children.toArray(children), [children])
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([])

  const setRefAt = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      sectionRefs.current[idx] = el
    },
    []
  )

  useEffect(() => {
    const root = containerRef.current
    if (!root || items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let bestIndex = activeIndex
        let bestRatio = 0
        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.index)
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio
            bestIndex = idx
          }
        }
        if (bestRatio > 0 && bestIndex !== activeIndex) {
          setActiveIndex(bestIndex)
        }
      },
      {
        root,
        threshold: [0.25, 0.5, 0.6, 0.75, 0.9, 1],
      }
    )

    sectionRefs.current.forEach((el: HTMLDivElement | null) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [items.length, activeIndex])

  const scrollToIndex = useCallback((idx: number) => {
    const root = containerRef.current
    const target = sectionRefs.current[idx]
    if (!root || !target) return
    root.scrollTo({ top: target.offsetTop, behavior: "smooth" })
  }, [])

  // Support scrolling to a section by element id via URL hash (e.g., #contact)
  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const scrollToHash = () => {
      const hash = window.location.hash
      if (!hash) return
      const el = document.querySelector(hash)
      if (!el) return
      // Find the wrapper that corresponds to this element
      const idx = sectionRefs.current.findIndex((ref) => ref && (ref === el || ref.contains(el)))
      if (idx >= 0) {
        const target = sectionRefs.current[idx]
        if (target) root.scrollTo({ top: target.offsetTop, behavior: "smooth" })
      } else {
        // If element is itself a section wrapper
        const wrapperIdx = sectionRefs.current.findIndex((ref) => ref === el)
        if (wrapperIdx >= 0) {
          const target = sectionRefs.current[wrapperIdx]
          if (target) root.scrollTo({ top: target.offsetTop, behavior: "smooth" })
        }
      }
    }

    // Initial check and on hash changes
    scrollToHash()
    window.addEventListener("hashchange", scrollToHash)
    return () => window.removeEventListener("hashchange", scrollToHash)
  }, [])

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "PageDown" || e.key === "ArrowDown") {
        e.preventDefault()
        scrollToIndex(Math.min(activeIndex + 1, items.length - 1))
      } else if (e.key === "PageUp" || e.key === "ArrowUp") {
        e.preventDefault()
        scrollToIndex(Math.max(activeIndex - 1, 0))
      }
    }
    root.addEventListener("keydown", onKey)
    // Make container focusable for keyboard nav
    root.tabIndex = 0
    return () => root.removeEventListener("keydown", onKey)
  }, [activeIndex, items.length, scrollToIndex])

  const variants = {
    active: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    inactive: { opacity: 0.6, y: 20, scale: 0.98, filter: "blur(1px)" },
  }

  return (
    <div
      ref={containerRef}
      className={
        "relative h-[100svh] w-full overflow-y-auto overscroll-y-contain snap-y snap-mandatory scroll-smooth bg-transparent " +
        className
      }
      aria-label="Full page sections"
    >
      {items.map((child: React.ReactNode, idx: number) => {
        const keyVal = (React.isValidElement(child) && child.key != null ? child.key : "missing-key") as React.Key
        return (
          <motion.div
            key={keyVal}
            ref={setRefAt(idx)}
            data-index={idx}
            className="min-h-0 w-screen snap-start md:flex md:min-h-[100svh] md:items-center [&>*]:h-auto [&>*]:min-h-0 [&>*]:w-screen md:[&>*]:h-full md:[&>*]:min-h-[100svh]"
            variants={variants}
            initial="inactive"
            animate={idx === activeIndex ? "active" : "inactive"}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {child}
          </motion.div>
        )
      })}

      {/* Dot Navigation */}
      <div className="fixed top-1/2 right-3 z-50 -translate-y-1/2 md:right-6">
        <ul className="flex flex-col gap-3">
          {items.map((child, i) => {
            const keyVal = React.isValidElement(child) && child.key != null ? String(child.key) : `s-${i}`
            return (
              <li key={`dot-${keyVal}`}>
                <button
                  aria-label={`Go to section ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  onClick={() => scrollToIndex(i)}
                  className={
                    "h-2 w-2 rounded-full transition-all md:h-3 md:w-3 " +
                    (i === activeIndex ? "scale-110 bg-white" : "bg-slate-400 hover:bg-slate-300")
                  }
                />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
