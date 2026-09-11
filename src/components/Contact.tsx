import type { ReactNode } from 'react'
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from 'lucide-react'
import { businessConfig, telLink } from '../config/business'
import { generateDefaultEnquiryMessage, openWhatsApp } from '../lib/whatsapp'

export default function Contact() {
  return (
    <section id="contact" className="section-pad bg-brand-50/60">
      <div className="container-shop">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Find Us</h2>
          <p className="mt-2 text-ink-800/80">Reach out or drop by — we&apos;re happy to help.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Map */}
          <div className="overflow-hidden rounded-xl2 border border-brand-100 bg-paper shadow-card">
            {businessConfig.googleMapsEmbedUrl ? (
              <iframe
                title={`${businessConfig.businessName} location on Google Maps`}
                src={businessConfig.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full sm:h-full sm:min-h-[320px]"
              />
            ) : (
              <div className="flex h-72 flex-col items-center justify-center gap-2 bg-brand-100/60 p-6 text-center sm:h-full sm:min-h-[320px]">
                <MapPin size={28} className="text-brand-500" aria-hidden="true" />
                <p className="text-sm font-medium text-ink-800/70">
                  Map will appear here once GOOGLE_MAPS_EMBED_URL is configured.
                </p>
                <a
                  href={businessConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm font-semibold text-brand-600 underline underline-offset-2"
                >
                  View on Google Maps
                </a>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="rounded-xl2 border border-brand-100 bg-paper p-6 shadow-card sm:p-8">
            <h3 className="font-display text-xl font-bold text-ink-900">{businessConfig.businessName}</h3>

            <dl className="mt-5 space-y-4">
              <DetailRow icon={MapPin} label="Address">
                {businessConfig.address.full}
              </DetailRow>
              <DetailRow icon={Clock} label="Opening Hours">
                {businessConfig.openingHours}
              </DetailRow>
              <DetailRow icon={Phone} label="Phone">
                <a href={telLink} className="text-brand-600 underline underline-offset-2">
                  {businessConfig.phoneNumber}
                </a>
              </DetailRow>
              <DetailRow icon={Mail} label="Email">
                <a href={`mailto:${businessConfig.email}`} className="break-all text-brand-600 underline underline-offset-2">
                  {businessConfig.email}
                </a>
              </DetailRow>
            </dl>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={businessConfig.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-paper hover:bg-brand-700"
              >
                <Navigation size={16} aria-hidden="true" />
                Get Directions
              </a>
              <a
                href={telLink}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-300 px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                <Phone size={16} aria-hidden="true" />
                Call Us
              </a>
              <button
                type="button"
                onClick={() => openWhatsApp(generateDefaultEnquiryMessage())}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp-500 px-5 py-3 text-sm font-semibold text-white hover:bg-whatsapp-600"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={18} className="mt-0.5 shrink-0 text-brand-500" aria-hidden="true" />
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-ink-800/50">{label}</dt>
        <dd className="text-[15px] text-ink-900">{children}</dd>
      </div>
    </div>
  )
}
