import { Pokemon } from '../interfaces'
import { pokeApi } from '../pages/api'

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId.toLowerCase()}`)
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
