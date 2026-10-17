import { motion } from 'motion/react'
import { site } from '../content.js'
import CtaLink from './CtaLink.jsx'

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-bg/75 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="#top" aria-label={site.fullTitle} className="font-display text-xl font-bold tracking-tight">
          {site.title}
          <span className="hidden font-medium text-muted sm:inline"> by {site.brand}</span>
        </a>
        <CtaLink size="sm" />
      </nav>
    </motion.header>
  )
}
