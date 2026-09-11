import type { LucideIcon } from 'lucide-react'
import {
  FileText,
  Train,
  Plane,
  Bus,
  Hotel,
  Stamp,
  CreditCard,
  Car,
  CalendarCheck,
  Printer,
  Copy,
  ImageIcon,
  Images,
  Layers,
  Signpost,
  BookOpen,
  Pencil,
  FileEdit,
  GraduationCap,
  Banknote,
} from 'lucide-react'

/** Every value a customer can select in the request form's Service dropdown. */
export type ServiceId =
  | 'online-form'
  | 'typing'
  | 'editing'
  | 'resume'
  | 'school-project'
  | 'train-ticket'
  | 'flight-ticket'
  | 'bus-ticket'
  | 'hotel-booking'
  | 'passport'
  | 'pan-card'
  | 'driving-licence'
  | 'cmc-vellore'
  | 'printout'
  | 'xerox'
  | 'photo-printing'
  | 'photo-to-photo'
  | 'lamination'
  | 'rubber-stamp'
  | 'name-plate'
  | 'exam-books'
  | 'stationery'
  | 'money-transfer'
  | 'other'

export type ServiceCategoryId =
  | 'online'
  | 'travel'
  | 'government'
  | 'printing'
  | 'custom'
  | 'education'
  | 'other'

export interface Service {
  id: ServiceId
  name: string
  shortDescription: string
  category: ServiceCategoryId
  icon: LucideIcon
  /** Shown in the Quick Service Finder grid. */
  showInQuickFinder?: boolean
}

export interface ServiceCategory {
  id: ServiceCategoryId
  title: string
  description: string
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'online',
    title: 'Online Services',
    description: 'Typing, editing, forms and everyday computer work.',
  },
  {
    id: 'travel',
    title: 'Ticket Booking',
    description: 'Booking assistance for trains, flights, buses and hotels.',
  },
  {
    id: 'government',
    title: 'Government & Documentation Assistance',
    description: 'Application assistance for common government processes.',
  },
  {
    id: 'printing',
    title: 'Printing & Document Services',
    description: 'Printouts, Xerox, photos and lamination.',
  },
  {
    id: 'custom',
    title: 'Custom Services',
    description: 'Rubber stamps and name plates made to order.',
  },
  {
    id: 'education',
    title: 'Books & Stationery',
    description: 'Exam books, stationery and school project support.',
  },
  {
    id: 'other',
    title: 'Other Services',
    description: 'Additional everyday assistance.',
  },
]

export const services: Service[] = [
  // Online Services
  {
    id: 'online-form',
    name: 'Online Form Filling',
    shortDescription: 'Assistance filling out online forms of all kinds.',
    category: 'online',
    icon: FileText,
    showInQuickFinder: true,
  },
  {
    id: 'typing',
    name: 'Typing',
    shortDescription: 'Typing services for documents, letters and applications.',
    category: 'online',
    icon: Pencil,
    showInQuickFinder: true,
  },
  {
    id: 'editing',
    name: 'Editing',
    shortDescription: 'Editing and formatting of documents and files.',
    category: 'online',
    icon: FileEdit,
  },
  {
    id: 'resume',
    name: 'Resume / CV Making',
    shortDescription: 'Clean, professional resumes and CVs.',
    category: 'online',
    icon: FileText,
    showInQuickFinder: true,
  },
  {
    id: 'school-project',
    name: 'School Project Preparation',
    shortDescription: 'Help preparing school and college projects.',
    category: 'online',
    icon: GraduationCap,
    showInQuickFinder: true,
  },

  // Travel Booking
  {
    id: 'train-ticket',
    name: 'Train Ticket Booking',
    shortDescription: 'Booking assistance for train tickets.',
    category: 'travel',
    icon: Train,
    showInQuickFinder: true,
  },
  {
    id: 'flight-ticket',
    name: 'Flight Ticket Booking',
    shortDescription: 'Booking assistance for flight tickets.',
    category: 'travel',
    icon: Plane,
    showInQuickFinder: true,
  },
  {
    id: 'bus-ticket',
    name: 'Bus Ticket Booking',
    shortDescription: 'Booking assistance for bus tickets.',
    category: 'travel',
    icon: Bus,
    showInQuickFinder: true,
  },
  {
    id: 'hotel-booking',
    name: 'Hotel Booking',
    shortDescription: 'Booking assistance for hotel stays.',
    category: 'travel',
    icon: Hotel,
    showInQuickFinder: true,
  },

  // Government & Documentation Assistance
  {
    id: 'passport',
    name: 'Passport Application Assistance',
    shortDescription: 'Guidance and support with passport applications.',
    category: 'government',
    icon: Stamp,
    showInQuickFinder: true,
  },
  {
    id: 'pan-card',
    name: 'PAN Card Application',
    shortDescription: 'Assistance applying for a new or corrected PAN card.',
    category: 'government',
    icon: CreditCard,
    showInQuickFinder: true,
  },
  {
    id: 'driving-licence',
    name: 'Driving Licence Assistance',
    shortDescription: 'Support with Driving Licence related applications.',
    category: 'government',
    icon: Car,
    showInQuickFinder: true,
  },
  {
    id: 'cmc-vellore',
    name: 'CMC Vellore Appointment Assistance',
    shortDescription: 'Help with booking a CMC Vellore appointment.',
    category: 'government',
    icon: CalendarCheck,
    showInQuickFinder: true,
  },

  // Printing & Document Services
  {
    id: 'printout',
    name: 'Printout',
    shortDescription: 'Black & white and colour printouts.',
    category: 'printing',
    icon: Printer,
    showInQuickFinder: true,
  },
  {
    id: 'xerox',
    name: 'Xerox / Photocopy',
    shortDescription: 'Fast photocopying of any document.',
    category: 'printing',
    icon: Copy,
    showInQuickFinder: true,
  },
  {
    id: 'photo-printing',
    name: 'Photo Printing',
    shortDescription: 'Photo prints in standard sizes.',
    category: 'printing',
    icon: ImageIcon,
  },
  {
    id: 'photo-to-photo',
    name: 'Photo-to-Photo',
    shortDescription: 'Reproduction of old or existing photographs.',
    category: 'printing',
    icon: Images,
  },
  {
    id: 'lamination',
    name: 'Lamination',
    shortDescription: 'Lamination for certificates, ID cards and documents.',
    category: 'printing',
    icon: Layers,
    showInQuickFinder: true,
  },

  // Custom Services
  {
    id: 'rubber-stamp',
    name: 'Rubber Stamp Making',
    shortDescription: 'Custom rubber stamps made to your requirement.',
    category: 'custom',
    icon: Stamp,
    showInQuickFinder: true,
  },
  {
    id: 'name-plate',
    name: 'Name Plate Making',
    shortDescription: 'Name plates for homes, offices and shops.',
    category: 'custom',
    icon: Signpost,
    showInQuickFinder: true,
  },

  // Books & Stationery
  {
    id: 'exam-books',
    name: 'Competitive Examination Books',
    shortDescription: 'Books for competitive exam preparation.',
    category: 'education',
    icon: BookOpen,
    showInQuickFinder: true,
  },
  {
    id: 'stationery',
    name: 'Stationery Items',
    shortDescription: 'Everyday stationery and school supplies.',
    category: 'education',
    icon: Pencil,
    showInQuickFinder: true,
  },

  // Other
  {
    id: 'money-transfer',
    name: 'Money Transfer',
    shortDescription: 'Assistance with online money transfer.',
    category: 'other',
    icon: Banknote,
    showInQuickFinder: true,
  },
]

/** Options for the request form's "Select Service" dropdown, incl. "Other". */
export const serviceDropdownOptions: { id: ServiceId; label: string }[] = [
  ...services.map((s) => ({ id: s.id, label: s.name })),
  { id: 'other', label: 'Other' },
]

export function getServiceById(id: ServiceId | string | null | undefined): Service | undefined {
  return services.find((s) => s.id === id)
}
