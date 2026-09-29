import Reveal from '../ui/Reveal.jsx'

const productImages = [
  { id: '01', src: '/images/products/producto1.webp', alt: 'Botella de vino blanco sobre una mesa con tejido y ramas', width: 1200, height: 1749 },
  { id: '02', src: '/images/products/producto2.webp', alt: 'Botella de bebida artesanal junto a tejidos', width: 1200, height: 1800 },
  { id: '03', src: '/images/products/producto3.webp', alt: 'Botella de vino sostenida por una mano', width: 1200, height: 1834 },
]

function Products() {
  return (
    <section className="products" id="productos" aria-labelledby="products-title">
      <div className="products__inner">
        <Reveal className="products__intro">
          <p className="section-index"><span>05</span> Productos locales</p>
          {/* TODO: reemplazar/aprobar copy con cliente. */}
          <h2 id="products-title">Sabores <em>de aquí.</em></h2>
          <p>Los sabores locales acercan el viaje a Tarija desde otro lugar. Productos y bebidas de la región invitan a detenerse, compartir y conocer algo de su tradición.</p>
        </Reveal>
        <div className="products__photos">
          {productImages.map((image) => (
            <Reveal as="figure" className="products__photo" key={image.id} variant="image" delay={Number(image.id) * 0.07}>
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
              <figcaption>{image.id} / Productos locales</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
