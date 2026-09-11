import { services, type ServiceId } from '../data/services'

interface QuickServiceFinderProps {
  onSelectService: (id: ServiceId) => void
}

export default function QuickServiceFinder({ onSelectService }: QuickServiceFinderProps) {
  const shortcuts = services.filter((s) => s.showInQuickFinder)

  return (
    <section className="section-pad bg-brand-50/60">
      <div className="container-shop">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">What can we help you with today?</h2>
          <p className="mt-2 text-ink-800/80">Tap a service to jump straight to the request form.</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {shortcuts.map((service) => {
            const Icon = service.icon
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectService(service.id)}
                className="flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-xl2 border border-brand-100 bg-paper px-3 py-4 text-center shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-pop"
              >
                <Icon size={24} aria-hidden="true" className="text-brand-600" />
                <span className="text-[13px] font-semibold leading-tight text-ink-800">
                  {service.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
