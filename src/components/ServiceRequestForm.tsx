import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { MessageCircle, Phone, CheckCircle2, AlertTriangle } from 'lucide-react'
import { serviceDropdownOptions, type ServiceId } from '../data/services'
import { validateRequestForm, type RequestFormErrors } from '../lib/validation'
import { generateWhatsAppMessage, openWhatsApp } from '../lib/whatsapp'
import { businessConfig, telLink } from '../config/business'

interface ServiceRequestFormProps {
  selectedService: ServiceId | ''
}

type SubmitStatus = 'idle' | 'ready' | 'blocked'

export default function ServiceRequestForm({ selectedService }: ServiceRequestFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState<ServiceId | ''>('')
  const [requirement, setRequirement] = useState('')
  const [errors, setErrors] = useState<RequestFormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  // Preselect the service when the customer taps a shortcut elsewhere on the page.
  useEffect(() => {
    if (selectedService) setService(selectedService)
  }, [selectedService])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const values = { firstName, lastName, phone, service, requirement }
    const validationErrors = validateRequestForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle')
      return
    }

    const message = generateWhatsAppMessage(values)
    const opened = openWhatsApp(message)
    setStatus(opened ? 'ready' : 'blocked')
  }

  return (
    <section id="request" className="section-pad bg-brand-50/60">
      <div className="container-shop">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl2 border border-brand-100 bg-paper p-6 shadow-pop sm:p-9">
            <h2 className="text-2xl font-bold sm:text-3xl">Need Help With Something?</h2>
            <p className="mt-2 text-ink-800/80">Tell us what you need and we&apos;ll get back to you.</p>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="First Name" htmlFor="firstName" error={errors.firstName}>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    aria-invalid={!!errors.firstName}
                    className={inputClasses(!!errors.firstName)}
                  />
                </Field>

                <Field label="Last Name" htmlFor="lastName" error={errors.lastName}>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                    aria-invalid={!!errors.lastName}
                    className={inputClasses(!!errors.lastName)}
                  />
                </Field>
              </div>

              <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  className={inputClasses(!!errors.phone)}
                />
              </Field>

              <Field label="Service (optional)" htmlFor="service">
                <select
                  id="service"
                  value={service}
                  onChange={(e) => setService(e.target.value as ServiceId | '')}
                  className={inputClasses(false)}
                >
                  <option value="">Select a service</option>
                  {serviceDropdownOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Requirement" htmlFor="requirement" error={errors.requirement}>
                <textarea
                  id="requirement"
                  rows={4}
                  placeholder="What service do you need? Please describe your requirement."
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  aria-invalid={!!errors.requirement}
                  className={inputClasses(!!errors.requirement)}
                />
              </Field>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp-500 px-6 py-3.5 text-base font-semibold text-white shadow-card transition-colors hover:bg-whatsapp-600"
              >
                <MessageCircle size={19} aria-hidden="true" />
                Send Request on WhatsApp
              </button>

              <p className="text-center text-xs text-ink-800/60">
                Your details are used only to respond to your service request.
              </p>
            </form>

            {status === 'ready' && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 rounded-lg border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800"
              >
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                <p>
                  Your request is ready to send on WhatsApp. Please tap <strong>Send</strong> to share it with{' '}
                  {businessConfig.businessName}.
                </p>
              </div>
            )}

            {status === 'blocked' && (
              <div
                role="alert"
                className="mt-6 space-y-3 rounded-lg border border-sun-500/40 bg-sun-100 p-4 text-sm text-ink-900"
              >
                <p className="flex items-start gap-3">
                  <AlertTriangle size={20} className="mt-0.5 shrink-0 text-sun-600" aria-hidden="true" />
                  Unable to open WhatsApp. Please contact us directly using the options below.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <a
                    href={telLink}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-paper hover:bg-brand-700"
                  >
                    <Phone size={16} aria-hidden="true" />
                    Call Us
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      const message = generateWhatsAppMessage({ firstName, lastName, phone, service, requirement })
                      const opened = openWhatsApp(message)
                      setStatus(opened ? 'ready' : 'blocked')
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-whatsapp-600"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    WhatsApp Us
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function inputClasses(hasError: boolean) {
  return [
    'w-full rounded-lg border bg-paper px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-800/40',
    'transition-colors focus:border-brand-500',
    hasError ? 'border-red-400' : 'border-brand-200',
  ].join(' ')
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
