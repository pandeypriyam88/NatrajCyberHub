import { MessageCircle } from 'lucide-react'
import { businessConfig } from '../config/business'
import { generateDefaultEnquiryMessage, openWhatsApp } from '../lib/whatsapp'

export default function WhatsAppButton() {
  return (
    <button
      type="button"
      onClick={() => openWhatsApp(generateDefaultEnquiryMessage())}
      aria-label={`Chat with ${businessConfig.businessName} on WhatsApp`}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp-500 text-white shadow-pop transition-transform hover:scale-105 hover:bg-whatsapp-600 sm:h-16 sm:w-16"
    >
      <MessageCircle size={28} aria-hidden="true" />
    </button>
  )
}
