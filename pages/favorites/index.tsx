import { useEffect, useState } from 'react'

import { NextPage } from 'next'

import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui'
import { pokemons } from '../../utils'
import { FavoritePokemons } from '../../components/pokemon'

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(pokemons())
  }, [])

  return (
    <Layout title="Favoritos">
      {!favoritePokemons.length ? <NoFavorites /> : <FavoritePokemons pokemons={favoritePokemons} />}
    </Layout>
  )
}

export default FavoritesPage
