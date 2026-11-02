import { CalendarBlankIcon, MapPinIcon, MoonStarsIcon, TicketIcon } from '@phosphor-icons/react'
import { site } from '../content.js'

// Items with no value yet (dates or price set to null) are left out.
const items = [
  { Icon: CalendarBlankIcon, label: 'Dates', value: site.trip.dates },
  { Icon: MoonStarsIcon, label: 'Duration', value: site.trip.duration },
  { Icon: MapPinIcon, label: 'Place', value: site.trip.place },
  { Icon: TicketIcon, label: 'Price', value: site.trip.price },
].filter((item) => item.value)

// Trip details as a row (hero) or a stacked list (form section).
export default function EventDetails({ stacked = false }) {
  return (
    <dl className={stacked ? 'flex flex-col gap-3' : 'flex flex-wrap gap-x-6 gap-y-2'}>
      {items.map(({ Icon, label, value }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon weight="regular" className="size-5 shrink-0 text-accent" aria-hidden />
          <dt className="sr-only">{label}</dt>
          <dd className="text-base font-medium md:text-lg">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
