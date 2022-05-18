import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, TOTAL_COUNT} from '../../const';
import {SiteProcess} from '../../types/state';


const initialState: SiteProcess = {
  totalGuitarsCount: 0,
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
  },
});

export const {loadTotalGuitarsCount} = siteProcess.actions;
