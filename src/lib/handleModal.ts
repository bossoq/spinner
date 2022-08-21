import { modalViewed, wheelModalViewed } from '$lib/store'

export const handleModalClass = (e: Event, mViewed: boolean, disabled = false) => {
  e.preventDefault()
  if (disabled && !mViewed) return
  if (mViewed) {
    modalViewed.set(false)
  } else {
    modalViewed.set(true)
  }
}

export const handleWheelModalClass = (e: Event, mViewed: boolean, disabled = false) => {
  e.preventDefault()
  if (disabled && !mViewed) return
  if (mViewed) {
    wheelModalViewed.set(false)
  } else {
    wheelModalViewed.set(true)
  }
}
