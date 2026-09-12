import { Ticket, Printer, Stamp, FileText, type LucideIcon } from 'lucide-react'

export interface HeroImageSlot {
  id: string
  label: string
  icon: LucideIcon
  /**
   * Path to a real photo, e.g. "/images/ticket-booking.jpg" (place the file
   * in the project's public/images/ folder). Leave blank to show the icon
   * tile fallback instead — no code changes needed either way.
   */
  src: string
  alt: string
}

export const heroImageSlots: HeroImageSlot[] = [
  {
    id: 'ticket-booking',
    label: 'Ticket Booking',
    icon: Ticket,
    src: '/images/tickrtbooking.png',
    alt: 'Train and bus ticket booking assistance',
  },
  {
    id: 'printing-xerox',
    label: 'Printing & Xerox',
    icon: Printer,
    src: '/images/print-xerox.jpg',
    alt: 'Printing and photocopy services',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: Stamp,
    src: '/images/documentation.jpg',
    alt: 'Government documentation and stamp services',
  },
  {
    id: 'online-forms',
    label: 'Online Forms',
    icon: FileText,
    src: '/images/form-filling.jpg',
    alt: 'Online form filling assistance',
  },
]
