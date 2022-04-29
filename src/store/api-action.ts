import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from './index';
import {store} from './index';
import {loadGuitars} from './guitars-data-process/guitars-data-process';
import {GuitarsData} from '../types/guitar';
// import { APIRoute } from '../const';

export const fetchGuitarsAction = createAsyncThunk(
  'fetchGuitars',
  async () => {
    try {
      const {data} = await api.get<GuitarsData>('/guitars?_start=0&_limit=9');
      store.dispatch(loadGuitars(data));
    } catch (error) {
      store.dispatch(loadGuitars([]));
    }
  },
);
