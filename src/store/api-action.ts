import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from './api/api';
import {store} from './index';
import {loadGuitarDataForCart, loadGuitars, loadOneGuitarCard, loadPostedComment, loadSearchResultGuitars} from './guitars-data-process/guitars-data-process';
import { loadDiscount, loadIsError404, loadMaxAndMinPrice, loadTotalGuitarsCount } from './site-process/site-process';
import { API_ROUTE } from '../const';
import { GuitarTypesChecked, NewCommentData, StringsCountChecked } from '../types/guitar';
import { handleError } from '../services/handle-error';
import { makeAPiaceOfReuestURL } from '../utils/utils';

type FetchGuitarsData = {
  slug: string | undefined
  sortQuery: string | null
  orderQuery: string | null
  priceFromQuery: string | null
  priceToQuery: string | null
  guitarsTypesChecked: GuitarTypesChecked
  stringsCount: StringsCountChecked
}

type FetchMaxAndMinPriceData = {
  priceFrom: string | null
  priceTo: string | null
  guitarsTypesChecked: GuitarTypesChecked
  stringsCount: StringsCountChecked
}

type FetchGuitarForCartData = {
  guitarId: number
  setIsAddToCartModalOpenCb: React.Dispatch<React.SetStateAction<boolean>>
  setIsAddingCb: React.Dispatch<React.SetStateAction<boolean>>
  setIsSuccessAddToCartModalOpenCb: React.Dispatch<React.SetStateAction<boolean>>
}

type FetchDiscountData = {
  promoCode: string,
  setIsAddingCb: React.Dispatch<React.SetStateAction<boolean>>
  setIsValidCb: React.Dispatch<React.SetStateAction<boolean>>
}


export const fetchGuitarsAction = createAsyncThunk(
  'fetchGuitars',
  async ({slug, sortQuery, orderQuery, priceFromQuery, priceToQuery, guitarsTypesChecked, stringsCount}: FetchGuitarsData) => {
    let startCount = 0;
    if(slug) {
      startCount = Number(slug) * 9 - 9;
    }
    try {
      const result = await api.get(`/guitars?_embed=comments&_start=${startCount}&_limit=9${sortQuery ? `&_sort=${sortQuery}` : ''}${orderQuery ? `&_order=${orderQuery}` : ''}${priceFromQuery ? `&price_gte=${priceFromQuery}` : ''}${priceToQuery ? `&price_lte=${priceToQuery}` : ''}${makeAPiaceOfReuestURL('&type=', guitarsTypesChecked)}${makeAPiaceOfReuestURL('&stringCount=', stringsCount)}`);
      store.dispatch(loadGuitars(result.data));
      const resultHeaders = result.headers;
      store.dispatch(loadTotalGuitarsCount(resultHeaders['x-total-count']));
    } catch (error) {
      store.dispatch(loadGuitars([]));
      handleError(error);
    }
  },
);

export const fetchOneGuitarCardAction = createAsyncThunk(
  'fetchOneGuitarCard',
  async (guitarId: string) => {
    try {
      const {data} = await api.get(`/guitars/${guitarId}?_embed=comments`);
      store.dispatch(loadOneGuitarCard(data));
      store.dispatch(loadIsError404(data.status));
    } catch (error) {
      store.dispatch(loadOneGuitarCard(null));
      handleError(error);
    }
  },
);

export const addNewCommentAction = createAsyncThunk(
  'addNewComment',
  async ({comment, setIsSavingCb, setIsSuccessReviewModalOpenedCb, setIsFormModalOpenedCb}: NewCommentData) => {
    try {
      const {data} = await api.post(API_ROUTE.Comments, {...comment});
      store.dispatch(loadPostedComment(data));
      setIsSavingCb(false);
      setIsFormModalOpenedCb(false);
      setIsSuccessReviewModalOpenedCb(true);
    } catch(error) {
      setIsSavingCb(false);
      handleError(error);
    }
  },
);

export const fetchSearchResultGuitarsAction = createAsyncThunk(
  'fetchSearchResultGuitars',
  async (searchData: string) => {
    if(!searchData) {
      store.dispatch(loadSearchResultGuitars([]));
      return;
    }
    try {
      const {data} = await api.get(`/guitars?name_like=${searchData}`);
      store.dispatch(loadSearchResultGuitars(data));
    } catch (error) {
      store.dispatch(loadSearchResultGuitars([]));
      handleError(error);
    }
  },
);

export const fetchMaxAndMinPriceAction = createAsyncThunk(
  'fetchMaxAndMinPrice',
  async ({priceFrom, priceTo, guitarsTypesChecked, stringsCount}: FetchMaxAndMinPriceData) => {
    try {
      const {data} = await api.get(`/guitars?_sort=price${priceFrom ? `&price_gte=${priceFrom}` : ''}${priceTo ? `&price_lte=${priceTo}` : ''}${makeAPiaceOfReuestURL('&type=', guitarsTypesChecked)}${makeAPiaceOfReuestURL('&stringCount=', stringsCount)}`);
      store.dispatch(loadMaxAndMinPrice(data));
    } catch (error) {
      store.dispatch(loadMaxAndMinPrice([]));
      handleError(error);
    }
  },
);

export const fetchGuitarForCartAction = createAsyncThunk(
  'fetchGuitarForCart',
  async ({guitarId, setIsAddToCartModalOpenCb, setIsSuccessAddToCartModalOpenCb, setIsAddingCb}: FetchGuitarForCartData) => {
    try {
      const {data} = await api.get(`/guitars/${guitarId}`);
      store.dispatch(loadGuitarDataForCart(data));
      setIsAddingCb(false);
      setIsAddToCartModalOpenCb(false);
      setIsSuccessAddToCartModalOpenCb(true);
    } catch (error) {
      setIsAddingCb(false);
      handleError(error);
    }
  },
);

export const fetchDiscountAction = createAsyncThunk(
  'fetchDiscount',
  async ({promoCode, setIsAddingCb, setIsValidCb}: FetchDiscountData) => {
    try {
      const {data} = await api.post('/coupons', {coupon: promoCode});
      store.dispatch(loadDiscount(data));
      setIsAddingCb(false);
      setIsValidCb(true);
    } catch (error) {
      store.dispatch(loadDiscount(null));
      setIsValidCb(false);
      setIsAddingCb(false);
      handleError(error);
    }
  },
);


