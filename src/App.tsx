import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import QuickServiceFinder from './components/QuickServiceFinder'
import Services from './components/Services'
import ServiceRequestForm from './components/ServiceRequestForm'
import WhyChooseUs from './components/WhyChooseUs'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import type { ServiceId } from './data/services'

function App() {
  const [selectedService, setSelectedService] = useState<ServiceId | ''>('')

  const handleSelectService = (id: ServiceId) => {
    setSelectedService(id)
    document.getElementById('request')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <QuickServiceFinder onSelectService={handleSelectService} />
        <Services onRaiseRequest={handleSelectService} />
        <ServiceRequestForm selectedService={selectedService} />
        <WhyChooseUs />
        <HowItWorks />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
