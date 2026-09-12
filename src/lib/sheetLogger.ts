import { businessConfig } from '../config/business'
import { getServicePrice } from '../data/pricing'
import { getServiceById, type ServiceId } from '../data/services'
import type { ServiceRequestInput } from './whatsapp'

export interface BookingLogEntry extends ServiceRequestInput {
  date?: string
  timeSlotLabel?: string
}

/**
 * Sends a booking/request record to the configured Google Sheet, if one has
 * been set up (businessConfig.bookingSheetWebhookUrl). This is fire-and-forget:
 * it never blocks the WhatsApp flow and never surfaces a network error to the
 * customer — logging is a bonus for the shop owner, not something the
 * customer's request should fail because of.
 *
 * Uses mode: 'no-cors' because Apps Script Web Apps don't return CORS
 * headers by default; the request still reaches the script and appends the
 * row, we just can't read a response back. See docs/google-sheets-setup.md.
 */
export function logBookingToSheet(entry: BookingLogEntry): void {
  const url = businessConfig.bookingSheetWebhookUrl
  if (!url) {
    // Not configured yet — silently skip. See docs/google-sheets-setup.md.
    return
  }

  const serviceName =
    entry.service && entry.service !== 'other'
      ? getServiceById(entry.service as ServiceId)?.name ?? 'Other'
      : 'Other'
  const price = entry.service ? getServicePrice(entry.service) : 'Contact for pricing'

  const payload = {
    firstName: entry.firstName.trim(),
    lastName: entry.lastName.trim(),
    phone: entry.phone.trim(),
    service: serviceName,
    price,
    date: entry.date ?? '',
    timeSlot: entry.timeSlotLabel ?? '',
    requirement: entry.requirement.trim(),
    submittedAt: new Date().toISOString(),
  }

  try {
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Swallow network errors — logging failures must never block the customer.
    })
  } catch {
    // Same reasoning as above.
  }
}
