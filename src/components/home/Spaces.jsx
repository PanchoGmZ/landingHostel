import Reveal from '../ui/Reveal.jsx'

// TODO(content): confirmar nombres oficiales de los espacios con el cliente.
const spaces = [
  { id: '01', label: 'Rincón del hostel', image: '/images/infrastructure/commonarea.webp', alt: 'Mesa y sillas de colores junto a puertas y plantas', position: 'center', width: 1600, height: 1067 },
  { id: '02', label: 'Vista interior', image: '/images/infrastructure/commonarea2.webp', alt: 'Vista elevada del patio interior y sus galerías', position: 'center', width: 1600, height: 2400 },
]

function Spaces() {
  return (
    <section className="spaces" aria-labelledby="spaces-title">
      <div className="spaces__inner">
        <Reveal className="spaces__intro">
          <p className="section-index"><span>04</span> Espacios del hostel</p>
          {/* TODO: reemplazar/aprobar copy con cliente. */}
          <h2 id="spaces-title">También se viaja <em>hacia adentro.</em></h2>
          <p>Los espacios compartidos también cuentan una historia. Son el escenario de una conversación inesperada, un momento de calma o una nueva manera de habitar el viaje.</p>
        </Reveal>
        <div className="spaces__grid">
          {spaces.map((space) => (
            <Reveal as="figure" className="spaces__item" key={space.id} variant="image">
              <img src={space.image} alt={space.alt} width={space.width} height={space.height} loading="lazy" decoding="async" style={{ objectPosition: space.position }} />
              <figcaption><span>{space.id}</span>{space.label}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Spaces
