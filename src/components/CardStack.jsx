import { motion } from 'motion/react'
import Mandala from './Mandala.jsx'

// Fans any number of cards out around the centre and cascades them down to the right,
// so a strip of every photo stays visible.
function fan(count) {
  const mid = (count - 1) / 2
  return Array.from({ length: count }, (_, i) => {
    const t = i - mid
    return { x: t * 92, y: t * 40, rotate: t * 5 }
  })
}

const ease = [0.22, 1, 0.36, 1]

// Photo cards drift into place over a slowly breathing sun.
// Hovering a card brings it to the front so its whole photo shows.
// The stage has a fixed size and is scaled down on smaller screens, centred in a shorter box.
export default function CardStack({ cards }) {
  const layout = fan(cards.length)

  return (
    <div className="relative mx-auto grid h-[13.5rem] w-full max-w-md grid-cols-1 grid-rows-1 place-items-center md:h-[28rem] xl:h-[30rem]" aria-hidden>
      <div className="relative h-[30rem] w-[34rem] shrink-0 scale-[0.44] md:scale-[0.7] lg:scale-[0.85] xl:scale-100">
        <motion.div
          className="absolute inset-0 m-auto size-[44rem] text-accent opacity-30"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <Mandala className="size-full" />
        </motion.div>

        {/* One breath every 8 seconds; MotionConfig turns it off for reduced-motion visitors. */}
        <motion.div
          className="absolute inset-0 m-auto size-96 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_30%,transparent)_0%,transparent_68%)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: [0.94, 1.06, 0.94] }}
          transition={{
            opacity: { delay: 0.3, duration: 2 },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
        />

        {cards.map(({ image, position }, i) => {
          const { x, y, rotate } = layout[i]
          const isFront = i === cards.length - 1

          return (
            <motion.div
              key={image}
              className="absolute inset-0 m-auto h-72 w-52"
              style={{ zIndex: i + 1 }}
              initial={{ opacity: 0, x: x * 0.4, y: y + 40, rotate: 0 }}
              animate={{ opacity: 1, x, y, rotate }}
              whileHover={{ y: y - 12, rotate: rotate * 0.5, scale: 1.03, zIndex: 10 }}
              transition={{ delay: 0.5 + i * 0.25, duration: 1.6, ease }}
            >
              <div
                className={`absolute inset-0 overflow-hidden rounded-3xl bg-surface ${
                  isFront
                    ? 'ring-2 ring-accent shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--accent)_45%,transparent)]'
                    : 'shadow-[0_24px_50px_-28px_color-mix(in_srgb,var(--ink)_45%,transparent)]'
                }`}
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
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
