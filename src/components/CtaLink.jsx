import { motion } from 'motion/react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { site } from '../content.js'

const sizes = {
  sm: 'h-10 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
}

export default function CtaLink({ size = 'lg' }) {
  return (
    <motion.a
      href="#register"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent font-semibold text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${sizes[size]}`}
    >
      {site.cta}
      <ArrowRightIcon
        weight="bold"
        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden
      />
    </motion.a>
  )
}
