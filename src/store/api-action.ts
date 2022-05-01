import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from './index';
import {store} from './index';
import {loadGuitars, loadOneGuitarCard} from './guitars-data-process/guitars-data-process';
import { loadTotalGuitarsCount } from './site-process/site-process';
// import { APIRoute } from '../const';


export const fetchGuitarsAction = createAsyncThunk(
  'fetchGuitars',
  async (pageId: string | undefined) => {
    let startCount = 0;
    if(pageId) {
      startCount = Number(pageId) * 9 - 9;
    }
    try {
      const result = await api.get(`/guitars?_embed=comments&_start=${startCount}&_limit=9`);
      store.dispatch(loadGuitars(result.data));
      const resultHeaders = result.headers;
      store.dispatch(loadTotalGuitarsCount(resultHeaders['x-total-count']));
    } catch (error) {
      store.dispatch(loadGuitars([]));
    }
  },
);

export const fetchOneGuitarCardAction = createAsyncThunk(
  'fetchOneGuitarCard',
  async (guitarId: string) => {
    // let id = 1;
    // if(guitarId) {
    //   id = Number(guitarId);
    // }
    try {
      const {data} = await api.get(`/guitars/${guitarId}?_embed=comments`);
      store.dispatch(loadOneGuitarCard(data));
    } catch (error) {
      store.dispatch(loadOneGuitarCard(null));
    }
  },
);

