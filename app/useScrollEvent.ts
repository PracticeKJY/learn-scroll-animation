import { useEffect, useRef } from "react"

export const useScrollEvent = () => {
  const content1 = useRef<HTMLDivElement>(null)
  const content2 = useRef<HTMLDivElement>(null)
  const content3 = useRef<HTMLDivElement>(null)
  const path1 = useRef<SVGPathElement>(null)
  const path2 = useRef<SVGGeometryElement>(null)
  const path3 = useRef<SVGGeometryElement>(null)

  useEffect(() => {
    function calcDashoffset(
      scrollY: number,
      element: HTMLDivElement,
      length: number | undefined,
    ) {
      if (length && scrollY && element) {
        const ratio = (scrollY - element.offsetTop) / element.offsetHeight
        const value = length - length * ratio
        return value < 0 ? 0 : value > length ? length : value
      }
    }

    // const content1: HTMLDivElement | null = document.querySelector(
    //   "[data-content='content1']",
    // )
    // const content2: HTMLDivElement | null = document.querySelector(
    //   "[data-content='content2']",
    // )
    // const content3: HTMLDivElement | null = document.querySelector(
    //   "[data-content='content3']",
    // )

    const path1Length = path1.current?.getTotalLength()
    const path2Length = path2.current?.getTotalLength()
    const path3Length = path3.current?.getTotalLength()

    if (path1.current && content1.current !== null) {
      path1.current.style.strokeDasharray = path1Length + " " + path1Length
      path1.current.style.strokeDashoffset = String(
        calcDashoffset(window.innerHeight * 0.8, content1.current, path1Length),
      )
    }
    if (path2.current && content2.current !== null) {
      path2.current.style.strokeDasharray = path2Length + " " + path2Length
      path2.current.style.strokeDashoffset = String(
        calcDashoffset(window.innerHeight * 0.8, content2.current, path2Length),
      )
    }

    if (path3.current && content3.current !== null) {
      path3.current.style.strokeDasharray = path3Length + " " + path3Length
      path3.current.style.strokeDashoffset = String(
        calcDashoffset(window.innerHeight * 0.8, content3.current, path3Length),
      )
    }

    function scrollHandler() {
      const scrollY = window.scrollY + window.innerHeight * 0.8
      if (path1.current && content1.current !== null) {
        path1.current.style.strokeDashoffset = String(
          calcDashoffset(scrollY, content1.current, path1Length),
        )
      }
      if (path2.current && content2.current !== null) {
        path2.current.style.strokeDashoffset = String(
          calcDashoffset(scrollY, content2.current, path2Length),
        )
      }
      if (path3.current && content3.current !== null) {
        path3.current.style.strokeDashoffset = String(
          calcDashoffset(scrollY, content3.current, path3Length),
        )
      }
    }

    window.addEventListener("scroll", scrollHandler)

    return () => {
      window.removeEventListener("scroll", scrollHandler)
    }
  })

  return {
    content1,
    content2,
    content3,
    path1,
    path2,
    path3,
  }
}
