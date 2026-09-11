import { businessConfig } from '../config/business'

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-shop">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">About {businessConfig.businessName}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-800/85">
            {businessConfig.businessName} is a local digital service center in Katras, Jharkhand, providing
            convenient assistance for online forms, travel bookings, documentation, printing, typing,
            education-related work and stationery needs.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-800/85">
            We help customers who may not have the time, equipment, or technical knowledge to complete
            certain online processes themselves — so everyday paperwork and bookings stay simple.
          </p>
        </div>
      </div>
    </section>
  )
}
