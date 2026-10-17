import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { site } from '../content.js'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

// The sentence lights up word by word as it scrolls through the viewport.
export default function Manifesto() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = site.manifesto.split(' ')

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
      <p className="max-w-[24ch] font-display text-3xl font-semibold leading-[1.15] tracking-tight md:ml-[16%] md:text-5xl lg:text-6xl">
        {reduce
          ? site.manifesto
          : words.map((word, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {word}
              </Word>
            ))}
      </p>
    </section>
  )
}
