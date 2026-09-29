import { galleryImages } from '../../data/gallery.js'
import Reveal from '../ui/Reveal.jsx'
import StaggeredHeading from '../ui/StaggeredHeading.jsx'

function Gallery() {
  const [featured, ...images] = galleryImages
  return (
    <section className="gallery" id="galeria" aria-labelledby="gallery-title">
      <div className="gallery__immersive">
        <figure className="gallery__sticky-photo" style={{ '--gallery-backdrop': `url("${featured.src}")` }}>
          <img src={featured.src} alt={featured.alt} width={featured.width} height={featured.height} loading="lazy" decoding="async" style={{ objectPosition: featured.position }} />
          <figcaption>{featured.id} — {featured.caption}<span>{featured.note}</span></figcaption>
        </figure>
        <div className="gallery__immersive-copy">
          <Reveal as="p" className="section-index" variant="small">
            <span>06</span>
            Galería
          </Reveal>

          {/* TODO: reemplazar/aprobar copy con cliente. */}
          <StaggeredHeading id="gallery-title" parts={[{ text: 'Fragmentos ' }, { text: 'de una estadía.' }]} />
          {/* TODO: reemplazar/aprobar copy con cliente. */}
          <Reveal as="p" className="gallery__intro" delay={0.16}>No todo el viaje cabe en una sola fotografía. Estas escenas reúnen personas, detalles y momentos compartidos que siguen presentes después de la estadía.</Reveal>
        </div>
      </div>

      <div className="gallery__grid gallery__grid--continuation">
        {images.map((image, index) => (
          <Reveal
            as="figure"
            className={`gallery__item gallery__item--${image.layout}`}
            key={image.id}
            variant={index === 0 ? 'feature' : 'image'}
            delay={index % 2 === 0 ? 0 : 0.12}
          >
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              style={{ '--gallery-image-position': image.position }}
            />
            <figcaption>
              <span className="gallery__item-index">{image.id} / {image.caption}</span>
              <span className="gallery__item-note">{image.note}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Gallery
