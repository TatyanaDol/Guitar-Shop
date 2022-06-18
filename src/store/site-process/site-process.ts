import {createSlice} from '@reduxjs/toolkit';
import {HttpCode, NameSpace, TOTAL_COUNT} from '../../const';
import {SiteProcess} from '../../types/state';


const initialState: SiteProcess = {
  totalGuitarsCount: 0,
  isError404: false,
  maxGuitarPrice: 0,
  minGuitarPrice: 0,
};

export const siteProcess = createSlice({
  name: NameSpace.Site,
  initialState,
  reducers: {
    loadTotalGuitarsCount: (state, action) => {
      if(action.payload <= TOTAL_COUNT) {
        state.totalGuitarsCount = action.payload;
      }
      else {
        state.totalGuitarsCount = TOTAL_COUNT;
      }
    },
    loadIsError404: (state, action) => {
      state.isError404 = action.payload === HttpCode.Not_found;

    },
    loadMaxAndMinPrice: (state, action) => {
      if(action.payload[0]) {
        state.minGuitarPrice = action.payload[0].price;
        state.maxGuitarPrice = action.payload[action.payload.length - 1].price;
      } else {
        state.minGuitarPrice = 0;
        state.maxGuitarPrice = 0;
      }
    },
  },
});

export const {loadTotalGuitarsCount, loadIsError404, loadMaxAndMinPrice} = siteProcess.actions;
