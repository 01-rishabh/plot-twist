import { motion } from 'motion/react'
import { site } from '../content.js'
import CtaLink from './CtaLink.jsx'
import CardStack from './CardStack.jsx'
import EventDetails from './EventDetails.jsx'
import Petals from './Petals.jsx'

// Slow, soft easing to match the retreat's pace.
const ease = [0.22, 1, 0.36, 1]

// Letters rise into place one by one, like a slow exhale.
function KineticWord({ word, startIndex }) {
  return (
    <span className="block whitespace-nowrap">
      {[...word].map((char, i) => {
        const delay = 0.2 + (startIndex + i) * 0.07
        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: '0.25em' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ opacity: { delay, duration: 1 }, y: { delay, duration: 1.4, ease } }}
          >
            {char}
          </motion.span>
        )
      })}
    </span>
  )
}

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 1.1, ease },
})

export default function Hero() {
  const [first, second] = site.title.split(' ')

  return (
    <section id="top" className="relative flex min-h-[100dvh] items-end overflow-hidden pt-24 pb-14 md:pb-20">
      <Petals />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-6 px-4 md:grid-cols-12 md:gap-12 md:px-8">
        <div className="md:col-span-7">
          <h1 aria-label={site.fullTitle} className="font-display">
            <span aria-hidden>
              <span className="block text-[clamp(4.5rem,15vw,11.5rem)] font-light leading-[0.9] tracking-[-0.04em]">
                <KineticWord word={first} startIndex={0} />
                {second && (
                  <span className="text-accent">
                    <KineticWord word={second} startIndex={first.length} />
                  </span>
                )}
              </span>
              <motion.span {...fadeUp(0.9)} className="mt-3 block text-2xl tracking-tight md:mt-5 md:text-4xl">
                <span className="font-light text-muted">by </span>
                <span className="font-medium">{site.brand}</span>
              </motion.span>
            </span>
          </h1>

          <motion.div {...fadeUp(1)} className="mt-6 md:mt-8">
            <EventDetails />
          </motion.div>

          <motion.p {...fadeUp(1.1)} className="mt-4 max-w-[38ch] text-lg leading-relaxed text-muted md:mt-5 md:text-xl">
            {site.hero.sub}
          </motion.p>

          <motion.div {...fadeUp(1.2)} className="mt-8 md:mt-10">
            <CtaLink />
          </motion.div>
        </div>

        <div className="order-first md:order-none md:col-span-5">
          <CardStack cards={site.cards} />
        </div>
      </div>
    </section>
  )
}
