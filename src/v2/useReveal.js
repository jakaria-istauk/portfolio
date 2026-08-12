import { useEffect, useRef } from 'react'

// Adds `is-in` once an element scrolls into view, then stops watching it.
// Pass anything that swaps the children — a filter value, a list length — as
// `key`, or elements rendered after mount stay at opacity 0 forever.
export default function useReveal(key) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const targets = [
      ...(node.matches('.rise') ? [node] : []),
      ...node.querySelectorAll('.rise:not(.is-in)'),
    ].filter((el) => !el.classList.contains('is-in'))

    if (!targets.length) return

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return ref
}
