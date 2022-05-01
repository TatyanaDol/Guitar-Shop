import {store} from '../store/index';
import {GuitarData, GuitarsData} from './guitar';

export type GuitarsDataProcess = {
    guitars: GuitarsData
    isGuitarsDataLoaded: boolean
    oneGuitarCard: GuitarData | null
    isOneGuitarCardDataLoaded: boolean
  };

export type SiteProcess = {
    totalGuitarsCount: number
  };

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
