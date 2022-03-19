import { useEffect, useRef } from 'react'

// @ts-ignore
const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef({})
  useEffect(() => {
    // @ts-ignore
    const callback = (headings) => {
      // @ts-ignore
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      // @ts-ignore
      const visibleHeadings = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        // @ts-ignore
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      // @ts-ignore
      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id)

      if (visibleHeadings.length === 1) {
        // @ts-ignore
        setActiveId(visibleHeadings[0].target.id)
      } else if (visibleHeadings.length > 1) {
        // @ts-ignore
        const sortedVisibleHeadings = visibleHeadings.sort(
          // @ts-ignore
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        )
        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    })

    const headingElements = Array.from(document.querySelectorAll('h2, h3'))

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [setActiveId])
}

export default useIntersectionObserver
