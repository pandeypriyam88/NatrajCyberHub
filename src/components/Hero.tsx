import { MapPin, MessageCircle, Ticket, Printer, Stamp, FileText } from 'lucide-react'
import { businessConfig } from '../config/business'
import { generateDefaultEnquiryMessage, openWhatsApp } from '../lib/whatsapp'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-brand-800 text-paper">
      {/* Soft decorative shapes — abstract, not photographic */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-600/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-sun-500/20 blur-3xl" />

      <div className="container-shop relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-4 py-1.5 text-sm font-medium text-sun-300">
            <MapPin size={15} aria-hidden="true" />
            Serving Katras, Jharkhand
          </span>

          <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.1] sm:text-5xl">
            Your One-Stop Digital &amp; Online Service Center
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-brand-100">
            Online forms, ticket booking, printing, documentation, typing, resumes, stationery and more — all under one roof.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#request"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sun-500 px-6 py-3.5 text-base font-semibold text-ink-900 shadow-pop transition-transform hover:-translate-y-0.5 hover:bg-sun-600"
            >
              Raise a Service Request
            </a>
            <button
              type="button"
              onClick={() => openWhatsApp(generateDefaultEnquiryMessage())}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp-500 px-6 py-3.5 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-whatsapp-600"
            >
              <MessageCircle size={19} aria-hidden="true" />
              WhatsApp Us
            </button>
            <a
              href={businessConfig.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/30 px-6 py-3.5 text-base font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              <MapPin size={19} aria-hidden="true" />
              Get Directions
            </a>
          </div>
        </div>

        {/* Stamp / ticket-inspired visual identity — grounded in the shop's own services */}
        <div className="relative mx-auto grid w-full max-w-sm grid-cols-2 gap-4">
          <HeroTile icon={Ticket} label="Ticket Booking" rotate="-rotate-2" />
          <HeroTile icon={Printer} label="Printing & Xerox" rotate="rotate-2" className="mt-6" />
          <HeroTile icon={Stamp} label="Documentation" rotate="rotate-1" className="-mt-2" />
          <HeroTile icon={FileText} label="Online Forms" rotate="-rotate-1" className="mt-4" />
        </div>
      </div>
    </section>
  )
}

function HeroTile({
  icon: Icon,
  label,
  rotate,
  className = '',
}: {
  icon: typeof Ticket
  label: string
  rotate: string
  className?: string
}) {
  return (
    <div
      className={`${rotate} ${className} flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-paper/25 bg-paper/10 p-4 text-center backdrop-blur-sm`}
    >
      <Icon size={30} aria-hidden="true" className="text-sun-300" />
      <span className="text-sm font-semibold text-paper">{label}</span>
    </div>
  )
}
