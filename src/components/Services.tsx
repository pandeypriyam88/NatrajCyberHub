import { serviceCategories, services, type ServiceId } from '../data/services'
import ServiceCard from './ServiceCard'

interface ServicesProps {
  onRaiseRequest: (id: ServiceId) => void
}

export default function Services({ onRaiseRequest }: ServicesProps) {
  return (
    <section id="services" className="section-pad">
      <div className="container-shop">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Our Services</h2>
          <p className="mt-2 text-ink-800/80">
            Everything from online paperwork to printing and stationery, handled locally.
          </p>
        </div>

        <div className="mt-10 space-y-12">
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
