import type { ServiceId } from './services'

/**
 * PRICING
 * ---------------------------------------------------------------------------
 * "Contact for pricing" is used everywhere a real price hasn't been supplied
 * yet. Replace these with real starting prices as they're confirmed — no
 * other file needs to change.
 *
 * Displayed as "FROM ₹X" on the site, so use the lowest typical price for
 * that service (e.g. Xerox might start at ₹2/page for black & white).
 * ---------------------------------------------------------------------------
 */
export const servicePricing: Record<ServiceId, string> = {
  'online-form': 'Contact for pricing',
  typing: 'Contact for pricing',
  editing: 'Contact for pricing',
  resume: 'Contact for pricing',
  'school-project': 'Contact for pricing',
  'train-ticket': 'Contact for pricing',
  'flight-ticket': 'Contact for pricing',
  'bus-ticket': 'Contact for pricing',
  'hotel-booking': 'Contact for pricing',
  passport: 'Contact for pricing',
  'pan-card': 'Contact for pricing',
  'driving-licence': 'Contact for pricing',
  'cmc-vellore': 'Contact for pricing',
  printout: 'Contact for pricing',
  xerox: 'Contact for pricing',
  'photo-printing': 'Contact for pricing',
  'photo-to-photo': 'Contact for pricing',
  lamination: 'Contact for pricing',
  'rubber-stamp': 'Contact for pricing',
  'name-plate': 'Contact for pricing',
  'exam-books': 'Contact for pricing',
  stationery: 'Contact for pricing',
  'money-transfer': 'Contact for pricing',
  other: 'Contact for pricing',
}

export function getServicePrice(id: ServiceId | string | null | undefined): string {
  if (!id || !(id in servicePricing)) return 'Contact for pricing'
  return servicePricing[id as ServiceId]
}
