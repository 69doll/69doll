import { fill } from 'es-toolkit'

export const mockLargeImageUrl = 'https://cdnfile.sspai.com/2025/08/21/article/307f9225044241c6fdd4b4710311a61d.jpeg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp'

export const mockDollsList = fill(Array(23), { imageUrl: mockLargeImageUrl })
  .map((obj, index) => (Object.assign({}, obj, { id: `doll-${index}`, title: `Doll ${index + 1}.0` })))

export const mockDollDetails = mockDollsList.map((obj) => {
  const { imageUrl, ...others } = obj
  return {
    ...others,
    imageUrls: fill(Array(15), imageUrl),
    category: 'dolls',
    rate: 10,
    reviewers: 37,
    amount: 9000,
    description: fill(Array(9), `${others.title} description`).join(' '),
    optionals: [
      {
        id: crypto.randomUUID(),
        title: 'LIMITED PROMOTION',
        perRow: [4, 4, 4, 4, 4, 4],
        min: 1,
        max: 1,
        options: [
          { name: 'Customize', value: 'customize', id: 'customize' },
          { name: 'noChange', value: 'default', id: 'default', amount: -1000, default: true },
        ],
      },
      {
        id: crypto.randomUUID(),
        title: 'FEMALE FACE 1',
        min: 1,
        max: 1,
        perRow: [4, 4, 4, 4, 4, 4],
        options: fill(Array(10), { name: 'Face1', id: 'Face1', imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl })
          .map((obj, index) => ({ ...obj, id: crypto.randomUUID(), name: `Face${index}`, value: `Face${index}`, default: index === 0 })),
      },
      {
        id: crypto.randomUUID(),
        title: 'FEMALE FACE 2',
        min: 1,
        max: 1,
        perRow: [3, 3, 5, 5, 6, 6],
        options: fill(Array(10), { name: 'Face1', id: 'Face1', imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl })
          .map((obj, index) => ({ ...obj, id: crypto.randomUUID(), name: `Face${index}`, value: `Face${index}`, default: index === 0 })),
        additions: [
          {
            id: crypto.randomUUID(),
            title: 'FEMALE Opts 1',
            min: 0,
            max: 2,
            perRow: [4, 4, 5, 5, 6, 6],
            options: [
              { name: 'Opts1', id: crypto.randomUUID(), imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl },
              { name: 'Opts2', id: crypto.randomUUID(), imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl, default: true },
              { name: 'Opts3', id: crypto.randomUUID(), imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl },
              { name: 'Opts4', id: crypto.randomUUID(), imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl },
              { name: 'Opts5', id: crypto.randomUUID(), imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl },
              { name: 'Opts6', id: crypto.randomUUID(), imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl },
              { name: 'Opts7', id: crypto.randomUUID(), imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl },
              { name: 'Opts8', id: crypto.randomUUID(), imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl },
              { name: 'Opts9', id: crypto.randomUUID(), imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl },
              { name: 'Opts0', id: crypto.randomUUID(), imageUrl: mockLargeImageUrl, detailImageUrl: mockLargeImageUrl },
            ],
          },
        ],
      },
    ].map((item, index, rawList) => {
      return {
        ...item,
        dependency: index !== 0 ? { [rawList[0].id]: [['customize']] } : undefined,
      }
    }),
    detailUrls: fill(Array(5), mockLargeImageUrl),
  }
})

export const mockFacesList = fill(Array(23), { imageUrl: mockLargeImageUrl })
  .map((obj, index) => (Object.assign({}, obj, { id: `face-${index}`, title: `Face ${index + 1}`, subTitle: 'Face', amount: 1234, isNew: Math.random() > 0.5 })))

export const mockFaceDetails = mockFacesList.map((obj) => {
  const { imageUrl, isNew, ...others } = obj
  return {
    ...others,
    imageUrls: fill(Array(15), imageUrl),
    rate: 10,
    category: 'face',
    reviewers: 37,
    amount: 1000,
    description: fill(Array(9), `${others.title} description`).join(' '),
    optionals: [
      {
        id: crypto.randomUUID(),
        title: 'Color',
        perRow: [4, 4, 4, 4, 4, 4],
        min: 1,
        max: 1,
        options: [
          { name: 'white', value: 'white', id: crypto.randomUUID(), default: true },
          { name: 'black', value: 'black', id: crypto.randomUUID(), amount: 500 },
        ],
      },
    ],
  }
})

export const mockTorsosList = fill(Array(23), { imageUrl: mockLargeImageUrl })
  .map((obj, index) => (Object.assign({}, obj, { id: `torso-${index}`, title: `Torso ${index + 1}`, subTitle: 'Torso', amount: 1234, isNew: Math.random() > 0.5 })))

export const mockTorsoDetails = mockTorsosList.map((obj) => {
  const { imageUrl, isNew, ...others } = obj
  return {
    ...others,
    imageUrls: fill(Array(15), imageUrl),
    rate: 10,
    category: 'Torso',
    reviewers: 37,
    amount: 1000,
    description: fill(Array(9), `${others.title} description`).join(' '),
    optionals: [
      {
        id: crypto.randomUUID(),
        title: 'Color',
        perRow: [4, 4, 4, 4, 4, 4],
        min: 1,
        max: 1,
        options: [
          { name: 'white', value: 'white', id: crypto.randomUUID(), default: true },
          { name: 'black', value: 'black', id: crypto.randomUUID(), amount: 500 },
        ],
      },
    ],
  }
})

export const mockAccessoriesList = fill(Array(23), { imageUrl: mockLargeImageUrl })
  .map((obj, index) => (Object.assign({}, obj, { id: `accessory-${index}`, title: `Accessory ${index + 1}`, subTitle: 'Accessory', amount: 1234, isNew: Math.random() > 0.5 })))

export const mockAccessoryDetails = mockAccessoriesList.map((obj) => {
  const { imageUrl, isNew, ...others } = obj
  return {
    ...others,
    imageUrls: fill(Array(15), imageUrl),
    rate: 10,
    category: 'Accessory',
    reviewers: 37,
    amount: 1000,
    description: fill(Array(9), `${others.title} description`).join(' '),
    optionals: [
      {
        id: crypto.randomUUID(),
        title: 'Color',
        perRow: [4, 4, 4, 4, 4, 4],
        min: 1,
        max: 1,
        options: [
          { name: 'white', value: 'white', id: crypto.randomUUID(), default: true },
          { name: 'black', value: 'black', id: crypto.randomUUID(), amount: 500 },
        ],
      },
    ],
  }
})
