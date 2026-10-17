import { motion } from 'motion/react'
import { site } from '../content.js'
import CtaLink from './CtaLink.jsx'
import CardStack from './CardStack.jsx'

const ease = [0.16, 1, 0.3, 1]

// Letters drop in one by one; the second word then flips once, which is the "twist".
function KineticWord({ word, startIndex, twist }) {
  return (
    <span className="block whitespace-nowrap" style={{ perspective: 900 }}>
      {[...word].map((char, i) => {
        const delay = 0.15 + (startIndex + i) * 0.05
        return (
          <motion.span
            key={i}
            className="inline-block"
            style={{ transformOrigin: '50% 70%' }}
            initial={{ opacity: 0, y: '0.35em', rotateX: -75 }}
            animate={{ opacity: 1, y: 0, rotateX: twist ? [-75, 0, 0, 360] : 0 }}
            whileHover={{ y: '-0.06em' }}
            transition={{
              opacity: { delay, duration: 0.4 },
              y: { delay, duration: 0.8, ease },
              rotateX: twist
                ? { delay, duration: 2.1, times: [0, 0.3, 0.55, 1], ease: 'easeInOut' }
                : { delay, duration: 0.8, ease },
            }}
          >
            {char}
          </motion.span>
        )
      })}
    </span>
  )
}

export default function Hero() {
  const [first, second] = site.title.split(' ')

  return (
    <section id="top" className="relative flex min-h-[100dvh] items-end overflow-hidden pt-24 pb-14 md:pb-20">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-6 px-4 md:grid-cols-12 md:gap-12 md:px-8">
        <div className="md:col-span-7">
          <h1 aria-label={site.fullTitle} className="font-display">
            <span aria-hidden>
              <span className="block text-[clamp(4.5rem,15vw,11.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">
                <KineticWord word={first} startIndex={0} />
                {second && (
                  <span className="text-accent">
                    <KineticWord word={second} startIndex={first.length} twist />
                  </span>
                )}
              </span>
              <motion.span
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65, duration: 0.7, ease }}
                className="mt-3 block text-2xl font-semibold tracking-tight md:mt-5 md:text-4xl"
              >
                <span className="font-normal text-muted">by </span>
                {site.brand}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease }}
            className="mt-6 max-w-[34ch] text-lg leading-relaxed text-muted md:mt-8 md:text-xl"
          >
            {site.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease }}
            className="mt-8 md:mt-10"
          >
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
