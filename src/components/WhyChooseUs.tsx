import { Layers, MousePointerClick, MapPinned, GraduationCap, Plane } from 'lucide-react'
import { businessConfig } from '../config/business'

const points = [
  {
    number: '01',
    eyebrow: 'ALL IN ONE',
    icon: Layers,
    title: 'Everything Under One Roof',
    description: 'Online services, ticket booking, printing, documentation and stationery.',
    border: 'border-brand-500',
  },
  {
    number: '02',
    eyebrow: 'EASY TO USE',
    icon: MousePointerClick,
    title: 'Easy Online Assistance',
    description: 'Get help with online processes without having to navigate everything yourself.',
    border: 'border-blush-500',
  },
  {
    number: '03',
    eyebrow: 'NEARBY',
    icon: MapPinned,
    title: 'Convenient Local Service',
    description: 'A simple local solution for everyday digital and documentation needs.',
    border: 'border-sun-500',
  },
  {
    number: '04',
    eyebrow: 'FOR STUDENTS',
    icon: GraduationCap,
    title: 'Student Friendly',
    description: 'Typing, school projects, resumes, books and stationery.',
    border: 'border-violet-500',
  },
  {
    number: '05',
    eyebrow: 'ON THE MOVE',
    icon: Plane,
    title: 'Travel Assistance',
    description: 'Train, flight, bus and hotel booking assistance.',
    border: 'border-ink-900',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-paper">
      <div className="container-shop">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
            <span className="h-px w-6 bg-brand-500" aria-hidden="true" />
            Why {businessConfig.businessName}
            <span className="h-px w-6 bg-brand-500" aria-hidden="true" />
          </span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            The shop people <em className="not-italic text-brand-600">actually rely on.</em>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point) => {
            const Icon = point.icon
            return (
              <div
                key={point.title}
                className={`rounded-xl2 border-l-4 bg-paper p-6 shadow-card ${point.border}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-ink-900/10">{point.number}</span>
                  <Icon size={22} aria-hidden="true" className="text-ink-800/60" />
                </div>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-ink-800/40">
                  {point.eyebrow}
                </p>
                <h3 className="mt-1 text-[15px] font-semibold text-ink-900">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-800/75">{point.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
