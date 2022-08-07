import { FC } from 'react'
import { useRouter } from 'next/router'

import { SmallPokemon } from '../../interfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react'

interface PokemonCardProps {
  pokemon: SmallPokemon
}

export const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const router = useRouter()
  const { name, id, img } = pokemon

  const goToPokemon = () => {
    // router.push(`/pokemon/${id}`)
    router.push(`/name/${name}`)
  }
  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable isPressable onPress={goToPokemon}>
        <Card.Body css={{ p: '5px' }}>
          <Card.Image src={img} width="100%" height={140} alt={name} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize" b>
              {name}
            </Text>
            <Text css={{ color: '$accents7', fontWeight: '$semibold', fontSize: '$sm' }}>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  )
}
