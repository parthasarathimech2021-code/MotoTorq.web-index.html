import { BikeModelOption } from '../types';

export const POPULAR_BIKES: BikeModelOption[] = [
  {
    make: 'Yamaha',
    models: [
      { name: 'YZF-R7', years: [2021, 2022, 2023, 2024, 2025, 2026], type: 'sport' },
      { name: 'MT-07', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026], type: 'naked' },
      { name: 'MT-09', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026], type: 'naked' },
      { name: 'Ténéré 700', years: [2020, 2021, 2022, 2023, 2024, 2025, 2026], type: 'adventure' },
      { name: 'YZF-R1', years: [2015, 2017, 2019, 2021, 2023, 2025], type: 'sport' },
    ]
  },
  {
    make: 'Kawasaki',
    models: [
      { name: 'Ninja 400', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024], type: 'sport' },
      { name: 'Ninja ZX-6R', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026], type: 'sport' },
      { name: 'Z900', years: [2017, 2019, 2021, 2023, 2024, 2025], type: 'naked' },
      { name: 'KLR 650', years: [2020, 2021, 2022, 2023, 2024, 2025], type: 'adventure' },
    ]
  },
  {
    make: 'Honda',
    models: [
      { name: 'CBR600RR', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025], type: 'sport' },
      { name: 'CB650R', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025], type: 'naked' },
      { name: 'CRF1100L Africa Twin', years: [2020, 2021, 2022, 2023, 2024, 2025], type: 'adventure' },
      { name: 'Rebel 500', years: [2018, 2020, 2022, 2023, 2024, 2025], type: 'cruiser' },
    ]
  },
  {
    make: 'KTM',
    models: [
      { name: '390 Duke', years: [2017, 2019, 2021, 2022, 2023, 2024, 2025, 2026], type: 'naked' },
      { name: '890 Duke R', years: [2020, 2021, 2022, 2023, 2024, 2025], type: 'naked' },
      { name: '1290 Super Adventure R', years: [2021, 2022, 2023, 2024, 2025], type: 'adventure' },
      { name: 'RC 390', years: [2019, 2021, 2022, 2023, 2024, 2025], type: 'sport' },
    ]
  },
  {
    make: 'BMW Motorrad',
    models: [
      { name: 'R 1250 GS', years: [2019, 2020, 2021, 2022, 2023, 2024], type: 'adventure' },
      { name: 'S 1000 RR', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026], type: 'sport' },
      { name: 'F 900 R', years: [2020, 2021, 2022, 2023, 2024], type: 'naked' },
    ]
  },
  {
    make: 'Ducati',
    models: [
      { name: 'Panigale V2', years: [2020, 2021, 2022, 2023, 2024, 2025], type: 'sport' },
      { name: 'Monster 937', years: [2021, 2022, 2023, 2024, 2025], type: 'naked' },
      { name: 'Multistrada V4', years: [2021, 2022, 2023, 2024, 2025], type: 'adventure' },
    ]
  },
  {
    make: 'Royal Enfield',
    models: [
      { name: 'Himalayan 450', years: [2024, 2025, 2026], type: 'adventure' },
      { name: 'Continental GT 650', years: [2019, 2021, 2023, 2024, 2025], type: 'naked' },
      { name: 'Interceptor 650', years: [2019, 2021, 2023, 2024, 2025], type: 'cruiser' },
    ]
  }
];
