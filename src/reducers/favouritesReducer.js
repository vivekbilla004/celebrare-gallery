const STORAGE_KEY = 'celebrare_fav_photos'

// to safely read initial favourites from localStorage
export const getInitialFavourites = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (err) {
    console.error('Error reading localStorage:', err)
    return []
  }
}

export const favouritesReducer = (state, action) => {
  let updatedState

  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const photoId = action.payload
      const exists = state.includes(photoId)

      if (exists) {
        // Remove from favourites
        updatedState = state.filter(id => id !== photoId)
      } else {
        // Add to favourites
        updatedState = [...state, photoId]
      }
      break
    }

    default:
      return state
  }

  // Persist updated list to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState))
  } catch (err) {
    console.error('Error writing to localStorage:', err)
  }

  return updatedState
}
