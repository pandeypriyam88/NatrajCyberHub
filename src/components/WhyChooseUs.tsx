import { Layers, MousePointerClick, MapPinned, GraduationCap, Plane } from 'lucide-react'
import { businessConfig } from '../config/business'

const points = [
  {
    icon: Layers,
    title: 'Everything Under One Roof',
    description: 'Online services, ticket booking, printing, documentation and stationery.',
  },
  {
    icon: MousePointerClick,
    title: 'Easy Online Assistance',
    description: 'Get help with online processes without having to navigate everything yourself.',
  },
  {
    icon: MapPinned,
    title: 'Convenient Local Service',
    description: 'A simple local solution for everyday digital and documentation needs.',
  },
  {
    icon: GraduationCap,
    title: 'Student Friendly',
    description: 'Typing, school projects, resumes, books and stationery.',
  },
  {
    icon: Plane,
    title: 'Travel Assistance',
    description: 'Train, flight, bus and hotel booking assistance.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-pad">
      <div className="container-shop">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Why Choose {businessConfig.businessName}</h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point) => {
            const Icon = point.icon
            return (
              <div
                key={point.title}
                className="rounded-xl2 border border-brand-100 bg-paper p-6 shadow-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sun-100 text-sun-600">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-ink-900">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-800/75">{point.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
