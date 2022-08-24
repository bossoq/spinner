import { browser } from '$app/env'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

const defaultEntries = ['David', 'John', 'Paul', 'George', 'Ringo', 'Mick']
const storage = browser ? JSON.parse(window.localStorage['prefs'] || '{}') || {} : {}
storage.darkTheme = browser
  ? window.matchMedia('(prefers-color-scheme: dark)').matches
    ? true
    : false
  : false
if (storage.entries) {
  if (Array.isArray(storage.entries)) {
    storage.entries = {
      default: storage.entries
    }
    storage.lastSelected = 'default'
  }
}

const storeSettings = () => {
  if (browser) window.localStorage['prefs'] = JSON.stringify(storage)
}

export const darkTheme: Writable<boolean> = writable(storage.darkTheme ?? false)
export const modalViewed: Writable<boolean> = writable(false)
export const wheelModalViewed: Writable<boolean> = writable(false)
export const entries: Writable<string[]> = writable(
  storage.entries ? storage.entries[storage.lastSelected ?? 'default'] : defaultEntries
)
export const names: Writable<string[]> = writable(
  storage.entries ? Object.keys(storage.entries) : ['default']
)
export const nameChange: Writable<string[]> = writable([])
export const lastSelected: Writable<string> = writable(storage.lastSelected ?? 'default')
export const winnerEntries: Writable<string[]> = writable([])

darkTheme.subscribe((value) => {
  storage.darkTheme = value
  storeSettings()
})
entries.subscribe((value) => {
  if (!storage.entries) storage.entries = {}
  storage.entries[storage.lastSelected ?? 'default'] = value
  storeSettings()
})
lastSelected.subscribe((value) => {
  storage.lastSelected = value
  entries.set(storage.entries ? storage.entries[value] ?? [] : defaultEntries)
  storeSettings()
})
names.subscribe((value) => {
  if (value.length > Object.keys(storage.entries).length ?? 0) {
    lastSelected.set(value[value.length - 1])
  } else if (value.length < Object.keys(storage.entries).length ?? 0) {
    storage.entries = Object.keys(storage.entries)
      .filter((key) => value.includes(key))
      .reduce((obj, key) => {
        obj[key] = storage.entries[key]
        return obj
      }, {})
    if (value.length === 0) {
      storage.entries = { default: defaultEntries }
      lastSelected.set('default')
      names.set(['default'])
      return
    }
    lastSelected.set(value[value.length - 1])
  }
})
nameChange.subscribe((value) => {
  if (value.length === 0) return
  storage.entries[value[1]] = storage.entries[value[0]]
  delete storage.entries[value[0]]
  names.set(Object.keys(storage.entries))
  lastSelected.set(value[1])
})
