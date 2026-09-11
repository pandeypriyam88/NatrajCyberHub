import { useEffect, useState } from 'react'
import { MessageCircle, Menu, X } from 'lucide-react'
import { businessConfig } from '../config/business'
import { generateDefaultEnquiryMessage, openWhatsApp } from '../lib/whatsapp'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Raise a Request', href: '#request' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the viewport is resized to desktop width.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-paper/95 backdrop-blur">
      <div className="container-shop flex h-16 items-center justify-between sm:h-20">
        <a href="#home" className="flex items-center gap-2.5" onClick={handleNavClick}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-brand-600 font-display text-xl font-bold text-paper sm:h-11 sm:w-11">
            N
          </span>
          <span className="font-display text-xl font-bold leading-tight text-ink-900 sm:text-2xl">
            {businessConfig.businessName}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-ink-800 transition-colors hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => openWhatsApp(generateDefaultEnquiryMessage())}
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-whatsapp-600"
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp Us
          </button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-ink-900 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-brand-100 bg-paper md:hidden">
          <nav className="container-shop flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="rounded-lg px-3 py-3.5 text-base font-medium text-ink-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                openWhatsApp(generateDefaultEnquiryMessage())
                handleNavClick()
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp-500 px-5 py-3.5 text-base font-semibold text-white shadow-card"
            >
              <MessageCircle size={20} aria-hidden="true" />
              WhatsApp Us
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
