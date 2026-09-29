import { useEffect, useState } from 'react'
import Reveal from '../ui/Reveal.jsx'
import { ChevronUp } from 'lucide-react'

const footerLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'El Hostel', href: '#hostel' },
  { label: 'Habitaciones', href: '#habitaciones' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Productos', href: '#productos' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
]

function Footer() {
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear())

  useEffect(() => {
    let timerId
    const scheduleNextDay = () => {
      const now = new Date()
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      timerId = window.setTimeout(() => {
        setCurrentYear(new Date().getFullYear())
        scheduleNextDay()
      }, nextDay.getTime() - now.getTime())
    }
    const syncYear = () => setCurrentYear(new Date().getFullYear())

    scheduleNextDay()
    document.addEventListener('visibilitychange', syncYear)
    return () => {
      window.clearTimeout(timerId)
      document.removeEventListener('visibilitychange', syncYear)
    }
  }, [])

  return (
    <footer className="footer">
      <div className="footer__inner">
        <Reveal className="footer__brand">
          <p>Hostel Cultural</p>
          <p className="footer__name">
            Pata y
            <span>Perro</span>
          </p>
        </Reveal>

        <Reveal as="nav"
          className="footer__nav"
          aria-label="Navegación del pie de página"
          delay={0.1}
        >
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="footer__bottom" variant="fade">
          <p>© {currentYear} Pata y Perro Hostel Cultural</p>
          <a href="#inicio">
            Volver arriba <ChevronUp aria-hidden="true" size={18} strokeWidth={1.8} />
          </a>
        </Reveal>
      </div>
    </footer>
  )
}

export default Footer
