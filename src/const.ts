
export const REVIEWS_COUNT_PER_STEP = 3;

export enum NameSpace {
    Data = 'DATA',
    Site = 'SITE',
  }

export enum APIRoute {
    Guitars = '/guitars',
    Comments = '/comments',
}

export enum AppRoute {
    Main = '/',
    CatalogPage = '/catalog/page_:slug',
    ProductPage = '/product/:id',
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
