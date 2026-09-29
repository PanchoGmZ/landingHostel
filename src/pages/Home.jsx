import About from '../components/home/About.jsx'
import Contact from '../components/home/Contact.jsx'
import Experience from '../components/home/Experience.jsx'
import Gallery from '../components/home/Gallery.jsx'
import Hero from '../components/home/Hero.jsx'
import Location from '../components/home/Location.jsx'
import Products from '../components/home/Products.jsx'
import RoomsPreview from '../components/home/RoomsPreview.jsx'
import Services from '../components/home/Services.jsx'
import Spaces from '../components/home/Spaces.jsx'
import Footer from '../components/layout/Footer.jsx'
import Navbar from '../components/layout/Navbar.jsx'

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <RoomsPreview />
        <Spaces />
        <Products />
        <Gallery />
        <Services />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home
