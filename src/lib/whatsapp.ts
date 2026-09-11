import { businessConfig, buildWhatsAppLink } from '../config/business'
import { getServiceById, type ServiceId } from '../data/services'

export interface ServiceRequestInput {
  firstName: string
  lastName: string
  phone: string
  service: ServiceId | '' | string
  requirement: string
}

/**
 * Builds the formatted WhatsApp message for a customer service request.
 * Kept pure (no DOM/window access) so it is easy to test independently
 * of the form component.
 */
export function generateWhatsAppMessage(input: ServiceRequestInput): string {
  const firstName = input.firstName.trim()
  const lastName = input.lastName.trim()
  const phone = input.phone.trim()
  const requirement = input.requirement.trim()
  const serviceLabel =
    input.service && input.service !== 'other'
      ? getServiceById(input.service)?.name
      : undefined

  const lines = [
    `Hello ${businessConfig.businessName},`,
    '',
    'I have a service request.',
    '',
    `Name: ${firstName} ${lastName}`.trim(),
    `Phone: ${phone}`,
  ]

  if (serviceLabel) {
    lines.push(`Service: ${serviceLabel}`)
  }

  lines.push('', 'Requirement:', requirement, '', 'Please contact me regarding this request.', '', 'Thank you.')

  return lines.join('\n')
}

/** Default enquiry message used by the floating WhatsApp button. */
export function generateDefaultEnquiryMessage(): string {
  return `Hello ${businessConfig.businessName}, I would like to enquire about your services.`
}

/** Pre-fills an enquiry message for a specific service (used by service cards). */
export function generateServiceEnquiryMessage(serviceId: ServiceId): string {
  const service = getServiceById(serviceId)
  const serviceName = service?.name ?? 'your services'
  return `Hello ${businessConfig.businessName}, I would like to enquire about ${serviceName}.`
}

/**
 * Attempts to open WhatsApp with the given message.
 * Returns true if the attempt was made (a new tab/window was requested),
 * false if the browser blocked it entirely (used to trigger the fallback UI).
 */
export function openWhatsApp(message: string): boolean {
  try {
    const link = buildWhatsAppLink(message)
    const win = window.open(link, '_blank', 'noopener,noreferrer')
    return win !== null
  } catch {
    return false
  }
}
