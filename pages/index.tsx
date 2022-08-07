import { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react'

import { Layout } from '../components/layouts'
import { pokeApi } from './api'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import { PokemonCard } from '../components/pokemon'

interface HomePageProps {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<HomePageProps> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokémon">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => {
          return <PokemonCard pokemon={pokemon} key={pokemon.id} />
        })}
      </Grid.Container>
    </Layout>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151&offset=0')

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: String(index + 1),
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    }
  })
  return {
    props: {
      pokemons,
    },
  }
}
