import { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import MobileMenu from './MobileMenu.jsx'
import { whatsappUrl } from '../../data/socials.js'

const leftLinks = [
  { label: 'El Hostel', href: '#hostel' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Habitaciones', href: '#habitaciones' },
]

const rightLinks = [
  { label: 'Productos', href: '#productos' },
  { label: 'Ubicación', href: '#ubicacion' },
]

function NavItems({ links }) {
  return (
    <ul className="navbar__links">
      {links.map(({ label, href }) => (
        <li key={href}><a href={href}>{label}</a></li>
      ))}
    </ul>
  )
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > window.innerHeight * 0.72)
  const scrolledRef = useRef(isScrolled)

  useEffect(() => {
    let frameId = 0

    const updateNavbar = () => {
      if (frameId) return
      frameId = requestAnimationFrame(() => {
        frameId = 0
        const nextState = window.scrollY > window.innerHeight * 0.72
        if (nextState === scrolledRef.current) return
        scrolledRef.current = nextState
        setIsScrolled(nextState)
      })
    }

    updateNavbar()
    window.addEventListener('scroll', updateNavbar, { passive: true })
    window.addEventListener('resize', updateNavbar)
    return () => {
      window.removeEventListener('scroll', updateNavbar)
      window.removeEventListener('resize', updateNavbar)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <header className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <nav className="navbar__desktop-nav navbar__desktop-nav--left" aria-label="Navegación principal izquierda">
          <NavItems links={leftLinks} />
        </nav>

        <a className="navbar__brand" href="#inicio" aria-label="Pata y Perro, volver al inicio">
          <img src="/images/brand/logo.png" alt="Pata y Perro Hostel Cultural" width="1259" height="1162" />
        </a>

        <div className="navbar__right">
          <nav className="navbar__desktop-nav" aria-label="Navegación principal derecha">
            <NavItems links={rightLinks} />
          </nav>
          <a className="navbar__whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp <MessageCircle aria-hidden="true" size={16} strokeWidth={1.8} /></a>
        </div>

        <MobileMenu links={[...leftLinks, ...rightLinks, { label: 'Contacto', href: '#contacto' }]} />
      </div>
    </header>
  )
}

export default Navbar
