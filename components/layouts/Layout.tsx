import { FC, PropsWithChildren } from 'react'
import Head from 'next/head'
import { Navbar } from '../ui'

interface LayoutProps extends PropsWithChildren {
  title?: string
}

export const Layout: FC<LayoutProps> = ({ children, title = 'Pokemon App' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Jean Pierre Jeri" />
        <meta name="description" content={`Informacion sobre el pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>
      <Navbar />
      <main style={{ padding: '0 20px' }}>{children}</main>
    </>
  )
}
