import { experienceImages } from '../../data/experience.js'
import Reveal from '../ui/Reveal.jsx'
import StaggeredHeading from '../ui/StaggeredHeading.jsx'

function Experience() {
  return (
    <section className="experience" id="experiencia" aria-labelledby="experience-title">
      <div className="experience__inner">
        <div className="experience__heading">
          <Reveal as="p" className="section-index" variant="small"><span>02</span> Experiencia / comunidad</Reveal>
          {/* TODO: reemplazar/aprobar copy con cliente. */}
          <StaggeredHeading id="experience-title" parts={[{ text: 'Viajar también es ' }, { text: 'encontrarse.', emphasis: true }]} />
        </div>

        <Reveal className="experience__aside" delay={0.1}>
          {/* TODO: reemplazar/aprobar copy con cliente. */}
          <p>Cada persona llega con una ruta distinta. Al compartir el mismo espacio, las historias se cruzan y el viaje encuentra nuevas voces.</p>
          <p>La cultura vive en esos encuentros cotidianos: conversar, escuchar y descubrir Tarija desde perspectivas que no estaban en el plan.</p>
        </Reveal>

        <div className="experience__photos">
          {experienceImages.map((image, index) => (
            <Reveal as="figure" className={`experience__photo experience__photo--${image.id}`} key={image.id} variant={index === 0 ? 'feature' : 'image'} delay={index % 2 === 0 ? 0 : 0.12}>
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" style={{ '--experience-position': image.position }} />
              <figcaption><span>{image.id}</span>{image.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
