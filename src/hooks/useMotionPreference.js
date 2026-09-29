import { useSyncExternalStore } from 'react'

const query = () => window.matchMedia('(prefers-reduced-motion: reduce)')
const subscribe = (update) => {
  const media = query()
  media.addEventListener('change', update)
  return () => media.removeEventListener('change', update)
}

// Keep automatic interactions in sync even when the OS preference changes live.
export default function useMotionPreference() {
  return useSyncExternalStore(subscribe, () => query().matches, () => true)
}
