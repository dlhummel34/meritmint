import type { Metadata, ResolvingMetadata } from 'next'
import HomeClient from './HomeClient'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const campaign = resolvedSearchParams.campaign

  let imageUrl = '/images/meritmint_plaque.png'
  if (campaign === 'forbes') {
    imageUrl = '/crystal-mint-preview.png'
  } else if (campaign === 'heritage') {
    imageUrl = '/heritage-mint-preview.png'
  }

  // Fallback to parent metadata if needed
  const previousImages = (await parent).openGraph?.images || []

  return {
    openGraph: {
      images: [imageUrl, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      images: [imageUrl],
    }
  }
}

export default function Home() {
  return <HomeClient />
}
