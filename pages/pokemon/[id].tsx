import { useEffect, useState } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'

import confetti from 'canvas-confetti'

import { pokeApi } from '../api'
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../interfaces'
import { capitalize, existsInFavorites, getPokemonInfo, toggleFavorites } from '../../utils'

interface PokemonPageProps {
  pokemon: Pokemon
}

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false)

  const onToggleFavorite = () => {
    toggleFavorites(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if (isInFavorites) return

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    })
  }

  useEffect(() => {
    setIsInFavorites(existsInFavorites(pokemon.id))
  }, [pokemon.id])

  return (
    <Layout title={capitalize(pokemon.name)}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button color="gradient" ghost={!isInFavorites} onPress={onToggleFavorite}>
                {isInFavorites ? 'Quitar de Favoritos' : 'Guardar en Favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (_ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151&offset=0')

  const paths = data.results.map((pokemon, index) => {
    return {
      params: {
        id: String(index + 1),
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const pokemon = await getPokemonInfo(id)

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      pokemon,
      revalitate: 86400,
    },
  }
}

export default PokemonPage
