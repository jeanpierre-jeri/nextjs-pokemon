export const toggleFavorites = (id: number) => {
  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

  if (favorites.includes(id)) {
    favorites = favorites.filter((item) => item !== id)
  } else {
    favorites.push(id)
  }

  localStorage.setItem('favorites', JSON.stringify(favorites))
}

export const existsInFavorites = (id: number): boolean => {
  const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

  return favorites.includes(id)
}

export const capitalize = (name: string): string => {
  const firstLetter: string = name.charAt(0).toUpperCase()
  return firstLetter.concat(name.slice(1))
}

export const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]')
}
