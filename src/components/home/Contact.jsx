import { socials, whatsappUrl } from '../../data/socials.js'
import { MessageCircle } from 'lucide-react'
import Reveal from '../ui/Reveal.jsx'

function Contact() {
  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="contact__inner">
        <Reveal className="contact__art" variant="image">
          <img
            src="/images/contact/cultural-illustration.jpg"
            alt="Ilustración lineal de una figura cultural con vestimenta tradicional"
            width="896"
            height="1200"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
        <div className="contact__content">
          <Reveal as="p" className="section-index" variant="small">
            <span>09</span>
            Contacto
          </Reveal>

          {/* TODO(content): frase temporal; reemplazar con el cierre definitivo del cliente. */}
          <Reveal as="h2" id="contact-title" delay={0.1}>
            Tu próxima estadía puede empezar aquí.
          </Reveal>

          <Reveal as="a"
            className="contact__whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Contactar por WhatsApp</span>
            <MessageCircle aria-hidden="true" size={24} strokeWidth={1.8} />
          </Reveal>

          <Reveal as="nav" className="contact__socials" aria-label="Redes sociales">
            <p>También en</p>
            <ul>
              {socials.map((social) => (
                <li key={social.name}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.name}
                    {social.name === 'WhatsApp' && <MessageCircle aria-hidden="true" size={22} strokeWidth={1.7} />}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
