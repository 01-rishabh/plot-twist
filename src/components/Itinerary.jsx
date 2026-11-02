import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { SparkleIcon } from '@phosphor-icons/react'
import { site } from '../content.js'

const ease = [0.22, 1, 0.36, 1]

const dayVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease, delayChildren: 0.25, staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

// Four days on a vertical timeline. The rail fills in as you scroll through the days;
// signature activities are tinted with the accent, meals and check-ins stay quiet.
export default function Itinerary() {
  const { heading, sub, days } = site.itinerary
  const listRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] })
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24 })

  return (
    <section id="itinerary" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease }}
        >
          <h2 className="font-display text-5xl font-light leading-[1] tracking-tight md:text-6xl">{heading}</h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">{sub}</p>
        </motion.div>

        <ol ref={listRef} className="relative mt-14 md:mt-20">
          <div aria-hidden className="absolute top-3 bottom-3 left-[11.5px] w-px bg-line" />
          <motion.div
            aria-hidden
            className="absolute top-3 bottom-3 left-[11.5px] w-px origin-top bg-accent"
            style={{ scaleY: reduce ? 1 : progress }}
          />

          {days.map((day, i) => (
            <motion.li
              key={day.title}
              variants={dayVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative grid grid-cols-[24px_minmax(0,1fr)] gap-x-5 pb-14 last:pb-0 md:grid-cols-[24px_minmax(0,4fr)_minmax(0,8fr)] md:gap-x-10 md:pb-20"
            >
              <span aria-hidden className="relative mt-1 grid size-6 place-items-center rounded-full border-2 border-accent bg-bg">
                <span className="size-2 rounded-full bg-accent" />
              </span>

              <div>
                <p className="text-sm font-medium text-accent">Day {i + 1}</p>
                <h3 className="mt-1 font-display text-3xl font-light tracking-tight md:text-4xl">{day.title}</h3>
              </div>

              <ul className="col-start-2 mt-5 flex flex-wrap gap-2 md:col-start-3 md:mt-1">
                {day.items.map((item) => {
                  const { text, highlight } = typeof item === 'string' ? { text: item } : item
                  return (
                    <motion.li
                      key={text}
                      variants={itemVariants}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm ${
                        highlight ? 'border-accent/40 bg-accent/10 font-medium text-ink' : 'border-line text-muted'
                      }`}
                    >
                      {highlight && <SparkleIcon weight="fill" className="size-3.5 text-accent" aria-hidden />}
                      {text}
                    </motion.li>
                  )
                })}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
