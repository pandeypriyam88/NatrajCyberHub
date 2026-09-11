import { MessageCircle, Phone, MapPin } from 'lucide-react'
import { businessConfig, telLink } from '../config/business'
import { generateDefaultEnquiryMessage, openWhatsApp } from '../lib/whatsapp'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Raise a Request', href: '#request' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-900 text-brand-100">
      <div className="container-shop grid grid-cols-1 gap-10 py-12 sm:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-bold text-paper">{businessConfig.businessName}</h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-100/80">{businessConfig.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-paper/70">Quick Links</h4>
          <ul className="mt-3 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-brand-100/80 hover:text-paper">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-paper/70">Contact</h4>
          <ul className="mt-3 space-y-2.5 text-sm">
            <li>
              <button
                type="button"
                onClick={() => openWhatsApp(generateDefaultEnquiryMessage())}
                className="inline-flex items-center gap-2 text-brand-100/80 hover:text-paper"
              >
                <MessageCircle size={15} aria-hidden="true" />
                WhatsApp
              </button>
            </li>
            <li>
              <a href={telLink} className="inline-flex items-center gap-2 text-brand-100/80 hover:text-paper">
                <Phone size={15} aria-hidden="true" />
                {businessConfig.phoneNumber}
              </a>
            </li>
            <li>
              <a
                href={businessConfig.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-100/80 hover:text-paper"
              >
                <MapPin size={15} aria-hidden="true" />
                Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-5 text-center text-xs text-brand-100/60">
        © {year} {businessConfig.businessName}. All rights reserved.
      </div>
    </footer>
  )
}
