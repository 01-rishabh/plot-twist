import { CalendarBlankIcon, ClockIcon, TicketIcon } from '@phosphor-icons/react'
import { site } from '../content.js'

const items = [
  { Icon: CalendarBlankIcon, label: 'Date', value: site.event.date },
  { Icon: ClockIcon, label: 'Time', value: site.event.time },
  { Icon: TicketIcon, label: 'Price', value: site.event.price },
]

// Date, time and price as a row (hero) or a stacked list (form section).
export default function EventDetails({ stacked = false }) {
  return (
    <dl className={stacked ? 'flex flex-col gap-3' : 'flex flex-wrap gap-x-6 gap-y-2'}>
      {items.map(({ Icon, label, value }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon weight="bold" className="size-5 shrink-0 text-accent" aria-hidden />
          <dt className="sr-only">{label}</dt>
          <dd className="text-base font-medium md:text-lg">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
