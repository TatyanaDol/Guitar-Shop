
export const REVIEWS_COUNT_PER_STEP = 3;

export const TOTAL_COUNT = 27;

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
