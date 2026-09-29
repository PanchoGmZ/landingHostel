import { BedDouble, Compass, CookingPot, Droplets, Sofa, Wifi } from 'lucide-react'
import { services } from '../../data/services.js'
import Reveal from '../ui/Reveal.jsx'

const icons = [Wifi, Sofa, CookingPot, Droplets, BedDouble, Compass]

function Services() {
  return (
    <section className="services" id="servicios" aria-labelledby="services-title">
      <div className="services__sticky" aria-hidden="true">
        <img
          className="services__illustration"
          src="/images/services/hostel-illustration.jpg"
          alt=""
          width="896"
          height="1200"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="services__inner">
        <Reveal className="services__intro">
          <p className="section-index">
            <span>07</span>
            Servicios
          </p>

          {/* TODO: reemplazar/aprobar copy con cliente. */}
          <h2 id="services-title">Lo cotidiano, con espacio para compartir.</h2>
          <p className="services__description">Lo esencial acompaña cada día para que puedas moverte a tu ritmo. Entre descansos y encuentros, estos son los servicios disponibles en Pata y Perro.</p>
        </Reveal>

        <ol className="services__list">
          {services.map((service, index) => {
            const Icon = icons[index]
            return (
              <Reveal as="li" key={service.id} delay={index * 0.045}>
                <span className="services__icon"><Icon aria-hidden="true" size={28} strokeWidth={1.5} /></span>
                <span className="services__number">{service.id} / 06</span>
                <h3>{service.name}</h3>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default Services
