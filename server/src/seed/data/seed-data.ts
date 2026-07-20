import * as bcrypt from 'bcrypt';
import { SALT } from 'src/Core/Constants';
import { v4 as uuidv4 } from 'uuid';

interface SeedSport {
  name: string;
  images: string[];
  sportfieldsId?: string[];
  types: string[];
}

// interface SeedSportWithUUID extends SeedSport {
//   id: string;
// }
//
interface SeedReservation {
  date: string;
  hour: number;
}

interface SeedSportField {
  name: string;
  description: string;
  dimensions: string;
  images: string[];
  sport: string;
  capacity?: number;
  reservation?: SeedReservation[];
  fieldType: string;
}

// interface SeedSportFieldRecord extends SeedSportField {
//   sport: SeedSport;
// }

interface SeedUsers {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  owner?: SeedOwners;
}

interface SeedOwners {
  DNI: string;
  address: string;
  phone: string;
}

interface SeedAvailabilityRange {
  start_hour: number;
  end_hour: number;
}

interface SeedSportsComplex {
  email: string;
  address: string;
  phone: string;
  name: string;
  description: string;
  images: string[];
  grills?: boolean;
  locker?: boolean;
  showers?: boolean;
  bathrooms?: boolean;
  restobar?: boolean;
  parking?: boolean;
  lat: number;
  lng: number;
  availability?: SeedAvailabilityRange[];
}

interface SeedData {
  users: SeedUsers[];
  sportscomplex: SeedSportsComplex[];
  sports: SeedSport[];
  sportfields: SeedSportField[];
}

// DATOS
// Crear relaciones
// const idRelations = [
//   {
//     idUser: uuidv4(),
//     idOwner: uuidv4(),
//     idSportComplex: uuidv4(),
//     idSportField: uuidv4(),
//   },
//   {
//     idUser: uuidv4(),
//     idOwner: uuidv4(),
//     idSportComplex: uuidv4(),
//     idSportField: uuidv4(),
//   },
//   {
//     idUser: uuidv4(),
//     idOwner: uuidv4(),
//     idSportComplex: uuidv4(),
//     idSportField: uuidv4(),
//   },
// ];

const sports: SeedSport[] = [
  {
    name: 'football',
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681323530/descarga_1_n0vczv.jpg',
    ],
    types: ['cesped', 'cesped sintentico'],
  },
  {
    name: 'basketball',
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681419508/basketball2_tqbsgv.jpg'
    ],
    types: ['material', 'parquet'],
  },
  {
    name: 'tennis',
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681323533/photo-1627314387807-df615e8567de_ocmygv.avif',
    ],
    types: ['polvo de ladrillo', 'cesped', 'material'],
  },
  {
    name: 'volleyball',
    images: ['https://res.cloudinary.com/djvepy9sd/image/upload/v1681420180/volley1_q7tv9t.jpg'],
    types: ['arena', 'material'],
  },
];

// const sportsWithUUIDS: SeedSportWithUUID[] = sports.map((sport) => ({
//   id: uuidv4(),
//   ...sport,
// }));

const sportfields: SeedSportField[] = [
  {
    name: 'La Bombonerita',
    description: 'Cancha de futbol 5 de pasto sintetico y cerrado.',
    dimensions: '30x16',
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681420438/futbol52_l07lry.jpg',
    ],
    sport: 'football',
    fieldType: 'cesped',
    capacity: 10,
    reservation: [
      {
        hour: 12,
        date: '2023-04-23',
      },
    ],
  },
  {
    name: 'El Monumental',
    description: 'Cancha de futbol 11 de pasto natural.',
    dimensions: '90x45',
    images: ['https://res.cloudinary.com/djvepy9sd/image/upload/v1681323530/descarga_7_mipvur.jpg'],
    sport: 'football',
    fieldType: 'cesped',
    capacity: 22,
    reservation: [
      {
        hour: 12,
        date: '2023-04-23',
      },
    ],
  },
  {
    name: 'El Fortin',
    description: 'Cancha de futbol 5.',
    dimensions: '90x45',
    images: ['https://res.cloudinary.com/djvepy9sd/image/upload/v1681420365/futbol51_d8bzlv.jpg'],
    sport: 'football',
    fieldType: 'cesped sintentico',
    capacity: 10,
    reservation: [
      {
        hour: 11,
        date: '2023-04-23',
      },
      {
        hour: 14,
        date: '2023-04-23',
      },
    ],
  },
  {
    name: 'Staples Center',
    description: 'Cancha de basket cerrada.',
    dimensions: '28x15',
    images: ['https://res.cloudinary.com/djvepy9sd/image/upload/v1681420734/basketcourt3_rhedky.jpg'],
    sport: 'basketball',
    fieldType: 'material',
    capacity: 10,
    reservation: [
      {
        hour: 11,
        date: '2023-04-28',
      },
      {
        hour: 14,
        date: '2023-04-24',
      },
    ],
  },
  {
    name: 'Madison Center',
    description: 'Cancha de basket cerrada.',
    dimensions: '28x15',
    capacity: 10,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681420818/basketcourt4_s0rui0.jpg',
    ],
    sport: 'basketball',
    fieldType: 'parquet',
    reservation: [
      {
        hour: 19,
        date: '2023-04-18',
      },
      {
        hour: 19,
        date: '2023-05-22',
      },
    ],
  },
  {
    name: 'Quality Sport',
    description: 'Cancha de basket cerrada.',
    dimensions: '28x15',
    capacity: 10,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681420902/basketcourt5_s8crqb.jpg',
    ],
    sport: 'basketball',
    fieldType: 'parquet',

  },
  {
    name: 'United Center',
    description: 'Cancha de basket al aire libre.',
    dimensions: '28x15',
    capacity: 10,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681420551/basketcourt1_ggcsx8.jpg',
    ],
    sport: 'basketball',
    fieldType: 'parquet',
  },
  {
    name: 'American Airlines Center',
    description: 'Cancha de basket al aire libre.',
    dimensions: '28x15',
    capacity: 10,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681420698/basketcourt2_imh2ry.jpg',
    ],
    sport: 'basketball',
    fieldType: 'material',
  },
  {
    name: 'American Airlines Center',
    description: 'Cancha de basket cerrada.',
    dimensions: '28x15',
    capacity: 10,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681602101/basketcourt8_xiv2hv.jpg',
    ],
    sport: 'basketball',
    fieldType: 'material',
  },
  {
    name: 'Court Nalbandian',
    description: 'Cancha de tenis de polvo de ladrillo.',
    dimensions: '28x15',
    capacity: 4,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681421749/teniscourt1_mjyy0i.jpg',
    ],
    sport: 'tennis',
    fieldType: 'polvo de ladrillo',
  },
  {
    name: 'Court Pitt Sampras',
    description: 'Cancha de tenis de cesped.',
    dimensions: '28x15',
    capacity: 4,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681422283/teniscourt5_qfjsgp.jpg',
    ],
    sport: 'tennis',
    fieldType: 'cesped',
  },
  {
    name: 'Court Mago Coria',
    description: 'Cancha de tenis cemento.',
    dimensions: '28x15',
    capacity: 4,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681422082/teniscourt3_aeaci8.png',
    ],
    sport: 'tennis',
    fieldType: 'material',
  },
  {
    name: 'Court Roger Federer',
    description: 'Cancha de tenis cesped sintetico.',
    dimensions: '28x15',
    capacity: 4,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681422166/teniscourt4_o4qtxz.jpg',
    ],
    sport: 'tennis',
    fieldType: 'cesped',
  },
  {
    name: 'Court Nadal',
    description: 'Cancha de tenis polvo de ladrillo.',
    dimensions: '28x15',
    capacity: 4,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681422392/teniscourt6_mb0loe.jpg',
    ],
    sport: 'tennis',
    fieldType: 'polvo de ladrillo',
  },
  {
    name: 'Cancha de Voley',
    description: 'Cancha de voley de parquet.',
    dimensions: '16x8',
    capacity: 12,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681422579/voley1_kgkmzh.jpg',
    ],
    sport: 'volleyball',
    fieldType: 'material',
  },
  {
    name: 'Cancha de Voley',
    description: 'Cancha de voley de cemento con red.',
    dimensions: '16x8',
    capacity: 12,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681422668/voley2_axbdug.jpg',
    ],
    sport: 'volleyball',
    fieldType: 'material',
  },
  {
    name: 'Cancha de Voley Rodman',
    description: 'Cancha de voley de cemento con red.',
    dimensions: '16x8',
    capacity: 12,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681422770/voley3_qzzv6k.jpg',
    ],
    sport: 'volleyball',
    fieldType: 'material',
  },
  {
    name: 'Cancha de Voley Mariana',
    description: 'Cancha de voley de cemento con red.',
    dimensions: '16x8',
    capacity: 12,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681422833/voley4_n0ejw3.jpg',
    ],
    sport: 'volleyball',
    fieldType: 'material',
  },
  {
    name: 'Cancha de Voley Ramallo',
    description: 'Cancha de voley de cemento con red.',
    dimensions: '16x8',
    capacity: 12,
    images: [
      'https://res.cloudinary.com/djvepy9sd/image/upload/v1681422907/voley5_qq23ma.jpg',
    ],
    sport: 'volleyball',
    fieldType: 'material',
  },
];

const users: SeedUsers[] = [
  {
    email: 'test1@gmail.com',
    firstName: 'test1',
    lastName: 'test1',
    password: bcrypt.hashSync('12345Test', SALT),
  },
  {
    email: 'test2@gmail.com',
    firstName: 'test2',
    lastName: 'test2',
    password: bcrypt.hashSync('12345Test', SALT),
    owner: {
      address: 'calle 1',
      DNI: '111222333',
      phone: '123123123',
    },
  },
  {
    email: 'test3@gmail.com',
    firstName: 'test3',
    lastName: 'test3',
    password: bcrypt.hashSync('12345Test', SALT),
    owner: {
      address: 'calle 2',
      DNI: '231434123',
      phone: '3123122343',
    },
  },
];

const sportscomplex: SeedSportsComplex[] = [
  {
    name: 'Quality',
    email: 'quality1@gmail.com',
    address: 'Calle Fuerza Aerea 1234',
    phone: '+54 9 3512268833',
    description:
      'Complejo Deportivo de primer nivel con toda la equipacion disponible para el deporte amateur',
    images: ['https://res.cloudinary.com/djvepy9sd/image/upload/v1681421310/complejo2_kkk4i5.jpg'],
    bathrooms: true,
    grills: true,
    locker: true,
    parking: true,
    restobar: true,
    showers: true,
    lat: -32.4201,
    lng: -64.1888,
    availability: [
      {
        start_hour: 7,
        end_hour: 13,
      },
      {
        start_hour: 16,
        end_hour: 22,
      },
    ],
  },
  {
    name: 'Centro de Alto Rendimiento Deportivo Amadeo Nuccetelli',
    email: 'card_amadeo@gmail.com',
    address: 'Calle Rosario de Sante Fe 15',
    phone: '+54 9 3512268833',
    description:
      'Complejo Deportivo de primer nivel con toda la equipacion disponible para el deporte amateur',
    images: ['https://res.cloudinary.com/djvepy9sd/image/upload/v1681421281/complejo1_xz5lwb.jpg'],
    bathrooms: true,
    grills: true,
    locker: true,
    parking: true,
    restobar: true,
    showers: true,
    lat: -32.4201,
    lng: -64.1888,
    availability: [
      {
        start_hour: 9,
        end_hour: 13,
      },
      {
        start_hour: 14,
        end_hour: 24,
      },
    ],
  },
];

export const initialData: SeedData = {
  users,
  sportscomplex,
  sportfields,
  sports,
  // sports: sportsWithUUIDS,
  // sportfields: sportFields.map((field) => {
  //   const idx = field.sportId ? field.sportId - 1 : 0;
  //   const sport = sportsWithUUIDS[idx];
  //   const { sportId, ...rField } = field;
  //   return { ...rField, sport };
  // }),
};