import Reveal from '../ui/Reveal.jsx'
import { lazy, Suspense, useRef } from 'react'
import { useInView } from 'motion/react'
import { MapPin } from 'lucide-react'

const HostelMap = lazy(() => import('./HostelMap.jsx'))
const googleMapsUrl = 'https://www.google.com/maps/place/Hostel+Cultural+Pata+y+Perro/@-21.5318962,-64.7337242,265m/data=!3m1!1e3!4m9!3m8!1s0x9406480a1f25c9d9:0x995d2c2ca0d16652!5m2!4m1!1i2!8m2!3d-21.5315983!4d-64.7339587!16s%2Fg%2F11rvf_r5z8'

function Location() {
  const mapRef = useRef(null)
  const nearMap = useInView(mapRef, { once: true, margin: '400px' })
  return (
    <section className="location" id="ubicacion" aria-labelledby="location-title">
      <div className="location__inner">
        <Reveal as="p" className="section-index" variant="small">
          <span>08</span>
          Ubicación
        </Reveal>

        <Reveal className="location__title">
          <h2 id="location-title">
            Tarija,
            <em>Bolivia</em>
          </h2>
        </Reveal>

        <Reveal
          className="location__details"
          delay={0.12}
        >
          <p>General Trigo 843<br />Domingo Paz</p>
          {/* TODO: reemplazar/aprobar copy con cliente. */}
          <p className="location__description">En Tarija, el hostel se convierte en punto de partida para conocer la ciudad. Encuéntranos en General Trigo 843.</p>
          <a className="editorial-link" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps <MapPin aria-hidden="true" size={18} strokeWidth={1.8} /></a>
        </Reveal>

        <div className="location__map" ref={mapRef}>
          {nearMap && <Suspense fallback={<p className="hostel-map__loading" role="status">Cargando mapa…</p>}><HostelMap /></Suspense>}
        </div>
      </div>
    </section>
  )
}

export default Location
