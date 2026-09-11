/**
 * CENTRAL BUSINESS CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every business-specific detail used across the website (phone number,
 * WhatsApp number, email, address, hours, maps links) lives here ONLY.
 *
 * No component should hardcode any of this information directly.
 * To update the business details, edit the values below and the change
 * will apply across the entire site.
 * ---------------------------------------------------------------------------
 */

export const businessConfig = {
  businessName: 'Natraj Cyber Hub',

  tagline: 'Online Services • Printing • Ticket Booking • Documentation • Stationery',

  /** Digits only, no spaces or symbols. Used for tel: and wa.me links. */
  phoneNumber: '8252101174',
  whatsappNumber: '8252101174',

  /** Country code used when building the WhatsApp wa.me link. */
  countryCode: '91',

  email: 'NatrajCyberKth@gmail.com',

  address: {
    line1: 'Katras',
    line2: 'Jharkhand 828116',
    full: 'Katras, Jharkhand 828116',
  },

  openingHours: 'Open Every Day, 9:00 AM – 9:00 PM',

  googleMapsLink: 'https://maps.app.goo.gl/y8m8bbAJHdJbZCEe6?g_st=ac',

  /**
   * Google Maps EMBED url (different from the share link above).
   * To generate: open Google Maps -> search "Natraj Cyber Hub, Katras" (or the
   * exact shop pin) -> Share -> Embed a map -> copy the src="..." URL from
   * the provided <iframe> code and paste it here.
   */
  googleMapsEmbedUrl: '',

  /** Optional social / profile links. Leave blank until available. */
  googleBusinessProfile: '',
  facebook: '',
  instagram: '',
} as const

/** tel: link built from the configured phone number. */
export const telLink = `tel:+${businessConfig.countryCode}${businessConfig.phoneNumber}`

/** wa.me link base (no message) built from the configured WhatsApp number. */
export const whatsappBaseLink = `https://wa.me/${businessConfig.countryCode}${businessConfig.whatsappNumber}`

/** Builds a wa.me link with a pre-filled, URL-encoded message. */
export function buildWhatsAppLink(message: string): string {
  return `${whatsappBaseLink}?text=${encodeURIComponent(message)}`
}
