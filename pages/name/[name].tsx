import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { Pokemon, PokemonListResponse } from '../../interfaces'
import pokeApi from '../api/pokeApi'

interface PokemonByNamePageProps {
  pokemon: Pokemon
}

const PokemonByNamePage: NextPage<PokemonByNamePageProps> = ({ pokemon }) => {
  return <div>{pokemon.name}</div>
}

export default PokemonByNamePage

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('pokemon?limit=151')

  const paths = data.results.map((pokemon) => {
    return {
      params: {
        name: pokemon.name,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string }

  const { data: pokemon } = await pokeApi.get<Pokemon>(`pokemon/${name}`)

  return {
    props: {
      pokemon,
    },
  }
}
