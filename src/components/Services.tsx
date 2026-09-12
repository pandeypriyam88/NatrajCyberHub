import { serviceCategories, services, getServiceById, type ServiceId } from '../data/services'
import { getServicePrice } from '../data/pricing'
import ServiceCard from './ServiceCard'

interface ServicesProps {
  onRaiseRequest: (id: ServiceId) => void
}

const flagshipIds: ServiceId[] = [
  'online-form',
  'train-ticket',
  'xerox',
  'passport',
  'stationery',
  'rubber-stamp',
]

const flagshipAccents = ['bg-brand-500', 'bg-blush-500', 'bg-sun-500', 'bg-violet-500', 'bg-ink-900', 'bg-brand-700']

export default function Services({ onRaiseRequest }: ServicesProps) {
  return (
    <section id="services" className="section-pad">
      <div className="container-shop">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600">
            <span className="h-px w-6 bg-brand-500" aria-hidden="true" />
            What We Do
            <span className="h-px w-6 bg-brand-500" aria-hidden="true" />
          </span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Six services. <em className="not-italic text-brand-600">Handled properly.</em>
          </h2>
        </div>

        {/* Flagship numbered strip */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-brand-100 rounded-xl2 border border-brand-100 bg-paper shadow-card sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
          {flagshipIds.map((id, index) => {
            const service = getServiceById(id)
            if (!service) return null
            const Icon = service.icon

            return (
              <button
                key={id}
                type="button"
                onClick={() => onRaiseRequest(id)}
                className="flex items-start gap-4 p-6 text-left transition-colors hover:bg-brand-50/50"
              >
                <span className="font-display text-3xl font-bold text-ink-900/10">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-paper ${flagshipAccents[index]}`}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="mt-2.5 text-[15px] font-semibold text-ink-900">{service.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-800/70">{service.shortDescription}</p>
                  <p className="mt-2 text-sm font-bold text-brand-600">From {getServicePrice(id)}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Full catalog, categorized */}
        <div className="mt-16 space-y-12">
          {serviceCategories.map((category) => {
            const categoryServices = services.filter((s) => s.category === category.id)
            if (categoryServices.length === 0) return null

            return (
              <div key={category.id}>
                <div className="mb-4 flex items-baseline gap-3 border-b border-dashed border-brand-200 pb-3">
                  <h3 className="text-lg font-bold text-brand-700 sm:text-xl">{category.title}</h3>
                  <span className="hidden text-sm text-ink-800/60 sm:inline">{category.description}</span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <ServiceCard key={service.id} service={service} onRaiseRequest={onRaiseRequest} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
