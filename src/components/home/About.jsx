import Reveal from '../ui/Reveal.jsx'
import StaggeredHeading from '../ui/StaggeredHeading.jsx'
import LocalParallaxImage from '../ui/LocalParallaxImage.jsx'

function About() {
  return (
    <section className="about" id="hostel" aria-labelledby="about-title">
      <div className="about__inner">
        <div className="about__top">
          <Reveal as="p" className="section-index" variant="small"><span>01</span> El Hostel</Reveal>
          <Reveal className="about__logo-wrap" variant="fade" delay={0.08}>
            <img className="about__logo" src="/images/brand/logo.png" alt="Pata y Perro Hostel Cultural" width="1259" height="1162" loading="lazy" />
          </Reveal>
          {/* TODO: reemplazar/aprobar copy con cliente. */}
          <Reveal as="p" className="about__lead" delay={0.12}>
            Pata y Perro es un hostel cultural en Tarija pensado como punto de encuentro entre viajeros, cultura local y experiencias compartidas.
          </Reveal>
        </div>

        <div className="about__story">
          {/* TODO: reemplazar/aprobar copy con cliente. */}
          <StaggeredHeading className="about__headline" id="about-title" parts={[{ text: 'Una casa donde el viaje ' }, { text: 'también sucede adentro.', emphasis: true }]} />
          <Reveal as="figure" className="about__media" variant="feature">
            <LocalParallaxImage src="/images/infrastructure/commonarea3.webp" alt="Patio interior con plantas, galerías y espacios para sentarse" width="1600" height="1067" loading="lazy" decoding="async" />
            <figcaption>Pata y Perro — Hostel Cultural</figcaption>
          </Reveal>
          <Reveal className="about__copy" delay={0.12}>
            {/* TODO: reemplazar/aprobar copy con cliente. */}
            <p>Hay viajes que se recuerdan por el lugar y otros por las personas que encontramos en el camino. En Pata y Perro, el descanso y la convivencia dejan espacio para ambas cosas.</p>
            <p>Tarija también se descubre en una conversación sin apuro, en una mirada distinta y en lo que cada viajero trae consigo. La experiencia continúa incluso cuando volvemos al hostel.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
