const steps = [
  {
    number: '1',
    title: 'Choose Your Service',
    description: 'Find what you need.',
  },
  {
    number: '2',
    title: 'Raise a Request',
    description: 'Fill out the simple form or contact us on WhatsApp.',
  },
  {
    number: '3',
    title: 'Get Assistance',
    description: "We'll contact you or guide you on the next step.",
  },
]

export default function HowItWorks() {
  return (
    <section className="section-pad bg-brand-800 text-paper">
      <div className="container-shop">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">How It Works</h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-sun-400 font-display text-xl font-bold text-sun-300">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-brand-100">{step.description}</p>

              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-[-1rem] top-7 hidden h-px w-8 bg-sun-400/50 sm:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
