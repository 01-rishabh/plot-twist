import { motion } from 'motion/react'

// Fixed values (no randomness) so the petals look the same on every load: [left %, size px, seconds, delay, sway px].
const PETALS = [
  [6, 14, 26, 0, 30],
  [17, 10, 32, 7, 22],
  [29, 16, 28, 3, 36],
  [41, 11, 34, 11, 26],
  [54, 15, 27, 5, 32],
  [66, 10, 33, 13, 20],
  [78, 14, 29, 2, 34],
  [90, 12, 31, 9, 24],
]

// A few petals drift down the hero, slowly. Decorative only.
export default function Petals() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map(([left, size, duration, delay, sway], i) => (
        <motion.svg
          key={i}
          viewBox="-10 -16 20 32"
          width={size}
          height={size * 1.6}
          className="absolute top-0 text-accent"
          style={{ left: `${left}%` }}
          initial={{ y: '-8vh', opacity: 0 }}
          animate={{
            y: ['-8vh', '108vh'],
            x: [0, sway, -sway, 0],
            rotate: [0, 120, 240, 360],
            opacity: [0, 0.35, 0.35, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'linear',
            opacity: { duration, delay, repeat: Infinity, times: [0, 0.1, 0.85, 1], ease: 'linear' },
            x: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <path d="M0 -15 C 9 -7, 9 7, 0 15 C -9 7, -9 -7, 0 -15 Z" fill="currentColor" />
        </motion.svg>
      ))}
    </div>
  )
}
