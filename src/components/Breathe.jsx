import { useRef, useState } from 'react'
import { animate, cubicBezier, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { site } from '../content.js'

const ease = [0.22, 1, 0.36, 1]
const CYCLE = 12 // seconds: 4 in, 2 hold, 6 out
const soft = cubicBezier(0.45, 0, 0.55, 1)

// Petal outlines for the lotus: [angle, scale]. Back row first, front row shorter.
const PETALS = [
  [-60, 1], [-30, 1], [0, 1], [30, 1], [60, 1],
  [-45, 0.72], [-15, 0.72], [15, 0.72], [45, 0.72],
]

function Lotus() {
  return (
    <motion.svg
      viewBox="-85 -80 170 96"
      className="w-28 text-accent md:w-36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      aria-hidden
    >
      {PETALS.map(([angle, scale], i) => (
        <g key={angle + '-' + scale} transform={`rotate(${angle}) scale(${scale})`}>
          <motion.path
            d="M0 0 C -15 -20, -15 -50, 0 -72 C 15 -50, 15 -20, 0 0 Z"
            variants={{
              hidden: { pathLength: 0, fillOpacity: 0 },
              show: { pathLength: 1, fillOpacity: 0.14, transition: { duration: 1.6, delay: i * 0.18, ease } },
            }}
            fill="currentColor"
          />
        </g>
      ))}
      <motion.path
        d="M-70 9 q17.5 8 35 0 t35 0 t35 0 t35 0"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.6, delay: 1.9, ease } } }}
      />
    </motion.svg>
  )
}

// One shared clock drives the circle and the label, so they cannot drift apart.
export default function Breathe() {
  const { heading, sub } = site.breathe
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = useReducedMotion()
  const progress = useMotionValue(0)
  const [label, setLabel] = useState('Breathe in')

  // Grow while breathing in, stay while holding, shrink while breathing out.
  const scale = useTransform(progress, (p) => {
    if (p < 0.34) return 1 + 0.5 * soft(p / 0.34)
    if (p < 0.5) return 1.5
    return 1.5 - 0.5 * soft((p - 0.5) / 0.5)
  })

  useMotionValueEvent(progress, 'change', (p) => {
    const next = p < 0.34 ? 'Breathe in' : p < 0.5 ? 'Hold' : 'Breathe out'
    setLabel((current) => (current === next ? current : next))
  })

  // Run the clock only while the section is on screen.
  useEffect(() => {
    if (reduce || !inView) return
    const controls = animate(progress, [0, 1], { duration: CYCLE, repeat: Infinity, ease: 'linear' })
    return () => controls.stop()
  }, [inView, reduce, progress])

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-14 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease }}
          className="md:col-span-5"
        >
          <h2 className="font-display text-5xl font-light leading-[1] tracking-tight md:text-6xl">{heading}</h2>
          <p className="mt-5 max-w-[34ch] text-lg leading-relaxed text-muted">{sub}</p>
        </motion.div>

        <div className="md:col-span-7">
          <div className="relative mx-auto grid size-72 place-items-center md:size-96">
            {[10, 13, 16].map((rem, i) => (
              <motion.div
                key={rem}
                aria-hidden
                className={`absolute rounded-full border ${i === 0 ? 'border-accent bg-accent/10' : 'border-accent/40'}`}
                style={{ width: `${rem}rem`, height: `${rem}rem`, scale: reduce ? 1 : scale }}
              />
            ))}
            <div className="relative">
              <Lotus />
            </div>
          </div>
          <p aria-hidden className="mt-6 text-center font-display text-2xl font-light tracking-tight md:text-3xl">
            {reduce ? 'Breathe slowly' : label}
          </p>
          <p className="sr-only">Breathe in for four seconds, hold for two, breathe out for six.</p>
        </div>
      </div>
    </section>
  )
}
