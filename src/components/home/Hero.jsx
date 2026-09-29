import { useCallback, useEffect, useRef, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import useMotionPreference from '../../hooks/useMotionPreference.js'
import { whatsappUrl } from '../../data/socials.js'

const heroImages = [
  { src: '/images/infrastructure/hero-infrastructure.webp', alt: 'Patio y escalera interior del hostel', width: 1920, height: 1280 },
  { src: '/images/infrastructure/commonarea.webp', alt: 'Rincón con mesa de colores, plantas y puertas de madera', width: 1600, height: 1067 },
  { src: '/images/infrastructure/commonarea2.webp', alt: 'Vista desde arriba del patio interior del hostel', width: 1600, height: 2400 },
  { src: '/images/infrastructure/commonarea3.webp', alt: 'Patio interior iluminado con plantas y galerías', width: 1600, height: 1067 },
]

function Hero() {
  const heroRef = useRef(null)
  const [autoplay] = useState(() => Autoplay({
      delay: 4400,
      playOnInit: false,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      rootNode: (root) => root.closest('.hero') ?? root,
    }))

  const reducedMotion = useMotionPreference()
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 47.99rem)').matches)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 }, reducedMotion ? [] : [autoplay])
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-2%', '5%'])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -38])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 47.99rem)')
    const update = () => setIsMobile(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!emblaApi) return undefined
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return undefined
    if (reducedMotion) autoplay.stop()
    else autoplay.play()
    return () => autoplay.stop()
  }, [emblaApi, reducedMotion, autoplay])

  const scrollPrev = useCallback(() => {
    autoplay.reset()
    emblaApi?.scrollPrev()
  }, [emblaApi, autoplay])

  const scrollNext = useCallback(() => {
    autoplay.reset()
    emblaApi?.scrollNext()
  }, [emblaApi, autoplay])

  const entrance = reducedMotion ? undefined : { opacity: 1, y: 0 }
  const imageTransition = { duration: reducedMotion ? 0 : isMobile ? 0.6 : 0.9, ease: [0.22, 1, 0.36, 1] }

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero__visual" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={heroImages[selectedIndex].src}
            src={heroImages[selectedIndex].src}
            alt=""
            width={heroImages[selectedIndex].width}
            height={heroImages[selectedIndex].height}
            loading="eager"
            fetchPriority={selectedIndex === 0 ? 'high' : 'auto'}
            decoding="async"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={imageTransition}
            style={reducedMotion || isMobile ? undefined : { y: photoY, scale: 1.07 }}
          />
        </AnimatePresence>
      </div>
      <div className="hero__carousel" aria-label="Fotografías del hostel">
        <div className="hero__viewport" ref={emblaRef}>
          <div className="hero__track">
            {heroImages.map((image, index) => (
              <div className="hero__slide" key={image.src} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${heroImages.length}: ${image.alt}`} aria-hidden={index !== selectedIndex}>
                <img
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hero__overlay" aria-hidden="true" />

      <motion.div className="hero__content" style={reducedMotion || isMobile ? undefined : { y: contentY }}>
        <motion.p className="hero__eyebrow" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={entrance} transition={{ duration: 0.55, delay: 0.04 }}>
          Pata y Perro <span>Hostel Cultural</span>
        </motion.p>
        {/* TODO: reemplazar con copy definitivo del cliente. */}
        <motion.h1 className="hero__title" id="hero-title" initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 9 : 16 }} animate={entrance} transition={{ duration: 0.72, delay: 0.1 }}>
          <motion.span initial={reducedMotion ? false : { opacity: 0 }} animate={reducedMotion ? undefined : { opacity: 1 }} transition={{ duration: 0.48, delay: 0.13 }}>Un hostel para </motion.span>
          <motion.em initial={reducedMotion ? false : { opacity: 0 }} animate={reducedMotion ? undefined : { opacity: 1 }} transition={{ duration: 0.48, delay: 0.25 }}>encontrarse,</motion.em>
          <motion.span initial={reducedMotion ? false : { opacity: 0 }} animate={reducedMotion ? undefined : { opacity: 1 }} transition={{ duration: 0.48, delay: 0.37 }}> compartir y vivir Tarija.</motion.span>
        </motion.h1>
        <motion.div className="hero__intro" initial={reducedMotion ? false : { opacity: 0, y: isMobile ? 8 : 12 }} animate={entrance} transition={{ duration: 0.68, delay: 0.3 }}>
          {/* TODO: reemplazar con copy definitivo del cliente. */}
          <p>Una casa abierta al viaje, a las conversaciones y a lo que sucede cuando llegamos a un lugar nuevo.</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#hostel">Conoce Pata y Perro</a>
            <a className="button button--text" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp <MessageCircle aria-hidden="true" size={18} strokeWidth={1.8} /></a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="hero__bottom" initial={reducedMotion ? false : { opacity: 0 }} animate={reducedMotion ? undefined : { opacity: 1 }} transition={{ duration: 0.55, delay: 0.52 }}>
        <p>Tarija, Bolivia <span aria-hidden="true">—</span> Desliza para explorar</p>
        <div className="hero__controls" aria-label="Controles del carrusel">
          <span aria-live="polite">{String(selectedIndex + 1).padStart(2, '0')} / 04</span>
          <button type="button" onClick={scrollPrev} aria-label="Fotografía anterior"><ChevronLeft aria-hidden="true" size={20} strokeWidth={1.8} /></button>
          <button type="button" onClick={scrollNext} aria-label="Fotografía siguiente"><ChevronRight aria-hidden="true" size={20} strokeWidth={1.8} /></button>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
