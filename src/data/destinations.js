export const destinations = [
  {
    id: 'san-gil',
    name: 'San Gil',
    image: new URL('../assets/images/img1.jpg', import.meta.url).href,

    gallery: [
      new URL('../assets/images/img1.jpg', import.meta.url).href,
      new URL('../assets/images/img1.jpg', import.meta.url).href,
      new URL('../assets/images/img1.jpg', import.meta.url).href
    ],

    categories: ['Aventura', 'Naturaleza'],

    description:
      'San Gil es la capital turística de Santander, famosa por los deportes extremos.',

    history:
      'San Gil fue fundado en 1689 y con el tiempo se convirtió en el epicentro del turismo de aventura en Colombia.',

    climate: {
      type: 'Templado',
      bestSeason: 'Diciembre a marzo'
    },

    activities: [
      'Rafting',
      'Parapente',
      'Senderismo',
      'Espeleología'
    ],

    gastronomy: [
      'Mute santandereano',
      'Carne oreada',
      'Arepa santandereana'
    ],

    location: {
      city: 'San Gil',
      department: 'Santander',
      country: 'Colombia',
      lat: 6.5557,
      lng: -73.1331
    },

    services: [
      {
        id: 'hotel-san-gil-1',
        type: 'hotel',
        name: 'Hotel Casa Blanca',
        description: 'Hotel cómodo y económico cerca del centro.',
        whatsapp: '573001112233',
        website: 'https://hotelcasablanca.com'
      },
      {
        id: 'tour-san-gil-1',
        type: 'tour',
        name: 'Aventura Extrema San Gil',
        description: 'Rafting, parapente y deportes extremos.',
        whatsapp: '573104445566'
      }
    ]
  },

  {
    id: 'barichara',
    name: 'Barichara',
    image: new URL('../assets/images/img11.png', import.meta.url).href,

    gallery: [
      new URL('../assets/images/img11.png', import.meta.url).href,
      new URL('../assets/images/img12.jpg', import.meta.url).href
    ],

    categories: ['Cultura', 'Historia'],

    description:
      'Uno de los pueblos más bonitos de Colombia, reconocido por su arquitectura colonial.',

    history:
      'Barichara fue fundado en 1705 y es considerado patrimonio cultural por conservar su arquitectura tradicional.',

    climate: {
      type: 'Cálido',
      bestSeason: 'Todo el año'
    },

    activities: [
      'Caminatas',
      'Fotografía',
      'Turismo cultural'
    ],

    gastronomy: [
      'Hormigas culonas',
      'Cabro',
      'Arepas artesanales'
    ],

    location: {
      city: 'Barichara',
      department: 'Santander',
      country: 'Colombia',
      lat: 6.6357,
      lng: -73.2237
    },

    services: [
      {
        id: 'hotel-barichara-1',
        type: 'hotel',
        name: 'Hotel Colonial Barichara',
        description: 'Hospedaje tradicional con vista al pueblo.',
        whatsapp: '573201234567'
      }
    ]
  },

  {
    id: 'curiti',
    name: 'Curití',
    image: new URL('../assets/images/img10.jpg', import.meta.url).href,

    gallery: [
      new URL('../assets/images/img10.jpg', import.meta.url).href
    ],

    categories: ['Naturaleza', 'Artesanías'],

    description:
      'Curití es conocido por su tradición artesanal y sus paisajes naturales.',

    history:
      'Curití destaca por su herencia artesanal, especialmente en la elaboración de productos en fique.',

    climate: {
      type: 'Templado',
      bestSeason: 'Enero a agosto'
    },

    activities: [
      'Turismo rural',
      'Artesanías',
      'Senderismo'
    ],

    gastronomy: [
      'Comida típica santandereana',
      'Productos artesanales'
    ],

    location: {
      city: 'Curití',
      department: 'Santander',
      country: 'Colombia',
      lat: 6.6056,
      lng: -73.0706
    },

    services: []
  }
]