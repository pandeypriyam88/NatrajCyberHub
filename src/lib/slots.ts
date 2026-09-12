import { businessConfig } from '../config/business'

export interface DateOption {
  /** ISO date, e.g. 2026-09-12 — used as the value and for comparisons. */
  value: string
  /** Human-friendly label, e.g. "Today", "Tomorrow", "Mon, 14 Sep". */
  label: string
}

/**
 * Builds the selectable date chips: "Today", "Tomorrow", then weekday dates,
 * for however many days ahead booking is open (businessConfig.bookingWindowDays).
 */
export function getBookingDateOptions(now: Date = new Date()): DateOption[] {
  const options: DateOption[] = []

  for (let i = 0; i < businessConfig.bookingWindowDays; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() + i)

    const value = toIsoDate(date)
    let label: string
    if (i === 0) label = 'Today'
    else if (i === 1) label = 'Tomorrow'
    else label = date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })

    options.push({ value, label })
  }

  return options
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Formats a 24h "HH:MM" slot start time as a friendly 12h label, e.g. "2:15 PM". */
export function formatSlotLabel(time24: string): string {
  const [hourStr, minuteStr] = time24.split(':')
  const hour = Number(hourStr)
  const minute = Number(minuteStr)
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`
}

/**
 * Generates every 15-minute slot start time between businessHours.startHour
 * and businessHours.endHour, as "HH:MM" 24h strings.
 */
export function getAllSlots(): string[] {
  const { startHour, endHour } = businessConfig.businessHours
  const slots: string[] = []

  for (let hour = startHour; hour < endHour; hour++) {
    for (const minute of [0, 15, 30, 45]) {
      slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)
    }
  }

  return slots
}

/**
 * Slots available for a given ISO date: all slots normally, but with
 * already-passed times removed if the date is today.
 */
export function getAvailableSlots(dateValue: string, now: Date = new Date()): string[] {
  const allSlots = getAllSlots()
  const isToday = dateValue === toIsoDate(now)

  if (!isToday) return allSlots

  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  return allSlots.filter((slot) => {
    const [h, m] = slot.split(':').map(Number)
    return h * 60 + m > nowMinutes
  })
}
