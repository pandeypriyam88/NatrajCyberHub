import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { MessageCircle, Phone, CheckCircle2, AlertTriangle, CalendarClock } from 'lucide-react'
import { serviceDropdownOptions, type ServiceId } from '../data/services'
import { getServicePrice } from '../data/pricing'
import { validateRequestForm, type RequestFormErrors } from '../lib/validation'
import { generateWhatsAppMessage, openWhatsApp } from '../lib/whatsapp'
import { logBookingToSheet } from '../lib/sheetLogger'
import { getBookingDateOptions, getAvailableSlots, formatSlotLabel } from '../lib/slots'
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

  const [wantsSlot, setWantsSlot] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<string>('')

  const dateOptions = useMemo(() => getBookingDateOptions(), [])
  const availableSlots = useMemo(
    () => (selectedDate ? getAvailableSlots(selectedDate) : []),
    [selectedDate],
  )

  // Preselect the service when the customer taps a shortcut elsewhere on the page.
  useEffect(() => {
    if (selectedService) setService(selectedService)
  }, [selectedService])

  // Default to the first available date once the slot picker is opened.
  useEffect(() => {
    if (wantsSlot && !selectedDate && dateOptions.length > 0) {
      setSelectedDate(dateOptions[0].value)
    }
  }, [wantsSlot, selectedDate, dateOptions])

  const selectedDateLabel = dateOptions.find((d) => d.value === selectedDate)?.label

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const values = { firstName, lastName, phone, service, requirement }
    const validationErrors = validateRequestForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle')
      return
    }

    const timeSlotLabel = wantsSlot && selectedSlot ? formatSlotLabel(selectedSlot) : undefined
    const messageInput = {
      ...values,
      date: wantsSlot ? selectedDate : undefined,
      dateLabel: wantsSlot ? selectedDateLabel : undefined,
      timeSlotLabel,
    }

    const message = generateWhatsAppMessage(messageInput)
    const opened = openWhatsApp(message)
    setStatus(opened ? 'ready' : 'blocked')

    logBookingToSheet({
      ...values,
      date: wantsSlot ? selectedDateLabel : undefined,
      timeSlotLabel,
    })
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
                {service && (
                  <p className="mt-1.5 text-xs font-semibold text-brand-600">
                    From {getServicePrice(service)}
                  </p>
                )}
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

              {/* Optional time-slot booking */}
              <div className="rounded-lg border border-dashed border-brand-300 bg-brand-50/50 p-4">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-ink-800">
                  <input
                    type="checkbox"
                    checked={wantsSlot}
                    onChange={(e) => setWantsSlot(e.target.checked)}
                    className="h-4 w-4 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                  />
                  <CalendarClock size={17} className="text-brand-600" aria-hidden="true" />
                  Prefer a specific time? Pick a 15-minute slot (optional)
                </label>

                {wantsSlot && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-800/50">
                        Date
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {dateOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setSelectedDate(opt.value)
                              setSelectedSlot('')
                            }}
                            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              selectedDate === opt.value
                                ? 'border-brand-600 bg-brand-600 text-paper'
                                : 'border-brand-200 bg-paper text-ink-800 hover:border-brand-400'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-800/50">
                        Time
                      </p>
                      {availableSlots.length === 0 ? (
                        <p className="text-sm text-ink-800/60">
                          No more slots today — please pick another date.
                        </p>
                      ) : (
                        <div className="grid max-h-48 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-colors ${
                                selectedSlot === slot
                                  ? 'border-brand-600 bg-brand-600 text-paper'
                                  : 'border-brand-200 bg-paper text-ink-800 hover:border-brand-400'
                              }`}
                            >
                              {formatSlotLabel(slot)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {selectedSlot && (
                      <p className="text-sm font-medium text-brand-700">
                        Selected: {selectedDateLabel}, {formatSlotLabel(selectedSlot)}
                      </p>
                    )}
                  </div>
                )}
              </div>

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
                      const timeSlotLabel = wantsSlot && selectedSlot ? formatSlotLabel(selectedSlot) : undefined
                      const message = generateWhatsAppMessage({
                        firstName,
                        lastName,
                        phone,
                        service,
                        requirement,
                        date: wantsSlot ? selectedDate : undefined,
                        dateLabel: wantsSlot ? selectedDateLabel : undefined,
                        timeSlotLabel,
                      })
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
