import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {SiteProcess} from '../../types/state';


const initialState: SiteProcess = {
  totalGuitarsCount: 0,
};

export const siteProcess = createSlice({
  name: NameSpace.Site,
  initialState,
  reducers: {
    loadTotalGuitarsCount: (state, action) => {
      state.totalGuitarsCount = action.payload;
    },
  },
});

export const {loadTotalGuitarsCount} = siteProcess.actions;
