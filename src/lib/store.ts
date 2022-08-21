import { browser } from '$app/env'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

const storage = browser ? JSON.parse(window.localStorage['prefs'] || '{}') || {} : {}
storage.darkTheme = browser
  ? window.matchMedia('(prefers-color-scheme: dark)').matches
    ? true
    : false
  : false

const storeSettings = () => {
  if (browser) {
    window.localStorage['prefs'] = JSON.stringify(storage)
  }
}

export const darkTheme: Writable<boolean> = writable(storage.darkTheme ?? false)
export const modalViewed: Writable<boolean> = writable(false)
export const wheelModalViewed: Writable<boolean> = writable(false)
export const entries: Writable<string[]> = writable(
  storage.entries ?? ['David', 'John', 'Paul', 'George', 'Ringo', 'Mick']
)
export const winnerEntries: Writable<string[]> = writable([])

darkTheme.subscribe((value) => {
  storage.darkTheme = value
  storeSettings()
})
entries.subscribe((value) => {
  storage.entries = value
  storeSettings()
})
