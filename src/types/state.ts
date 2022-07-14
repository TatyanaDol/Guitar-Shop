import {store} from '../store/index';
import {GuitarData, GuitarsData, GuitarsInCartData} from './guitar';

export type GuitarsDataProcess = {
    guitars: GuitarsData
    isGuitarsDataLoaded: boolean
    oneGuitarCard: GuitarData | null
    isOneGuitarCardDataLoaded: boolean
    searchResultGuitars: GuitarsData,
    guitarsInCart: GuitarsInCartData,
  };

export type SiteProcess = {
    totalGuitarsCount: number
    isError404: boolean
    maxGuitarPrice: number
    minGuitarPrice: number
    discount: number
  };

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
