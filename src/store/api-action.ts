import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from './api/api';
import {store} from './index';
import {loadGuitars, loadOneGuitarCard, loadPostedComment} from './guitars-data-process/guitars-data-process';
import { loadTotalGuitarsCount } from './site-process/site-process';
import { APIRoute } from '../const';
import { NewCommentData } from '../types/guitar';


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
    try {
      const {data} = await api.get(`/guitars/${guitarId}?_embed=comments`);
      store.dispatch(loadOneGuitarCard(data));
    } catch (error) {
      store.dispatch(loadOneGuitarCard(null));
    }
  },
);

export const addNewCommentAction = createAsyncThunk(
  'addNewComment',
  async ({comment, setIsSavingCb, setIsSuccessReviewModalOpenedCb, setIsFormModalOpenedCb}: NewCommentData) => {
    try {
      const {data} = await api.post(APIRoute.Comments, {...comment});
      store.dispatch(loadPostedComment(data));
      setIsSavingCb(false);
      setIsFormModalOpenedCb(false);
      setIsSuccessReviewModalOpenedCb(true);
    } catch(error) {
      setIsSavingCb(false);
    }
  },
);
