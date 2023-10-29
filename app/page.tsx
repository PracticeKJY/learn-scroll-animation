"use client"

import styles from "@/app/page.module.css"
import { useEffect, useRef } from "react"
import HeaderSvg from "./HeaderSvg"
import Content1Svg from "./Content1Svg"
import Content2Svg from "./Content2Svg"
import Content3Svg from "./Content3Svg"
import { useScrollEvent } from "./useScrollEvent"

export default function Home() {
  const { content1, content2, content3, path1, path2, path3 } = useScrollEvent()

  return (
    <>
      <div className={styles.header}>
        <HeaderSvg />
      </div>
      <div className={styles.content1} ref={content1}>
        <Content1Svg ref={path1} />
      </div>
      <div className={styles.content2} ref={content2}>
        <Content2Svg ref={path2} />
      </div>
      <div className={styles.content3} ref={content3}>
        <Content3Svg ref={path3} />
      </div>
    </>
  )
}
