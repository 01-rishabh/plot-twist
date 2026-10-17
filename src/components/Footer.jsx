import { ArrowUpIcon } from '@phosphor-icons/react'
import { site } from '../content.js'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-10 text-sm text-muted md:px-8">
        <p>
          &copy; {new Date().getFullYear()} {site.title}
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
          Back to top
          <ArrowUpIcon weight="bold" className="size-3.5" aria-hidden />
        </a>
      </div>
    </footer>
  )
}
