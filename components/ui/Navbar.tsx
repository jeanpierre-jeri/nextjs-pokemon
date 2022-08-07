import { Link, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { FC } from 'react'

export const Navbar: FC = () => {
  const { theme } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0px 20px',
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <NextLink href="/" passHref>
        <Link css={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
          <Image
            src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'}
            alt="Pokemon"
            width={70}
            height={70}
          />

          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            ókemon
          </Text>
        </Link>
      </NextLink>
      <NextLink href="/favorites" passHref>
        <a style={{ marginLeft: 'auto' }}>
          <Text color="white">Favoritos</Text>
        </a>
      </NextLink>
    </div>
  )
}
