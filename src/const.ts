
export const REVIEWS_COUNT_PER_STEP = 3;

export const TOTAL_COUNT = 27;

export const EXISTING_TYPES_OF_GUITAR = ['acoustic', 'electric', 'ukulele'];

export const EXISTING_STRINGS_COUNT =  [4, 6, 7, 12];

export const API_ROUTE = {
  Comments: '/comments',
} as const;

export enum NameSpace {
    Data = 'DATA',
    Site = 'SITE',
  }

export enum AppRoute {
    Main = '/',
    CatalogPage = '/catalog/page_:slug',
    ProductPage = '/product/:id',
  }

export enum HttpCode {
    Bad_request = 400,
    Not_found = 404,
}

export const RATING = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Удовлетворительно',
  4: 'Хорошо',
  5: 'Отлично',
} as const;

export const GUITAR_TYPE = {
  ukulele: 'Укулеле',
  electric: 'Электрогитара',
  acoustic: 'Акустическая гитара',
} as const;

export const TYPES_FOR_STRINGS = {
  '4': ['electric', 'ukulele'],
  '6': ['acoustic', 'electric'],
  '7': ['acoustic', 'electric'],
  '12': ['acoustic'],

} as const;

export const STRINGS_FOR_TYPES = {
  'acoustic': [6, 7, 12],
  'electric': [4, 6, 7],
  'ukulele': [4],
} as const;

