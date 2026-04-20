import { useSyncExternalStore } from 'react'

function getServerSnapshot(): boolean {
  return false
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => {
        mq.removeEventListener('change', onChange)
      }
    },
    () => window.matchMedia(query).matches,
    getServerSnapshot,
  )
}
