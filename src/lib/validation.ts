/**
 * A "reasonable" Indian mobile number: 10 digits, starting with 6-9.
 * Accepts optional +91 / 91 / 0 prefix and common separators, which are
 * stripped before validation.
 */
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/

export function normalizePhone(rawPhone: string): string {
  let digits = rawPhone.replace(/[\s\-()]/g, '')
  if (digits.startsWith('+91')) digits = digits.slice(3)
  else if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2)
  else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1)
  return digits
}

export function isValidIndianMobile(rawPhone: string): boolean {
  const digits = normalizePhone(rawPhone)
  return INDIAN_MOBILE_REGEX.test(digits)
}

export interface RequestFormValues {
  firstName: string
  lastName: string
  phone: string
  service: string
  requirement: string
}

export type RequestFormErrors = Partial<Record<keyof RequestFormValues, string>>

export function validateRequestForm(values: RequestFormValues): RequestFormErrors {
  const errors: RequestFormErrors = {}

  if (!values.firstName.trim()) {
    errors.firstName = 'Please enter your first name.'
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Please enter your last name.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone number.'
  } else if (!isValidIndianMobile(values.phone)) {
    errors.phone = 'Please enter a valid Indian mobile number.'
  }

  if (!values.requirement.trim()) {
    errors.requirement = 'Please describe your requirement.'
  }

  return errors
}
