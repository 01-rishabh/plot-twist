import { motion } from 'motion/react'
import { BookOpenTextIcon, LightningIcon, SpiralIcon } from '@phosphor-icons/react'

// Cascade down and to the right so the top edge (with the word) of every card stays visible.
const layout = [
  { x: -72, y: -64, rotate: -8, Icon: BookOpenTextIcon },
  { x: 0, y: 0, rotate: -2, Icon: LightningIcon },
  { x: 72, y: 64, rotate: 6, Icon: SpiralIcon },
]

const ease = [0.16, 1, 0.3, 1]
const card = 'absolute inset-0 flex flex-col justify-between rounded-3xl p-5'

// Three story beats are dealt onto the table; the last one is face down and flips over.
// The stage has a fixed size and is scaled down on phones, centred in a shorter box.
export default function CardStack({ words }) {
  return (
    <div className="relative mx-auto grid h-[15.5rem] w-full max-w-md grid-cols-1 grid-rows-1 place-items-center md:h-[28rem]" aria-hidden>
      <div className="relative h-[28rem] w-[26rem] shrink-0 scale-[0.55] md:scale-100">
        {words.map((word, i) => {
          const { x, y, rotate, Icon } = layout[i]
          const isTwist = i === words.length - 1

          return (
            <motion.div
              key={word}
              className="absolute inset-0 m-auto h-72 w-52"
              initial={{ opacity: 0, x: 0, y: 140, rotate: 0 }}
              animate={{ opacity: 1, x, y, rotate }}
              whileHover={{ y: y - 14, rotate: rotate * 0.6 }}
              transition={{ delay: 0.5 + i * 0.16, type: 'spring', stiffness: 120, damping: 18 }}
            >
              <motion.div
                className="relative size-full"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ rotateY: isTwist ? 180 : 0 }}
                animate={{ rotateY: 0 }}
                transition={{ delay: 1.7, duration: 0.9, ease }}
              >
                <div
                  className={`${card} ${
                    isTwist
                      ? 'bg-accent text-accent-ink shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--accent)_55%,transparent)]'
                      : 'border border-line bg-surface shadow-[0_24px_50px_-28px_color-mix(in_srgb,var(--ink)_45%,transparent)]'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="font-display text-3xl font-bold leading-none tracking-tight">{word}</span>
                  <Icon weight="bold" className="size-8 self-end" />
                </div>

                {isTwist && (
                  <div
                    className="absolute inset-0 grid place-items-center rounded-3xl border border-line bg-surface"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <span className="font-display text-7xl font-extrabold text-muted">?</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
