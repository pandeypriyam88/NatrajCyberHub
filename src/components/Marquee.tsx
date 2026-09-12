const items = [
  'Online Forms & Typing',
  'Train, Flight & Bus Tickets',
  'Passport & PAN Assistance',
  'Printing & Xerox',
  'Resumes & School Projects',
  'Stationery & Exam Books',
]

export default function Marquee() {
  // Rendered twice back-to-back so the CSS animation can loop seamlessly.
  const loop = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-night-900/40 bg-night-900 py-3.5 text-paper">
      <div className="marquee-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8 px-4 text-sm font-semibold sm:text-base">
            {item}
            <span aria-hidden="true" className="text-mint-300">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
