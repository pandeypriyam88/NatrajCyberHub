import { MapPin, MessageCircle, Star, Wallet, Clock3 } from 'lucide-react'
import { businessConfig } from '../config/business'
import { generateDefaultEnquiryMessage, openWhatsApp } from '../lib/whatsapp'
import { heroImageSlots } from '../data/heroImages'

const trustPoints = [
  { icon: Star, text: 'One shop for online, printing and booking needs' },
  { icon: Wallet, text: 'Transparent pricing — no hidden charges' },
  { icon: Clock3, text: 'Replies on WhatsApp during shop hours' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-blush-100 via-paper to-mint-100"
    >
      <div className="container-shop relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-800 shadow-card sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
            Katras, Jharkhand · Open Every Day
          </span>

          <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.08] text-ink-900 sm:text-5xl">
            Your one-stop <em className="not-italic text-brand-600">digital &amp; online</em> service center.
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-800/80">
            Online forms, ticket booking, printing, documentation, typing, resumes, stationery and more — all under one roof.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#request"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-base font-semibold text-paper shadow-pop transition-transform hover:-translate-y-0.5"
            >
              Raise a Service Request →
            </a>
            <button
              type="button"
              onClick={() => openWhatsApp(generateDefaultEnquiryMessage())}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-900 bg-paper px-6 py-3.5 text-base font-semibold text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={19} className="text-whatsapp-500" aria-hidden="true" />
              Chat on WhatsApp
            </button>
          </div>

          <a
            href={businessConfig.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-800 underline underline-offset-2 hover:text-brand-600"
          >
            <MapPin size={15} aria-hidden="true" />
            Get Directions
          </a>

          <ul className="mt-8 space-y-2.5">
            {trustPoints.map((point) => {
              const Icon = point.icon
              return (
                <li key={point.text} className="flex items-center gap-2.5 text-sm text-ink-800/80">
                  <Icon size={16} className="shrink-0 text-brand-600" aria-hidden="true" />
                  {point.text}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Service image tiles — falls back to icon + label until real photos are added */}
        <div className="relative mx-auto grid w-full max-w-sm grid-cols-2 gap-4">
          {heroImageSlots.map((slot, index) => (
            <HeroTile key={slot.id} slot={slot} rotate={index % 2 === 0 ? '-rotate-2' : 'rotate-2'} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroTile({
  slot,
  rotate,
}: {
  slot: (typeof heroImageSlots)[number]
  rotate: string
}) {
  const Icon = slot.icon

  if (slot.src) {
    return (
      <div className={`${rotate} aspect-square overflow-hidden rounded-2xl shadow-pop`}>
        <img src={slot.src} alt={slot.alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div
      className={`${rotate} flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-900/15 bg-paper/70 p-4 text-center shadow-card backdrop-blur-sm`}
    >
      <Icon size={30} aria-hidden="true" className="text-brand-600" />
      <span className="text-sm font-semibold text-ink-900">{slot.label}</span>
    </div>
  )
}
