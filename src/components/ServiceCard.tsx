import { MessageCircle } from 'lucide-react'
import type { Service } from '../data/services'
import { getServicePrice } from '../data/pricing'
import { generateServiceEnquiryMessage, openWhatsApp } from '../lib/whatsapp'

interface ServiceCardProps {
  service: Service
  onRaiseRequest: (id: Service['id']) => void
}

export default function ServiceCard({ service, onRaiseRequest }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <div className="flex flex-col rounded-xl2 border border-brand-100 bg-paper p-5 shadow-card transition-shadow hover:shadow-pop">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <Icon size={22} aria-hidden="true" />
        </div>
        <span className="max-w-[7.5rem] rounded-lg bg-sun-100 px-2 py-1 text-right text-[11px] font-bold leading-tight text-sun-600">
          From {getServicePrice(service.id)}
        </span>
      </div>

      <h3 className="mt-3 text-[15px] font-semibold text-ink-900">{service.name}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-800/75">{service.shortDescription}</p>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onRaiseRequest(service.id)}
          className="flex-1 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-brand-700"
        >
          Raise Request
        </button>
        <button
          type="button"
          onClick={() => openWhatsApp(generateServiceEnquiryMessage(service.id))}
          aria-label={`Enquire about ${service.name} on WhatsApp`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-whatsapp-500 text-white transition-colors hover:bg-whatsapp-600"
        >
          <MessageCircle size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
