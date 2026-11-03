import { motion } from 'motion/react'

// Petal rings built from ellipses, so the geometry is exact: [petal count, centre offset, rx, ry].
const OUTER = [
  [24, 156, 9, 30],
  [12, 112, 20, 50],
]
const INNER = [
  [8, 64, 15, 34],
  [16, 30, 6, 14],
]

function Rings({ rings }) {
  return rings.map(([count, offset, rx, ry], r) =>
    Array.from({ length: count }, (_, i) => (
      <ellipse key={`${r}-${i}`} cx="0" cy={-offset} rx={rx} ry={ry} transform={`rotate(${(360 / count) * i})`} />
    )),
  )
}

// A slowly turning mandala: two layers turning in opposite directions.
// MotionConfig turns the rotation off for visitors who ask for reduced motion.
export default function Mandala({ className = '' }) {
  return (
    <svg viewBox="-200 -200 400 400" fill="none" stroke="currentColor" strokeWidth="1" className={className} aria-hidden>
      <circle r="196" />
      <circle r="186" strokeOpacity="0.5" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 160, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '0px 0px' }}
      >
        <Rings rings={OUTER} />
      </motion.g>
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '0px 0px' }}
      >
        <Rings rings={INNER} />
        <circle r="8" />
      </motion.g>
    </svg>
  )
}
