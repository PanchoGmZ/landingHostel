import { useEffect, useState } from 'react'
import { divIcon } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { MapPin } from 'lucide-react'
import useMotionPreference from '../../hooks/useMotionPreference.js'
import 'leaflet/dist/leaflet.css'

const coordinates = [-21.5315983, -64.7339587]
const marker = divIcon({ className: 'hostel-map__marker', html: '<span></span>', iconSize: [32, 40], iconAnchor: [16, 40], popupAnchor: [0, -42] })

function MapInteraction({ enabled }) {
  const map = useMap()
  useEffect(() => {
    for (const handler of [map.dragging, map.touchZoom, map.doubleClickZoom, map.keyboard]) {
      if (enabled) handler.enable()
      else handler.disable()
    }
  }, [enabled, map])
  return null
}

export default function HostelMap() {
  const reduced = useMotionPreference()
  const [touch, setTouch] = useState(() => window.matchMedia('(pointer: coarse), (max-width: 47.99rem)').matches)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse), (max-width: 47.99rem)')
    const update = () => setTouch(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return (
    <div className="hostel-map" onKeyDown={(event) => { if (event.key === 'Escape') setActive(false) }}>
      <MapContainer center={coordinates} zoom={16} scrollWheelZoom={false} zoomAnimation={!reduced} fadeAnimation={!reduced} markerZoomAnimation={!reduced} inertia={!reduced} tapHold={false} className="hostel-map__canvas" aria-label="Ubicación de Pata y Perro en Tarija">
        <MapInteraction enabled={!touch || active} />
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' maxZoom={20} />
        <Marker position={coordinates} icon={marker} title="Pata y Perro Hostel Cultural" alt="Pata y Perro Hostel Cultural">
          <Popup maxWidth={210}><strong>Pata y Perro Hostel Cultural</strong><br />General Trigo 843, Tarija</Popup>
        </Marker>
      </MapContainer>
      {touch && <div className={active ? 'hostel-map__interaction hostel-map__interaction--active' : 'hostel-map__interaction'}>
        <button type="button" onClick={() => setActive(!active)}>{active ? 'Salir del mapa' : 'Explorar mapa'} <MapPin aria-hidden="true" size={17} strokeWidth={1.8} /></button>
      </div>}
    </div>
  )
}
