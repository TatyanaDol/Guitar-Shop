import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, TOTAL_COUNT} from '../../const';
import {SiteProcess} from '../../types/state';


const initialState: SiteProcess = {
  totalGuitarsCount: 0,
  isError404: false,
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
      if(action.payload === 404) {
        state.isError404 = true;
      }
      else {
        state.isError404 = false;
      }
    },
  },
});

export const {loadTotalGuitarsCount, loadIsError404} = siteProcess.actions;
