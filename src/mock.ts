export const mockLargeImageUrl = 'https://cdnfile.sspai.com/2025/08/21/article/307f9225044241c6fdd4b4710311a61d.jpeg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp'

export const mockHomeData = [
  {
    component: 'banner',
    revealList: [{
      imageUrl: mockLargeImageUrl,
    }],
    menuList: [
      { imageUrl: mockLargeImageUrl },
      { imageUrl: mockLargeImageUrl },
      { imageUrl: mockLargeImageUrl },
      { imageUrl: mockLargeImageUrl },
    ],
  },
  {
    component: 'recommend',
    title: 'DOLLS',
    tags: ['Featured', 'ReaDoll', 'RealDoll (Robots)'],
    map: {
      'Featured': [
        { imageUrl: mockLargeImageUrl, title: 'Tanya 1.0', flags: ['ai'] }, { imageUrl: mockLargeImageUrl, title: 'Tanya 1.0', flags: ['hotSell'] }, { imageUrl: mockLargeImageUrl, title: 'Tanya 1.0', flags: [] },
        { imageUrl: mockLargeImageUrl, title: 'Tanya 1.0', flags: ['ai'] }, { imageUrl: mockLargeImageUrl, title: 'Tanya 1.0', flags: ['hotSell'] }, { imageUrl: mockLargeImageUrl, title: 'Tanya 1.0', flags: [] },
        { imageUrl: mockLargeImageUrl, title: 'Tanya 1.0', flags: ['ai'] }, { imageUrl: mockLargeImageUrl, title: 'Tanya 1.0', flags: ['hotSell'] }, { imageUrl: mockLargeImageUrl, title: 'Tanya 1.0', flags: [] },
      ],
      'ReaDoll': [],
      'RealDoll (Robots)': [],
    },
  },
  {
    component: 'largeAD',
    imageUrl: mockLargeImageUrl,
  }
]

export const mockDollsList = Array(23)
  .fill({ imageUrl: mockLargeImageUrl })
  .map((obj, index) => (Object.assign({}, obj, { id: `doll${index}`, title: `Doll ${index + 1}.0` })))
