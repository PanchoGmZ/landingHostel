import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { BedDouble, ChevronLeft, ChevronRight, MessageCircle, Pause, Play } from 'lucide-react'
import useMotionPreference from '../../hooks/useMotionPreference.js'
import { rooms } from '../../data/rooms.js'
import { whatsappUrl } from '../../data/socials.js'
import Reveal from '../ui/Reveal.jsx'

function RoomsPreview() {
  const reduced = useMotionPreference()
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoplay] = useState(() => Autoplay({ delay: 1800, playOnInit: false, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }))
  const [viewport, api] = useEmblaCarousel({ loop: true, duration: reduced ? 0 : 38 }, reduced || paused ? [] : [autoplay])
  useEffect(() => {
    if (!api) return
    const update = () => setSelected(api.selectedScrollSnap())
    api.on('select', update).on('reInit', update)
    return () => { api.off('select', update).off('reInit', update) }
  }, [api])
  useEffect(() => {
    if (!api) return
    if (reduced || paused) autoplay.stop()
    else autoplay.play()
    return () => autoplay.stop()
  }, [api, autoplay, reduced, paused])
  const navigate = (index) => {
    api?.scrollTo(index, !!reduced)
    autoplay.reset()
  }
  return (
    <section className="rooms" id="habitaciones" aria-labelledby="rooms-title">
      <Reveal className="rooms__intro">
        <p className="section-index"><span>03</span> Habitaciones</p>
        {/* TODO(content): título temporal; reemplazar con el texto oficial. */}
        <h2 id="rooms-title">Un lugar para descansar.</h2>
        {/* TODO: reemplazar/aprobar copy con cliente. */}
        <p className="rooms__intro-note">Una pausa también es parte del viaje. Descubre las habitaciones y encuentra tu lugar para descansar antes de volver a salir.</p>
      </Reveal>

      <div className="rooms-carousel" role="region" aria-roledescription="carrusel" aria-label="Habitaciones">
        <div className="rooms-carousel__viewport" ref={viewport}>
          <div className="rooms-carousel__track">
            {rooms.map((room, index) => (
              <article className="rooms-carousel__slide" key={room.id} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${rooms.length}`} inert={index !== selected}>
                <img
                  src={room.image}
                  alt={room.alt}
                  width={room.width}
                  height={room.height}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: room.position }}
                />
                <div className="rooms-carousel__copy">
                  <span className="section-index"><BedDouble aria-hidden="true" size={17} strokeWidth={1.7} /> {room.id} / Descanso</span>
                  <h3>{room.name}</h3>
                  {/* TODO: revisar/aprobar copy definitivo con cliente. */}
                  <p>{room.description}</p>
                  <a className="editorial-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Consultar <MessageCircle aria-hidden="true" size={18} strokeWidth={1.8} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="rooms-carousel__controls">
          <div className="rooms-carousel__dots" aria-label="Elegir habitación">
            {rooms.map((room, index) => <button key={room.id} type="button" aria-label={`Ver ${room.name}`} aria-current={index === selected ? 'true' : undefined} onClick={() => navigate(index)}><span /></button>)}
          </div>
          <div className="rooms-carousel__arrows">
            {!reduced && <button className="rooms-carousel__pause" type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Reanudar habitaciones' : 'Pausar habitaciones'}>{paused ? <Play aria-hidden="true" size={17} /> : <Pause aria-hidden="true" size={17} />}</button>}
            <button type="button" aria-label="Habitación anterior" onClick={() => navigate(selected - 1)}><ChevronLeft aria-hidden="true" size={22} strokeWidth={1.8} /></button>
            <button type="button" aria-label="Habitación siguiente" onClick={() => navigate(selected + 1)}><ChevronRight aria-hidden="true" size={22} strokeWidth={1.8} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RoomsPreview
