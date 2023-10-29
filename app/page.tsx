"use client"

import styles from "@/app/page.module.css"
import { useEffect, useRef } from "react"
import HeaderSvg from "./HeaderSvg"
import Content1Svg from "./Content1Svg"
import Content2Svg from "./Content2Svg"
import Content3Svg from "./Content3Svg"

export default function Home() {
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

    const content1: HTMLDivElement | null = document.querySelector(
      "[data-content='content1']",
    )
    const content2: HTMLDivElement | null = document.querySelector(
      "[data-content='content2']",
    )
    const content3: HTMLDivElement | null = document.querySelector(
      "[data-content='content3']",
    )

    const path1Length = path1.current?.getTotalLength()
    const path2Length = path2.current?.getTotalLength()
    const path3Length = path3.current?.getTotalLength()

    if (path1.current && content1 !== null) {
      path1.current.style.strokeDasharray = path1Length + " " + path1Length
      path1.current.style.strokeDashoffset = String(
        calcDashoffset(window.innerHeight * 0.8, content1, path1Length),
      )
    }
    if (path2.current && content2 !== null) {
      path2.current.style.strokeDasharray = path2Length + " " + path2Length
      path2.current.style.strokeDashoffset = String(
        calcDashoffset(window.innerHeight * 0.8, content2, path2Length),
      )
    }

    if (path3.current && content3 !== null) {
      path3.current.style.strokeDasharray = path3Length + " " + path3Length
      path3.current.style.strokeDashoffset = String(
        calcDashoffset(window.innerHeight * 0.8, content3, path3Length),
      )
    }

    function scrollHandler() {
      const scrollY = window.scrollY + window.innerHeight * 0.8
      if (path1.current && content1 !== null) {
        path1.current.style.strokeDashoffset = String(
          calcDashoffset(scrollY, content1, path1Length),
        )
      }
      if (path2.current && content2 !== null) {
        path2.current.style.strokeDashoffset = String(
          calcDashoffset(scrollY, content2, path2Length),
        )
      }
      if (path3.current && content3 !== null) {
        path3.current.style.strokeDashoffset = String(
          calcDashoffset(scrollY, content3, path3Length),
        )
      }
    }

    window.addEventListener("scroll", scrollHandler)
  })

  return (
    <>
      <div className={styles.header}>
        <HeaderSvg />
      </div>
      <div className={styles.content1} data-content="content1">
        <Content1Svg ref={path1} />
      </div>
      <div className={styles.content2} data-content="content2">
        <Content2Svg ref={path2} />
      </div>
      <div className={styles.content3} data-content="content3">
        <Content3Svg ref={path3} />
      </div>
    </>
  )
}
