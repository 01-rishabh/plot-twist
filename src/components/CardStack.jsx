import { motion } from 'motion/react'

// Fanned out and cascaded so a strip of every photo stays visible.
const layout = [
  { x: -108, y: -52, rotate: -8 },
  { x: 0, y: 0, rotate: -1 },
  { x: 108, y: 52, rotate: 7 },
]

const ease = [0.16, 1, 0.3, 1]
const face = 'absolute inset-0 overflow-hidden rounded-3xl'

// Three photo cards are dealt onto the table; the last one is face down and flips over.
// Hovering a card brings it to the front so its whole photo shows.
// The stage has a fixed size and is scaled down on smaller screens, centred in a shorter box.
export default function CardStack({ cards }) {
  return (
    <div className="relative mx-auto grid h-[13.5rem] w-full max-w-md grid-cols-1 grid-rows-1 place-items-center md:h-[28rem]" aria-hidden>
      <div className="relative h-[28rem] w-[28rem] shrink-0 scale-[0.48] md:scale-[0.8] lg:scale-100">
        {cards.map(({ image, position }, i) => {
          const { x, y, rotate } = layout[i]
          const isTwist = i === cards.length - 1

          return (
            <motion.div
              key={image}
              className="absolute inset-0 m-auto h-72 w-52"
              style={{ zIndex: i }}
              initial={{ opacity: 0, x: 0, y: 140, rotate: 0 }}
              animate={{ opacity: 1, x, y, rotate }}
              whileHover={{ y: y - 14, rotate: rotate * 0.5, scale: 1.04, zIndex: 10 }}
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
                  className={`${face} bg-surface ${
                    isTwist
                      ? 'ring-[3px] ring-accent shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--accent)_55%,transparent)]'
                      : 'shadow-[0_24px_50px_-28px_color-mix(in_srgb,var(--ink)_45%,transparent)]'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <img
                    src={image}
                    alt=""
                    draggable={false}
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                    style={{ objectPosition: position }}
                  />
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
