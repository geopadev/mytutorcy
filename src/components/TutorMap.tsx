import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { BadgeCheck, Globe, MapPin } from 'lucide-react'
import type { Tutor } from '../lib/db'
import { getTutorCoords } from '../lib/db'
import StarRating from './StarRating'

const CYPRUS_CENTER: [number, number] = [35.05, 33.2]

// Inline-SVG divIcon: no image assets, so the Vite/Leaflet default-icon path issue
// (and the /mytutorcy/ base on Pages) can't produce broken markers.
const pinIcon = L.divIcon({
  className: '', // drop leaflet-div-icon's white box styling
  html: `<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 1C8.3 1 2 7.3 2 15c0 10.5 14 24 14 24s14-13.5 14-24C30 7.3 23.7 1 16 1z"
      fill="#0d9488" stroke="#ffffff" stroke-width="2"/>
    <circle cx="16" cy="15" r="5.5" fill="#ffffff"/>
  </svg>`,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -36],
})

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

function PopupCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="w-52 font-sans">
      <div className="flex items-center gap-1.5">
        <span className="truncate font-display font-semibold text-ink">{tutor.fullName}</span>
        {tutor.verified && <BadgeCheck size={15} className="shrink-0 text-brand-500" aria-label="Verified" />}
      </div>
      <div className="mt-0.5 line-clamp-2 text-xs text-ink-soft">{tutor.headline}</div>
      <div className="mt-1.5 flex items-center justify-between">
        <StarRating value={tutor.rating} size={13} showNumber />
        <span className="rounded-full bg-accent-50 px-2 py-0.5 font-display text-sm font-bold text-ink">
          €{tutor.hourlyPriceEur}<span className="text-[10px] font-medium text-slate-500">/hr</span>
        </span>
      </div>
      <Link
        to={`/tutor/${tutor.id}`}
        className="mt-2 block rounded-full bg-ink px-3 py-1.5 text-center text-xs font-semibold !text-white hover:bg-brand-600"
      >
        View profile
      </Link>
    </div>
  )
}

// Map of the currently filtered tutors. Pins are city-level + deterministic
// offset (see getTutorCoords) — never exact addresses.
export default function TutorMap({ tutors }: { tutors: Tutor[] }) {
  const pinned = tutors
    .map((t) => ({ tutor: t, coords: getTutorCoords(t) }))
    .filter((x): x is { tutor: Tutor; coords: { lat: number; lng: number } } => x.coords !== null)

  const unpinned = tutors.filter((t) => getTutorCoords(t) === null)
  const onlineUnpinned = unpinned.filter((t) => t.mode === 'online')
  const otherUnpinned = unpinned.length - onlineUnpinned.length

  return (
    <div>
      {/* z-0 keeps Leaflet's high-z-index panes under the sticky header */}
      <div className="relative z-0 overflow-hidden rounded-3xl border border-slate-100 shadow-soft">
        <MapContainer
          center={CYPRUS_CENTER}
          zoom={9}
          className="h-[60vh] min-h-[420px] w-full"
          scrollWheelZoom
        >
          <TileLayer attribution={OSM_ATTRIBUTION} url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {pinned.map(({ tutor, coords }) => (
            <Marker key={tutor.id} position={[coords.lat, coords.lng]} icon={pinIcon}>
              <Popup>
                <PopupCard tutor={tutor} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={13} className="text-brand-500" /> Pins show approximate areas, not exact addresses.
        </span>
        {onlineUnpinned.length > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <Globe size={13} /> Also available online: {onlineUnpinned.length} tutor{onlineUnpinned.length === 1 ? '' : 's'}
          </span>
        )}
        {otherUnpinned > 0 && (
          <span className="text-xs text-slate-400">
            {otherUnpinned} tutor{otherUnpinned === 1 ? '' : 's'} without a mapped area (see list view)
          </span>
        )}
      </div>
    </div>
  )
}

// Single-tutor mini map for the profile page ("approximate area").
export function TutorMiniMap({ tutor }: { tutor: Tutor }) {
  const coords = getTutorCoords(tutor)
  if (!coords) return null
  return (
    <div className="relative z-0 overflow-hidden rounded-2xl border border-slate-100">
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={12}
        className="h-56 w-full"
        scrollWheelZoom={false}
      >
        <TileLayer attribution={OSM_ATTRIBUTION} url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[coords.lat, coords.lng]} icon={pinIcon} />
      </MapContainer>
    </div>
  )
}
