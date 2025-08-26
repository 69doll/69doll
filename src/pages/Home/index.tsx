import { useLoaderData } from "react-router-dom"
import ContentLayout from "../../components/ContentLayout"
import loaderData from "../../utils/loaderData"
import Banner from "./components/Banner"
import LargeAD from "./components/LargeAD"
import Recommend from "./components/Recommend"
import { match } from "ts-pattern"

const mockImageUrl = 'https://cdnfile.sspai.com/2025/08/21/article/307f9225044241c6fdd4b4710311a61d.jpeg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp'

const mockData = [
  {
    component: 'recommend',
    title: 'DOLLS',
    tags: ['Featured', 'ReaDoll', 'RealDoll (Robots)'],
    map: {
      'Featured': [
        { imageUrl: mockImageUrl, title: 'Tanya 1.0', flags: ['ai'] }, { imageUrl: mockImageUrl, title: 'Tanya 1.0', flags: ['hotSell'] }, { imageUrl: mockImageUrl, title: 'Tanya 1.0', flags: [] },
        { imageUrl: mockImageUrl, title: 'Tanya 1.0', flags: ['ai'] }, { imageUrl: mockImageUrl, title: 'Tanya 1.0', flags: ['hotSell'] }, { imageUrl: mockImageUrl, title: 'Tanya 1.0', flags: [] },
        { imageUrl: mockImageUrl, title: 'Tanya 1.0', flags: ['ai'] }, { imageUrl: mockImageUrl, title: 'Tanya 1.0', flags: ['hotSell'] }, { imageUrl: mockImageUrl, title: 'Tanya 1.0', flags: [] },
      ],
      'ReaDoll': [],
      'RealDoll (Robots)': [],
    },
  },
  {
    component: 'largeAD',
    imageUrl: mockImageUrl,
  }
]

export const Component: React.FC = () => {
  const data = useLoaderData() as ReturnType<typeof loaderData>
  return (
    <ContentLayout>
      <Banner />
      {
        (data?.get?.<any[]>('data') ?? mockData).map((d, index) => {
          const { component, ...props } = d
          return match(d)
            .with({ component: 'recommend' }, () => <Recommend key={index} {...props} />)
            .with({ component: 'largeAD' }, () => <LargeAD key={index} {...props} />)
            .otherwise(() => <></>)
        })
      }
    </ContentLayout>
  )
}

export async function loader () {
  return loaderData()
    .set('data', mockData)
}
