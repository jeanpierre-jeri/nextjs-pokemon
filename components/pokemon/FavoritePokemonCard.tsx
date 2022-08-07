import { FC } from 'react'
import { useRouter } from 'next/router'
import { Card, Grid } from '@nextui-org/react'

interface FavoritePokemonCardProps {
  pokemonId: number
}

export const FavoritePokemonCard: FC<FavoritePokemonCardProps> = ({ pokemonId }) => {
  const router = useRouter()

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${pokemonId}`)
  }

  return (
    <Grid xs={6} md={2} xl={1} onClick={onFavoriteClicked}>
      <Card isHoverable isPressable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          width={'100%'}
          height={140}
        />
      </Card>
    </Grid>
  )
}
